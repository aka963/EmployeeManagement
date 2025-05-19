import { IUserProfile, IUserProfileLoadData } from '../../services/interface/IUserProfile';

export interface ICreateUserProfile {
    selectedLink?: string;
    userProfile?: IUserProfile;
    userProfileLoadData?: IUserProfileLoadData
}