using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Sample
{
    public static class HttpTestContext
    {
        [FunctionName("HttpTestContext")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
          
            // var ctx =  ContextHelper.getContext("https://zalo.sharepoint.com/sites/DavidsTestSite");
            // ctx.Load(ctx.Web);
            // ctx.ExecuteQuery();

            var data = Environment.GetEnvironmentVariable("DavidsSecret");

            return new OkObjectResult(data);
        }
    }
}
