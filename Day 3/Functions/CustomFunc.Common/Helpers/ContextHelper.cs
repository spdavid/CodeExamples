using System;
using System.Globalization;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Microsoft.SharePoint.Client;
using PnP.Framework;


namespace Sample
{
    public static class ContextHelper
    {

        static string tenant = Environment.GetEnvironmentVariable("tenant");
        static string tenantId = Environment.GetEnvironmentVariable("tenantId");

        static string applicationID = Environment.GetEnvironmentVariable("ClientId");
        static string thumbPrint = Environment.GetEnvironmentVariable("thumbPrint");

        public static ClientContext GetContextFromClientIdAndSecret(string url)
        {
            var clientId = Environment.GetEnvironmentVariable("ClientId");
            var secret = Environment.GetEnvironmentVariable("Secret");

            AuthenticationManager mgr = new AuthenticationManager(clientId, secret);
            return mgr.GetContext(url);

        }

        public static ClientContext getContext(string url)
        {
            try
            {

                string siteUrl = url;


                X509Certificate2 cert2 = null;
                X509Store store = new X509Store(StoreName.My, StoreLocation.CurrentUser);
                try
                {
                    store.Open(OpenFlags.ReadOnly);

                    var col = store.Certificates.Find(X509FindType.FindByThumbprint, thumbPrint, false);

                    if (col == null || col.Count == 0)
                    {

                        return null;
                    }
                    cert2 = col[0];

                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    store.Close();
                }

                return GetAzureADAppOnlyAuthenticatedContext(siteUrl, applicationID, tenantId, cert2);

            }
            catch (Exception ex)
            {

                throw new Exception("Failed to get context for url:" + url, ex);
            }

        }

        public static async Task<string> GetAccessToken(string resource = "https://graph.microsoft.com")
        {
            var cert = GetCert();

            var realtenant = tenant;
            var realAppId = applicationID;

            // string authority = "https://" + tenant;
            string authority = string.Format(CultureInfo.InvariantCulture, "{0}/{1}/", "https://login.windows.net", realtenant);

            var authenticationContext = new Microsoft.IdentityModel.Clients.ActiveDirectory.AuthenticationContext(authority);
            var cac = new ClientAssertionCertificate(realAppId, cert);
            var authenticationResult = await authenticationContext.AcquireTokenAsync(resource, cac);
            return authenticationResult.AccessToken;
        }

        private static X509Certificate2 GetCert()
        {
            X509Certificate2 cert2 = null;
            X509Store store = new X509Store(StoreName.My, StoreLocation.CurrentUser);
            try
            {
                store.Open(OpenFlags.ReadOnly);

                var col = store.Certificates.Find(X509FindType.FindByThumbprint, thumbPrint, false);

                if (col == null || col.Count == 0)
                {

                    return null;
                }
                cert2 = col[0];

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                store.Close();
            }

            return cert2;
        }


        private static ClientContext GetAzureADAppOnlyAuthenticatedContext(string siteUrl, string clientId, string tenant, X509Certificate2 certificate)
        {
            var clientContext = new ClientContext(siteUrl);
            clientContext.DisableReturnValueCache = true;

            string authority = string.Format(CultureInfo.InvariantCulture, "{0}/{1}/", "https://login.microsoftonline.com", tenant);

            var authContext = new AuthenticationContext(authority);

            var clientAssertionCertificate = new ClientAssertionCertificate(clientId, certificate);

            var host = new Uri(siteUrl);

            clientContext.ExecutingWebRequest += (sender, args) =>
            {
                var ar = Task.Run(() => authContext
                    .AcquireTokenAsync(host.Scheme + "://" + host.Host + "/", clientAssertionCertificate))
                    .GetAwaiter().GetResult();
                args.WebRequestExecutor.RequestHeaders["Authorization"] = "Bearer " + ar.AccessToken;
            };



            return clientContext;
        }









    }
}