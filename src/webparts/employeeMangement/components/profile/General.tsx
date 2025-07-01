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

export default class General extends React.Component<IEmployeeMangementProps, IUserProfileProps> {
    public userProfile: IUserProfile;
    public personaDetails: IPersonaSharedProps;

    constructor(props: IEmployeeMangementProps) {
        super(props);
        this.userProfile = props.sharedData;
        this.personaDetails = {
            imageUrl: this.userProfile.ProfileImage ? this.userProfile.ProfileImage.Url : '/_layouts/15/userphoto.aspx?size=L&username=' + this.userProfile.UserName.LoginName
            , imageInitials: (this.userProfile.FirstName.substring(0, 1) + ' ' + this.userProfile.LastName.substring(0, 1))
            , text: this.userProfile.EmployeeTitle + '. ' + this.userProfile.EmployeeName, secondaryText: this.userProfile.Designation.Title
            , tertiaryText: this.userProfile.SubGroup[0].GroupName + ' - ' + this.userProfile.Role
            , optionalText: 'Ext: ' + this.userProfile.Extension
        }
        this.state = { userProfile: props.sharedData, personaDetails: this.personaDetails };
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
                        <div className='col-sm-12 col-md-6 col-lg-6' style={{ paddingBottom: '15px', paddingRight: '8px' }}>
                            <div className='widget-card full-height'>
                                <div className='widget-card-head'>
                                    <span className='widget-card-head-icon'>
                                        <Icon iconName='WorkforceManagement' />
                                    </span>
                                    <h2 className='widget-card-head-title'>OFFICIAL</h2>
                                </div>
                                <div className='widget-card-body'>
                                    <div className='row'>
                                        <div className='col-sm-12 col-md-12 col-lg-12'>
                                            <div className='row'>
                                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-8 profile-body-summary'>
                                                    <Persona {...this.state.personaDetails} size={PersonaSize.size100} className='persona-Icon' />
                                                </div>
                                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-4 profile-body-summary-display'>
                                                    <div className='row'>
                                                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 profile-body-item'>
                                                            <Label>ID:&nbsp;</Label>
                                                            {this.state.userProfile.Title}
                                                        </div>
                                                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 profile-body-item'>
                                                            <Label>Username:&nbsp;</Label>
                                                            {this.state.userProfile.UserName.UserId.NameId}
                                                        </div>
                                                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 profile-body-item'>
                                                            <Label>Type:&nbsp;</Label>
                                                            {this.state.userProfile.EmployeeType.Title}
                                                        </div>
                                                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 profile-body-item'>
                                                            <Label>DOJ:&nbsp;</Label>
                                                            {(this.state.userProfile.DateOfJoining !== undefined && this.state.userProfile.DateOfJoining !== null) ? <Moment format='DD MMM YYYY'>{new Date(this.state.userProfile.DateOfJoining).toLocaleDateString()}</Moment> : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-sm-12 col-md-12 col-lg-12 customDivSeprator'></div>
                                            <div className='row'>
                                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                                    <div className='profile-body-summary-line-item-display'>
                                                        <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                            <Label>ID:&nbsp;</Label>
                                                            {this.state.userProfile.Title}
                                                        </div>
                                                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 profile-body-item'>
                                                            <Label>Username:&nbsp;</Label>
                                                            {this.state.userProfile.UserName.UserId.NameId}
                                                        </div>
                                                        <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                            <Label>Type:&nbsp;</Label>
                                                            {this.state.userProfile.EmployeeType.Title}
                                                        </div>
                                                        <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                            <Label>DOJ:&nbsp;</Label>
                                                            {(this.state.userProfile.DateOfJoining !== undefined && this.state.userProfile.DateOfJoining !== null) ? <Moment format='DD MMM YYYY'>{new Date(this.state.userProfile.DateOfJoining).toLocaleDateString()}</Moment> : ''}
                                                        </div>
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                        <Label>Middle Name:&nbsp;</Label>
                                                        {this.state.userProfile.MiddleName}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                        <Label>Corporate Email:&nbsp;</Label> {this.state.userProfile.CompanyEmail}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                        <Label>Alternate Email:&nbsp;</Label> {this.state.userProfile.AlternateEmail}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                        <Label>Phone No:&nbsp;</Label>
                                                        {this.state.userProfile.Phone_x0020_No}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                        <Label>Fax No:&nbsp;</Label>
                                                        {this.state.userProfile.FaxNo}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                        <Label>Shift Allocated:&nbsp;</Label>
                                                        {this.state.userProfile.ShiftAllocated.ShiftName}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                        <Label>Visiting Card (English):&nbsp;</Label>
                                                        {this.state.userProfile.VCDisplayNameEnglish}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                        <Label>Visiting Card (Hindi):&nbsp;</Label>
                                                        {this.state.userProfile.VCDisplayNameHindi}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                        <Label>OD Approver:&nbsp;</Label>
                                                        {this.state.userProfile.LeaveLevel2.Title}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                        <Label>Petty Cash Approver:&nbsp;</Label>
                                                        {this.state.userProfile.LeaveLevel2.Title}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                        <Label>Shift Allocated:&nbsp;</Label>
                                                        {this.state.userProfile.ShiftAllocated.ShiftName}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                        <Label>Shift Effective From:&nbsp;</Label>
                                                        {(this.state.userProfile.ShiftEffectiveFrom !== undefined) ? <Moment format='DD MMM YYYY'>{new Date(this.state.userProfile.ShiftEffectiveFrom).toLocaleDateString()}</Moment> : ''}
                                                    </div>
                                                    <div className='col-xs-12 col-sm-4 col-md-12 col-lg-12 profile-body-item'>
                                                        <Label style={{ verticalAlign: 'top' }}>Office Resident:&nbsp;</Label>
                                                        <div style={{ padding: '5px 0px' }} dangerouslySetInnerHTML={{ __html: Helper.getAddressByTpe(this.state.userProfile.AddressMaster, 'Office Resident') }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-sm-12 col-md-12 col-lg-12 customDivSeprator'></div>
                                            <div className='row'>
                                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                                    <div className='widget-card-head'>
                                                        <span className='widget-card-head-icon'>
                                                            <Icon iconName='AddTo' />
                                                        </span>
                                                        <h2 className='widget-card-head-title'>EMERGENCY CONTACT</h2>
                                                        {/* <span className='widget-card-right-icon'>
                                                                                <Link>
                                                                                    <Icon iconName='ContactCardSettings' />
                                                                                </Link>
                                                                            </span> */}
                                                    </div>
                                                    <div className='widget-card-body' style={{ paddingTop: '0px' }}>
                                                        <div className='row'>
                                                            <div className='col-sm-12 col-md-12 col-lg-12'>
                                                                <div className='row'>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-4 profile-body-line-item'>
                                                                        <Label>Name</Label>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-line-item'>
                                                                        <Label>Relationship</Label>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-line-item'>
                                                                        <Label>Blood Group</Label>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-2 profile-body-line-item'>
                                                                        <Label>Mobile</Label>
                                                                    </div>
                                                                </div>
                                                                {(this.state.userProfile.EmergencyContact.map((emgCont, n) => (
                                                                    <div>
                                                                        <TooltipHost
                                                                            calloutProps={{ gapSpace: 5 }}
                                                                            tooltipProps={{
                                                                                onRenderContent: () => {
                                                                                    return (
                                                                                        <div>
                                                                                            <ul style={{ margin: 0, padding: 0 }}>
                                                                                                <li><b>Present Address</b>: {emgCont.PresentAddress}</li>
                                                                                                <li><b>Permanent Address</b>: {emgCont.PermanentAddress}</li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    );
                                                                                }
                                                                            }}
                                                                            delay={TooltipDelay.zero}
                                                                            id={'emgContToolTip' + n}
                                                                            directionalHint={DirectionalHint.topAutoEdge}>
                                                                            <div className='row' aria-describedby={'emgContToolTip' + n}>
                                                                                <div className='col-xs-3 col-sm-3 col-md-3 col-lg-4 profile-body-line-item'>
                                                                                    {emgCont.Name1}
                                                                                </div>
                                                                                <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-line-item'>
                                                                                    {emgCont.Relationship1}
                                                                                </div>
                                                                                <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-line-item'>
                                                                                    {emgCont.BloodGroup}
                                                                                </div>
                                                                                <div className='col-xs-3 col-sm-3 col-md-3 col-lg-2 profile-body-line-item'>
                                                                                    {emgCont.EmergencyContactNumber1}
                                                                                </div>
                                                                            </div>
                                                                            <div className='row'>
                                                                                <div className='col-xs-3 col-sm-3 col-md-3 col-lg-4 profile-body-line-item'>
                                                                                    {emgCont.Name2}
                                                                                </div>
                                                                                <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-line-item'>
                                                                                    {emgCont.Relationship2}
                                                                                </div>
                                                                                <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-line-item'>

                                                                                </div>
                                                                                <div className='col-xs-3 col-sm-3 col-md-3 col-lg-2 profile-body-line-item'>
                                                                                    {emgCont.EmergencyContactNumber2}
                                                                                </div>
                                                                            </div>
                                                                        </TooltipHost>
                                                                    </div>
                                                                )))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-sm-12 col-md-12 col-lg-12 customDivSeprator'></div>
                                            <div className='row'>
                                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                                    <div className='widget-card-head'>
                                                        <span className='widget-card-head-icon'>
                                                            <Icon iconName='FavoriteStar' />
                                                        </span>
                                                        <h2 className='widget-card-head-title'>GRADE</h2>
                                                    </div>
                                                    <div className='widget-card-body' style={{ padding: '0px' }}>
                                                        <div className='row'>
                                                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                                                <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                                    <Label>Office Location:&nbsp;</Label> {this.state.userProfile.OfficeLocation.Title}
                                                                </div>
                                                                <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                                    <Label>Sacle:&nbsp;</Label> {this.state.userProfile.Scale.Title}
                                                                </div>
                                                                <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                                    <Label>Grade:&nbsp;</Label> {this.state.userProfile.Grade.Title}
                                                                </div>
                                                                <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                                    <Label>Payscale:&nbsp;</Label> {(this.state.userProfile.Payscale !== undefined) ? this.state.userProfile.Payscale.Title : ''}
                                                                </div>
                                                                <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                                    <Label>Weekly Off:&nbsp;</Label> {this.state.userProfile.WeeklyOff}
                                                                </div>
                                                                <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                                    <Label>Is Active?:&nbsp;</Label> {this.state.userProfile.Active}
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
                        <div className='col-sm-12 col-md-6 col-lg-6' style={{ paddingBottom: '15px', paddingLeft: '8px' }}>
                            <div className='widget-card full-height'>
                                <div className='widget-card-head'>
                                    <span className='widget-card-head-icon'>
                                        <Icon iconName='ContactInfo' />
                                    </span>
                                    <h2 className='widget-card-head-title'>PERSONAL</h2>
                                </div>
                                <div className='widget-card-body'>
                                    <div className='row'>
                                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                <Label>First Name - हिंदी:&nbsp;</Label> {this.state.userProfile.FirstName_Hindi}
                                            </div>
                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                <Label>Middle Name - हिंदी:&nbsp;</Label> {this.state.userProfile.MiddleName_Hindi}
                                            </div>
                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                <Label>Last Name - हिंदी:&nbsp;</Label> {this.state.userProfile.LastName_Hindi}
                                            </div>
                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                <Label>Father Name:&nbsp;</Label> {this.state.userProfile.FatherName}
                                            </div>
                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                <Label>Mother Name:&nbsp;</Label> {this.state.userProfile.MotherName}
                                            </div>
                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                <Label>Gender:&nbsp;</Label> {this.state.userProfile.Gender}
                                            </div>
                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                <Label>Blood Group:&nbsp;</Label>
                                                {this.state.userProfile.BloodGroup}
                                            </div>
                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                <Label>DOB:&nbsp;</Label>
                                                {(!this.state.userProfile.DOB) ? <Moment format='DD MMM YYYY'>{(this.state.userProfile.DOB as Date).toLocaleDateString()}</Moment> : ''}
                                            </div>
                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                <Label>Religion:&nbsp;</Label> {this.state.userProfile.Religion}
                                            </div>
                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                <Label>Caste:&nbsp;</Label> {this.state.userProfile.Caste}
                                            </div>
                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                <Label>Marital Status:&nbsp;</Label> {this.state.userProfile.MartialStatus}
                                            </div>
                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                <Label>Mobile:&nbsp;</Label> {this.state.userProfile.MobileNo_x002e_}
                                            </div>
                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                <Label style={{ verticalAlign: 'top' }}>Permanent:&nbsp;</Label>
                                                <div style={{ padding: '5px 0px' }} dangerouslySetInnerHTML={{ __html: Helper.getAddressByTpe(this.state.userProfile.AddressMaster, 'Permanent') }}></div>
                                            </div>
                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                <Label style={{ verticalAlign: 'top' }}>Home Town:&nbsp;</Label>
                                                <div style={{ padding: '5px 0px' }} dangerouslySetInnerHTML={{ __html: Helper.getAddressByTpe(this.state.userProfile.AddressMaster, 'Home Town') }}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-sm-12 col-md-12 col-lg-12 customDivSeprator'></div>
                                    <div className='row'>
                                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                            <div className='widget-card-head'>
                                                <span className='widget-card-head-icon'>
                                                    <Icon iconName='ContactCard' />
                                                </span>
                                                <h2 className='widget-card-head-title'>IDENTITY</h2>
                                            </div>
                                            <div className='widget-card-body' style={{ padding: '0px' }}>
                                                <div className='row'>
                                                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                                        <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                            <Label>Nationality:&nbsp;</Label> {this.state.userProfile.Nationality}
                                                        </div>
                                                        <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                            <Label>Aadhaar No.:&nbsp;</Label> {this.state.userProfile.AadharCardNo}
                                                        </div>
                                                        <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                            <Label>Voter ID No.:&nbsp;</Label> {this.state.userProfile.VoterID_x0020_No}
                                                        </div>
                                                        <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                            <Label>PAN No.:&nbsp;</Label> {this.state.userProfile.PAN_x0020_No}
                                                        </div>
                                                        <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                            <Label>Driving License No.:&nbsp;</Label> {this.state.userProfile.DrivingLicenseNumber}
                                                        </div>
                                                        <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                            <Label>Driving License Expiry Date:&nbsp;</Label> {this.state.userProfile.DrivingLicenseExpiryDate}
                                                        </div>
                                                        <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                            <Label>Passport No.:&nbsp;</Label> {this.state.userProfile.PassportNo_x002e_}
                                                        </div>
                                                        <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                            <Label>Passport Issue Date:&nbsp;</Label> {this.state.userProfile.PassportIssueDate}
                                                        </div>
                                                        <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                            <Label>Passport Expiry Date:&nbsp;</Label> {this.state.userProfile.PassportExpiryDate}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-sm-12 col-md-12 col-lg-12 customDivSeprator'></div>
                                    <div className='row'>
                                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                            <div className='widget-card-head'>
                                                <span className='widget-card-head-icon'>
                                                    <Icon iconName='BankSolid' />
                                                </span>
                                                <h2 className='widget-card-head-title'>BANK</h2>
                                            </div>
                                            <div className='widget-card-body' style={{ padding: '0px' }}>
                                                <div className='row'>
                                                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                                        <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                            <Label>Name:&nbsp;</Label> {this.state.userProfile.BankName.Title}
                                                        </div>
                                                        <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                            <Label>Branch:&nbsp;</Label> {this.state.userProfile.BranchName}
                                                        </div>
                                                        <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                            <Label>Account No.:&nbsp;</Label> {this.state.userProfile.AccountNo}
                                                        </div>
                                                        <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                            <Label>IFSC Code:&nbsp;</Label> {this.state.userProfile.IFSCCode}
                                                        </div>
                                                        <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                            <Label>PF Number:&nbsp;</Label> {this.state.userProfile.PFNumber}
                                                        </div>
                                                        <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                            <Label>ESIC No.:&nbsp;</Label> {this.state.userProfile.ESICNumber}
                                                        </div>
                                                        <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                            <Label>ESIC Remark:&nbsp;</Label> {this.state.userProfile.ESIC_x0020_Remarks}
                                                        </div>
                                                        <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                            <Label>PRAN No.:&nbsp;</Label> {this.state.userProfile.PranNo}
                                                        </div>
                                                        <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                            <Label>NPS:&nbsp;</Label> {this.state.userProfile.NPS}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                            <div className='row'>
                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                    <div className='widget-card'>
                                        <div className='row'>
                                            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                                                <div className='widget-card-head'>
                                                    <span className='widget-card-head-icon'>
                                                        <Icon iconName='CityNext' />
                                                    </span>
                                                    <h2 className='widget-card-head-title'>Office</h2>
                                                </div>
                                                <div className='widget-card-body' style={{ padding: '0px' }}>
                                                    <div className='row'>
                                                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                                <Label>Unit:&nbsp;</Label> {this.state.userProfile.Unit.Title}
                                                            </div>
                                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                                <Label>Current Office Location:&nbsp;</Label> {this.state.userProfile.CurrentOfficeLocation.Title}
                                                            </div>
                                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                                <Label>Effective Date:&nbsp;</Label>
                                                                {(this.state.userProfile.EffectiveDate !== undefined) ? <Moment format='DD MMM YYYY'>{(this.state.userProfile.EffectiveDate as Date).toLocaleDateString()}</Moment> : ''}
                                                            </div>
                                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                                <Label>Deputation Office Location:&nbsp;</Label> {(this.state.userProfile.DeputationOfficeLocation !== undefined) ? this.state.userProfile.DeputationOfficeLocation.Title : ''}
                                                            </div>
                                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                                <Label>Weekly Off:&nbsp;</Label> {this.state.userProfile.WeeklyOff}
                                                            </div>
                                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                                <Label>Is Active?:&nbsp;</Label> {this.state.userProfile.Active}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                                                <div className='widget-card-head'>
                                                    <span className='widget-card-head-icon'>
                                                        <Icon iconName='ManagerSelfService' />
                                                    </span>
                                                    <h2 className='widget-card-head-title'>Reporting</h2>
                                                </div>
                                                <div className='widget-card-body' style={{ padding: '0px' }}>
                                                    <div className='row'>
                                                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                                <Label>PAPR Manager:&nbsp;</Label>
                                                                {this.state.userProfile.ReportingManager.Title}
                                                            </div>
                                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                                <Label>PAPR Reviewer:&nbsp;</Label>
                                                                {this.state.userProfile.AlternateReportingManager ? this.state.userProfile.AlternateReportingManager.Title : ''}
                                                            </div>
                                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                                <Label>Leave Level 1 Approver:&nbsp;</Label>
                                                                {this.state.userProfile.LeaveLevel1.Title}
                                                            </div>
                                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                                <Label>Leave Level 2 Approver:&nbsp;</Label>
                                                                {this.state.userProfile.LeaveLevel2.Title}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-sm-12 col-md-12 col-lg-12 customDivSeprator'></div>
                                        <div className='row'>
                                            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                                                <div className='widget-card-head'>
                                                    <span className='widget-card-head-icon'>
                                                        <Icon iconName='BulletedList' />
                                                    </span>
                                                    <h2 className='widget-card-head-title'>Others</h2>
                                                </div>
                                                <div className='widget-card-body' style={{ padding: '0px' }}>
                                                    <div className='row'>
                                                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                                <Label>Paternity Leave Count:&nbsp;</Label>
                                                                {this.state.userProfile.PaternityLeaveCount}
                                                            </div>
                                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                                <Label>Maternity Leave Count:&nbsp;</Label>
                                                                {this.state.userProfile.MaternityLeave_Count}
                                                            </div>
                                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                                <Label>Extra Ordinary Leaves:&nbsp;</Label>
                                                                {this.state.userProfile.TotalEOL}
                                                            </div>
                                                            <div className='col-xs-12 col-sm-4 col-md-12 col-lg-6 profile-body-item'>
                                                                <Label>Medical Leaves:&nbsp;</Label>
                                                                {this.state.userProfile.TotalMaternityLeave}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                                                <div className='widget-card-head'>
                                                    <span className='widget-card-head-icon'>
                                                        <Icon iconName='Certificate' />
                                                    </span>
                                                    <h2 className='widget-card-head-title'>Training & Certificate</h2>
                                                </div>
                                                <div className='widget-card-body' style={{ paddingTop: '0px' }}>
                                                    <div className='row'>
                                                        <div className='col-sm-12 col-md-12 col-lg-12'>
                                                            <div className='row'>
                                                                <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6 profile-body-line-item'>
                                                                    <Label>Training Certificate</Label>
                                                                </div>
                                                                <div className='col-xs-2 col-sm-2 col-md-2 col-lg-2 profile-body-line-item'>
                                                                    <Label>Start Date</Label>
                                                                </div>
                                                                <div className='col-xs-2 col-sm-2 col-md-2 col-lg-2 profile-body-line-item'>
                                                                    <Label>End Date</Label>
                                                                </div>
                                                                <div className='col-xs-2 col-sm-2 col-md-2 col-lg-2 profile-body-line-item'>
                                                                    <Label>Cost</Label>
                                                                </div>
                                                            </div>
                                                            {(this.state.userProfile.TrainingNCertificate.map((tnc, n) => (
                                                                <div>
                                                                    <TooltipHost
                                                                        calloutProps={{ gapSpace: 5 }}
                                                                        tooltipProps={{
                                                                            onRenderContent: () => {
                                                                                return (
                                                                                    <div>
                                                                                        <ul style={{ margin: 0, padding: 0 }}>
                                                                                            <li><b>Institute</b>: {tnc.Institute}</li>
                                                                                            <li><b>Location</b>: {tnc.Location}</li>
                                                                                        </ul>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                        }}
                                                                        delay={TooltipDelay.zero}
                                                                        id={'trainToolTip' + n}
                                                                        directionalHint={DirectionalHint.topAutoEdge}>
                                                                        <div className='row' aria-describedby={'trainToolTip' + n}>
                                                                            <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6 profile-body-line-item'>
                                                                                {tnc.Description}
                                                                            </div>
                                                                            <div className='col-xs-2 col-sm-2 col-md-2 col-lg-2 profile-body-line-item'>
                                                                                {(tnc.StartDate !== undefined) ? <Moment format='DD MMM YYYY'>{new Date(tnc.StartDate).toLocaleDateString()}</Moment> : ''}
                                                                            </div>
                                                                            <div className='col-xs-2 col-sm-2 col-md-2 col-lg-2 profile-body-line-item'>
                                                                                {(tnc.EndDate !== undefined) ? <Moment format='DD MMM YYYY'>{new Date(tnc.EndDate).toLocaleDateString()}</Moment> : ''}
                                                                            </div>
                                                                            <div className='col-xs-2 col-sm-2 col-md-2 col-lg-2 profile-body-line-item'>
                                                                                {tnc.TrainingCost}
                                                                            </div>
                                                                        </div>
                                                                    </TooltipHost>
                                                                </div>
                                                            )))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='col-sm-12 col-md-12 col-lg-12 customDivSeprator'></div>
                                        <div className='row'>
                                            <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
                                                <div className='widget-card-head'>
                                                    <span className='widget-card-head-icon'>
                                                        <Icon iconName='Waffle' />
                                                    </span>
                                                    <h2 className='widget-card-head-title'>REDEMPTION CODE</h2>
                                                </div>
                                                <div className='widget-card-body' style={{ paddingTop: '0px' }}>
                                                    <div className='row'>
                                                        <div className='col-sm-12 col-md-12 col-lg-12'>
                                                            <div className='row'>
                                                                <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6 profile-body-line-item'>
                                                                    <Label>Application</Label>
                                                                </div>
                                                                <div className='col-xs-4 col-sm-4 col-md-4 col-lg-4 profile-body-line-item'>
                                                                    <Label>Code</Label>
                                                                </div>
                                                                <div className='col-xs-2 col-sm-2 col-md-2 col-lg-2 profile-body-line-item'>
                                                                    <Label>Link</Label>
                                                                </div>
                                                            </div>
                                                            {(this.state.userProfile.RedemptionCode.map((redem, n) => (
                                                                <div>
                                                                    <div className='row'>
                                                                        <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6 profile-body-line-item'>
                                                                            {redem.Application}
                                                                        </div>
                                                                        <div className='col-xs-4 col-sm-4 col-md-4 col-lg-4 profile-body-line-item'>
                                                                            {redem.RedemptionCode}
                                                                        </div>
                                                                        <div className='col-xs-2 col-sm-2 col-md-2 col-lg-2 profile-body-line-item'>
                                                                            <Link href={redem.CodeRedemptionLink} target='_New'>
                                                                                <Icon iconName='Link' style={{ fontSize: '14px' }} />
                                                                            </Link >
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )))}
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
            </div>
        );
    }
}