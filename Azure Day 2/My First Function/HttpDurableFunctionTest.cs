using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using System.Collections.Generic;
using System.Threading;

namespace Sample
{

    public class IPerson
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
    }

    public static class HttpDurableFunctionTest
    {
        [FunctionName("HttpDurableFunctionTest")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log,
            [DurableClient] IDurableOrchestrationClient starter)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string instanceId = await starter.StartNewAsync("DurablFunctionSequence");

            return starter.CreateCheckStatusResponse(req, instanceId);
        }


        [FunctionName("DurablFunctionSequence")]
        public static async Task<List<string>> DurablFunctionSequence(
       [OrchestrationTrigger] IDurableOrchestrationContext context)
        {
            var names = new List<string>();

            var retry = Environment.GetEnvironmentVariable("retryCount");
            RetryOptions options = new RetryOptions(TimeSpan.FromSeconds(10), int.Parse(retry));

            context.SetCustomStatus("person1");
            var p1 = new IPerson() { firstName = "David", lastName = "Opdendries" };
            var name1 = (await context.CallActivityWithRetryAsync<string>("AddNamesTogetherTask", options, p1));
            names.Add(name1);


            context.SetCustomStatus("person2");
            var p2 = new IPerson() { firstName = "David2", lastName = "Opdendries" };
            var name2 = (await context.CallActivityWithRetryAsync<string>("AddNamesTogetherTask", options, p2));
            names.Add(name2);

            context.SetCustomStatus("person3");
            var p3 = new IPerson() { firstName = "David3", lastName = "Opdendries" };
            var name3 = (await context.CallActivityWithRetryAsync<string>("AddNamesTogetherTask", options, p3));
            names.Add(name3);

            context.SetCustomStatus("person4");
            var p4 = new IPerson() { firstName = "David4", lastName = "Opdendries" };
            var name4 = (await context.CallActivityWithRetryAsync<string>("AddNamesTogetherTask", options, p4));
            names.Add(name4);

            return names;
        }


        [FunctionName("AddNamesTogetherTask")]
        public static string AddNamesTogetherTask([ActivityTrigger] IPerson person)
        {
            Thread.Sleep(5000);
            return person.firstName + " " + person.lastName;

        }

    }
}
