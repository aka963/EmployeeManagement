import * as React from 'react';
import styles from '../../EmployeeMangement.module.scss';
import { IEmployeeMangementProps } from '../../IEmployeeMangementProps';
import { IUserProfileProps } from '../../../interface/IUserProfileProps';
import { IUserProfile } from '../../../../services/interface/IUserProfile';

import Moment from 'react-moment';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Label } from 'office-ui-fabric-react/lib/Label';

export default class Promotion extends React.Component<IEmployeeMangementProps, IUserProfileProps> {
    public userProfile: IUserProfile;
    constructor(props: IEmployeeMangementProps) {
        super(props);
        this.userProfile = props.sharedData;
        this.state = { userProfile: props.sharedData };
    }

    public render(): React.ReactElement<IEmployeeMangementProps> {
        const {
            description,
            currentSPContext
        } = this.props;

        return (
            <div className='col-xs-10 col-sm-11 col-md-11 col-lg-11'>
                <div className='profile-body'>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                            <div className='widget-card full-height'>
                                <div className='widget-card-head'>
                                    <span className='widget-card-head-icon'>
                                        <Icon iconName='FinancialSolid' />
                                    </span>
                                    <h2 className='widget-card-head-title'>PROGRESS</h2>
                                </div>
                                <div className='widget-card-body'>
                                    <div className='row'>
                                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                            <div className='row'>
                                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                                    <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3 profile-body-item'>
                                                        <Label>DOJ:&nbsp;</Label>
                                                        {(this.state.userProfile.DateOfJoining !== undefined && this.state.userProfile.DateOfJoining !== null) ? <Moment format='DD MMM YYYY'>{new Date(this.state.userProfile.DateOfJoining).toLocaleDateString()}</Moment> : ''}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3 profile-body-item'>
                                                        <Label>Probation Period:&nbsp;</Label>
                                                        {this.state.userProfile.ProbationPeriod}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3 profile-body-item'>
                                                        <Label>Date of Confirmation:&nbsp;</Label>
                                                        {(this.state.userProfile.DateOfConfirmation !== undefined && this.state.userProfile.DateOfConfirmation !== null) ? <Moment format='DD MMM YYYY'>{new Date(this.state.userProfile.DateOfConfirmation).toLocaleDateString()}</Moment> : ''}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3 profile-body-item'>
                                                        <Label>LTC Date:&nbsp;</Label>
                                                        {(this.state.userProfile.LTCDate !== undefined && this.state.userProfile.LTCDate !== null) ? <Moment format='DD MMM YYYY'>{new Date(this.state.userProfile.LTCDate).toLocaleDateString()}</Moment> : ''}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3 profile-body-item'>
                                                        <Label>Date of Relieving:&nbsp;</Label>
                                                        {(this.state.userProfile.Date_x0020_Of_x0020_Resign !== undefined && this.state.userProfile.Date_x0020_Of_x0020_Resign !== null) ? <Moment format='DD MMM YYYY'>{new Date(this.state.userProfile.Date_x0020_Of_x0020_Resign).toLocaleDateString()}</Moment> : ''}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3 profile-body-item'>
                                                        <Label>Date of Retirement:&nbsp;</Label>
                                                        {(this.state.userProfile.Date_x0020_Of_x0020_Resign_x0020 !== undefined && this.state.userProfile.Date_x0020_Of_x0020_Resign_x0020 !== null) ? <Moment format='DD MMM YYYY'>{new Date(this.state.userProfile.Date_x0020_Of_x0020_Resign_x0020).toLocaleDateString()}</Moment> : ''}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3 profile-body-item'>
                                                        <Label>ESI Joining Date:&nbsp;</Label>
                                                        {(this.state.userProfile.ESI_x0020_JoiningDate !== undefined && this.state.userProfile.ESI_x0020_JoiningDate !== null) ? <Moment format='DD MMM YYYY'>{new Date(this.state.userProfile.ESI_x0020_JoiningDate).toLocaleDateString()}</Moment> : ''}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3 profile-body-item'>
                                                        <Label>ESI Leaving Date:&nbsp;</Label>
                                                        {(this.state.userProfile.ESI_x0020_LeavingDate !== undefined && this.state.userProfile.ESI_x0020_LeavingDate !== null) ? <Moment format='DD MMM YYYY'>{new Date(this.state.userProfile.ESI_x0020_LeavingDate).toLocaleDateString()}</Moment> : ''}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3 profile-body-item'>
                                                        <Label>Date of Appointment:&nbsp;</Label>
                                                        {(this.state.userProfile.DateofAppointment !== undefined && this.state.userProfile.DateofAppointment !== null) ? <Moment format='DD MMM YYYY'>{new Date(this.state.userProfile.DateofAppointment).toLocaleDateString()}</Moment> : ''}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3 profile-body-item'>
                                                        <Label>Designation (Joined as):&nbsp;</Label>
                                                        {this.state.userProfile.DesignationJoinedAs}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3 profile-body-item'>
                                                        <Label>Appointment Date:&nbsp;</Label>
                                                        {(this.state.userProfile.AppointmentDate !== undefined && this.state.userProfile.AppointmentDate !== null) ? <Moment format='DD MMM YYYY'>{new Date(this.state.userProfile.AppointmentDate).toLocaleDateString()}</Moment> : ''}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3 profile-body-item'>
                                                        <Label>Designation (Appointed as):&nbsp;</Label>
                                                        {this.state.userProfile.DesignationAppointedAs}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3 profile-body-item'>
                                                        <Label>Confirmation Date:&nbsp;</Label>
                                                        {(this.state.userProfile.ConfirmationDate !== undefined && this.state.userProfile.ConfirmationDate !== null) ? <Moment format='DD MMM YYYY'>{new Date(this.state.userProfile.ConfirmationDate).toLocaleDateString()}</Moment> : ''}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3 profile-body-item'>
                                                        <Label>Promotion (Grade / Scale):&nbsp;</Label>
                                                        {this.state.userProfile.PromotionScale}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3 profile-body-item'>
                                                        <Label>Promotion Effective Date:&nbsp;</Label>
                                                        {(this.state.userProfile.PromotionEffectiveDate !== undefined && this.state.userProfile.PromotionEffectiveDate !== null) ? <Moment format='DD MMM YYYY'>{new Date(this.state.userProfile.PromotionEffectiveDate).toLocaleDateString()}</Moment> : ''}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3 profile-body-item'>
                                                        <Label>Designation Promoted To:&nbsp;</Label>
                                                        {(this.state.userProfile.DesignationPromotedTo !== undefined && this.state.userProfile.DesignationPromotedTo !== null) ? this.state.userProfile.DesignationPromotedTo.Title : ''}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3 profile-body-item'>
                                                        <Label>Promotion Confirmation Date:&nbsp;</Label>
                                                        {(this.state.userProfile.PromotionConfirmationDate !== undefined && this.state.userProfile.PromotionConfirmationDate !== null) ? <Moment format='DD MMM YYYY'>{new Date(this.state.userProfile.PromotionConfirmationDate).toLocaleDateString()}</Moment> : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}