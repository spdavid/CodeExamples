using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.SharePoint.Client;
using System.Linq;

namespace Sample
{
    public static class HttpGetSharePointLists
    {
        [FunctionName("HttpGetSharePointLists")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            var siteUrl = "https://zalo.sharepoint.com/sites/DavidsTestSite";

            var ctx = ContextHelper.getContext(siteUrl);

         var lists = ctx.Web.Lists;

            ctx.Load(ctx.Web);
            ctx.Load(lists, lsts => lsts.Include(l => l.Title));

            ctx.ExecuteQueryRetry();

           var listOfStrings =  lists.Select(l => l.Title).ToList();

            return new OkObjectResult(listOfStrings);
        }
    }
}
