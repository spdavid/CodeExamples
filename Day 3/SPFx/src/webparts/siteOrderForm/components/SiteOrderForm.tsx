import * as React from 'react';
import styles from './SiteOrderForm.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
import { TextField } from '@fluentui/react/lib/TextField';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { ISiteInfo, CreateSiteService } from '../../../CreateSiteService';

export interface ISiteOrderFormProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  ctx: WebPartContext;
}

const stackTokens = { childrenGap: 50 };
const stackTokensButtons = { childrenGap: 40 };

const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

export const SiteOrderForm: React.FunctionComponent<ISiteOrderFormProps> = (props: React.PropsWithChildren<ISiteOrderFormProps>) => {
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);

  const [aliasError, setAliasError] = React.useState("");

  const siteInfo = React.useRef<ISiteInfo>({ name: "", alias: "", owner: "AdeleV@democompass.onmicrosoft.com" });

  const validateForm = () => {
    let isValidForm = true;
    if (siteInfo.current.name != "" && siteInfo.current.alias != "") {

    }
    else {
      isValidForm = false;
    }

    if (siteInfo.current.alias.indexOf(" ") != -1) {
      setAliasError("Alias cannot contain spaces");
      isValidForm = false;
    }
    else {
      setAliasError("");
    }
    setIsValid(isValidForm);
  }

  const UpdateSiteName = (newval: string) => {
    siteInfo.current.name = newval;
    validateForm();
  }

  const UpdateAlias = (newval: string) => {
    siteInfo.current.alias = newval;
    validateForm();
  }

  const SubmitForm = () => {
    CreateSiteService.SubmitSite(siteInfo.current, props.ctx);
    setIsSubmitted(true);
  }

  return (
    <>
      <Stack horizontal tokens={stackTokens} styles={stackStyles}>
        <Stack {...columnProps}>
          <TextField onChange={(ev, newvalue) => { UpdateSiteName(newvalue) }} label="Site Name" />
          <TextField onChange={(ev, newvalue) => { UpdateAlias(newvalue) }} label="Alias" errorMessage={aliasError} />
          {/* <PeoplePicker
            context={props.ctx}
            titleText="Owner"
            personSelectionLimit={1}
            showtooltip={true}
           // onChange={this._getPeoplePickerItems}
            principalTypes={[PrincipalType.User]}
            resolveDelay={1000} /> */}
          {!isSubmitted ?
            (<Stack horizontal tokens={stackTokensButtons}>
              <DefaultButton text="Cancel" />
              <PrimaryButton text="Create Site" disabled={!isValid} onClick={SubmitForm} />
            </Stack>)
            : (
              <div>thank you</div>
            )
          }
        </Stack>
      </Stack>
    </>
  );
};
