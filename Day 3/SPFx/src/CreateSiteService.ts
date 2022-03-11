import { WebPartContext } from "@microsoft/sp-webpart-base";
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/presets/all";
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types"
import {
    AadHttpClient
} from '@microsoft/sp-http';

// const funcUrl = "https://functiontestday2.azurewebsites.net";
const funcUrl = "http://localhost:7071";

export interface ISiteInfo {
    name: string;
    alias: string;
    owner: string;
}


export class CreateSiteService {

    public static SubmitSite(info: ISiteInfo, ctx: WebPartContext) {
        // CreateSiteService.SaveToSharePoint(info, ctx);
        // CreateSiteService.CreateSiteViaGraph(info, ctx);
         CreateSiteService.CreateSiteViaFucntions(info, ctx);

    }

    public static async SaveToSharePoint(info: ISiteInfo, ctx: WebPartContext) {
        const sp = spfi().using(SPFx(ctx));

        // let items = await sp.web.lists.getByTitle("SiteRequest").items();
        // console.log(items);

        let user = await sp.web.ensureUser(info.owner);
        // console.log(user);
        let props = {
            "Title": info.name,
            "Alias": info.alias,
            "OwnerId": user.data.Id
        }
        await sp.web.lists.getByTitle("SiteRequest").items.add(props);
    }

    public static async CreateSiteViaGraph(info: ISiteInfo, ctx: WebPartContext) {
        var group = {
            "description": info.name,
            "displayName": info.name,
            "groupTypes": [
                "Unified"
            ],
            "mailEnabled": true,
            "mailNickname": info.alias,
            "securityEnabled": false
        }


        var graphClient = await ctx.msGraphClientFactory.getClient();
        var newGroup: MicrosoftGraph.Group = await graphClient.api("/groups").post(group);
        console.log(newGroup);

        var owner: MicrosoftGraph.User = await graphClient.api("/users/" + info.owner).get();

        const directoryObject = {
            '@odata.id': 'https://graph.microsoft.com/v1.0/users/' + owner.id
        };

        var addOwnerResponse = await graphClient.api(`/groups/${newGroup.id}/owners/$ref`)
            .post(directoryObject);

        console.log(addOwnerResponse);

    }

    public static async CreateSiteViaFucntions(info: ISiteInfo, ctx: WebPartContext) {
       let client = await ctx.aadHttpClientFactory.getClient("3223540a-df59-4574-aab3-2949ac870c1e")

       await client.post(funcUrl + "/api/HttpCreateGroup", AadHttpClient.configurations.v1, {
           body : JSON.stringify(info)
       })

    }


}