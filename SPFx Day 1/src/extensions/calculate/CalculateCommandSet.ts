import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';
import spService from '../../services/spService'; 
import { sp } from "@pnp/sp/presets/all";

import * as strings from 'CalculateCommandSetStrings';


/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICalculateCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;
}

const LOG_SOURCE: string = 'CalculateCommandSet';

export default class CalculateCommandSet extends BaseListViewCommandSet<ICalculateCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized CalculateCommandSet');
    sp.setup({
      spfxContext: this.context,
    });
    return Promise.resolve();
 
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {

    console.log(event);

    const compareTwoCommand: Command = this.tryGetCommand('COMMAND_2');
    if (compareTwoCommand) {
      compareTwoCommand.visible = false;

      if (event.selectedRows.length === 1)
      {
        if (event.selectedRows[0].getValueByName("Title") == "test")
        {
          compareTwoCommand.visible = true;

        }
      }

    }



    const compareOneCommand: Command = this.tryGetCommand('COMMAND_1');
    if (compareOneCommand) {
      // This command should be hidden unless exactly one row is selected.
      
      compareOneCommand.visible = event.selectedRows.length >= 1;
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'COMMAND_1':
        console.log("updating items");
        event.selectedRows.forEach(row => {
        console.log(row);

           spService.calculate(row.getValueByName("ID"));
        });
        break;
      case 'COMMAND_2':
      var ID = event.selectedRows[0].getValueByName("ID");
        Dialog.alert(`You have selected item with id : ${ID}`);
        this.getLists();
        break;
      default:
        throw new Error('Unknown command');
    }
  

  }

  public async getLists()
  {
    var lists = await spService.GetLists(this.context);
    console.log(lists);
  }
}
