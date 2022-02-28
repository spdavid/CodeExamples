import { ListViewCommandSetContext } from "@microsoft/sp-listview-extensibility";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import {
    SPHttpClient,
    SPHttpClientResponse
} from '@microsoft/sp-http';

import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/items";
import "@pnp/sp/lists";


export default class spService {

    public static async GetLists(ctx: WebPartContext | ListViewCommandSetContext): Promise<any[]> {
        var response = await ctx.spHttpClient.get("/_api/web/lists", SPHttpClient.configurations.v1);

        console.log(response);
        if (response.ok) {
            var data = await response.json();
            console.log(data);
            return data.value;
        }
        else {
            //error handling here
        }
    }

    public static async calculate(itemId: number) {
        var calculatorlist = sp.web.lists.getByTitle("Calculator");
        var item = await calculatorlist.items.getById(itemId).get();
        var result = item.Number1 + item.Number2;
        await calculatorlist.items.getById(itemId).update({ Result: result });
    }



}
