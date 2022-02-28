import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown

} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloWorldWebPart.module.scss';
import * as strings from 'HelloWorldWebPartStrings';
import spService from '../../services/spService';

export interface IHelloWorldWebPartProps {
  description: string;
  color: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {


  public async getLists()
  {
    var lists = await spService.GetLists(this.context);
    console.log(lists);
  }

  public render(): void {
    this.getLists();
    var str = "asdfasdfas dfasdfas dfasdfasdf";

    var str2 = 'asdfasdfasdfa${styles.helloWorld}sdfasdf';

    var str3 = `aasdf
    asdf${this.properties.color}asdfasdf
    asdfasdfasdf
    asdfasdf`;

    this.domElement.innerHTML = `
      <div class="${styles.helloWorld}">
        <div class="${styles.container}">
          <div class="${styles.row}">
            <div class="${styles.column}">
              <span class="${styles.title}">Welcome tosdfgsdfg sdfsdfsdf World!</span>
              <p class="${styles.subTitle}">Customize ssss experiences using Web Parts.</p>
              <p class="${styles.description}">${escape(this.properties.color)}</p>
              <a href="https://aka.ms/spfx" class="${styles.button}">
                <span class="${styles.label}">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: "Custom Group",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }
                ),
                PropertyPaneDropdown('color', {
                  label: "Select a color",
                  options: [
                    {
                      key: "green",
                      text: "green"
                    },
                    {
                      key: "yellow",
                      text: "yellow"
                    },
                    {
                      key: "blue",
                      text: "blue"
                    }

                  ]
                }
                )
              ]
            }
          ]
        }
      ]
    };
  }
}
