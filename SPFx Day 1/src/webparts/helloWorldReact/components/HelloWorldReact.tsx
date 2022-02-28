import * as React from 'react';
import styles from './HelloWorldReact.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { DisplayLists } from './DisplayLists';
import spService from '../../../services/spService';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { PrimaryButton, Panel, IDropdownOption, Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react';

export interface IHelloWorldReactProps {
  description: string;
  ctx: WebPartContext
}

export const HelloWorldReact: React.FunctionComponent<IHelloWorldReactProps> = (props: React.PropsWithChildren<IHelloWorldReactProps>) => {
  const [lists, setLists] = React.useState<string[]>([]);
  const [showPanel, setShowPanel] = React.useState<boolean>(false);


  const options: IDropdownOption[] = [
    { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
    { key: 'apple', text: 'Apple' },
    { key: 'banana', text: 'Banana' },
    { key: 'orange', text: 'Orange', disabled: true },
    { key: 'grape', text: 'Grape' },
    { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
    { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
    { key: 'broccoli', text: 'Broccoli' },
    { key: 'carrot', text: 'Carrot' },
    { key: 'lettuce', text: 'Lettuce' },
  ];

  // same as function GetLists()
  const GetLists = async () => {
    var fetchedLists = await spService.GetLists(props.ctx);

    console.log(fetchedLists);

    var listTitles = [];

    // fetchedLists.forEach(list => {
    //   listTitles.push(list.Title);
    // });

    listTitles = fetchedLists.map(list => { return list.Title });

    setLists(listTitles);
  }

  // This only runs ones after the first render
  React.useEffect(() => {
    GetLists();
  }, []);


  // render html to the page
  return (
    <>
      <div className={styles.title}>Hello World</div>
      <div>
        <PrimaryButton text="Open Panel" onClick={() => { setShowPanel(true) }} allowDisabledFocus />

        <Panel
          headerText="Sample panel"
          isOpen={showPanel}
          onDismiss={() => { setShowPanel(false) }}
          // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
          closeButtonAriaLabel="Close"
        >
          <p>Content goes here.</p>
          <Dropdown label='Fruit' options={options}></Dropdown>


        </Panel>


        <DisplayLists title='My Lists' lists={lists} />

      </div>
    </>
  );
};
