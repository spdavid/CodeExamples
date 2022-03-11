using System.Configuration;
using Microsoft.Extensions.Configuration;
using Sample;

// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");

FixEnvVariables();


var ctx = ContextHelper.getContext("https://zalo.sharepoint.com/sites/DavidsTestSite");
ctx.Load(ctx.Web);
ctx.ExecuteQuery();

System.Console.WriteLine(ctx.Web.Title);

SiteInfo info = new SiteInfo();
info.name = "agroup";
info.alias = "agroup";
info.owner = "david@zalosolutions.com";

SiteService.CreateSite(info);


void FixEnvVariables()
{
    IConfiguration Configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
     .AddEnvironmentVariables()
    .Build();

    var config = Configuration as ConfigurationRoot;
    if (config != null)
    {
        var provider = config.Providers.ToList()[0] as IConfigurationProvider;

        var envSettings = config.GetSection("EnvSettings").GetChildren();

        foreach (var setting in envSettings)
        {
            Environment.SetEnvironmentVariable(setting.Key, setting.Value);
        }

    }
}



