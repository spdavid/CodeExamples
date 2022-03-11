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
    public static class GetAllGroupsInAD
    {
        [FunctionName("GetAllGroupsInAD")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
          
          var client = GraphHelper.GetGraphClient();

          var groups = await client.Groups.Request().GetAsync();


            //https://graph.microsoft.com/v1.0/planner/plans/{plan-id}/buckets

          // var buckets = await client.Planner.Plans["idofplan"].Buckets.Request().GetAsync();


            return new OkObjectResult(groups);
        }
    }
}
