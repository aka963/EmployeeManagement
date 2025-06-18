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
                        this.props.onFormValidationChange(formik.isValid, formik.values, 'Promotions');
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
                                                            <Label>Date of Relieving&nbsp;</Label>
                                                            <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date'
                                                                value={formik.values.Date_x0020_Of_x0020_Resign}
                                                                // maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}
                                                                onSelectDate={(val) => {
                                                                    // formik.setFieldTouched('StartDate', true);
                                                                    formik.setFieldValue(`Date_x0020_Of_x0020_Resign`, val);
                                                                }}
                                                                onAfterMenuDismiss={() => {
                                                                    formik.setFieldTouched(`Date_x0020_Of_x0020_Resign`, true);
                                                                }}
                                                            ></DatePicker>
                                                        </div>
                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                            <Label>Date of Retirement&nbsp;</Label>
                                                            <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date'
                                                                value={formik.values.Date_x0020_Of_x0020_Resign_x0020}
                                                                // maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}
                                                                onSelectDate={(val) => {
                                                                    // formik.setFieldTouched('StartDate', true);
                                                                    formik.setFieldValue(`Date_x0020_Of_x0020_Resign_x0020`, val);
                                                                }}
                                                                onAfterMenuDismiss={() => {
                                                                    formik.setFieldTouched(`Date_x0020_Of_x0020_Resign_x0020`, true);
                                                                }}
                                                            ></DatePicker>
                                                        </div>
                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                            <Label>ESI Joining Date&nbsp;</Label>
                                                            <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date'
                                                                value={formik.values.ESI_x0020_JoiningDate}
                                                                // maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}
                                                                onSelectDate={(val) => {
                                                                    // formik.setFieldTouched('StartDate', true);
                                                                    formik.setFieldValue(`ESI_x0020_JoiningDate`, val);
                                                                }}
                                                                onAfterMenuDismiss={() => {
                                                                    formik.setFieldTouched(`ESI_x0020_JoiningDate`, true);
                                                                }}
                                                            ></DatePicker>
                                                        </div>
                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                            <Label>ESI Leaving Date&nbsp;</Label>
                                                            <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date'
                                                                value={formik.values.ESI_x0020_LeavingDate}
                                                                // maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}
                                                                onSelectDate={(val) => {
                                                                    // formik.setFieldTouched('StartDate', true);
                                                                    formik.setFieldValue(`ESI_x0020_LeavingDate`, val);
                                                                }}
                                                                onAfterMenuDismiss={() => {
                                                                    formik.setFieldTouched(`ESI_x0020_LeavingDate`, true);
                                                                }}
                                                            ></DatePicker>
                                                        </div>
                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                            <Label>Appointment Date&nbsp;</Label>
                                                            <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date'
                                                                value={formik.values.AppointmentDate}
                                                                // maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}
                                                                onSelectDate={(val) => {
                                                                    // formik.setFieldTouched('StartDate', true);
                                                                    formik.setFieldValue(`AppointmentDate`, val);
                                                                }}
                                                                onAfterMenuDismiss={() => {
                                                                    formik.setFieldTouched(`AppointmentDate`, true);
                                                                }}
                                                            ></DatePicker>
                                                        </div>
                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                            <Label>Designation Joined As:&nbsp;</Label>
                                                            <TextField type='text' className='form-control' id={`DesignationJoinedAs`} name={`DesignationJoinedAs`}
                                                                onFocus={(e) => {
                                                                    formik.setFieldTouched(`DesignationJoinedAs`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onBlur={(e) => {
                                                                    formik.setFieldTouched(`DesignationJoinedAs`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onChanged={(val) => {
                                                                    formik.setFieldValue(`DesignationJoinedAs`, val);
                                                                }}
                                                            ></TextField>
                                                        </div>
                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                            <Label>Designation Appointed As:&nbsp;</Label>
                                                            <TextField type='text' className='form-control' id={`DesignationAppointedAs`} name={`DesignationAppointedAs`}
                                                                onFocus={(e) => {
                                                                    formik.setFieldTouched(`DesignationAppointedAs`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onBlur={(e) => {
                                                                    formik.setFieldTouched(`DesignationAppointedAs`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onChanged={(val) => {
                                                                    formik.setFieldValue(`DesignationAppointedAs`, val);
                                                                }}
                                                            ></TextField>
                                                        </div>
                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                            <Label>Confirmaation Date&nbsp;</Label>
                                                            <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date'
                                                                value={formik.values.ConfirmationDate}
                                                                // maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}
                                                                onSelectDate={(val) => {
                                                                    // formik.setFieldTouched('StartDate', true);
                                                                    formik.setFieldValue(`ConfirmationDate`, val);
                                                                }}
                                                                onAfterMenuDismiss={() => {
                                                                    formik.setFieldTouched(`ConfirmationDate`, true);
                                                                }}
                                                            ></DatePicker>
                                                        </div>
                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                            <Label>Promotion Scale:&nbsp;</Label>
                                                            <TextField type='text' className='form-control' id={`PromotionScale`} name={`PromotionScale`}
                                                                onFocus={(e) => {
                                                                    formik.setFieldTouched(`PromotionScale`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onBlur={(e) => {
                                                                    formik.setFieldTouched(`PromotionScale`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onChanged={(val) => {
                                                                    formik.setFieldValue(`PromotionScale`, val);
                                                                }}
                                                            ></TextField>
                                                        </div>
                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                            <Label>Promotion Effective Date&nbsp;</Label>
                                                            <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date'
                                                                value={formik.values.PromotionEffectiveDate}
                                                                // maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}
                                                                onSelectDate={(val) => {
                                                                    // formik.setFieldTouched('StartDate', true);
                                                                    formik.setFieldValue(`PromotionEffectiveDate`, val);
                                                                }}
                                                                onAfterMenuDismiss={() => {
                                                                    formik.setFieldTouched(`PromotionEffectiveDate`, true);
                                                                }}
                                                            ></DatePicker>
                                                        </div>
                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                            <Label>New Designation:&nbsp;</Label>
                                                            <Dropdown placeHolder='Select Designation' className='form-control' id={`DesignationPromotedToId`}
                                                                options={(this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.DesignationChoices : []}
                                                                onFocus={(e) => {
                                                                    formik.setFieldTouched(`DesignationPromotedToId`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onBlur={(e) => {
                                                                    formik.setFieldTouched(`DesignationPromotedToId`, true);
                                                                    // console.log(formik);
                                                                }}
                                                                onChanged={(val) => {
                                                                    formik.setFieldValue(`DesignationPromotedToId`, val.key);
                                                                }}
                                                            />
                                                        </div>
                                                        <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                            <Label>Promotion Confirmation Date&nbsp;</Label>
                                                            <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date'
                                                                value={formik.values.PromotionConfirmationDate}
                                                                // maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}
                                                                onSelectDate={(val) => {
                                                                    // formik.setFieldTouched('StartDate', true);
                                                                    formik.setFieldValue(`PromotionConfirmationDate`, val);
                                                                }}
                                                                onAfterMenuDismiss={() => {
                                                                    formik.setFieldTouched(`PromotionConfirmationDate`, true);
                                                                }}
                                                            ></DatePicker>
                                                        </div>
                                                        <div className="col-sm-12 col-md-12 col-lg-12 customDivSeprator"></div>
                                                    </div>

                                                </div>
                                                {(formik.isValid && Object.keys(formik.errors).length === 0) && (
                                                    <div className='widget-card-body' style={{ height: 'auto' }}>
                                                        <div className='row'>
                                                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12' style={{ textAlign: 'center' }}>
                                                                <PrimaryButton type='button' data-automation-id='btn-next-profile' iconProps={{ iconName: 'Next' }}
                                                                    text='Next' onClick={() => {
                                                                        this.props.onFormValidationChange(formik.isValid, formik.values, 'Promotions');
                                                                        window.location.href = '#/createUserProfile/Posting'; }} />
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