import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IUserProfile } from '../../services/interface/IUserProfile';

export interface IEmployeeMangementProps {
  description: string;
  currentSPContext: WebPartContext;
  loggedInUserDetails: IUserProfile;
  sharedData?: any;
  onResponseFromLeftNav?: (data: string) => void;
  onFormValidationChange?: (isValid: boolean, data: any, strFormName: string) => void;
}
