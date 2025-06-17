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

import { Formik, FormikProps, ErrorMessage, Field, FormikActions, FormikValues, FieldArray } from 'formik';
import * as yup from 'yup';

import cupOps from '../../../../services/bal/CreateUserProfileOps';

import { IUserProfile, IUserProfileLoadData } from '../../../../services/interface/IUserProfile';
import { ITrainingNCertification, TrainingNCertification } from '../../../../services/interface/ITrainingNCertification';
import { Link } from 'office-ui-fabric-react/lib/Link';
import Helper from '../../../../services/utilities/Helper';
import { IDropdownOption } from 'office-ui-fabric-react';

export default class AddGeneralProfile extends React.Component<IEmployeeMangementProps, ICreateUserProfile> {
    // public userProfileLoadData: IUserProfileLoadData;
    public isOnEmpId: boolean = false;
    public formikInstance: Formik;
    public isFormValid: boolean = false;
    public InitializedUserProfile: IUserProfile;
    constructor(props: IEmployeeMangementProps) {
        super(props);
        this.formikInstance = null;
        // this.state = { userProfile: InitializedUserProfile, userProfileLoadData: props.sharedData.userProfileLoadData };
        this.state = { userProfile: props.sharedData.userProfile, userProfileLoadData: props.sharedData.userProfileLoadData };
        this.setState({ userProfile: { SubGroupId: props.sharedData.userProfile.SubGroupId } });
        this.InitializedUserProfile = props.sharedData.userProfile;
        this.InitializedUserProfile.SubGroupId = props.sharedData.userProfile.SubGroupId['results'] ? props.sharedData.userProfile.SubGroupId['results'] : props.sharedData.userProfile.SubGroupId as [];
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
        // if (this.state.userProfile.SubGroupId['results']) {
        //     this.setState({ userProfile: { SubGroupId: this.state.userProfile.SubGroupId['results'] } })
        // }

        // cupOps.getUserProfileDataOnLoad(this.props).then((resp) => {
        //     this.setState({ userProfileLoadData: resp });
        //     // console.log(resp);
        // });
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
            , EmployeeDocuments: yup.array().of(yup.object().shape({
                Title: yup.string(),
                Document: yup.mixed().when('Title', {
                    is: (Title) => Title && Title.trim() !== ""
                    , then: yup.mixed().test(
                        "fileRequired",
                        "Document is required",
                        (file) => {
                            if (file && file.length > 0) {
                                return true;
                            } else {
                                // document.getElementById('aadharCardDoc').focus();
                                return false;
                            }
                        })
                        .test(
                            "fileType",
                            "Only jpg, jpeg, png and PDFs are allowed.",
                            (file) => {
                                // If file is not selected, this test will not pass because of .required above.
                                if (file && file.length > 0) {
                                    // If your file input supports multiple files, check the first file, e.g., value[0]
                                    return [
                                        "image/jpeg",
                                        "image/jpg",
                                        "image/png",
                                        "application/pdf"
                                    ].includes(file[0].type);
                                } else {
                                    return true;
                                }
                            }
                        )
                        .test("fileName",
                            "Please avoid special characters in document name",
                            (file) => {
                                if (file && file.length > 0) {
                                    let spcPattern = new RegExp(/[!@#$%^&*(),+=;'?":[\]{}|/<>\\]/g);
                                    if (!spcPattern.test(file[0].name)) {
                                        return true;
                                    }
                                    else {
                                        // document.getElementById('aadharCardDoc').focus();
                                        return false;
                                    }
                                }
                                else { return true; }
                            })
                        .test(
                            "fileSize",
                            "Please upload file of size less than 5 MB",
                            (file) => {
                                if (file && file.length > 0) {
                                    const sizeInBytes = 5242880;
                                    //console.log(file);
                                    if (file[0].size <= sizeInBytes) {
                                        return true;
                                    } else {
                                        // document.getElementById('aadharCardDoc').focus();
                                        return false;
                                    }
                                }
                                else { return true; }
                            })
                    , otherwise: yup.mixed()
                })
            }))
            , PAN_x0020_No: yup.string().trim().required('PAN No is required.')
            , DrivingLicenseNumber: yup.string()
            , DrivingLicenseExpiryDate: yup.date()
                .transform((value, originalValue) => {
                    return originalValue === "" ? null : value;
                })
                .nullable()
                .when('DrivingLicenseNumber', {
                    is: (DrivingLicenseNumber) => DrivingLicenseNumber && DrivingLicenseNumber.trim() !== ""
                    , then: yup.date().required('Date is required.').typeError('A valid date is required')
                    , otherwise: yup.date()
                })
            , PassportNo_x002e_: yup.string()
            , PassportIssueDate: yup.date()
                .transform((value, originalValue) => {
                    return originalValue === "" ? null : value;
                })
                .nullable()
                .when('PassportNo_x002e_', {
                    is: (PassportNo_x002e_) => PassportNo_x002e_ && PassportNo_x002e_.trim() !== ""
                    , then: yup.date().required('Date is required.').typeError('A valid date is required')
                    , otherwise: yup.date()
                })
            , PassportExpiryDate: yup.date()
                .transform((value, originalValue) => {
                    return originalValue === "" ? null : value;
                })
                .nullable()
                .when('PassportNo_x002e_', {
                    is: (PassportNo_x002e_) => PassportNo_x002e_ && PassportNo_x002e_.trim() !== ""
                    , then: yup.date().required('Date is required.').typeError('A valid date is required')
                    , otherwise: yup.date()
                })
            , OfficeLocationId: yup.string().trim().required('Office Location is required.')
            , Role: yup.string().trim().required('Role is required.')
            , ScaleId: yup.string().trim().required('Scale is required.')
            , GardeId: yup.string().trim().required('Garde is required.')
            , DesignationId: yup.string().trim().required('Designation is required.')
            , PayscaleId: yup.string().trim().required('Payscale is required.')
            , SubGroupId: yup.array().min(1, 'Please add at least one Group').required('Group is required')
            , CurrentOfficeLocationId: yup.string().trim().required('Current Office Location is required.')
            , EffectiveDate: yup.date().nullable().required('Effective Date is required.').typeError('A valid date is required')
            , DeputationOfficeLocationId: yup.string().trim().required('Deputation Office Location is required.')
            , ShiftAllocatedId: yup.string().trim().required('ShiftAllocated is required.')
            , ShiftEffectiveFrom: yup.date().nullable().required('Shift Effective From is required.').typeError('A valid date is required')
            , LeaveLevel1Id: yup.string().required('Valid user is required.')
            , LeaveLevel2Id: yup.string().required('Valid user is required.')
            , TrainingNCertificate: yup.array().of(yup.object().shape({
                ExperienceInId: yup.string().required('Type is required')
                , Institute: yup.string().required('Institute is required')
                , TrainingCost: yup.number().typeError('Training Cost should be a number').required('Training Cost is required')
                , Location: yup.string().required('Location is required')
                , Description: yup.string().required('Description is required')
                , StartDate: yup.date().nullable().required('Start Date is required.').typeError('A valid date is required')
                , EndDate: yup.date().nullable().required('End Date is required.').typeError('A valid date is required')
            }))
        });

        return (
            <Formik ref={this.setFormikInstance} initialValues={this.InitializedUserProfile} validationSchema={validate}
                enableReinitialize={false} validateOnBlur={true} validateOnChange={true}
                onSubmit={(values, actions) => {
                    // console.log('Submitted:', values);
                    // this.onProfileSubmit(values, actions);
                }}>
                {(formik) => (
                    <form onSubmit={formik.handleSubmit} onBlur={(ev) => {
                        this.props.onFormValidationChange(formik.isValid, formik.values, 'General');
                    }}>
                        {/* {(formik.isValid && Object.keys(formik.errors).length === 0) && (this.props.onFormValidationChange(formik.isValid, formik.values))} */}
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
                                {/* <pre>{JSON.stringify({ IsValid: formik.isValid, Errors: Object.keys(formik.errors).length }, null, 2)}</pre> */}
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
                                                                            <TextField className='form-control' name='Title' id='Title' required={true} value={formik.values.Title}
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
                                                                                context={this.props.currentSPContext} personSelectionLimit={1} tooltipDirectional={1}
                                                                                selectedItems={(items) => {
                                                                                    this._getPeoplePickerItems(items, formik, 'UserNameId', 'UserName');
                                                                                    // formik.setFieldValue('Level1Approver', items);
                                                                                }}
                                                                                principalTypes={[PrincipalType.User]} ensureUser={true} resolveDelay={1000}
                                                                                placeholder='Enter names or email addresses...'
                                                                                errorMessage='Please enter valid user'
                                                                                isRequired={true} webAbsoluteUrl={this.props.currentSPContext.pageContext.web.absoluteUrl}
                                                                                showRequiredError={true} defaultSelectedUsers={[this.InitializedUserProfile.UserName.Email]}
                                                                            />
                                                                            <ErrorMessage name='UserNameId' component='div' className='error-message' />
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Ext:&nbsp;</Label>
                                                                            <TextField className='form-control' id='Extension' name='Extension' value={formik.values.Extension}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('Extension', val);
                                                                                }}></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Employee Type:&nbsp;</Label>
                                                                            <Dropdown className='form-control' placeHolder='Select Type' id='EmployeeTypeId' options={
                                                                                (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.EmployeeTypeChoices : []
                                                                            } required={true} selectedKey={formik.values.EmployeeTypeId}
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
                                                                            } required={true} selectedKey={formik.values.EmployeeTitle}
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
                                                                            <TextField className='form-control' id='FirstName' name='FirstName' required={true} value={formik.values.FirstName}
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
                                                                            <TextField className='form-control' id='MiddleName' name='MiddleName' required={true} value={formik.values.MiddleName}
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
                                                                            <TextField className='form-control' id='LastName' name='LastName' required={true} value={formik.values.LastName}
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
                                                                            <TextField className='form-control' id='FirstName_Hindi' name='FirstName_Hindi' value={formik.values.FirstName_Hindi}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('FirstName_Hindi', val);
                                                                                }}></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Middle Name - हिंदी:&nbsp;</Label>
                                                                            <TextField className='form-control' id='MiddleName_Hindi' name='MiddleName_Hindi' value={formik.values.MiddleName_Hindi}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('MiddleName_Hindi', val);
                                                                                }}></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Last Name - हिंदी:&nbsp;</Label>
                                                                            <TextField className='form-control' id='LastName_Hindi' name='LastName_Hindi' value={formik.values.LastName_Hindi}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('LastName_Hindi', val);
                                                                                }}></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Father's Name:&nbsp;</Label>
                                                                            <TextField className='form-control' id='FatherName' name='FatherName' value={formik.values.FatherName}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('FatherName', val);
                                                                                }}></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Mother's Name:&nbsp;</Label>
                                                                            <TextField className='form-control' id='MotherName' name='MotherName' value={formik.values.MotherName}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('MotherName', val);
                                                                                }}></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Gender:&nbsp;</Label>
                                                                            <Dropdown placeHolder='Select Gender' className='form-control' id='Gender' options={
                                                                                (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.GenderChoices : []
                                                                            } required={true} selectedKey={formik.values.Gender}
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
                                                                            <Dropdown placeHolder='Select Blood Group' className='form-control' id='BloodGroup'
                                                                                options={(this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.BloodGroupChoices : []}
                                                                                onChanged={(val) => { formik.setFieldValue('BloodGroup', val.key); }} selectedKey={formik.values.BloodGroup}
                                                                            />
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
                                                                            <TextField className='form-control' id='Religion' name='Religion' required={true} value={formik.values.Religion}
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
                                                                            <TextField className='form-control' id='Caste' name='Caste' required={true} value={formik.values.Caste}
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
                                                                            <Dropdown placeHolder='Select Marital Status' className='form-control' id='MartialStatus' options={
                                                                                (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.MaritalStatusChoices : []
                                                                            } required={true} selectedKey={formik.values.MartialStatus}
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
                                                                            <TextField className='form-control' id='Phone_x0020_No' name='Phone_x0020_No' value={formik.values.Phone_x0020_No}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('Phone_x0020_No', val);
                                                                                }}></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Mobile:&nbsp;</Label>
                                                                            <TextField className='form-control' id='MobileNo_x002e_' name='MobileNo_x002e_' required={true}
                                                                                value={formik.values.MobileNo_x002e_}
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
                                                                                value={formik.values.CompanyEmail}
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
                                                                                value={formik.values.AlternateEmail}
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
                                                                        {/* <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Office Extension:&nbsp;</Label>
                                                                            <TextField className='form-control'></TextField>
                                                                        </div> */}
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
                                                                            <TextField className='form-control' id='EmployeeName' name='EmployeeName' value={formik.values.EmployeeName}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('EmployeeName', val);
                                                                                }}></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Permanent Address:&nbsp;</Label>
                                                                            <TextField className='form-control' multiline={true} id='PermanentAddress' name='PermanentAddress'
                                                                                value={formik.values.PermanentAddress}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('PermanentAddress', val);
                                                                                }}></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Name (Family Member):&nbsp;</Label>
                                                                            <TextField className='form-control' id='Name1' name='Name1' value={formik.values.Name1}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('Name1', val);
                                                                                }}></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Contact (Family Member):&nbsp;</Label>
                                                                            <TextField className='form-control' id='EmergencyContactNumber1' name='EmergencyContactNumber1'
                                                                                value={formik.values.EmergencyContactNumber1}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('EmergencyContactNumber1', val);
                                                                                }}></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Relation (Family Member):&nbsp;</Label>
                                                                            <TextField className='form-control' id='Relationship1' name='Relationship1' value={formik.values.Relationship1}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('Relationship1', val);
                                                                                }}></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Name (Not Family Member):&nbsp;</Label>
                                                                            <TextField className='form-control' id='Name2' name='Name2' value={formik.values.Name2}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('Name2', val);
                                                                                }}></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Contact (Not Family Member):&nbsp;</Label>
                                                                            <TextField className='form-control' id='EmergencyContactNumber2' name='EmergencyContactNumber2'
                                                                                value={formik.values.EmergencyContactNumber2}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('EmergencyContactNumber2', val);
                                                                                }}></TextField>
                                                                        </div>
                                                                        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-2 profile-body-item'>
                                                                            <Label>Relation (Not Family Member):&nbsp;</Label>
                                                                            <TextField className='form-control' id='Relationship2' name='Relationship2' value={formik.values.Relationship2}
                                                                                onChanged={(val) => {
                                                                                    formik.setFieldValue('Relationship2', val);
                                                                                }}></TextField>
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
                                                                            value={formik.values.Nationality}
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
                                                                        <TextField className='form-control' id='AadharCardNo' name='AadharCardNo' required={true} value={formik.values.AadharCardNo}
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
                                                                                formik.setFieldValue(`EmployeeDocuments.${0}.Title`, val);
                                                                                // console.log(this.InitializedUserProfile.EmployeeDocuments)
                                                                            }}
                                                                            errorMessage={formik.errors.AadharCardNo && formik.touched.AadharCardNo ? formik.errors.AadharCardNo as string : ''}
                                                                        ></TextField>
                                                                        <ErrorMessage name='AadharCardNo' component='div' className='error-message' />
                                                                        <input type='file' id={`EmployeeDocuments.${0}.Document`} name={`EmployeeDocuments.${0}.Document`} onBlur={formik.handleBlur}
                                                                            onChange={({ currentTarget }) => {
                                                                                const files = currentTarget.files;
                                                                                formik.setFieldValue(`EmployeeDocuments.${0}.Category`, 'Aadhaar');
                                                                                if (files.length > 0) {
                                                                                    formik.setFieldValue(`EmployeeDocuments.${0}.Document`, files);
                                                                                }
                                                                                else {
                                                                                    formik.setFieldValue(`EmployeeDocuments.${0}.Document`, null);
                                                                                }
                                                                            }} />
                                                                        {formik.values.EmployeeDocuments[0].Document ? formik.values.EmployeeDocuments[0].Document[0].name : ''}
                                                                        <ErrorMessage name={`EmployeeDocuments.${0}.Document`} component='div' className='error-message' />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Voter ID No.:&nbsp;</Label>
                                                                        <TextField className='form-control' id='VoterID_x0020_No' name='VoterID_x0020_No' value={formik.values.VoterID_x0020_No}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('VoterID_x0020_No', val);
                                                                                formik.setFieldValue(`EmployeeDocuments.${1}.Title`, val);
                                                                            }}></TextField>
                                                                        <input type='file' id={`EmployeeDocuments.${1}.Document`} name={`EmployeeDocuments.${1}.Document`} onBlur={formik.handleBlur}
                                                                            onChange={({ currentTarget }) => {
                                                                                const files = currentTarget.files;
                                                                                formik.setFieldValue(`EmployeeDocuments.${1}.Category`, 'Voter ID');
                                                                                if (files.length > 0) {
                                                                                    formik.setFieldValue(`EmployeeDocuments.${1}.Document`, files);
                                                                                }
                                                                                else {
                                                                                    formik.setFieldValue(`EmployeeDocuments.${1}.Document`, null);
                                                                                }
                                                                            }} />
                                                                        {formik.values.EmployeeDocuments[1].Document ? formik.values.EmployeeDocuments[1].Document[0].name : ''}
                                                                        <ErrorMessage name={`EmployeeDocuments.${1}.Document`} component='div' className='error-message' />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>PAN No.:&nbsp;</Label>
                                                                        <TextField className='form-control' id='PAN_x0020_No' name='PAN_x0020_No' required={true}
                                                                            value={formik.values.PAN_x0020_No}
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
                                                                                formik.setFieldValue(`EmployeeDocuments.${2}.Title`, val);
                                                                            }}
                                                                            errorMessage={formik.errors.PAN_x0020_No && formik.touched.PAN_x0020_No ? formik.errors.PAN_x0020_No as string : ''}
                                                                        ></TextField>
                                                                        <ErrorMessage name='PAN_x0020_No' component='div' className='error-message' />
                                                                        <input type='file' id={`EmployeeDocuments.${2}.Document`} name={`EmployeeDocuments.${2}.Document`} onBlur={formik.handleBlur}
                                                                            onChange={({ currentTarget }) => {
                                                                                const files = currentTarget.files;
                                                                                formik.setFieldValue(`EmployeeDocuments.${2}.Category`, 'PAN');
                                                                                if (files.length > 0) {
                                                                                    formik.setFieldValue(`EmployeeDocuments.${2}.Document`, files);
                                                                                }
                                                                                else {
                                                                                    formik.setFieldValue(`EmployeeDocuments.${2}.Document`, null);
                                                                                }
                                                                            }} />
                                                                        {formik.values.EmployeeDocuments[2].Document ? formik.values.EmployeeDocuments[2].Document[0].name : ''}
                                                                        <ErrorMessage name={`EmployeeDocuments.${2}.Document`} component='div' className='error-message' />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Driver License No.:&nbsp;</Label>
                                                                        <TextField className='form-control' id='DrivingLicenseNumber' name='DrivingLicenseNumber'
                                                                            value={formik.values.DrivingLicenseNumber}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('DrivingLicenseNumber', val);
                                                                                formik.setFieldValue(`EmployeeDocuments.${3}.Title`, val);
                                                                            }}></TextField>
                                                                        <input type='file' id={`EmployeeDocuments.${3}.Document`} name={`EmployeeDocuments.${3}.Document`} onBlur={formik.handleBlur}
                                                                            value={formik.values[`EmployeeDocuments.${3}.Document`]}
                                                                            onChange={({ currentTarget }) => {
                                                                                const files = currentTarget.files;
                                                                                formik.setFieldValue(`EmployeeDocuments.${3}.Category`, 'Driving License');
                                                                                if (files.length > 0) {
                                                                                    formik.setFieldValue(`EmployeeDocuments.${3}.Document`, files);
                                                                                }
                                                                                else {
                                                                                    formik.setFieldValue(`EmployeeDocuments.${3}.Document`, null);
                                                                                }
                                                                            }} />
                                                                        {formik.values.EmployeeDocuments[3].Document ? formik.values.EmployeeDocuments[3].Document[0].name : ''}
                                                                        <ErrorMessage name={`EmployeeDocuments.${3}.Document`} component='div' className='error-message' />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Expiry Date:&nbsp;</Label>
                                                                        <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date'
                                                                            maxDate={new Date(new Date().getFullYear() + 20, new Date().getMonth(), new Date().getDate())}
                                                                            value={formik.values.DrivingLicenseExpiryDate}
                                                                            onSelectDate={(val) => {
                                                                                // formik.setFieldTouched('DOB', true);
                                                                                formik.setFieldValue('DrivingLicenseExpiryDate', val);
                                                                            }}
                                                                            onAfterMenuDismiss={() => {
                                                                                formik.setFieldTouched('DrivingLicenseExpiryDate', true);
                                                                            }}
                                                                        ></DatePicker>
                                                                        <ErrorMessage name='DrivingLicenseExpiryDate' component='div' className='error-message' />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Passport No.:&nbsp;</Label>
                                                                        <TextField className='form-control' id='PassportNo_x002e_' name='PassportNo_x002e_' value={formik.values.PassportNo_x002e_}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('PassportNo_x002e_', val);
                                                                                formik.setFieldValue(`EmployeeDocuments.${4}.Title`, val);
                                                                            }}></TextField>
                                                                        <input type='file' id={`EmployeeDocuments.${4}.Document`} name={`EmployeeDocuments.${4}.Document`} onBlur={formik.handleBlur}
                                                                            value={formik.values[`EmployeeDocuments.${4}.Document`]}
                                                                            onChange={({ currentTarget }) => {
                                                                                const files = currentTarget.files;
                                                                                formik.setFieldValue(`EmployeeDocuments.${4}.Category`, 'Passport');
                                                                                if (files.length > 0) {
                                                                                    formik.setFieldValue(`EmployeeDocuments.${4}.Document`, files);
                                                                                }
                                                                                else {
                                                                                    formik.setFieldValue(`EmployeeDocuments.${4}.Document`, null);
                                                                                }
                                                                            }} />
                                                                        {formik.values.EmployeeDocuments[4].Document ? formik.values.EmployeeDocuments[4].Document[0].name : ''}
                                                                        <ErrorMessage name={`EmployeeDocuments.${4}.Document`} component='div' className='error-message' />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Issue Date:&nbsp;</Label>
                                                                        <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date'
                                                                            maxDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())}
                                                                            value={formik.values.PassportIssueDate}
                                                                            onSelectDate={(val) => {
                                                                                // formik.setFieldTouched('DOB', true);
                                                                                formik.setFieldValue('PassportIssueDate', val);
                                                                            }}
                                                                            onAfterMenuDismiss={() => {
                                                                                formik.setFieldTouched('PassportIssueDate', true);
                                                                            }}
                                                                        ></DatePicker>
                                                                        <ErrorMessage name='PassportIssueDate' component='div' className='error-message' />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Expiry Date:&nbsp;</Label>
                                                                        <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date'
                                                                            maxDate={new Date(new Date().getFullYear() + 10, new Date().getMonth(), new Date().getDate())}
                                                                            value={formik.values.PassportExpiryDate}
                                                                            onSelectDate={(val) => {
                                                                                // formik.setFieldTouched('DOB', true);
                                                                                formik.setFieldValue('PassportExpiryDate', val);
                                                                            }}
                                                                            onAfterMenuDismiss={() => {
                                                                                formik.setFieldTouched('PassportExpiryDate', true);
                                                                            }}
                                                                        ></DatePicker>
                                                                        <ErrorMessage name='PassportExpiryDate' component='div' className='error-message' />
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
                                                                        <Dropdown placeHolder='Select Bank' className='form-control' id='BankNameId'
                                                                            options={(this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.BankChoices : []}
                                                                            onChanged={(val) => { formik.setFieldValue('BankNameId', val.key); }}
                                                                            selectedKey={formik.values.BankNameId}
                                                                        />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Branch:&nbsp;</Label>
                                                                        <TextField className='form-control' id='BranchName' name='BranchName' value={formik.values.BranchName}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('BranchName', val);
                                                                            }}></TextField>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Account No.:&nbsp;</Label>
                                                                        <TextField className='form-control' id='AccountNo' name='AccountNo' value={formik.values.AccountNo}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('AccountNo', val);
                                                                            }}></TextField>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>IFSC Code:&nbsp;</Label>
                                                                        <TextField className='form-control' id='IFSCCode' name='IFSCCode' value={formik.values.IFSCCode}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('IFSCCode', val);
                                                                            }}></TextField>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>PF Number:&nbsp;</Label>
                                                                        <TextField className='form-control' id='PFNumber' name='PFNumber' value={formik.values.PFNumber}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('PFNumber', val);
                                                                            }}></TextField>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>ESIC Number:&nbsp;</Label>
                                                                        <TextField className='form-control' id='ESICNumber' name='ESICNumber' value={formik.values.ESICNumber}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('ESICNumber', val);
                                                                            }}></TextField>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>ESIC Remark:&nbsp;</Label>
                                                                        <TextField className='form-control' id='ESIC_x0020_Remarks' name='ESIC_x0020_Remarks' value={formik.values.ESIC_x0020_Remarks}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('ESIC_x0020_Remarks', val);
                                                                            }}></TextField>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>PRAN Number:&nbsp;</Label>
                                                                        <TextField className='form-control' id='PranNo' name='PranNo' value={formik.values.PranNo}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('PranNo', val);
                                                                            }}></TextField>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>NPS:&nbsp;</Label>
                                                                        <TextField className='form-control' id='NPS' name='NPS' value={formik.values.NPS}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('NPS', val);
                                                                            }}></TextField>
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
                                                                        <Dropdown placeHolder='Select Office' className='form-control' id='OfficeLocationId' options={
                                                                            (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.OfficeChoices : []
                                                                        } required={true} selectedKey={formik.values.OfficeLocationId}
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
                                                                        <Dropdown placeHolder='Select Role' className='form-control' id='Role' options={
                                                                            (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.RoleChoices : []
                                                                        } required={true} selectedKey={formik.values.Role}
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
                                                                        <Dropdown placeHolder='Select Scale' className='form-control' id='ScaleId' options={
                                                                            (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.ScaleChoices : []
                                                                        } required={true} selectedKey={formik.values.ScaleId}
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
                                                                        <Dropdown placeHolder='Select Grade' className='form-control' id='GardeId' options={
                                                                            (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.GradeChoices : []
                                                                        } required={true} selectedKey={formik.values.GardeId}
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
                                                                        <Dropdown placeHolder='Select Designation' className='form-control' id='DesignationId' options={
                                                                            (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.DesignationChoices : []
                                                                        } required={true} selectedKey={formik.values.DesignationId}
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
                                                                        <Dropdown placeHolder='Select Pay Scale' className='form-control' id='PayscaleId' options={
                                                                            (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.PayScaleChoices : []
                                                                        } required={true} selectedKey={formik.values.PayscaleId}
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
                                                                        {/* <Checkbox /> */}
                                                                        <Dropdown placeHolder='Select Weekly Off' className='form-control' id='WeeklyOff'
                                                                            selectedKeys={(typeof this.state.userProfile.WeeklyOff === 'string') ? this.state.userProfile.WeeklyOff.match(/.+?;#/g) : this.state.userProfile.WeeklyOff as []}
                                                                            multiSelect={true} options={
                                                                                (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.WeeklyOffChoices : []
                                                                            }
                                                                            onRenderTitle={(ddOptions: IDropdownOption[]) => {
                                                                                return <span>{ddOptions.filter(option => option.key !== '').map(val => val.text).join(', ')}</span>;
                                                                            }}
                                                                            onChanged={(option) => {
                                                                                if (option.key === '' && option.selected === true) {
                                                                                    this.InitializedUserProfile.WeeklyOff = this.state.userProfileLoadData.WeeklyOffChoices.map(opt => opt.key) as [];
                                                                                    this.setState({ userProfile: { WeeklyOff: this.InitializedUserProfile.WeeklyOff } });
                                                                                    // console.log(this.state.userProfile.SubGroupId.filter(val => val !== ''));
                                                                                } else if (option.key === '' && option.selected === false) {
                                                                                    this.InitializedUserProfile.WeeklyOff = [];
                                                                                    this.setState({ userProfile: { WeeklyOff: this.InitializedUserProfile.WeeklyOff } });
                                                                                    // console.log(this.state.userProfile.SubGroupId.filter(val => val !== ''));
                                                                                }
                                                                                else {
                                                                                    this.InitializedUserProfile.WeeklyOff = formik.values.WeeklyOff.length > 0 ? formik.values.WeeklyOff : [];
                                                                                    this.InitializedUserProfile.WeeklyOff = Helper.setMultiDropDownOptions(this.InitializedUserProfile.WeeklyOff as [], option);
                                                                                    this.setState({ userProfile: { WeeklyOff: this.InitializedUserProfile.WeeklyOff } }, () => {
                                                                                        console.log(this.state.userProfile.WeeklyOff);
                                                                                    });
                                                                                    // console.log(this.state.userProfile.SubGroupId.filter(val => val !== ''));
                                                                                }
                                                                                formik.setFieldValue('WeeklyOff', this.InitializedUserProfile.WeeklyOff.filter(val => val !== ''));
                                                                                console.log(this.state.userProfile.WeeklyOff);
                                                                            }}
                                                                        />
                                                                        {/* {(typeof this.state.userProfile.WeeklyOff === 'string') ? this.state.userProfile.WeeklyOff.match(/.+?;#/g) : this.state.userProfile.WeeklyOff as []} */}
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Is Active?:&nbsp;</Label>
                                                                        <Checkbox id='Active' name='Active' value={formik.values.Active} onChange={(val, checked) => {
                                                                            formik.setFieldValue('Active', checked);
                                                                        }} />
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
                                                                        <pre>{JSON.stringify({
                                                                            SubGroupId: this.state.userProfile.SubGroupId
                                                                            , Initialized: this.InitializedUserProfile.SubGroupId
                                                                            , formik: formik.values.SubGroupId
                                                                        }, null, 2)}</pre>

                                                                        <Dropdown placeHolder='Select Group' className='form-control' id='SubGroupId'
                                                                            selectedKeys={formik.values.SubGroupId as []}
                                                                            multiSelect={true} required={true} options={
                                                                                (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.SubGroupChoices : []
                                                                            }
                                                                            onRenderTitle={(ddOptions: IDropdownOption[]) => {
                                                                                return <span>{ddOptions.filter(option => option.key !== '').map(val => val.text).join(', ')}</span>;
                                                                            }}
                                                                            onFocus={(e) => {
                                                                                formik.setFieldTouched('SubGroupId', true);
                                                                                // formik.setFieldValue('SubGroupId', this.state.userProfile.SubGroupId['results'] ? this.state.userProfile.SubGroupId['results'] : this.state.userProfile.SubGroupId as [])
                                                                                // console.log(formik);
                                                                            }}
                                                                            onBlur={(e) => {
                                                                                formik.setFieldTouched('SubGroupId', true);
                                                                                // console.log(formik);
                                                                            }}
                                                                            onChanged={(option) => {
                                                                                if (option.key === '' && option.selected === true) {
                                                                                    this.InitializedUserProfile.SubGroupId = this.state.userProfileLoadData.SubGroupChoices.map(opt => opt.key) as [];
                                                                                    this.setState({ userProfile: { SubGroupId: this.InitializedUserProfile.SubGroupId } });
                                                                                    // console.log(this.state.userProfile.SubGroupId.filter(val => val !== ''));
                                                                                } else if (option.key === '' && option.selected === false) {
                                                                                    this.InitializedUserProfile.SubGroupId = [];
                                                                                    this.setState({ userProfile: { SubGroupId: this.InitializedUserProfile.SubGroupId } });
                                                                                    // console.log(this.state.userProfile.SubGroupId.filter(val => val !== ''));
                                                                                }
                                                                                else {
                                                                                    this.InitializedUserProfile.SubGroupId = formik.values.SubGroupId.length > 0 ? formik.values.SubGroupId : [];
                                                                                    this.InitializedUserProfile.SubGroupId = Helper.setMultiDropDownOptions(this.InitializedUserProfile.SubGroupId as [], option);
                                                                                    this.setState({ userProfile: { SubGroupId: this.InitializedUserProfile.SubGroupId } });
                                                                                    // console.log(this.state.userProfile.SubGroupId.filter(val => val !== ''));
                                                                                }
                                                                                formik.setFieldValue('SubGroupId', this.InitializedUserProfile.SubGroupId.filter(val => val !== ''));
                                                                            }}
                                                                            errorMessage={formik.errors.SubGroupId && formik.touched.SubGroupId ? formik.errors.SubGroupId as string : ''}
                                                                        />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Unit:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Unit' className='form-control' id='UnitId' selectedKey={formik.values.UnitId}
                                                                            options={(this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.UnitChoices : []}
                                                                            onChanged={(val) => { formik.setFieldValue('UnitId', val.key); }}
                                                                        />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Current Office Location:&nbsp;</Label>
                                                                        <Dropdown placeHolder='Select Current Office' className='form-control' id='CurrentOfficeLocationId' options={
                                                                            (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.OfficeChoices : []
                                                                        } required={true} selectedKey={formik.values.CurrentOfficeLocationId}
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
                                                                        <Dropdown placeHolder='Select Deputation Office' className='form-control' id='DeputationOfficeLocationId' options={
                                                                            (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.OfficeChoices : []
                                                                        } required={true} selectedKey={formik.values.DeputationOfficeLocationId}
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
                                                                        <Dropdown placeHolder='Select Shift Allocated' className='form-control' id='ShiftAllocatedId' options={
                                                                            (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.ShiftAllocatedChoices : []
                                                                        } required={true} selectedKey={formik.values.ShiftAllocatedId}
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
                                                                        <PeoplePicker peoplePickerCntrlclassName='form-control' context={this.props.currentSPContext} personSelectionLimit={1}
                                                                            tooltipDirectional={1} defaultSelectedUsers={[this.InitializedUserProfile.ReportingManager.Email]}
                                                                            selectedItems={(items) => {
                                                                                this._getPeoplePickerItems(items, formik, 'ReportingManagerId', 'ReportingManager');
                                                                                // formik.setFieldValue('Level1Approver', items);
                                                                            }}
                                                                            principalTypes={[PrincipalType.User]} ensureUser={true} resolveDelay={1000} placeholder='Enter names or email addresses...'
                                                                            errorMessage='Please enter valid user' isRequired={true}
                                                                            webAbsoluteUrl={this.props.currentSPContext.pageContext.web.absoluteUrl}
                                                                        />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item' onFocus={(ev) => {
                                                                        formik.setFieldTouched('AlternateReportingManagerId', true);
                                                                    }} onBlur={(ev) => {
                                                                        formik.setFieldTouched('AlternateReportingManagerId', true);
                                                                    }}>
                                                                        <Label>PAPR Reviewer:&nbsp;</Label>
                                                                        <PeoplePicker peoplePickerCntrlclassName='form-control' context={this.props.currentSPContext} personSelectionLimit={1}
                                                                            tooltipDirectional={1} defaultSelectedUsers={[this.InitializedUserProfile.AlternateReportingManager.Email]}
                                                                            selectedItems={(items) => {
                                                                                this._getPeoplePickerItems(items, formik, 'AlternateReportingManagerId', 'AlternateReportingManager');
                                                                                // formik.setFieldValue('Level1Approver', items);
                                                                            }}
                                                                            principalTypes={[PrincipalType.User]} ensureUser={true} resolveDelay={1000} placeholder='Enter names or email addresses...'
                                                                            errorMessage='Please enter valid user' isRequired={true}
                                                                            webAbsoluteUrl={this.props.currentSPContext.pageContext.web.absoluteUrl}
                                                                        />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item' onFocus={(ev) => {
                                                                        formik.setFieldTouched('LeaveLevel1Id', true);
                                                                    }} onBlur={(ev) => {
                                                                        formik.setFieldTouched('LeaveLevel1Id', true);
                                                                    }}>
                                                                        <Label>Leave Level 1:&nbsp;</Label>
                                                                        <PeoplePicker peoplePickerCntrlclassName='form-control' context={this.props.currentSPContext} personSelectionLimit={1}
                                                                            tooltipDirectional={1} defaultSelectedUsers={[this.InitializedUserProfile.LeaveLevel1.Email]}
                                                                            selectedItems={(items) => {
                                                                                this._getPeoplePickerItems(items, formik, 'LeaveLevel1Id', 'LeaveLevel1');
                                                                                // formik.setFieldValue('Level1Approver', items);
                                                                            }}
                                                                            principalTypes={[PrincipalType.User]} ensureUser={true} resolveDelay={1000}
                                                                            placeholder='Enter names or email addresses...' errorMessage='Please enter valid user'
                                                                            isRequired={true}
                                                                            webAbsoluteUrl={this.props.currentSPContext.pageContext.web.absoluteUrl}
                                                                        />
                                                                        <ErrorMessage name='LeaveLevel1Id' component='div' className='error-message' />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item' onFocus={(ev) => {
                                                                        formik.setFieldTouched('LeaveLevel2Id', true);
                                                                    }} onBlur={(ev) => {
                                                                        formik.setFieldTouched('LeaveLevel2Id', true);
                                                                    }}>
                                                                        <Label>Leave Level 2:&nbsp;</Label>
                                                                        <PeoplePicker peoplePickerCntrlclassName='form-control' context={this.props.currentSPContext}
                                                                            personSelectionLimit={1} tooltipDirectional={1} defaultSelectedUsers={[this.InitializedUserProfile.LeaveLevel2.Email]}
                                                                            selectedItems={(items) => {
                                                                                this._getPeoplePickerItems(items, formik, 'LeaveLevel2Id', 'LeaveLevel2');
                                                                                // formik.setFieldValue('Level1Approver', items);
                                                                            }}
                                                                            principalTypes={[PrincipalType.User]} ensureUser={true} resolveDelay={1000}
                                                                            placeholder='Enter names or email addresses...' errorMessage='Please enter valid user'
                                                                            isRequired={true}
                                                                            webAbsoluteUrl={this.props.currentSPContext.pageContext.web.absoluteUrl}
                                                                        />
                                                                        <ErrorMessage name='LeaveLevel2Id' component='div' className='error-message' />
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Paternity Leave Count:&nbsp;</Label>
                                                                        <TextField className='form-control' id='PaternityLeaveCount' name='PaternityLeaveCount' value={formik.values.PaternityLeaveCount}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('PaternityLeaveCount', val);
                                                                            }}></TextField>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Maternity Leave Count:&nbsp;</Label>
                                                                        <TextField className='form-control' id='MaternityLeave_Count' name='MaternityLeave_Count' value={formik.values.MaternityLeave_Count}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('MaternityLeave_Count', val);
                                                                            }}></TextField>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Total days of EOL:&nbsp;</Label>
                                                                        <TextField className='form-control' placeholder='Extraordinary Leave' id='TotalEOL' name='TotalEOL' value={formik.values.TotalEOL}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('TotalEOL', val);
                                                                            }}></TextField>
                                                                    </div>
                                                                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                        <Label>Total days of ML:&nbsp;</Label>
                                                                        <TextField className='form-control' placeholder='Medical Leave' id='TotalMaternityLeave' name='TotalMaternityLeave' value={formik.values.TotalMaternityLeave}
                                                                            onChanged={(val) => {
                                                                                formik.setFieldValue('TotalMaternityLeave', val);
                                                                            }}></TextField>
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
                                                                <FieldArray name='TrainingNCertificate'>
                                                                    {faProps => (<div>{
                                                                        formik.values && formik.values.TrainingNCertificate
                                                                            && formik.values.TrainingNCertificate.length > 0 ? (
                                                                            formik.values.TrainingNCertificate.map((tnc: ITrainingNCertification, n: number) => (
                                                                                <div key={n}>
                                                                                    <div className='row'>
                                                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                            <Label>Training Certification:&nbsp;</Label>
                                                                                            <Dropdown placeHolder='Select Type' className='form-control' id={`TrainingNCertificate-${n}-ExperienceInId`} options={
                                                                                                (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.TrainingCertificationChoices : []
                                                                                            } required={true} selectedKey={tnc.ExperienceInId}
                                                                                                onFocus={(e) => {
                                                                                                    formik.setFieldTouched(`TrainingNCertificate.${n}.ExperienceInId`, true);
                                                                                                    // console.log(formik);
                                                                                                }}
                                                                                                onBlur={(e) => {
                                                                                                    formik.setFieldTouched(`TrainingNCertificate.${n}.ExperienceInId`, true);
                                                                                                    // console.log(formik);
                                                                                                }}
                                                                                                onChanged={(val) => {
                                                                                                    formik.setFieldValue(`TrainingNCertificate.${n}.ExperienceInId`, val.key);
                                                                                                }}
                                                                                                errorMessage={formik.errors[`TrainingNCertificate.${n}.ExperienceInId`] && formik.touched[`TrainingNCertificate.${n}.ExperienceInId`] ? formik.errors[`TrainingNCertificate.${n}.ExperienceInId`] as string : ''}
                                                                                            />
                                                                                            <ErrorMessage name={`TrainingNCertificate.${n}.ExperienceInId`} component='div' className='error-message' />
                                                                                        </div>
                                                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                            <Label>Training Certifying Institute:&nbsp;</Label>
                                                                                            <TextField className='form-control' id={`TrainingNCertificate-${n}-Institute`} name={`TrainingNCertificate.${n}.Institute`} required={true}
                                                                                                onFocus={(e) => {
                                                                                                    formik.setFieldTouched(`TrainingNCertificate.${n}.Institute`, true);
                                                                                                    // console.log(formik);
                                                                                                }}
                                                                                                onBlur={(e) => {
                                                                                                    formik.setFieldTouched(`TrainingNCertificate.${n}.Institute`, true);
                                                                                                    // console.log(formik);
                                                                                                }}
                                                                                                onChanged={(val) => {
                                                                                                    formik.setFieldValue(`TrainingNCertificate.${n}.Institute`, val);
                                                                                                }} value={formik.values.TrainingNCertificate[n].Institute}
                                                                                                errorMessage={formik.errors[`TrainingNCertificate.${n}.Institute`] && formik.touched[`TrainingNCertificate.${n}.Institute`] ? formik.errors[`TrainingNCertificate.${n}.Institute`] as string : ''}
                                                                                            ></TextField>
                                                                                            <ErrorMessage name={`TrainingNCertificate.${n}.Institute`} component='div' className='error-message' />
                                                                                        </div>
                                                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                            <Label>Traning Cost:&nbsp;</Label>
                                                                                            <TextField type='number' className='form-control' id={`TrainingNCertificate.${n}.TrainingCost`} name={`TrainingNCertificate.${n}.TrainingCost`} required={true}
                                                                                                onFocus={(e) => {
                                                                                                    formik.setFieldTouched(`TrainingNCertificate.${n}.TrainingCost`, true);
                                                                                                    // console.log(formik);
                                                                                                }}
                                                                                                onBlur={(e) => {
                                                                                                    formik.setFieldTouched(`TrainingNCertificate.${n}.TrainingCost`, true);
                                                                                                    // console.log(formik);
                                                                                                }}
                                                                                                onChanged={(val) => {
                                                                                                    formik.setFieldValue(`TrainingNCertificate.${n}.TrainingCost`, val);
                                                                                                }} value={formik.values.TrainingNCertificate[n].TrainingCost}
                                                                                                errorMessage={formik.errors[`TrainingNCertificate.${n}.TrainingCost`] && formik.touched[`TrainingNCertificate.${n}.TrainingCost`] ? formik.errors[`TrainingNCertificate.${n}.TrainingCost`] as string : ''}
                                                                                            ></TextField>
                                                                                            <ErrorMessage name={`TrainingNCertificate.${n}.TrainingCost`} component='div' className='error-message' />
                                                                                        </div>
                                                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                            <Label>Location:&nbsp;</Label>
                                                                                            <Dropdown placeHolder='Select Location' className='form-control' id={`TrainingNCertificate-${n}-Location`} options={
                                                                                                (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.TrainingNCertificationLocationChoices : []
                                                                                            } required={true} selectedKey={tnc.Location}
                                                                                                onFocus={(e) => {
                                                                                                    formik.setFieldTouched(`TrainingNCertificate.${n}.Location`, true);
                                                                                                    // console.log(formik);
                                                                                                }}
                                                                                                onBlur={(e) => {
                                                                                                    formik.setFieldTouched(`TrainingNCertificate.${n}.Location`, true);
                                                                                                    // console.log(formik);
                                                                                                }}
                                                                                                onChanged={(val) => {
                                                                                                    formik.setFieldValue(`TrainingNCertificate.${n}.Location`, val.key);
                                                                                                }}
                                                                                                errorMessage={formik.errors[`TrainingNCertificate.${n}.Location`] && formik.touched[`TrainingNCertificate.${n}.Location`] ? formik.errors[`TrainingNCertificate.${n}.Location`] as string : ''}
                                                                                            />
                                                                                            <ErrorMessage name={`TrainingNCertificate.${n}.Location`} component='div' className='error-message' />
                                                                                        </div>
                                                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                            <Label>Description:&nbsp;</Label>
                                                                                            <TextField className='form-control' id={`TrainingNCertificate-${n}-Description`} name={`TrainingNCertificate.${n}.Description`} required={true}
                                                                                                onFocus={(e) => {
                                                                                                    formik.setFieldTouched(`TrainingNCertificate.${n}.Description`, true);
                                                                                                    // console.log(formik);
                                                                                                }}
                                                                                                onBlur={(e) => {
                                                                                                    formik.setFieldTouched(`TrainingNCertificate.${n}.Description`, true);
                                                                                                    // console.log(formik);
                                                                                                }}
                                                                                                onChanged={(val) => {
                                                                                                    formik.setFieldValue(`TrainingNCertificate.${n}.Description`, val);
                                                                                                }} value={formik.values.TrainingNCertificate[n].Description}
                                                                                                errorMessage={formik.errors.Description && formik.touched.Description ? formik.errors.Description as string : ''}
                                                                                            ></TextField>
                                                                                            <ErrorMessage name={`TrainingNCertificate.${n}.Description`} component='div' className='error-message' />
                                                                                        </div>
                                                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                            <Label>Start Date&nbsp;</Label>
                                                                                            <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date' isRequired={true}
                                                                                                value={formik.values.TrainingNCertificate[n].StartDate}
                                                                                                maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}
                                                                                                onSelectDate={(val) => {
                                                                                                    // formik.setFieldTouched('StartDate', true);
                                                                                                    formik.setFieldValue(`TrainingNCertificate.${n}.StartDate`, val);
                                                                                                }}
                                                                                                onAfterMenuDismiss={() => {
                                                                                                    formik.setFieldTouched(`TrainingNCertificate.${n}.StartDate`, true);
                                                                                                }}
                                                                                            ></DatePicker>
                                                                                            <ErrorMessage name={`TrainingNCertificate.${n}.StartDate`} component='div' className='error-message' />
                                                                                        </div>
                                                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                            <Label>End Date&nbsp;</Label>
                                                                                            <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date' isRequired={true}
                                                                                                value={formik.values.TrainingNCertificate[n].EndDate}
                                                                                                maxDate={new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate())}
                                                                                                onSelectDate={(val) => {
                                                                                                    // formik.setFieldTouched('EndDate', true);
                                                                                                    formik.setFieldValue(`TrainingNCertificate.${n}.EndDate`, val);
                                                                                                }}
                                                                                                onAfterMenuDismiss={() => {
                                                                                                    formik.setFieldTouched(`TrainingNCertificate.${n}.EndDate`, true);
                                                                                                }}
                                                                                            ></DatePicker>
                                                                                            <ErrorMessage name={`TrainingNCertificate.${n}.EndDate`} component='div' className='error-message' />
                                                                                        </div>
                                                                                        {/* <pre>{JSON.stringify(formik.errors.TrainingNCertificate, null, 2)}</pre> */}
                                                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                            <span className='line-item-icon'>
                                                                                                {(formik.values.TrainingNCertificate.length == n + 1 && !formik.errors.TrainingNCertificate) && (
                                                                                                    <Link type='button' onClick={() => {
                                                                                                        faProps.push(TrainingNCertification);
                                                                                                        formik.validateForm(formik.values);
                                                                                                        this.props.onFormValidationChange(false, formik.values, 'General')
                                                                                                    }}>
                                                                                                        <Icon iconName='CircleAdditionSolid' />
                                                                                                    </Link>
                                                                                                )}
                                                                                            </span>
                                                                                            <span className='line-item-icon'>
                                                                                                {(formik.values.TrainingNCertificate.length > 1) && (
                                                                                                    <Link type='button' onClick={() => {
                                                                                                        faProps.remove(n);
                                                                                                        formik.validateForm(formik.values);
                                                                                                        this.props.onFormValidationChange(formik.isValid, formik.values, 'General')
                                                                                                    }}>
                                                                                                        <Icon iconName='SkypeCircleMinus' />
                                                                                                    </Link>
                                                                                                )}
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-sm-12 col-md-12 col-lg-12 customDivSeprator"></div>
                                                                                </div>
                                                                            )
                                                                            )) : (<div></div>)
                                                                    }</div>)
                                                                    }
                                                                </FieldArray>
                                                            </div>
                                                        </div>
                                                        {/* <div className='col-sm-12 col-md-12 col-lg-12 customDivSeprator'></div> */}
                                                    </div>
                                                </ScrollablePane>
                                            </div>
                                        </div>
                                        {(formik.isValid && Object.keys(formik.errors).length === 0) && (
                                            <div className='widget-card-body' style={{ height: 'auto' }}>
                                                <div className='row'>
                                                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12' style={{ textAlign: 'center' }}>
                                                        <PrimaryButton type='button' data-automation-id='btn-next-profile' iconProps={{ iconName: 'Next' }}
                                                            text='Next' onClick={() => { this.props.onFormValidationChange(formik.isValid, formik.values, 'General') }} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
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
