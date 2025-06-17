import * as React from 'react';
import styles from '../../EmployeeMangement.module.scss';
import { IEmployeeMangementProps } from '../../IEmployeeMangementProps';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import { ICreateUserProfile } from '../../../interface/ICreateUserProfile';

import * as yup from 'yup';

import LeftNavigation from '../../navigation/LeftNavigation';
import { IUserProfile, InitializedUserProfile } from '../../../../services/interface/IUserProfile';
import AddGeneralProfile from './AddGeneralProfile';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

import cupOps from '../../../../services/bal/CreateUserProfileOps';
import AddAddress from './AddAdress';
import AddQualification from './AddQualification';
import AddDependant from './AddDependant';
import AddExperience from './AddExperience';
import AddPromotion from './AddPromotion';
import AddPosting from './AddPosting';

export default class CreateUserProfile extends React.Component<IEmployeeMangementProps, ICreateUserProfile> {
    public userProfile: IUserProfile;
    constructor(props: IEmployeeMangementProps) {
        super(props);
        const currNav: string = window.location.hash;
        if (currNav.split('/')[2]) {
            this.state = {
                selectedLink: currNav.split('/')[2], userProfile: InitializedUserProfile
                , isGeneralFormValid: false
                , isAddressFormValid: false
                , isEducationFormValid: false
                , isDependantsFormValid: false
                , isExperienceFormValid: false
                , isPromotionsFormValid: false
                , isPostingFormValid: false
            };
        }
        else {
            this.state = {
                selectedLink: 'General', userProfile: InitializedUserProfile
                , isGeneralFormValid: false
                , isAddressFormValid: false
                , isEducationFormValid: false
                , isDependantsFormValid: false
                , isExperienceFormValid: false
                , isPromotionsFormValid: false
                , isPostingFormValid: false
            };
        }

        this.responseFromLeftNav = this.responseFromLeftNav.bind(this);
        this.formValidationChange = this.formValidationChange.bind(this);
    }

    private responseFromLeftNav(selLink: string): void {
        this.setState({ selectedLink: selLink });
    }

    private formValidationChange(isValid: boolean, empProfile: IUserProfile, strFormName: string): void {
        if (strFormName === 'General') {
            this.setState({ isGeneralFormValid: isValid })
        }
        if (strFormName === 'Address') {
            this.setState({ isAddressFormValid: isValid })
        }
        if (strFormName === 'Education') {
            this.setState({ isEducationFormValid: isValid })
        }
        if (strFormName === 'Dependants') {
            this.setState({ isDependantsFormValid: isValid })
        }
        if (strFormName === 'Experience') {
            this.setState({ isExperienceFormValid: isValid })
        }
        if (strFormName === 'Promotions') {
            this.setState({ isPromotionsFormValid: isValid })
        }
        if (strFormName === 'Posting') {
            this.setState({ isPostingFormValid: isValid })
        }

        this.setState({
            userProfile: {
                ...empProfile
                , SubGroupId: { results: empProfile.SubGroupId as [] }
                , WeeklyOff: empProfile.WeeklyOff.toString().replace(/,/g, '')
            }
        }, () => {
            console.log({
                isGeneralFormValid: this.state.isGeneralFormValid
                , isAddressFormValid: this.state.isAddressFormValid
                , isEducationFormValid: this.state.isEducationFormValid
                , isDependantsFormValid: this.state.isDependantsFormValid
                , isExperienceFormValid: this.state.isExperienceFormValid
                , isPromotionsFormValid: this.state.isPromotionsFormValid
                , isPostingFormValid: this.state.isPostingFormValid
                , userProfile: this.state.userProfile
            });
        });
    }

    public componentDidMount(): void {
        cupOps.getUserProfileDataOnLoad(this.props).then((resp) => {
            this.setState({ userProfileLoadData: resp });
            // console.log(resp);
        });
    }

    private onProfileSubmit(): void {
        console.log(this.state.isGeneralFormValid);
        if (this.state.isGeneralFormValid) {
            console.log('Submitted values:', this.state.userProfile);
            // window.location.href = '#/myprofile/General';
        }
        // actions.setSubmitting(false);
    }

    public render(): React.ReactElement<IEmployeeMangementProps> {
        const {
            description,
            currentSPContext
        } = this.props;

        const validate = yup.object().shape({});

        return (
            <div className='container-fluid'>
                <div className='widget-card'>
                    <div className='widget-card-head'>
                        <span className='widget-card-head-icon'>
                            <Icon iconName='AddFriend' />
                        </span>
                        <h2 className='widget-card-head-title'>ADD PROFILE</h2>
                    </div>
                    <div className='widget-card-body'>
                        <div className='row'>
                            <div className='col-xs-2 col-sm-1 col-md-1 col-lg-1'>
                                <LeftNavigation {...this.props} onResponseFromLeftNav={this.responseFromLeftNav} />
                            </div>
                            <div className='col-xs-10 col-sm-11 col-md-11 col-lg-11'>
                                {(this.state.selectedLink === 'General' && this.state.userProfileLoadData) ?
                                    <AddGeneralProfile {...this.props} sharedData={{ userProfile: this.state.userProfile, userProfileLoadData: this.state.userProfileLoadData }} onFormValidationChange={this.formValidationChange} /> : ''
                                }
                                {(this.state.selectedLink === 'Address' && this.state.userProfileLoadData) ?
                                    <AddAddress {...this.props} sharedData={{ userProfile: this.state.userProfile, userProfileLoadData: this.state.userProfileLoadData }} onFormValidationChange={this.formValidationChange} /> : ''
                                }
                                {(this.state.selectedLink === 'Education' && this.state.userProfileLoadData) ?
                                    <AddQualification {...this.props} sharedData={{ userProfile: this.state.userProfile, userProfileLoadData: this.state.userProfileLoadData }} onFormValidationChange={this.formValidationChange} /> : ''
                                }
                                {(this.state.selectedLink === 'Dependants' && this.state.userProfileLoadData) ?
                                    <AddDependant {...this.props} sharedData={{ userProfile: this.state.userProfile, userProfileLoadData: this.state.userProfileLoadData }} onFormValidationChange={this.formValidationChange} /> : ''
                                }
                                {(this.state.selectedLink === 'Experience' && this.state.userProfileLoadData) ?
                                    <AddExperience {...this.props} sharedData={{ userProfile: this.state.userProfile, userProfileLoadData: this.state.userProfileLoadData }} onFormValidationChange={this.formValidationChange} /> : ''
                                }
                                {(this.state.selectedLink === 'Promotions' && this.state.userProfileLoadData) ?
                                    <AddPromotion {...this.props} sharedData={{ userProfile: this.state.userProfile, userProfileLoadData: this.state.userProfileLoadData }} onFormValidationChange={this.formValidationChange} /> : ''
                                }
                                {(this.state.selectedLink === 'Posting' && this.state.userProfileLoadData) ?
                                    <AddPosting {...this.props} sharedData={{ userProfile: this.state.userProfile, userProfileLoadData: this.state.userProfileLoadData }} onFormValidationChange={this.formValidationChange} /> : ''
                                }
                                {(this.state.isGeneralFormValid && this.state.isAddressFormValid && this.state.isEducationFormValid && this.state.isDependantsFormValid
                                    && this.state.isExperienceFormValid && this.state.isPromotionsFormValid && this.state.isPostingFormValid) && (
                                        <div className='widget-card-body' style={{ height: 'auto' }}>
                                            <div className='row'>
                                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12' style={{ textAlign: 'center' }}>
                                                    <PrimaryButton type='button' data-automation-id='btn-save-profile' iconProps={{ iconName: 'Save' }}
                                                        text='Submit Profile' onClick={() => { this.onProfileSubmit() }} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}