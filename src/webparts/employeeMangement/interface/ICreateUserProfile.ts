import { IUserProfile, IUserProfileLoadData } from '../../services/interface/IUserProfile';

export interface ICreateUserProfile {
    selectedLink?: string;
    userProfile?: IUserProfile;
    userProfileLoadData?: IUserProfileLoadData;
    isGeneralFormValid?: boolean;
    isAddressFormValid?: boolean;
    isEducationFormValid?: boolean;
    isDependantsFormValid?: boolean;
    isExperienceFormValid?: boolean;
    isPromotionsFormValid?: boolean;
    isPostingFormValid?: boolean;
}