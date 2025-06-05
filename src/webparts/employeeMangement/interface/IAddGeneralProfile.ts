import { IUserProfile, IUserProfileLoadData } from '../../services/interface/IUserProfile';

export interface IAddGeneralProfile {
    selectedLink?: string;
    userProfile?: IUserProfile;
    userProfileLoadData?: IUserProfileLoadData;
}