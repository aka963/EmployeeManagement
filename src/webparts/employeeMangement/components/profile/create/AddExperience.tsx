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
import { ITrainingNCertification } from '../../../../services/interface/ITrainingNCertification';
import { Link } from 'office-ui-fabric-react/lib/Link';
import Helper from '../../../../services/utilities/Helper';
import { IDropdownOption } from 'office-ui-fabric-react';
import { ExperienceDetails, IExperienceDetails } from '../../../../services/interface/IExperienceDetails';

export default class AddExperience extends React.Component<IEmployeeMangementProps, ICreateUserProfile> {
    public formikInstance: Formik;
    public isFormValid: boolean = false;
    public InitializedUserProfile: IUserProfile;
    constructor(props: IEmployeeMangementProps) {
        super(props);
        this.formikInstance = null;
        // Helper.assignDefaults((typeof this.userProfile));
        this.state = { userProfile: props.sharedData.userProfile, userProfileLoadData: props.sharedData.userProfileLoadData };
        this.InitializedUserProfile = props.sharedData.userProfile;
        this.setFormikInstance = this.setFormikInstance.bind(this);
    }

    private setFormikInstance(ref: Formik) {
        // The ref receives the Formik instance
        this.formikInstance = ref;
    };

    public componentDidMount(): void {
        if (this.formikInstance) {
            this.formikInstance.validateForm(this.state.userProfile).then((resp) => {
                // console.log(resp);
                // this.formikInstance.validateField('UserNameId');
            });
        }
    }

    public render(): React.ReactElement<IEmployeeMangementProps> {
        const {
            description,
            currentSPContext
        } = this.props;

        const validate = yup.object().shape({
            ExperienceDetails: yup.array().of(yup.object().shape({
                PreviousCompanyName: yup.string().required('Previous Company Name is required')
                , Designation: yup.string().required('Designation is required')
                , StartDate: yup.date().nullable().required('Date is required.').typeError('A valid date is required')
                , EndDate: yup.date().nullable().required('Date is required.').typeError('A valid date is required')
                , JobDescription: yup.string().required('Job Description is required')
                , JobType: yup.string().required('Job Type is required')
                , CompanyAddress: yup.string().required('Company Address is required')
                , CountryId: yup.string().required('Country is required')
                , StateId: yup.string().required('State is required')
                , CityId: yup.string().required('City is required')
                , CompanyContactNo: yup.number().typeError('Year Of Passing should be a number').required('Contact is required')
                , PreviousCompanyExp: yup.number().typeError('Year Of Passing should be a number').required('Number of Experience is required')
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
                        this.props.onFormValidationChange(formik.isValid, formik.values, 'Experience');
                    }}>
                        <div className='body-content'>
                            <div className='row'>
                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                    <div className='widget-card full-height'>
                                        <div className='widget-card-head'>
                                            <span className='widget-card-head-icon'>
                                                <Icon iconName='HomeSolid' />
                                            </span>
                                            <h2 className='widget-card-head-title'>EXPERIENCE</h2>
                                        </div>
                                        <div className='widget-card-body'>
                                            <div className='row'>
                                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                                    <FieldArray name='ExperienceDetails'>
                                                        {faProps => (<div>{
                                                            formik.values && formik.values.ExperienceDetails
                                                                && formik.values.ExperienceDetails.length > 0 ? (
                                                                formik.values.ExperienceDetails.map((tnc: IExperienceDetails, n: number) => (
                                                                    <div key={n}>
                                                                        <div className='row'>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Previous Compnay Name:&nbsp;</Label>
                                                                                <TextField type='text' className='form-control' id={`ExperienceDetails-${n}-PreviousCompanyName`} name={`ExperienceDetails.${n}.PreviousCompanyName`} required={true}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`ExperienceDetails.${n}.PreviousCompanyName`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`ExperienceDetails.${n}.PreviousCompanyName`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`ExperienceDetails.${n}.PreviousCompanyName`, val);
                                                                                    }} value={formik.values.ExperienceDetails[n].PreviousCompanyName}
                                                                                    errorMessage={formik.errors[`ExperienceDetails.${n}.PreviousCompanyName`] && formik.touched[`ExperienceDetails.${n}.PreviousCompanyName`] ? formik.errors[`ExperienceDetails.${n}.PreviousCompanyName`] as string : ''}
                                                                                ></TextField>
                                                                                <ErrorMessage name={`ExperienceDetails.${n}.PreviousCompanyName`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Designation:&nbsp;</Label>
                                                                                <TextField type='text' className='form-control' id={`ExperienceDetails-${n}-Designation`} name={`ExperienceDetails.${n}.Designation`} required={true}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`ExperienceDetails.${n}.Designation`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`ExperienceDetails.${n}.Designation`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`ExperienceDetails.${n}.Designation`, val);
                                                                                    }} value={formik.values.ExperienceDetails[n].Designation}
                                                                                    errorMessage={formik.errors[`ExperienceDetails.${n}.Designation`] && formik.touched[`ExperienceDetails.${n}.Designation`] ? formik.errors[`ExperienceDetails.${n}.Designation`] as string : ''}
                                                                                ></TextField>
                                                                                <ErrorMessage name={`ExperienceDetails.${n}.Designation`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Start Date&nbsp;</Label>
                                                                                <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date' isRequired={true}
                                                                                    value={formik.values.ExperienceDetails[n].StartDate}
                                                                                    // maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}
                                                                                    onSelectDate={(val) => {
                                                                                        // formik.setFieldTouched('StartDate', true);
                                                                                        formik.setFieldValue(`ExperienceDetails.${n}.StartDate`, val);
                                                                                    }}
                                                                                    onAfterMenuDismiss={() => {
                                                                                        formik.setFieldTouched(`ExperienceDetails.${n}.StartDate`, true);
                                                                                    }}
                                                                                ></DatePicker>
                                                                                <ErrorMessage name={`ExperienceDetails.${n}.StartDate`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>End Date&nbsp;</Label>
                                                                                <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date' isRequired={true}
                                                                                    value={formik.values.ExperienceDetails[n].EndDate}
                                                                                    // maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}
                                                                                    onSelectDate={(val) => {
                                                                                        // formik.setFieldTouched('StartDate', true);
                                                                                        formik.setFieldValue(`ExperienceDetails.${n}.EndDate`, val);
                                                                                    }}
                                                                                    onAfterMenuDismiss={() => {
                                                                                        formik.setFieldTouched(`ExperienceDetails.${n}.EndDate`, true);
                                                                                    }}
                                                                                ></DatePicker>
                                                                                <ErrorMessage name={`ExperienceDetails.${n}.EndDate`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Job Description:&nbsp;</Label>
                                                                                <TextField type='text' className='form-control' id={`ExperienceDetails-${n}-JobDescription`} name={`ExperienceDetails.${n}.JobDescription`} required={true}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`ExperienceDetails.${n}.JobDescription`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`ExperienceDetails.${n}.JobDescription`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`ExperienceDetails.${n}.JobDescription`, val);
                                                                                    }} value={formik.values.ExperienceDetails[n].JobDescription}
                                                                                    errorMessage={formik.errors[`ExperienceDetails.${n}.JobDescription`] && formik.touched[`ExperienceDetails.${n}.JobDescription`] ? formik.errors[`ExperienceDetails.${n}.JobDescription`] as string : ''}
                                                                                ></TextField>
                                                                                <ErrorMessage name={`ExperienceDetails.${n}.JobDescription`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Job Type:&nbsp;</Label>
                                                                                <Dropdown placeHolder='Select Type' className='form-control' id={`ExperienceDetails-${n}-JobType`} options={
                                                                                    (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.EmployeeExperienceDetailJobTypeChoices : []
                                                                                } required={true} selectedKey={tnc.JobType}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`ExperienceDetails.${n}.JobType`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`ExperienceDetails.${n}.JobType`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`ExperienceDetails.${n}.JobType`, val.key);
                                                                                    }}
                                                                                    errorMessage={formik.errors[`ExperienceDetails.${n}.JobType`] && formik.touched[`ExperienceDetails.${n}.JobType`] ? formik.errors[`ExperienceDetails.${n}.JobType`] as string : ''}
                                                                                />
                                                                                <ErrorMessage name={`ExperienceDetails.${n}.JobType`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Company Address:&nbsp;</Label>
                                                                                <TextField type='text' className='form-control' id={`ExperienceDetails-${n}-CompanyAddress`} name={`ExperienceDetails.${n}.CompanyAddress`} required={true}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`ExperienceDetails.${n}.CompanyAddress`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`ExperienceDetails.${n}.CompanyAddress`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`ExperienceDetails.${n}.CompanyAddress`, val);
                                                                                    }} value={formik.values.ExperienceDetails[n].CompanyAddress}
                                                                                    errorMessage={formik.errors[`ExperienceDetails.${n}.CompanyAddress`] && formik.touched[`ExperienceDetails.${n}.CompanyAddress`] ? formik.errors[`ExperienceDetails.${n}.CompanyAddress`] as string : ''}
                                                                                ></TextField>
                                                                                <ErrorMessage name={`ExperienceDetails.${n}.CompanyAddress`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Country:&nbsp;</Label>
                                                                                <Dropdown placeHolder='Select Country' className='form-control' id={`ExperienceDetails-${n}-CountryId`} options={
                                                                                    (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.CountryChoices : []
                                                                                } required={true} selectedKey={tnc.CountryId}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`ExperienceDetails.${n}.CountryId`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`ExperienceDetails.${n}.CountryId`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`ExperienceDetails.${n}.CountryId`, val.key);
                                                                                        formik.setFieldValue(`ExperienceDetails.${n}.StateId`, '');
                                                                                        formik.setFieldValue(`ExperienceDetails.${n}.CityId`, '');
                                                                                    }}
                                                                                    errorMessage={formik.errors[`ExperienceDetails.${n}.CountryId`] && formik.touched[`ExperienceDetails.${n}.CountryId`] ? formik.errors[`ExperienceDetails.${n}.CountryId`] as string : ''}
                                                                                />
                                                                                <ErrorMessage name={`ExperienceDetails.${n}.CountryId`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>State:&nbsp;</Label>
                                                                                <Dropdown placeHolder='Select State' className='form-control' id={`ExperienceDetails-${n}-StateId`} options={
                                                                                    (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.StateMaster.filter(opt => opt.CountryId === formik.values.ExperienceDetails[n].CountryId).map(val => ({ key: val.Id, text: val.Title, ariaLabel: val.Title })) : []
                                                                                } required={true} selectedKey={tnc.StateId}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`ExperienceDetails.${n}.StateId`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`ExperienceDetails.${n}.StateId`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`ExperienceDetails.${n}.StateId`, val.key);
                                                                                        formik.setFieldValue(`ExperienceDetails.${n}.CityId`, '');
                                                                                    }}
                                                                                    errorMessage={formik.errors[`ExperienceDetails.${n}.StateId`] && formik.touched[`ExperienceDetails.${n}.StateId`] ? formik.errors[`ExperienceDetails.${n}.StateId`] as string : ''}
                                                                                />
                                                                                <ErrorMessage name={`ExperienceDetails.${n}.StateId`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>City:&nbsp;</Label>
                                                                                <Dropdown placeHolder='Select City' className='form-control' id={`ExperienceDetails-${n}-CityId`} options={
                                                                                    (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.CityMaster.filter(opt => opt.StateId === formik.values.ExperienceDetails[n].StateId).map(val => ({ key: val.Id, text: val.Title, ariaLabel: val.Title })) : []
                                                                                } required={true} selectedKey={tnc.CityId}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`ExperienceDetails.${n}.CityId`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`ExperienceDetails.${n}.CityId`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`ExperienceDetails.${n}.CityId`, val.key);
                                                                                    }}
                                                                                    errorMessage={formik.errors[`ExperienceDetails.${n}.CityId`] && formik.touched[`ExperienceDetails.${n}.CityId`] ? formik.errors[`ExperienceDetails.${n}.CityId`] as string : ''}
                                                                                />
                                                                                <ErrorMessage name={`ExperienceDetails.${n}.CityId`} component='div' className='error-message' />
                                                                            </div>

                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Company Contact No:&nbsp;</Label>
                                                                                <TextField type='number' className='form-control' id={`ExperienceDetails-${n}-CompanyContactNo`} name={`ExperienceDetails.${n}.CompanyContactNo`} required={true}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`ExperienceDetails.${n}.CompanyContactNo`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`ExperienceDetails.${n}.CompanyContactNo`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`ExperienceDetails.${n}.CompanyContactNo`, val);
                                                                                    }} value={formik.values.ExperienceDetails[n].CompanyContactNo}
                                                                                    errorMessage={formik.errors[`ExperienceDetails.${n}.CompanyContactNo`] && formik.touched[`ExperienceDetails.${n}.CompanyContactNo`] ? formik.errors[`ExperienceDetails.${n}.CompanyContactNo`] as string : ''}
                                                                                ></TextField>
                                                                                <ErrorMessage name={`ExperienceDetails.${n}.CompanyContactNo`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Total Experience:&nbsp;</Label>
                                                                                <TextField type='number' className='form-control' id={`ExperienceDetails-${n}-PreviousCompanyExp`} name={`ExperienceDetails.${n}.PreviousCompanyExp`} required={true}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`ExperienceDetails.${n}.PreviousCompanyExp`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`ExperienceDetails.${n}.PreviousCompanyExp`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`ExperienceDetails.${n}.PreviousCompanyExp`, val);
                                                                                    }} value={formik.values.ExperienceDetails[n].PreviousCompanyExp}
                                                                                    errorMessage={formik.errors[`ExperienceDetails.${n}.PreviousCompanyExp`] && formik.touched[`ExperienceDetails.${n}.PreviousCompanyExp`] ? formik.errors[`ExperienceDetails.${n}.PreviousCompanyExp`] as string : ''}
                                                                                ></TextField>
                                                                                <ErrorMessage name={`ExperienceDetails.${n}.PreviousCompanyExp`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <span className='line-item-icon'>
                                                                                    {(formik.values.ExperienceDetails.length == n + 1 && !formik.errors.ExperienceDetails) && (
                                                                                        <Link type='button' onClick={() => {
                                                                                            faProps.push(ExperienceDetails);
                                                                                            formik.validateForm(formik.values);
                                                                                            this.props.onFormValidationChange(false, formik.values, 'Experience')
                                                                                        }}>
                                                                                            <Icon iconName='CircleAdditionSolid' />
                                                                                        </Link>
                                                                                    )}
                                                                                </span>
                                                                                <span className='line-item-icon'>
                                                                                    {(formik.values.ExperienceDetails.length > 1) && (
                                                                                        <Link type='button' onClick={() => {
                                                                                            faProps.remove(n);
                                                                                            formik.validateForm(formik.values);
                                                                                            this.props.onFormValidationChange(formik.isValid, formik.values, 'Experience')
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
                                                        }</div>)}
                                                    </FieldArray>
                                                </div>
                                                {(formik.isValid && Object.keys(formik.errors).length === 0) && (
                                                    <div className='widget-card-body' style={{ height: 'auto' }}>
                                                        <div className='row'>
                                                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12' style={{ textAlign: 'center' }}>
                                                                <PrimaryButton type='button' data-automation-id='btn-next-profile' iconProps={{ iconName: 'Next' }}
                                                                    text='Next' onClick={() => { this.props.onFormValidationChange(formik.isValid, formik.values, 'Experience') }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                )
                }</Formik>
        )

    }
}