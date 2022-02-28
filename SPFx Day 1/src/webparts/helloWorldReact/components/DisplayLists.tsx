import { ListViewCommandSetContext } from '@microsoft/sp-listview-extensibility';
import { DetailsList } from 'office-ui-fabric-react';
import * as React from 'react';

export interface IDisplayListsProps {
    lists: string[];
    title: string;
}

export const DisplayLists: React.FunctionComponent<IDisplayListsProps> = (props: React.PropsWithChildren<IDisplayListsProps>) => {
    //   const [value, setValue] = React.useState('');

    return (
        <>

            <h1>{props.title}</h1>
            {props.lists.map(l => {
                return <div>{l}</div>
            })}
           
        </>
    );
};