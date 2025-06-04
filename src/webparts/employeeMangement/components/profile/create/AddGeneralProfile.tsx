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
    public isOnEmpId: boolean = false;
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

    private async _getPeoplePickerItems(items: any[], formikProps: FormikProps<FormikValues>, pplPickerSetFieldName: string, pplPickerSetFieldObjName: string) {
        // console.log('Items:', items);
        if (items.length > 0) {
            const userInfo = await cupOps.getUserInfo(items[0].loginName, this.props);
            // this.setState({ userProfile: { UserName: userInfo } });
            formikProps.setFieldTouched(pplPickerSetFieldName, true);
            formikProps.setFieldValue(pplPickerSetFieldName, userInfo.Id);
            formikProps.setFieldValue(pplPickerSetFieldObjName, userInfo);
            // console.log('UserInfo:', userInfo);
        }
    }

    private onProfileSubmit(values: IUserProfile, actions?: FormikActions<IUserProfile>): void {
        console.log(this.isFormValid);
        if (this.isFormValid) {
            this.setState({ userProfile: values });
            console.log('Submitted values:', this.state.userProfile);
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
            // console.log(resp);
        });
    }

    private checkEmployeeExists(strEmpId, formikProps: FormikProps<FormikValues>): Promise<boolean> {
        return cupOps.getEmployeeIdById(strEmpId, this.props).then((results) => {
            if (results.length > 0) {
                //formikProps.errors.Title = 'Employee Id already exists.'
                formikProps.setFieldError('Title', 'Employee Id already exists.');
                // formikProps.errors.Title = 'Employee Id already exists.';
                document.getElementById('Title').focus();
                return false;
            } else {
                //formikProps.errors.Title = ''
                formikProps.setFieldError('Title', '');
                // formikProps.errors.Title = '';
                return true;
            }
        }).catch((e) => {
            //formikProps.errors.Title = 'Error while extracting Id\'s'
            formikProps.setFieldError('Title', 'Error while extracting Id\'s');
            // formikProps.errors.Title = 'Error while extracting Id\'s';
            document.getElementById('Title').focus();
            return false;
        })
    }

    public render(): React.ReactElement<IEmployeeMangementProps> {
        const {
            description,
            currentSPContext
        } = this.props;

        const validate = yup.object().shape({
            Title: yup.string().required('Employee Id is required.')
                .test('Title', 'Employee Id already exists.',
                    async (strEmpId) => {
                        if (!strEmpId) return false;
                        // if (document.activeElement !== document.getElementById('Title')) {
                        if (this.isOnEmpId) {
                            return cupOps.getEmployeeIdById(strEmpId, this.props).then((results) => {
                                if (results.length > 0) {
                                    this.isOnEmpId = true;
                                    document.getElementById('Title').focus();
                                    return false;
                                } else {
                                    this.isOnEmpId = false;
                                    return true;
                                }
                            }).catch((e) => {
                                this.isOnEmpId = true;
                                return false;
                            });
                        } else {
                            // this.isOnEmpId = false;
                            return true;
                        }
                        // }
                        // else {
                        //     return true;
                        // }
                    }
                )
            , UserNameId: yup.string().required('Valid user is required.')
            , EmployeeTypeId: yup.string().trim().required('Type is required.')
            , EmployeeTitle: yup.string().trim().required('Title is required.')
            , FirstName: yup.string().trim().required('First Name is required.')
            , LastName: yup.string().trim().required('Last Name is required.')
            , MiddleName: yup.string().trim().required('Middle Name is required.')
            , Gender: yup.string().trim().required('Gender is required.')
            , DOB: yup.date().nullable().required('DOB is required.').typeError('A valid date is required')
            , Religion: yup.string().trim().required('Religion is required.')
            , Caste: yup.string().trim().required('Caste is required.')
            , MartialStatus: yup.string().trim().required('Marital Status is required.')
            , MobileNo_x002e_: yup.string().trim().required('Mobile No is required.')
            , CompanyEmail: yup.string().trim().required('Email is required.')
            , AlternateEmail: yup.string().trim().required('Email is required.')
            , Nationality: yup.string().trim().required('Nationality is required.')
            , AadharCardNo: yup.string().trim().required('Aadhar Card No is required.')
            , PAN_x0020_No: yup.string().trim().required('Nationality is required.')
            , OfficeLocationId: yup.string().trim().required('Office Location is required.')
            , Role: yup.string().trim().required('Role is required.')
            , ScaleId: yup.string().trim().required('Scale is required.')
            , GardeId: yup.string().trim().required('Garde is required.')
            , DesignationId: yup.string().trim().required('Designation is required.')
            , PayscaleId: yup.string().trim().required('Payscale is required.')
            , SubGroupId: yup.array().of(yup.string().required('Group cannot be empty')).min(1, 'Please add at least one Group').required('Group is required')
            , CurrentOfficeLocationId: yup.string().trim().required('Current Office Location is required.')
            , EffectiveDate: yup.date().nullable().required('Effective Date is required.').typeError('A valid date is required')
            , DeputationOfficeLocationId: yup.string().trim().required('Deputation Office Location is required.')
            , ShiftAllocatedId: yup.string().trim().required('ShiftAllocated is required.')
            , ShiftEffectiveFrom: yup.date().nullable().required('Shift Effective From is required.').typeError('A valid date is required')
            , LeaveLevel1Id: yup.string().required('Valid user is required.')
            , LeaveLevel2Id: yup.string().required('Valid user is required.')
            , TrainingNCertificateColl: yup.array().of(yup.object().shape({
                ExperienceInId: yup.string().required('Type is required')
                , Institute: yup.string().required('Institute is required')
                , TrainingCost: yup.string().required('Training Cost is required')
                , Location: yup.string().required('Location is required')
                , Description: yup.string().required('Description is required')
                , StartDate: yup.date().nullable().required('Start Date is required.').typeError('A valid date is required')
                , EndDate: yup.date().nullable().required('End Date is required.').typeError('A valid date is required')
            }))
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
                                                                            <TextField className='form-control' name='Title' id='Title' required={true}
                                                                                onFocus={(e) => {
                                                                                    this.isOnEmpId = true;
                                                                                    formik.setFieldTouched('Title', true);
                                                                                    // console.log(formik);
                                                                                }}
                                                                                onBlur={(e) => {
                                                                                    formik.setFieldTouched('Title', true);
                                                                                    if (e.target['value'].trim() !== '' && e.target['value'].trim() !== undefined) {
                                                                                        formik.setFieldValue('Title', e.target['value'].trim());
                                                                                        // this.checkEmployeeExists(e.target['value'].trim(), formik);
                                                                                    }
                                                                                }}
                                                                                onChanged={(val) => {
                                                                                    this.isOnEmpId = true;
                                                                                    // formik.setFieldValue('Title', val);
                                                                                }}
                                                                                errorMessage={formik.errors.Title && formik.touched.Title ? formik.errors.Title as string : ''}
                                                                            ></TextField>
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
                                                                                    this._getPeoplePickerItems(items, formik, 'UserNameId', 'UserName');
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
                                                                            <TextField className='form-control' id='Extension' name='Extension'
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('Extension', val);
                                                                                }}></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Employee Type:&nbsp;</Label>
                                                                            <Dropdown className='form-control' placeHolder='Select Type' id='EmployeeType' options={
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
                                                                            <Dropdown className='form-control' placeHolder='Select Title' id='EmployeeTitle' options={
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
                                                                            <TextField className='form-control' id='MiddleName' name='MiddleName' required={true}
                                                                                onFocus={(e) => {
                                                                                    formik.setFieldTouched('MiddleName', true);
                                                                                }}
                                                                                onBlur={(e) => {
                                                                                    formik.setFieldTouched('MiddleName', true);
                                                                                }}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('MiddleName', val);
                                                                                }}
                                                                                errorMessage={formik.errors.MiddleName && formik.touched.MiddleName ? formik.errors.MiddleName as string : ''}></TextField>
                                                                            <ErrorMessage name='MiddleName' component='div' className='error-message' />
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Last Name:&nbsp;</Label>
                                                                            <TextField className='form-control' id='LastName' name='LastName' required={true}
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
                                                                                }}
                                                                                errorMessage={formik.errors.LastName && formik.touched.LastName ? formik.errors.LastName as string : ''}></TextField>
                                                                            <ErrorMessage name='LastName' component='div' className='error-message' />
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>First Name - हिंदी:&nbsp;</Label>
                                                                            <TextField className='form-control' id='FirstName_Hindi' name='FirstName_Hindi'
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('FirstName_Hindi', val);
                                                                                }}></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Middle Name - हिंदी:&nbsp;</Label>
                                                                            <TextField className='form-control' id='MiddleName_Hindi' name='MiddleName_Hindi'
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('MiddleName_Hindi', val);
                                                                                }}></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Last Name - हिंदी:&nbsp;</Label>
                                                                            <TextField className='form-control' id='LastName_Hindi' name='LastName_Hindi'
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('LastName_Hindi', val);
                                                                                }}></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Father's Name:&nbsp;</Label>
                                                                            <TextField className='form-control' id='FatherName' name='FatherName'
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('FatherName', val);
                                                                                }}></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Mother's Name:&nbsp;</Label>
                                                                            <TextField className='form-control' id='MotherName' name='MotherName'
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('MotherName', val);
                                                                                }}></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Gender:&nbsp;</Label>
                                                                            <Dropdown placeHolder='Select Gender' className='form-control' id='Gender' options={
                                                                                (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.GenderChoices : []
                                                                            } required={true}
                                                                                onFocus={(e) => {
                                                                                    formik.setFieldTouched('Gender', true);
                                                                                    // console.log(formik);
                                                                                }}
                                                                                onBlur={(e) => {
                                                                                    formik.setFieldTouched('Gender', true);
                                                                                    // console.log(formik);
                                                                                }}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('Gender', val.key);
                                                                                }}
                                                                                errorMessage={formik.errors.Gender && formik.touched.Gender ? formik.errors.Gender as string : ''} />
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Blood Group:&nbsp;</Label>
                                                                            <Dropdown placeHolder='Select Blood Group' className='form-control'
                                                                                options={(this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.BloodGroupChoices : []} />
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Date of Birth:&nbsp;</Label>
                                                                            <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date' isRequired={true}
                                                                                value={formik.values.DOB}
                                                                                maxDate={new Date(new Date().getFullYear() - 21, new Date().getMonth(), new Date().getDate())}
                                                                                initialPickerDate={new Date(new Date().getFullYear() - 21, new Date().getMonth(), new Date().getDate())}
                                                                                onSelectDate={(val) => {
                                                                                    // formik.setFieldTouched('DOB', true);
                                                                                    formik.setFieldValue('DOB', val);
                                                                                }}
                                                                                onAfterMenuDismiss={() => {
                                                                                    formik.setFieldTouched('DOB', true);
                                                                                }}
                                                                            ></DatePicker>
                                                                            <ErrorMessage name='DOB' component='div' className='error-message' />
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Religion:&nbsp;</Label>
                                                                            <TextField className='form-control' id='Religion' name='Religion' required={true}
                                                                                onFocus={(e) => {
                                                                                    formik.setFieldTouched('Religion', true);
                                                                                    // console.log(formik);
                                                                                }}
                                                                                onBlur={(e) => {
                                                                                    formik.setFieldTouched('Religion', true);
                                                                                    // console.log(formik);
                                                                                }}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('Religion', val);
                                                                                }}
                                                                                errorMessage={formik.errors.Religion && formik.touched.Religion ? formik.errors.Religion as string : ''}
                                                                            ></TextField>
                                                                            <ErrorMessage name='Religion' component='div' className='error-message' />
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Category [Caste]:&nbsp;</Label>
                                                                            <TextField className='form-control' id='Caste' name='Caste' required={true}
                                                                                onFocus={(e) => {
                                                                                    formik.setFieldTouched('Caste', true);
                                                                                    // console.log(formik);
                                                                                }}
                                                                                onBlur={(e) => {
                                                                                    formik.setFieldTouched('Caste', true);
                                                                                    // console.log(formik);
                                                                                }}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('Caste', val);
                                                                                }}
                                                                                errorMessage={formik.errors.Caste && formik.touched.Caste ? formik.errors.Caste as string : ''}
                                                                            ></TextField>
                                                                            <ErrorMessage name='Caste' component='div' className='error-message' />
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Marital Status:&nbsp;</Label>
                                                                            <Dropdown placeHolder='Select Marital Status' className='form-control' options={
                                                                                (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.MaritalStatusChoices : []
                                                                            } required={true}
                                                                                onFocus={(e) => {
                                                                                    formik.setFieldTouched('MartialStatus', true);
                                                                                    // console.log(formik);
                                                                                }}
                                                                                onBlur={(e) => {
                                                                                    formik.setFieldTouched('MartialStatus', true);
                                                                                    // console.log(formik);
                                                                                }}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('MartialStatus', val.key);
                                                                                }}
                                                                                errorMessage={formik.errors.MartialStatus && formik.touched.MartialStatus ? formik.errors.MartialStatus as string : ''} />
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Phone:&nbsp;</Label>
                                                                            <TextField className='form-control'></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Mobile:&nbsp;</Label>
                                                                            <TextField className='form-control' id='MobileNo_x002e_' name='MobileNo_x002e_' required={true}
                                                                                onFocus={(e) => {
                                                                                    formik.setFieldTouched('MobileNo_x002e_', true);
                                                                                    // console.log(formik);
                                                                                }}
                                                                                onBlur={(e) => {
                                                                                    formik.setFieldTouched('MobileNo_x002e_', true);
                                                                                    // console.log(formik);
                                                                                }}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('MobileNo_x002e_', val);
                                                                                }}
                                                                                errorMessage={formik.errors.MobileNo_x002e_ && formik.touched.MobileNo_x002e_ ? formik.errors.MobileNo_x002e_ as string : ''}
                                                                            ></TextField>
                                                                            <ErrorMessage name='MobileNo_x002e_' component='div' className='error-message' />
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Corporate Email:&nbsp;</Label>
                                                                            <TextField className='form-control' id='CompanyEmail' name='CompanyEmail' required={true}
                                                                                onFocus={(e) => {
                                                                                    formik.setFieldTouched('CompanyEmail', true);
                                                                                    // console.log(formik);
                                                                                }}
                                                                                onBlur={(e) => {
                                                                                    formik.setFieldTouched('CompanyEmail', true);
                                                                                    // console.log(formik);
                                                                                }}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('CompanyEmail', val);
                                                                                }}
                                                                                errorMessage={formik.errors.CompanyEmail && formik.touched.CompanyEmail ? formik.errors.CompanyEmail as string : ''}
                                                                            ></TextField>
                                                                            <ErrorMessage name='CompanyEmail' component='div' className='error-message' />
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Alternate Email:&nbsp;</Label>
                                                                            <TextField className='form-control' id='AlternateEmail' name='AlternateEmail' required={true}
                                                                                onFocus={(e) => {
                                                                                    formik.setFieldTouched('AlternateEmail', true);
                                                                                    // console.log(formik);
                                                                                }}
                                                                                onBlur={(e) => {
                                                                                    formik.setFieldTouched('AlternateEmail', true);
                                                                                    // console.log(formik);
                                                                                }}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('AlternateEmail', val);
                                                                                }}
                                                                                errorMessage={formik.errors.AlternateEmail && formik.touched.AlternateEmail ? formik.errors.AlternateEmail as string : ''}
                                                                            ></TextField>
                                                                            <ErrorMessage name='AlternateEmail' component='div' className='error-message' />
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
                                                                        <TextField className='form-control' id='Nationality' name='Nationality' required={true}
                                                                            onFocus={(e) => {
                                                                                formik.setFieldTouched('Nationality', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onBlur={(e) => {
                                                                                formik.setFieldTouched('Nationality', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('Nationality', val);
                                                                            }}
                                                                            errorMessage={formik.errors.Nationality && formik.touched.Nationality ? formik.errors.Nationality as string : ''}
                                                                        ></TextField>
                                                                        <ErrorMessage name='Nationality' component='div' className='error-message' />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Aadhaar Card No.:&nbsp;</Label>
                                                                        <TextField className='form-control' id='AadharCardNo' name='AadharCardNo' required={true}
                                                                            onFocus={(e) => {
                                                                                formik.setFieldTouched('AadharCardNo', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onBlur={(e) => {
                                                                                formik.setFieldTouched('AadharCardNo', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('AadharCardNo', val);
                                                                            }}
                                                                            errorMessage={formik.errors.AadharCardNo && formik.touched.AadharCardNo ? formik.errors.AadharCardNo as string : ''}
                                                                        ></TextField>
                                                                        <ErrorMessage name='AadharCardNo' component='div' className='error-message' />
                                                                        <input type='file' />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Voter ID No.:&nbsp;</Label>
                                                                        <TextField className='form-control'></TextField>
                                                                        <input type='file' />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>PAN No.:&nbsp;</Label>
                                                                        <TextField className='form-control' id='PAN_x0020_No' name='PAN_x0020_No' required={true}
                                                                            onFocus={(e) => {
                                                                                formik.setFieldTouched('PAN_x0020_No', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onBlur={(e) => {
                                                                                formik.setFieldTouched('PAN_x0020_No', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('PAN_x0020_No', val);
                                                                            }}
                                                                            errorMessage={formik.errors.PAN_x0020_No && formik.touched.PAN_x0020_No ? formik.errors.PAN_x0020_No as string : ''}
                                                                        ></TextField>
                                                                        <ErrorMessage name='PAN_x0020_No' component='div' className='error-message' />
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
                                                                        <Dropdown placeHolder='Select Office' className='form-control' options={
                                                                            (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.OfficeChoices : []
                                                                        } required={true}
                                                                            onFocus={(e) => {
                                                                                formik.setFieldTouched('OfficeLocationId', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onBlur={(e) => {
                                                                                formik.setFieldTouched('OfficeLocationId', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('OfficeLocationId', val.key);
                                                                            }}
                                                                            errorMessage={formik.errors.OfficeLocationId && formik.touched.OfficeLocationId ? formik.errors.OfficeLocationId as string : ''} />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Role:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Role' className='form-control' options={
                                                                            (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.RoleChoices : []
                                                                        } required={true}
                                                                            onFocus={(e) => {
                                                                                formik.setFieldTouched('Role', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onBlur={(e) => {
                                                                                formik.setFieldTouched('Role', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('Role', val.key);
                                                                            }}
                                                                            errorMessage={formik.errors.Role && formik.touched.Role ? formik.errors.Role as string : ''} />
                                                                    </div>
                                                                    {/* <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Employee Type:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Bank' className='form-control' options={
                                                                            [
                                                                                { key: 'A', text: 'ICICI' },
                                                                                { key: 'B', text: 'HDFC' }
                                                                            ]
                                                                        } />
                                                                    </div> */}
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Scale:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Scale' className='form-control' options={
                                                                            (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.ScaleChoices : []
                                                                        } required={true}
                                                                            onFocus={(e) => {
                                                                                formik.setFieldTouched('ScaleId', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onBlur={(e) => {
                                                                                formik.setFieldTouched('ScaleId', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('ScaleId', val.key);
                                                                            }}
                                                                            errorMessage={formik.errors.ScaleId && formik.touched.ScaleId ? formik.errors.ScaleId as string : ''}
                                                                        />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Grade:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Grade' className='form-control' options={
                                                                            (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.GradeChoices : []
                                                                        } required={true}
                                                                            onFocus={(e) => {
                                                                                formik.setFieldTouched('GardeId', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onBlur={(e) => {
                                                                                formik.setFieldTouched('GardeId', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('GardeId', val.key);
                                                                            }}
                                                                            errorMessage={formik.errors.GardeId && formik.touched.GardeId ? formik.errors.GardeId as string : ''}
                                                                        />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Designation:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Designation' className='form-control' options={
                                                                            (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.DesignationChoices : []
                                                                        } required={true}
                                                                            onFocus={(e) => {
                                                                                formik.setFieldTouched('DesignationId', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onBlur={(e) => {
                                                                                formik.setFieldTouched('DesignationId', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('DesignationId', val.key);
                                                                            }}
                                                                            errorMessage={formik.errors.DesignationId && formik.touched.DesignationId ? formik.errors.DesignationId as string : ''}
                                                                        />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Pay Scale:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Pay Scale' className='form-control' options={
                                                                            (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.PayScaleChoices : []
                                                                        } required={true}
                                                                            onFocus={(e) => {
                                                                                formik.setFieldTouched('PayscaleId', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onBlur={(e) => {
                                                                                formik.setFieldTouched('PayscaleId', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('PayscaleId', val.key);
                                                                            }}
                                                                            errorMessage={formik.errors.PayscaleId && formik.touched.PayscaleId ? formik.errors.PayscaleId as string : ''}
                                                                        />
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
                                                                        <Dropdown placeHolder='Select Group' className='form-control' multiSelect={true} options={
                                                                            (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.SubGroupChoices : []
                                                                        } required={true}
                                                                            onFocus={(e) => {
                                                                                formik.setFieldTouched('SubGroupId', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onBlur={(e) => {
                                                                                formik.setFieldTouched('SubGroupId', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('SubGroupId', val.key);
                                                                            }}
                                                                            errorMessage={formik.errors.SubGroupId && formik.touched.SubGroupId ? formik.errors.SubGroupId as string : ''}
                                                                        />
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
                                                                        <Dropdown placeHolder='Select Current Office' className='form-control' options={
                                                                            (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.OfficeChoices : []
                                                                        } required={true}
                                                                            onFocus={(e) => {
                                                                                formik.setFieldTouched('CurrentOfficeLocationId', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onBlur={(e) => {
                                                                                formik.setFieldTouched('CurrentOfficeLocationId', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('CurrentOfficeLocationId', val.key);
                                                                            }}
                                                                            errorMessage={formik.errors.CurrentOfficeLocationId && formik.touched.CurrentOfficeLocationId ? formik.errors.CurrentOfficeLocationId as string : ''}
                                                                        />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Effective Date:&nbsp;</Label>
                                                                        <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date' isRequired={true} value={formik.values.EffectiveDate}
                                                                            maxDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())}
                                                                            onSelectDate={(val) => {
                                                                                // formik.setFieldTouched('DOB', true);
                                                                                formik.setFieldValue('EffectiveDate', val);
                                                                            }}
                                                                            onAfterMenuDismiss={() => {
                                                                                formik.setFieldTouched('EffectiveDate', true);
                                                                            }}
                                                                        ></DatePicker>
                                                                        <ErrorMessage name='EffectiveDate' component='div' className='error-message' />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Deputation Office Location:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Deputation Office' className='form-control' options={
                                                                            (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.OfficeChoices : []
                                                                        } required={true}
                                                                            onFocus={(e) => {
                                                                                formik.setFieldTouched('DeputationOfficeLocationId', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onBlur={(e) => {
                                                                                formik.setFieldTouched('DeputationOfficeLocationId', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('DeputationOfficeLocationId', val.key);
                                                                            }}
                                                                            errorMessage={formik.errors.DeputationOfficeLocationId && formik.touched.DeputationOfficeLocationId ? formik.errors.DeputationOfficeLocationId as string : ''}
                                                                        />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Shift Allocated:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Shift Allocated' className='form-control' options={
                                                                            (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.ShiftAllocatedChoices : []
                                                                        } required={true}
                                                                            onFocus={(e) => {
                                                                                formik.setFieldTouched('ShiftAllocatedId', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onBlur={(e) => {
                                                                                formik.setFieldTouched('ShiftAllocatedId', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('ShiftAllocatedId', val.key);
                                                                            }}
                                                                            errorMessage={formik.errors.ShiftAllocatedId && formik.touched.ShiftAllocatedId ? formik.errors.ShiftAllocatedId as string : ''}
                                                                        />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Shift Effective From:&nbsp;</Label>
                                                                        <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date' isRequired={true}
                                                                            value={formik.values.ShiftEffectiveFrom}
                                                                            maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}
                                                                            onSelectDate={(val) => {
                                                                                // formik.setFieldTouched('DOB', true);
                                                                                formik.setFieldValue('ShiftEffectiveFrom', val);
                                                                            }}
                                                                            onAfterMenuDismiss={() => {
                                                                                formik.setFieldTouched('ShiftEffectiveFrom', true);
                                                                            }}
                                                                        ></DatePicker>
                                                                        <ErrorMessage name='ShiftEffectiveFrom' component='div' className='error-message' />
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
                                                                                this._getPeoplePickerItems(items, formik, 'ReportingManagerId', 'ReportingManager');
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
                                                                                this._getPeoplePickerItems(items, formik, 'AlternateReportingManagerId', 'AlternateReportingManager');
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
                                                                                this._getPeoplePickerItems(items, formik, 'LeaveLevel1Id', 'LeaveLevel1');
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
                                                                                this._getPeoplePickerItems(items, formik, 'LeaveLevel2Id', 'LeaveLevel2');
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
                                                                        <Dropdown placeHolder='Select Type' className='form-control' options={
                                                                            (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.TrainingCertificationChoices : []
                                                                        } required={true}
                                                                            onFocus={(e) => {
                                                                                formik.setFieldTouched('ExperienceInId', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onBlur={(e) => {
                                                                                formik.setFieldTouched('ExperienceInId', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('ExperienceInId', val.key);
                                                                            }}
                                                                            errorMessage={formik.errors.ExperienceInId && formik.touched.ExperienceInId ? formik.errors.ExperienceInId as string : ''}
                                                                         />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Training Certifying Institute:&nbsp;</Label>
                                                                        <TextField className='form-control' id='Institute' name='Institute' required={true}
                                                                            onFocus={(e) => {
                                                                                formik.setFieldTouched('Institute', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onBlur={(e) => {
                                                                                formik.setFieldTouched('Institute', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('Institute', val);
                                                                            }}
                                                                            errorMessage={formik.errors.Institute && formik.touched.Institute ? formik.errors.Institute as string : ''}
                                                                        ></TextField>
                                                                        <ErrorMessage name='Institute' component='div' className='error-message' />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Traning Cost:&nbsp;</Label>
                                                                        <TextField className='form-control' id='TrainingCost' name='TrainingCost' required={true}
                                                                            onFocus={(e) => {
                                                                                formik.setFieldTouched('TrainingCost', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onBlur={(e) => {
                                                                                formik.setFieldTouched('TrainingCost', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('TrainingCost', val);
                                                                            }}
                                                                            errorMessage={formik.errors.TrainingCost && formik.touched.TrainingCost ? formik.errors.TrainingCost as string : ''}
                                                                        ></TextField>
                                                                        <ErrorMessage name='TrainingCost' component='div' className='error-message' />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Location:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Bank' className='form-control' options={
                                                                            (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.TrainingNCertificationLocationChoices : []
                                                                        } required={true}
                                                                            onFocus={(e) => {
                                                                                formik.setFieldTouched('Location', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onBlur={(e) => {
                                                                                formik.setFieldTouched('Location', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('Location', val.key);
                                                                            }}
                                                                            errorMessage={formik.errors.Location && formik.touched.Location ? formik.errors.Location as string : ''}
                                                                          />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Description:&nbsp;</Label>
                                                                        <TextField className='form-control' id='Description' name='Description' required={true}
                                                                            onFocus={(e) => {
                                                                                formik.setFieldTouched('Description', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onBlur={(e) => {
                                                                                formik.setFieldTouched('Description', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('Description', val);
                                                                            }}
                                                                            errorMessage={formik.errors.Description && formik.touched.Description ? formik.errors.Description as string : ''}
                                                                        ></TextField>
                                                                        <ErrorMessage name='Description' component='div' className='error-message' />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Start Date&nbsp;</Label>
                                                                        <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date' isRequired={true}
                                                                            // value={formik.values.TrainingNCertificateColl.StartDate}
                                                                            maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}
                                                                            onSelectDate={(val) => {
                                                                                // formik.setFieldTouched('StartDate', true);
                                                                                formik.setFieldValue('StartDate', val);
                                                                            }}
                                                                            onAfterMenuDismiss={() => {
                                                                                formik.setFieldTouched('StartDate', true);
                                                                            }}
                                                                        ></DatePicker>
                                                                        <ErrorMessage name='StartDate' component='div' className='error-message' />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>End Date&nbsp;</Label>
                                                                        <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date' isRequired={true}
                                                                            // value={formik.values.TrainingNCertificateColl.EndDate}
                                                                            maxDate={new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate())}
                                                                            onSelectDate={(val) => {
                                                                                // formik.setFieldTouched('EndDate', true);
                                                                                formik.setFieldValue('EndDate', val);
                                                                            }}
                                                                            onAfterMenuDismiss={() => {
                                                                                formik.setFieldTouched('EndDate', true);
                                                                            }}
                                                                        ></DatePicker>
                                                                        <ErrorMessage name='EndDates' component='div' className='error-message' />
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
