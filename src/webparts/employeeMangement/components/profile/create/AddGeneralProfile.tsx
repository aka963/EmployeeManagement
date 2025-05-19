import * as React from 'react';
import styles from '../../EmployeeMangement.module.scss';
import { IEmployeeMangementProps } from '../../IEmployeeMangementProps';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { PeoplePicker, PrincipalType, IPeoplePickerProps } from '@pnp/spfx-controls-react/lib/PeoplePicker';

import { ICreateUserProfile } from '../../../interface/ICreateUserProfile';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

import { Formik, FormikProps, ErrorMessage, Field, FormikActions, FormikValues } from 'formik';
import * as yup from 'yup';

import cupOps from '../../../../services/bal/CreateUserProfileOps';

import { IUserProfile, InitializedUserProfile, IUserProfileLoadData } from '../../../../services/interface/IUserProfile';

export default class AddGeneralProfile extends React.Component<IEmployeeMangementProps, ICreateUserProfile> {
    // public userProfileLoadData: IUserProfileLoadData;
    public formikInstance: Formik;
    public isFormValid: boolean = false;
    constructor(props: IEmployeeMangementProps) {
        super(props);
        this.formikInstance = null;
        // Helper.assignDefaults((typeof this.userProfile));
        this.state = { userProfile: InitializedUserProfile };
        this._getPeoplePickerItems = this._getPeoplePickerItems.bind(this);
        this.onProfileSubmit = this.onProfileSubmit.bind(this);
        this.setFormikInstance = this.setFormikInstance.bind(this);
    }

    private setFormikInstance(ref: Formik) {
        // The ref receives the Formik instance
        this.formikInstance = ref;
    };

    private async _getPeoplePickerItems(items: any[], formikProps: FormikProps<FormikValues>, pplPickerSetFieldName: string) {
        // console.log('Items:', items);
        if (items.length > 0) {
            const userInfo = await cupOps.getUserInfo(items[0].loginName, this.props);
            this.setState({ userProfile: { UserName: userInfo } });
            formikProps.setFieldTouched(pplPickerSetFieldName, true);
            formikProps.setFieldValue(pplPickerSetFieldName, userInfo.Id);
            // console.log('UserInfo:', userInfo);
        }
    }

    private onProfileSubmit(values: IUserProfile, actions?: FormikActions<IUserProfile>): void {
        // console.log(this.isFormValid);
        if (this.isFormValid) {
            this.setState({ userProfile: values });
            // console.log('Submitted values:', this.state.userProfile);
        }
        // actions.setSubmitting(false);
    }

    public componentDidMount(): void {
        if (this.formikInstance) {
            this.formikInstance.validateForm(this.state.userProfile).then((resp) => {
                // console.log(resp);
                // this.formikInstance.validateField('UserNameId');
            });
        }

        cupOps.getUserProfileDataOnLoad(this.props).then((resp) => {
            this.setState({ userProfileLoadData: resp });
            console.log(resp);
        });
    }

    public render(): React.ReactElement<IEmployeeMangementProps> {
        const {
            description,
            currentSPContext
        } = this.props;

        const validate = yup.object().shape({
            Title: yup.string().required('Employee Id is required.'),
            UserNameId: yup.string().required('Valid user is required.'),
            EmployeeTypeId: yup.string().trim().required('Type is required.'),
            EmployeeTitle: yup.string().trim().required('Title is required.'),
            FirstName: yup.string().trim().required('First Name is required.'),
            LastName: yup.string().trim().required('Last Name is required.'),
        });

        return (
            <Formik ref={this.setFormikInstance} initialValues={InitializedUserProfile} validationSchema={validate}
                enableReinitialize={false} validateOnBlur={true} validateOnChange={true}
                onSubmit={(values, actions) => {
                    // console.log('Submitted:', values);
                    this.onProfileSubmit(values, actions);
                }}>
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        {/* <TextField className='form-control' placeholder='Auto Generated' id='Title' name='Title'
                            // onBlur={(e) => {
                            //     formik.setFieldTouched('Title', true);
                            //     formik.validateField('Title');
                            // }}
                            onChanged={(e) => {
                                formik.setFieldValue('Title', e);
                                this.setState({ userProfile: { Title: e } })
                            }}></TextField>
                        <PrimaryButton type='submit' data-automation-id='btn-save-profile' iconProps={{ iconName: 'Save' }}
                            text='Submit Profile' /> */}

                        <div className='body-content'>
                            <div className='row'>
                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                    <div className='widget-card'>
                                        <div className='scrollable-pane-container'>
                                            <div className='widget-card full-height'>
                                                <ScrollablePane className='scrollable-pane-profile'>
                                                    <div key='personal'>
                                                        <Sticky stickyPosition={StickyPositionType.Both}>
                                                            <div className='widget-card-head'>
                                                                <span className='widget-card-head-icon'>
                                                                    <Icon iconName='ContactInfo' />
                                                                </span>
                                                                <h2 className='widget-card-head-title'>PERSONAL</h2>
                                                            </div>
                                                        </Sticky>
                                                        <div className='widget-card-body'>
                                                            <div className='row'>
                                                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                                                    <div className='row'>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>ID:&nbsp;</Label>
                                                                            <TextField className='form-control' placeholder='Auto Generated' name='Title' id='Title' required={true}
                                                                                onFocus={(e) => {
                                                                                    formik.setFieldTouched('Title', true);
                                                                                    // console.log(formik);
                                                                                }}
                                                                                onBlur={(e) => {
                                                                                    formik.setFieldTouched('Title', true);
                                                                                    if (e.target['value'].trim() !== '' && e.target['value'].trim() !== undefined) {
                                                                                        cupOps.getEmployeeIdById(e.target['value'], this.props).then((results) => {
                                                                                            if (results.length > 0) {
                                                                                                formik.setFieldError('Title', 'Employee Id already exists.');
                                                                                                setTimeout(function () {
                                                                                                    document.getElementById('Title').focus();
                                                                                                })
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                }}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('Title', val);
                                                                                }}
                                                                                errorMessage={formik.errors.Title && formik.touched.Title ? formik.errors.Title as string : ''}></TextField>
                                                                            <ErrorMessage name='Title' component='div' className='error-message' />
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item' onFocus={(ev) => {
                                                                            formik.setFieldTouched('UserNameId', true);
                                                                        }} onBlur={(ev) => {
                                                                            formik.setFieldTouched('UserNameId', true);
                                                                        }}>
                                                                            <Label>Username:&nbsp;</Label>
                                                                            <PeoplePicker peoplePickerCntrlclassName='form-control'
                                                                                context={this.props.currentSPContext}
                                                                                personSelectionLimit={1}
                                                                                tooltipDirectional={1}
                                                                                selectedItems={(items) => {
                                                                                    this._getPeoplePickerItems(items, formik, 'UserNameId');
                                                                                    // formik.setFieldValue('Level1Approver', items);
                                                                                }}
                                                                                principalTypes={[PrincipalType.User]}
                                                                                ensureUser={true}
                                                                                // resolveDelay={1000}
                                                                                placeholder='Enter names or email addresses...'
                                                                                errorMessage='Please enter valid user'
                                                                                isRequired={true}
                                                                                webAbsoluteUrl={this.props.currentSPContext.pageContext.web.absoluteUrl}
                                                                                showRequiredError={true}
                                                                            />
                                                                            <ErrorMessage name='UserNameId' component='div' className='error-message' />
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Ext:&nbsp;</Label>
                                                                            <TextField className='form-control' name='Extension'></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Employee Type:&nbsp;</Label>
                                                                            <Dropdown placeHolder='Select Type' className='form-control' id='EmployeeType' options={
                                                                                (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.EmployeeTypeChoices : []
                                                                            } required={true}
                                                                                onFocus={(e) => {
                                                                                    formik.setFieldTouched('EmployeeTypeId', true);
                                                                                    // console.log(formik);
                                                                                }}
                                                                                onBlur={(e) => {
                                                                                    formik.setFieldTouched('EmployeeTypeId', true);
                                                                                    // console.log(formik);
                                                                                }}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('EmployeeTypeId', val.key);
                                                                                }}
                                                                                errorMessage={formik.errors.EmployeeTypeId && formik.touched.EmployeeTypeId ? formik.errors.EmployeeTypeId as string : ''}
                                                                            />
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Title:&nbsp;</Label>
                                                                            <Dropdown placeHolder='Select Type' className='form-control' id='EmployeeTitle' options={
                                                                                (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.EmployeeTitleChoices : []
                                                                            } required={true}
                                                                                onFocus={(e) => {
                                                                                    formik.setFieldTouched('EmployeeTitle', true);
                                                                                    // console.log(formik);
                                                                                }}
                                                                                onBlur={(e) => {
                                                                                    formik.setFieldTouched('EmployeeTitle', true);
                                                                                    // console.log(formik);
                                                                                }}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('EmployeeTitle', val.key);
                                                                                }}
                                                                                errorMessage={formik.errors.EmployeeTitle && formik.touched.EmployeeTitle ? formik.errors.EmployeeTitle as string : ''}
                                                                            />
                                                                            {/* <ErrorMessage name='EmployeeTitle' component='div' className='error-message' /> */}
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>First Name:&nbsp;</Label>
                                                                            <TextField className='form-control' id='FirstName' name='FirstName' required={true}
                                                                                onFocus={(e) => {
                                                                                    formik.setFieldTouched('FirstName', true);
                                                                                    // console.log(formik);
                                                                                }}
                                                                                onBlur={(e) => {
                                                                                    formik.setFieldTouched('FirstName', true);
                                                                                    // console.log(formik);
                                                                                }}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('FirstName', val);
                                                                                }}
                                                                                errorMessage={formik.errors.FirstName && formik.touched.FirstName ? formik.errors.FirstName as string : ''}></TextField>
                                                                            <ErrorMessage name='FirstName' component='div' className='error-message' />
                                                                            {/* <pre>{JSON.stringify([formik.errors, formik.isValid], null, 2)}</pre> */}
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Middle Name:&nbsp;</Label>
                                                                            <TextField className='form-control'></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Last Name:&nbsp;</Label>
                                                                            <TextField className='form-control' name='LastName' required={true}
                                                                                onFocus={(e) => {
                                                                                    formik.setFieldTouched('LastName', true);
                                                                                    // console.log(formik);
                                                                                }}
                                                                                onBlur={(e) => {
                                                                                    formik.setFieldTouched('LastName', true);
                                                                                    // console.log(formik);
                                                                                }}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('LastName', val);
                                                                                    // this.setState({ userProfile: { LastName: val } });
                                                                                    // console.log(formik);
                                                                                    // this.formikInstance.validateForm(formik.values).then((resp) => {
                                                                                    //     console.log(resp);
                                                                                    //     console.log(formik);
                                                                                    // });
                                                                                }}
                                                                                errorMessage={formik.errors.LastName && formik.touched.LastName ? formik.errors.LastName as string : ''}></TextField>
                                                                            <ErrorMessage name='LastName' component='div' className='error-message' />
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>First Name - हिंदी:&nbsp;</Label>
                                                                            <TextField className='form-control'></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Middle Name - हिंदी:&nbsp;</Label>
                                                                            <TextField className='form-control'></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Last Name - हिंदी:&nbsp;</Label>
                                                                            <TextField className='form-control'></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Father's Name:&nbsp;</Label>
                                                                            <TextField className='form-control'></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Mother's Name:&nbsp;</Label>
                                                                            <TextField className='form-control'></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Gender:&nbsp;</Label>
                                                                            <Dropdown placeHolder='Select Gender' className='form-control' options={
                                                                                [
                                                                                    { key: 'A', text: 'Female' },
                                                                                    { key: 'B', text: 'Male' },
                                                                                    { key: 'C', text: 'Transgender' },
                                                                                    { key: 'D', text: 'Option d' },
                                                                                    { key: 'E', text: 'Option e' },
                                                                                    { key: 'F', text: 'Option f' },
                                                                                    { key: 'G', text: 'Option g' },
                                                                                    { key: 'H', text: 'Option h' },
                                                                                    { key: 'I', text: 'Option i' },
                                                                                    { key: 'J', text: 'Option j' },
                                                                                ]
                                                                            } />
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Blood Group:&nbsp;</Label>
                                                                            <Dropdown placeHolder='Select Blood Group' className='form-control' options={
                                                                                [
                                                                                    { key: 'A', text: 'A' },
                                                                                    { key: 'B', text: 'B' },
                                                                                    { key: 'C', text: 'O' },
                                                                                    { key: 'D', text: 'Option d' },
                                                                                    { key: 'E', text: 'Option e' },
                                                                                    { key: 'F', text: 'Option f' },
                                                                                    { key: 'G', text: 'Option g' },
                                                                                    { key: 'H', text: 'Option h' },
                                                                                    { key: 'I', text: 'Option i' },
                                                                                    { key: 'J', text: 'Option j' },
                                                                                ]
                                                                            } />
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Date of Birth:&nbsp;</Label>
                                                                            <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date'
                                                                                maxDate={new Date(new Date().getFullYear() - 21, new Date().getMonth(), new Date().getDate())}
                                                                                initialPickerDate={new Date(new Date().getFullYear() - 21, new Date().getMonth(), new Date().getDate())}></DatePicker>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Religion:&nbsp;</Label>
                                                                            <TextField className='form-control'></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Category [Caste]:&nbsp;</Label>
                                                                            <TextField className='form-control'></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Marital Status:&nbsp;</Label>
                                                                            <Dropdown placeHolder='Select Marital Status' className='form-control' options={
                                                                                [
                                                                                    { key: 'A', text: 'Married' },
                                                                                    { key: 'B', text: 'Single' }
                                                                                ]
                                                                            } />
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Phone:&nbsp;</Label>
                                                                            <TextField className='form-control'></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Mobile:&nbsp;</Label>
                                                                            <TextField className='form-control'></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Corporate Email:&nbsp;</Label>
                                                                            <TextField className='form-control'></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Alternate Email:&nbsp;</Label>
                                                                            <TextField className='form-control'></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Office Extension:&nbsp;</Label>
                                                                            <TextField className='form-control'></TextField>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-sm-12 col-md-12 col-lg-12 customDivSeprator'></div>
                                                    </div>
                                                    <div key='emgContact'>
                                                        <Sticky stickyPosition={StickyPositionType.Both}>
                                                            <div className='widget-card-head'>
                                                                <span className='widget-card-head-icon'>
                                                                    <Icon iconName='Add' />
                                                                </span>
                                                                <h2 className='widget-card-head-title'>EMERGENCY CONTACT</h2>
                                                            </div>
                                                        </Sticky>
                                                        <div className='widget-card-body'>
                                                            <div className='row'>
                                                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                                                    <div className='row'>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Employee Name:&nbsp;</Label>
                                                                            <TextField className='form-control'></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Permanent Address:&nbsp;</Label>
                                                                            <TextField className='form-control' multiline={true}></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Name (Family Member):&nbsp;</Label>
                                                                            <TextField className='form-control'></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Contact (Family Member):&nbsp;</Label>
                                                                            <TextField className='form-control'></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Relation (Family Member):&nbsp;</Label>
                                                                            <TextField className='form-control'></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Name (Not Family Member):&nbsp;</Label>
                                                                            <TextField className='form-control'></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Contact (Not Family Member):&nbsp;</Label>
                                                                            <TextField className='form-control'></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Relation (Not Family Member):&nbsp;</Label>
                                                                            <TextField className='form-control'></TextField>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-sm-12 col-md-12 col-lg-12 customDivSeprator'></div>
                                                    </div>
                                                    <div key='Identity'>
                                                        <Sticky stickyPosition={StickyPositionType.Both}>
                                                            <div className='widget-card-head'>
                                                                <span className='widget-card-head-icon'>
                                                                    <Icon iconName='ContactCard' />
                                                                </span>
                                                                <h2 className='widget-card-head-title'>IDENTITY</h2>
                                                            </div>
                                                        </Sticky>
                                                        <div className='widget-card-body'>
                                                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                                                <div className='row'>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Nationality:&nbsp;</Label>
                                                                        <TextField className='form-control'></TextField>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Aadhaar Card No.:&nbsp;</Label>
                                                                        <TextField className='form-control'></TextField>
                                                                        <input type='file' />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Voter ID No.:&nbsp;</Label>
                                                                        <TextField className='form-control'></TextField>
                                                                        <input type='file' />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>PAN No.:&nbsp;</Label>
                                                                        <TextField className='form-control'></TextField>
                                                                        <input type='file' />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Driver License No.:&nbsp;</Label>
                                                                        <TextField className='form-control'></TextField>
                                                                        <input type='file' />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Expiry Date:&nbsp;</Label>
                                                                        <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date'
                                                                            maxDate={new Date(new Date().getFullYear() + 20, new Date().getMonth(), new Date().getDate())}></DatePicker>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Passport No.:&nbsp;</Label>
                                                                        <TextField className='form-control'></TextField>
                                                                        <input type='file' />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Issue Date:&nbsp;</Label>
                                                                        <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date'
                                                                            maxDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())}></DatePicker>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Expiry Date:&nbsp;</Label>
                                                                        <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date'
                                                                            maxDate={new Date(new Date().getFullYear() + 10, new Date().getMonth(), new Date().getDate())}></DatePicker>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-sm-12 col-md-12 col-lg-12 customDivSeprator'></div>
                                                    </div>
                                                    <div key='Bank'>
                                                        <Sticky stickyPosition={StickyPositionType.Both}>
                                                            <div className='widget-card-head'>
                                                                <span className='widget-card-head-icon'>
                                                                    <Icon iconName='BankSolid' />
                                                                </span>
                                                                <h2 className='widget-card-head-title'>BANK DETAILS</h2>
                                                            </div>
                                                        </Sticky>
                                                        <div className='widget-card-body'>
                                                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                                                <div className='row'>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Name:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Bank' className='form-control' options={
                                                                            [
                                                                                { key: 'A', text: 'ICICI' },
                                                                                { key: 'B', text: 'HDFC' }
                                                                            ]
                                                                        } />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Branch:&nbsp;</Label>
                                                                        <TextField className='form-control'></TextField>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Account No.:&nbsp;</Label>
                                                                        <TextField className='form-control'></TextField>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>IFSC Code:&nbsp;</Label>
                                                                        <TextField className='form-control'></TextField>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>PF Number:&nbsp;</Label>
                                                                        <TextField className='form-control'></TextField>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>ESIC Number:&nbsp;</Label>
                                                                        <TextField className='form-control'></TextField>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>ESIC Remark:&nbsp;</Label>
                                                                        <TextField className='form-control'></TextField>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>PRAN Number:&nbsp;</Label>
                                                                        <TextField className='form-control'></TextField>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>NPS:&nbsp;</Label>
                                                                        <TextField className='form-control'></TextField>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-sm-12 col-md-12 col-lg-12 customDivSeprator'></div>
                                                    </div>
                                                    <div key='Grade'>
                                                        <Sticky stickyPosition={StickyPositionType.Both}>
                                                            <div className='widget-card-head'>
                                                                <span className='widget-card-head-icon'>
                                                                    <Icon iconName='FavoriteStar' />
                                                                </span>
                                                                <h2 className='widget-card-head-title'>GRADE DETAILS</h2>
                                                            </div>
                                                        </Sticky>
                                                        <div className='widget-card-body'>
                                                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                                                <div className='row'>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Office Location:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Bank' className='form-control' options={
                                                                            [
                                                                                { key: 'A', text: 'ICICI' },
                                                                                { key: 'B', text: 'HDFC' }
                                                                            ]
                                                                        } />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Role:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Bank' className='form-control' options={
                                                                            [
                                                                                { key: 'A', text: 'ICICI' },
                                                                                { key: 'B', text: 'HDFC' }
                                                                            ]
                                                                        } />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Employee Type:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Bank' className='form-control' options={
                                                                            [
                                                                                { key: 'A', text: 'ICICI' },
                                                                                { key: 'B', text: 'HDFC' }
                                                                            ]
                                                                        } />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Scale:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Bank' className='form-control' options={
                                                                            [
                                                                                { key: 'A', text: 'ICICI' },
                                                                                { key: 'B', text: 'HDFC' }
                                                                            ]
                                                                        } />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Grade:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Bank' className='form-control' options={
                                                                            [
                                                                                { key: 'A', text: 'ICICI' },
                                                                                { key: 'B', text: 'HDFC' }
                                                                            ]
                                                                        } />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Designation:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Bank' className='form-control' options={
                                                                            [
                                                                                { key: 'A', text: 'ICICI' },
                                                                                { key: 'B', text: 'HDFC' }
                                                                            ]
                                                                        } />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Pay Scale:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Bank' className='form-control' options={
                                                                            [
                                                                                { key: 'A', text: 'ICICI' },
                                                                                { key: 'B', text: 'HDFC' }
                                                                            ]
                                                                        } />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Weekly Off:&nbsp;</Label>
                                                                        <Checkbox />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Is Active?:&nbsp;</Label>
                                                                        <Checkbox />
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-sm-12 col-md-12 col-lg-12 customDivSeprator'></div>
                                                    </div>
                                                    <div key='Office'>
                                                        <Sticky stickyPosition={StickyPositionType.Both}>
                                                            <div className='widget-card-head'>
                                                                <span className='widget-card-head-icon'>
                                                                    <Icon iconName='CityNext' />
                                                                </span>
                                                                <h2 className='widget-card-head-title'>OFFICE</h2>
                                                            </div>
                                                        </Sticky>
                                                        <div className='widget-card-body'>
                                                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                                                <div className='row'>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Group:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Bank' className='form-control' multiSelect={true} options={
                                                                            [
                                                                                { key: 'A', text: 'ICICI' },
                                                                                { key: 'B', text: 'HDFC' }
                                                                            ]
                                                                        } />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Unit:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Bank' className='form-control' options={
                                                                            [
                                                                                { key: 'A', text: 'ICICI' },
                                                                                { key: 'B', text: 'HDFC' }
                                                                            ]
                                                                        } />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Current Office Location:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Bank' className='form-control' options={
                                                                            [
                                                                                { key: 'A', text: 'ICICI' },
                                                                                { key: 'B', text: 'HDFC' }
                                                                            ]
                                                                        } />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Effective Date:&nbsp;</Label>
                                                                        <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date'
                                                                            maxDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())}></DatePicker>

                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Deputation Office Location:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Bank' className='form-control' options={
                                                                            [
                                                                                { key: 'A', text: 'ICICI' },
                                                                                { key: 'B', text: 'HDFC' }
                                                                            ]
                                                                        } />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Shift Allocated:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Bank' className='form-control' options={
                                                                            [
                                                                                { key: 'A', text: 'ICICI' },
                                                                                { key: 'B', text: 'HDFC' }
                                                                            ]
                                                                        } />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Shift Effective From:&nbsp;</Label>
                                                                        <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date'
                                                                            maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}></DatePicker>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item' onFocus={(ev) => {
                                                                        formik.setFieldTouched('ReportingManagerId', true);
                                                                    }} onBlur={(ev) => {
                                                                        formik.setFieldTouched('ReportingManagerId', true);
                                                                    }}>
                                                                        <Label>PAPR Manager:&nbsp;</Label>
                                                                        <PeoplePicker peoplePickerCntrlclassName='form-control'
                                                                            context={this.props.currentSPContext}
                                                                            personSelectionLimit={1}
                                                                            tooltipDirectional={1}
                                                                            selectedItems={(items) => {
                                                                                this._getPeoplePickerItems(items, formik, 'ReportingManagerId');
                                                                                // formik.setFieldValue('Level1Approver', items);
                                                                            }}
                                                                            principalTypes={[PrincipalType.User]}
                                                                            ensureUser={true}
                                                                            resolveDelay={1000}
                                                                            placeholder='Enter names or email addresses...'
                                                                            errorMessage='Please enter valid user'
                                                                            isRequired={true}
                                                                            webAbsoluteUrl={this.props.currentSPContext.pageContext.web.absoluteUrl}
                                                                        />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item' onFocus={(ev) => {
                                                                        formik.setFieldTouched('AlternateReportingManagerId', true);
                                                                    }} onBlur={(ev) => {
                                                                        formik.setFieldTouched('AlternateReportingManagerId', true);
                                                                    }}>
                                                                        <Label>PAPR Reviewer:&nbsp;</Label>
                                                                        <PeoplePicker peoplePickerCntrlclassName='form-control'
                                                                            context={this.props.currentSPContext}
                                                                            personSelectionLimit={1}
                                                                            tooltipDirectional={1}
                                                                            selectedItems={(items) => {
                                                                                this._getPeoplePickerItems(items, formik, 'AlternateReportingManagerId');
                                                                                // formik.setFieldValue('Level1Approver', items);
                                                                            }}
                                                                            principalTypes={[PrincipalType.User]}
                                                                            ensureUser={true}
                                                                            resolveDelay={1000}
                                                                            placeholder='Enter names or email addresses...'
                                                                            errorMessage='Please enter valid user'
                                                                            isRequired={true}
                                                                            webAbsoluteUrl={this.props.currentSPContext.pageContext.web.absoluteUrl}
                                                                        />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item' onFocus={(ev) => {
                                                                        formik.setFieldTouched('LeaveLevel1Id', true);
                                                                    }} onBlur={(ev) => {
                                                                        formik.setFieldTouched('LeaveLevel1Id', true);
                                                                    }}>
                                                                        <Label>Leave Level 1:&nbsp;</Label>
                                                                        <PeoplePicker peoplePickerCntrlclassName='form-control'
                                                                            context={this.props.currentSPContext}
                                                                            personSelectionLimit={1}
                                                                            tooltipDirectional={1}
                                                                            selectedItems={(items) => {
                                                                                this._getPeoplePickerItems(items, formik, 'LeaveLevel1Id');
                                                                                // formik.setFieldValue('Level1Approver', items);
                                                                            }}
                                                                            principalTypes={[PrincipalType.User]}
                                                                            ensureUser={true}
                                                                            resolveDelay={1000}
                                                                            placeholder='Enter names or email addresses...'
                                                                            errorMessage='Please enter valid user'
                                                                            isRequired={true}
                                                                            webAbsoluteUrl={this.props.currentSPContext.pageContext.web.absoluteUrl}
                                                                        />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item' onFocus={(ev) => {
                                                                        formik.setFieldTouched('LeaveLevel2Id', true);
                                                                    }} onBlur={(ev) => {
                                                                        formik.setFieldTouched('LeaveLevel2Id', true);
                                                                    }}>
                                                                        <Label>Leave Level 2:&nbsp;</Label>
                                                                        <PeoplePicker peoplePickerCntrlclassName='form-control'
                                                                            context={this.props.currentSPContext}
                                                                            personSelectionLimit={1}
                                                                            tooltipDirectional={1}
                                                                            selectedItems={(items) => {
                                                                                this._getPeoplePickerItems(items, formik, 'LeaveLevel2Id');
                                                                                // formik.setFieldValue('Level1Approver', items);
                                                                            }}
                                                                            principalTypes={[PrincipalType.User]}
                                                                            ensureUser={true}
                                                                            resolveDelay={1000}
                                                                            placeholder='Enter names or email addresses...'
                                                                            errorMessage='Please enter valid user'
                                                                            isRequired={true}
                                                                            webAbsoluteUrl={this.props.currentSPContext.pageContext.web.absoluteUrl}
                                                                        />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Paternity Leave Count:&nbsp;</Label>
                                                                        <TextField className='form-control'></TextField>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Maternity Leave Count:&nbsp;</Label>
                                                                        <TextField className='form-control'></TextField>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Total days of EOL:&nbsp;</Label>
                                                                        <TextField className='form-control' placeholder='Extraordinary Leave'></TextField>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Total days of ML:&nbsp;</Label>
                                                                        <TextField className='form-control' placeholder='Medical Leave'></TextField>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-sm-12 col-md-12 col-lg-12 customDivSeprator'></div>
                                                    </div>
                                                    <div key='TrainingNCertificate'>
                                                        <Sticky stickyPosition={StickyPositionType.Both}>
                                                            <div className='widget-card-head'>
                                                                <span className='widget-card-head-icon'>
                                                                    <Icon iconName='Certificate' />
                                                                </span>
                                                                <h2 className='widget-card-head-title'>TRAINING & CERTIFICATE</h2>
                                                            </div>
                                                        </Sticky>
                                                        <div className='widget-card-body'>
                                                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                                                <div className='row'>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Training Certification:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Bank' className='form-control' multiSelect={true} options={
                                                                            [
                                                                                { key: 'A', text: 'ICICI' },
                                                                                { key: 'B', text: 'HDFC' }
                                                                            ]
                                                                        } />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Training Certifying Institute:&nbsp;</Label>
                                                                        <TextField className='form-control'></TextField>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Traning Cost:&nbsp;</Label>
                                                                        <TextField className='form-control'></TextField>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Location:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Bank' className='form-control' options={
                                                                            [
                                                                                { key: 'A', text: 'ICICI' },
                                                                                { key: 'B', text: 'HDFC' }
                                                                            ]
                                                                        } />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Description:&nbsp;</Label>
                                                                        <TextField className='form-control'></TextField>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Start Date&nbsp;</Label>
                                                                        <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date'
                                                                            maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}></DatePicker>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>End Date&nbsp;</Label>
                                                                        <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date'
                                                                            maxDate={new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate())}></DatePicker>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-sm-12 col-md-12 col-lg-12 customDivSeprator'></div>
                                                    </div>
                                                </ScrollablePane>
                                            </div>
                                        </div>
                                        {(formik.isValid && Object.keys(formik.errors).length === 0) && (
                                            <div className='widget-card-body' style={{ height: 'auto' }}>
                                                <div className='row'>
                                                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12' style={{ textAlign: 'center' }}>
                                                        <PrimaryButton type='submit' data-automation-id='btn-save-profile' iconProps={{ iconName: 'Save' }}
                                                            text='Submit Profile' onClick={() => { this.isFormValid = formik.isValid; }} />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                )
                }</Formik>
        );
    }
}
