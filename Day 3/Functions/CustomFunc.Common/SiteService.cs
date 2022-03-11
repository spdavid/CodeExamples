using Microsoft.Graph;

public class SiteService
{

    public static void CreateSite(SiteInfo info)
    {
        var client = GraphHelper.GetGraphClient();

        var group = new Group
        {
            Description = info.name,
            DisplayName = info.name,
            GroupTypes = new List<String>()
            {
                "Unified"
            },
            MailEnabled = true,
            MailNickname = info.alias,
            SecurityEnabled = false
        };

        var newGroup = client.Groups
            .Request()
            .AddAsync(group).Result;
    }
}