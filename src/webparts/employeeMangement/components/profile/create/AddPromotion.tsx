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

import { IUserProfile, IUserProfileLoadData, InitializedUserProfile } from '../../../../services/interface/IUserProfile';
import { ITrainingNCertification } from '../../../../services/interface/ITrainingNCertification';
import { Link } from 'office-ui-fabric-react/lib/Link';
import Helper from '../../../../services/utilities/Helper';
import { IDropdownOption } from 'office-ui-fabric-react';

export default class AddPromotion extends React.Component<IEmployeeMangementProps, ICreateUserProfile> {
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
            DateOfJoining: yup.date().nullable().required('Date is required.').typeError('A valid date is required')
            , ProbationPeriod: yup.number().typeError('Probation Period should be a number').required('Probation Period is required')
            , DateOfConfirmation: yup.date().nullable().required('Date is required.').typeError('A valid date is required')
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
                                            <h2 className='widget-card-head-title'>PROMOTION DATA</h2>
                                        </div>
                                        <div className='widget-card-body'>
                                            <div className='row'>
                                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                                    <div className='row'>
                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                            <Label>Date of Joining:&nbsp;</Label>
                                                            <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date' isRequired={true}
                                                                value={formik.values.DateOfJoining}
                                                                // maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}
                                                                onSelectDate={(val) => {
                                                                    // formik.setFieldTouched('StartDate', true);
                                                                    formik.setFieldValue(`DateOfJoining`, val);
                                                                }}
                                                                onAfterMenuDismiss={() => {
                                                                    formik.setFieldTouched(`DateOfJoining`, true);
                                                                }}
                                                            ></DatePicker>
                                                            <ErrorMessage name={`DateOfJoining`} component='div' className='error-message' />
                                                        </div>
                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                            <Label>Probation Period:&nbsp;</Label>
                                                            <TextField type='number' className='form-control' id={`ProbationPeriod`} name={`ProbationPeriod`} required={true}
                                                                onFocus={(e) => {
                                                                    formik.setFieldTouched(`ProbationPeriod`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onBlur={(e) => {
                                                                    formik.setFieldTouched(`ProbationPeriod`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onChanged={(val) => {
                                                                    formik.setFieldValue(`ProbationPeriod`, val);
                                                                }} value={formik.values.ProbationPeriod}
                                                                errorMessage={formik.errors[`ProbationPeriod`] && formik.touched[`ProbationPeriod`] ? formik.errors[`ProbationPeriod`] as string : ''}
                                                            ></TextField>
                                                            <ErrorMessage name={`ProbationPeriod`} component='div' className='error-message' />
                                                        </div>
                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                            <Label>Date Of Confirmation&nbsp;</Label>
                                                            <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date' isRequired={true}
                                                                value={formik.values.DateOfConfirmation}
                                                                // maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}
                                                                onSelectDate={(val) => {
                                                                    // formik.setFieldTouched('StartDate', true);
                                                                    formik.setFieldValue(`DateOfConfirmation`, val);
                                                                }}
                                                                onAfterMenuDismiss={() => {
                                                                    formik.setFieldTouched(`DateOfConfirmation`, true);
                                                                }}
                                                            ></DatePicker>
                                                            <ErrorMessage name={`DateOfConfirmation`} component='div' className='error-message' />
                                                        </div>
                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                            <Label>LTC Date&nbsp;</Label>
                                                            <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date'
                                                                value={formik.values.LTCDate}
                                                                // maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}
                                                                onSelectDate={(val) => {
                                                                    // formik.setFieldTouched('StartDate', true);
                                                                    formik.setFieldValue(`LTCDate`, val);
                                                                }}
                                                                onAfterMenuDismiss={() => {
                                                                    formik.setFieldTouched(`LTCDate`, true);
                                                                }}
                                                            ></DatePicker>
                                                        </div>
                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                            <Label>Job Description:&nbsp;</Label>
                                                            <TextField type='text' className='form-control' id={`JobDescription`} name={`JobDescription`} required={true}
                                                                onFocus={(e) => {
                                                                    formik.setFieldTouched(`JobDescription`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onBlur={(e) => {
                                                                    formik.setFieldTouched(`JobDescription`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onChanged={(val) => {
                                                                    formik.setFieldValue(`JobDescription`, val);
                                                                }} value={formik.values.ExperienceDetails[n].JobDescription}
                                                                errorMessage={formik.errors[`JobDescription`] && formik.touched[`JobDescription`] ? formik.errors[`JobDescription`] as string : ''}
                                                            ></TextField>
                                                            <ErrorMessage name={`JobDescription`} component='div' className='error-message' />
                                                        </div>
                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                            <Label>Job Type:&nbsp;</Label>
                                                            <Dropdown placeHolder='Select Type' className='form-control' id={`JobType`} options={
                                                                (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.EmployeeExperienceDetailJobTypeChoices : []
                                                            } required={true} selectedKey={tnc.JobType}
                                                                onFocus={(e) => {
                                                                    formik.setFieldTouched(`JobType`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onBlur={(e) => {
                                                                    formik.setFieldTouched(`JobType`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onChanged={(val) => {
                                                                    formik.setFieldValue(`JobType`, val.key);
                                                                }}
                                                                errorMessage={formik.errors[`JobType`] && formik.touched[`JobType`] ? formik.errors[`JobType`] as string : ''}
                                                            />
                                                            <ErrorMessage name={`JobType`} component='div' className='error-message' />
                                                        </div>
                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                            <Label>Company Address:&nbsp;</Label>
                                                            <TextField type='text' className='form-control' id={`CompanyAddress`} name={`CompanyAddress`} required={true}
                                                                onFocus={(e) => {
                                                                    formik.setFieldTouched(`CompanyAddress`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onBlur={(e) => {
                                                                    formik.setFieldTouched(`CompanyAddress`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onChanged={(val) => {
                                                                    formik.setFieldValue(`CompanyAddress`, val);
                                                                }} value={formik.values.ExperienceDetails[n].CompanyAddress}
                                                                errorMessage={formik.errors[`CompanyAddress`] && formik.touched[`CompanyAddress`] ? formik.errors[`CompanyAddress`] as string : ''}
                                                            ></TextField>
                                                            <ErrorMessage name={`CompanyAddress`} component='div' className='error-message' />
                                                        </div>
                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                            <Label>Country:&nbsp;</Label>
                                                            <Dropdown placeHolder='Select Country' className='form-control' id={`CountryId`} options={
                                                                (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.CountryChoices : []
                                                            } required={true} selectedKey={tnc.CountryId}
                                                                onFocus={(e) => {
                                                                    formik.setFieldTouched(`CountryId`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onBlur={(e) => {
                                                                    formik.setFieldTouched(`CountryId`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onChanged={(val) => {
                                                                    formik.setFieldValue(`CountryId`, val.key);
                                                                    formik.setFieldValue(`StateId`, '');
                                                                    formik.setFieldValue(`CityId`, '');
                                                                }}
                                                                errorMessage={formik.errors[`CountryId`] && formik.touched[`CountryId`] ? formik.errors[`CountryId`] as string : ''}
                                                            />
                                                            <ErrorMessage name={`CountryId`} component='div' className='error-message' />
                                                        </div>
                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                            <Label>State:&nbsp;</Label>
                                                            <Dropdown placeHolder='Select State' className='form-control' id={`StateId`} options={
                                                                (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.StateMaster.filter(opt => opt.CountryId === formik.values.ExperienceDetails[n].CountryId).map(val => ({ key: val.Id, text: val.Title, ariaLabel: val.Title })) : []
                                                            } required={true} selectedKey={tnc.StateId}
                                                                onFocus={(e) => {
                                                                    formik.setFieldTouched(`StateId`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onBlur={(e) => {
                                                                    formik.setFieldTouched(`StateId`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onChanged={(val) => {
                                                                    formik.setFieldValue(`StateId`, val.key);
                                                                    formik.setFieldValue(`CityId`, '');
                                                                }}
                                                                errorMessage={formik.errors[`StateId`] && formik.touched[`StateId`] ? formik.errors[`StateId`] as string : ''}
                                                            />
                                                            <ErrorMessage name={`StateId`} component='div' className='error-message' />
                                                        </div>
                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                            <Label>City:&nbsp;</Label>
                                                            <Dropdown placeHolder='Select City' className='form-control' id={`CityId`} options={
                                                                (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.CityMaster.filter(opt => opt.StateId === formik.values.ExperienceDetails[n].StateId).map(val => ({ key: val.Id, text: val.Title, ariaLabel: val.Title })) : []
                                                            } required={true} selectedKey={tnc.CityId}
                                                                onFocus={(e) => {
                                                                    formik.setFieldTouched(`CityId`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onBlur={(e) => {
                                                                    formik.setFieldTouched(`CityId`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onChanged={(val) => {
                                                                    formik.setFieldValue(`CityId`, val.key);
                                                                }}
                                                                errorMessage={formik.errors[`CityId`] && formik.touched[`CityId`] ? formik.errors[`CityId`] as string : ''}
                                                            />
                                                            <ErrorMessage name={`CityId`} component='div' className='error-message' />
                                                        </div>

                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                            <Label>Company Contact No:&nbsp;</Label>
                                                            <TextField type='number' className='form-control' id={`CompanyContactNo`} name={`CompanyContactNo`} required={true}
                                                                onFocus={(e) => {
                                                                    formik.setFieldTouched(`CompanyContactNo`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onBlur={(e) => {
                                                                    formik.setFieldTouched(`CompanyContactNo`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onChanged={(val) => {
                                                                    formik.setFieldValue(`CompanyContactNo`, val);
                                                                }} value={formik.values.ExperienceDetails[n].CompanyContactNo}
                                                                errorMessage={formik.errors[`CompanyContactNo`] && formik.touched[`CompanyContactNo`] ? formik.errors[`CompanyContactNo`] as string : ''}
                                                            ></TextField>
                                                            <ErrorMessage name={`CompanyContactNo`} component='div' className='error-message' />
                                                        </div>
                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                            <Label>Total Experience:&nbsp;</Label>
                                                            <TextField type='number' className='form-control' id={`PreviousCompanyExp`} name={`PreviousCompanyExp`} required={true}
                                                                onFocus={(e) => {
                                                                    formik.setFieldTouched(`PreviousCompanyExp`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onBlur={(e) => {
                                                                    formik.setFieldTouched(`PreviousCompanyExp`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onChanged={(val) => {
                                                                    formik.setFieldValue(`PreviousCompanyExp`, val);
                                                                }} value={formik.values.ExperienceDetails[n].PreviousCompanyExp}
                                                                errorMessage={formik.errors[`PreviousCompanyExp`] && formik.touched[`PreviousCompanyExp`] ? formik.errors[`PreviousCompanyExp`] as string : ''}
                                                            ></TextField>
                                                            <ErrorMessage name={`PreviousCompanyExp`} component='div' className='error-message' />
                                                        </div>
                                                        <div className="col-sm-12 col-md-12 col-lg-12 customDivSeprator"></div>
                                                    </div>

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