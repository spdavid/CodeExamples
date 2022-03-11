using System;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace Sample
{
    public class QueueTriggerExample
    {
        [FunctionName("QueueTriggerExample")]
        public void Run([QueueTrigger("myqueue", Connection = "DataStorage")]string message, ILogger log)
        {
            log.LogInformation($"C# Queue trigger function processed: {message}");

            throw new Exception("something went wrong. ");
        }
    }
}
