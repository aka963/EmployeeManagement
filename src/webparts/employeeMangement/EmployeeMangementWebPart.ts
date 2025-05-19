import '../services/utilities/customTheme';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'EmployeeMangementWebPartStrings';
import EmployeeMangement from './components/EmployeeMangement';
import { IEmployeeMangementProps } from './components/IEmployeeMangementProps';
import { IUserProfile } from '../services/interface/IUserProfile';
import upOps from '../services/bal/UserProfileOps';

export interface IEmployeeMangementWebPartProps {
  description: string;
}

export default class EmployeeMangementWebPart extends BaseClientSideWebPart<IEmployeeMangementWebPartProps> {
  private userProfile: IUserProfile;

  public async render(): Promise<void> {
    const systemUserKey: string = this.context.pageContext.legacyPageContext.systemUserKey;
    const loggedInUserProfile: IUserProfile =  await upOps.getUserProfileByUserName(systemUserKey, {
      description: this.properties.description,
      currentSPContext: this.context,
      loggedInUserDetails: this.userProfile
    });

    const element: React.ReactElement<IEmployeeMangementProps> = React.createElement(
      EmployeeMangement,
      {
        description: this.properties.description,
        currentSPContext: this.context,
        loggedInUserDetails: loggedInUserProfile
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
