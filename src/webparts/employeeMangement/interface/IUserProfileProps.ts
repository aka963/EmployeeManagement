import { IUserProfile } from '../../services/interface/IUserProfile';
import { IPersonaSharedProps } from 'office-ui-fabric-react/lib/Persona';

export interface IUserProfileProps {
    selectedLink?: string;
    userProfile?: IUserProfile;
    personaDetails?: IPersonaSharedProps;
}
