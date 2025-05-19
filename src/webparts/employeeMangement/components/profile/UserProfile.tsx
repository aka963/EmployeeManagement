import * as React from 'react';
import styles from '../EmployeeMangement.module.scss';
import { IEmployeeMangementProps } from '../IEmployeeMangementProps';

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Link } from 'office-ui-fabric-react/lib/Link';
import Moment from 'react-moment';

import upOps from '../../../services/bal/UserProfileOps';
import Helper from '../../../services/utilities/Helper';

import { IUserProfileProps } from '../../interface/IUserProfileProps';
import { IUserProfile } from '../../../services/interface/IUserProfile';
import { IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { TooltipHost, TooltipDelay, DirectionalHint } from 'office-ui-fabric-react/lib/Tooltip';
import LeftNavigation from '../navigation/LeftNavigation';
import General from './General';
import Address from './Address';
import Qualification from './Qualification';
import Dependent from './Dependent';
import Experience from './Experience';
import Promotion from './Promotion';
import PostingHistory from './PostingHistory';

export default class UserProfile extends React.Component<IEmployeeMangementProps, IUserProfileProps> {
    public userProfile: IUserProfile;
    public personaDetails: IPersonaSharedProps;

    constructor(props: IEmployeeMangementProps) {
        super(props);
        const currNav: string = window.location.hash;
        if (currNav.split('/')[2]) {
            this.state = { selectedLink: currNav.split('/')[2], userProfile: this.userProfile, personaDetails: this.personaDetails };
        }
        else {
            this.state = { selectedLink: 'General', userProfile: this.userProfile, personaDetails: this.personaDetails };
        }
        this.responseFromLeftNav = this.responseFromLeftNav.bind(this);
    }

    public async componentDidMount(): Promise<void> {
        const systemUserKey: string = this.props.currentSPContext.pageContext.legacyPageContext.systemUserKey;
        await upOps.getUserProfileByUserName(systemUserKey, this.props).then((resp) => {
            this.setState({
                userProfile: resp, personaDetails: {
                    imageUrl: resp.ProfileImage.Url
                    , imageInitials: (resp.FirstName.substring(0, 1) + ' ' + resp.LastName.substring(0, 1))
                    , text: resp.EmployeeTitle + '. ' + resp.EmployeeName, secondaryText: resp.Designation.Title, tertiaryText: resp.SubGroup[0].GroupName + ' - ' + resp.Role
                    , optionalText: 'Ext: ' + resp.Extension
                }
            });
        }).catch((e) => {
            console.log(e);
        });
    }

    private responseFromLeftNav(selLink: string): void {
        this.setState({ selectedLink: selLink });
    }

    public render(): React.ReactElement<IEmployeeMangementProps> {
        const {
            description,
            currentSPContext
        } = this.props;

        return (
            <div className='widget-card'>
                <div className='widget-card-head'>
                    <span className='widget-card-head-icon'>
                        <Icon iconName='ContactInfo' />
                    </span>
                    <h2 className='widget-card-head-title'>MY PROFILE</h2>
                    <span className='widget-card-head-btn'>
                        <PrimaryButton data-automation-id='btn-update-profile' iconProps={{ iconName: 'EditContact' }}
                            text='Update Profile' onClick={() => { window.location.href = '#/updateUserProfile'; }} />
                    </span>
                </div>
                <div className='widget-card-body'>
                    <div>
                        {/* <div className='ms-Grid'> */}
                        <div className='row'>
                            <div className='col-xs-2 col-sm-1 col-md-1 col-lg-1'>
                                <LeftNavigation {...this.props} onResponseFromLeftNav={this.responseFromLeftNav } />
                            </div>
                            {(this.state.userProfile !== undefined && this.state.selectedLink === 'General') ?
                                <General {...this.props} sharedData={this.state.userProfile} /> : ''
                            }
                            {(this.state.userProfile !== undefined && this.state.selectedLink === 'Address') ?
                                <Address {...this.props} sharedData={this.state.userProfile.AddressMaster} /> : ''
                            }
                            {(this.state.userProfile !== undefined && this.state.selectedLink === 'Education') ?
                                <Qualification {...this.props} sharedData={this.state.userProfile.QualificationMaster} /> : ''
                            }
                            {(this.state.userProfile !== undefined && this.state.selectedLink === 'Dependants') ?
                                <Dependent {...this.props} sharedData={this.state.userProfile.DependentMaster} /> : ''
                            }
                            {(this.state.userProfile !== undefined && this.state.selectedLink === 'Experience') ?
                                <Experience {...this.props} sharedData={this.state.userProfile.ExperienceDetails} /> : ''
                            }
                            {(this.state.userProfile !== undefined && this.state.selectedLink === 'Promotions') ?
                                <Promotion {...this.props} sharedData={this.state.userProfile} /> : ''
                            }
                            {(this.state.userProfile !== undefined && this.state.selectedLink === 'Posting') ?
                                <PostingHistory {...this.props} sharedData={this.state.userProfile.PostingHistory} /> : ''
                            }
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div >
        );
    }
}

