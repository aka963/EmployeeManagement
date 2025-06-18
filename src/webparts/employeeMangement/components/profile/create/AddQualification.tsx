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
import { QualificationMaster, IQualificationMaster } from '../../../../services/interface/IQualificationMaster';

export default class AddQualification extends React.Component<IEmployeeMangementProps, ICreateUserProfile> {
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
            QualificationMaster: yup.array().of(yup.object().shape({
                EducationId: yup.string().required('Qualification is required')
                , Institute: yup.string().required('Institute is required')
                , Speclization: yup.string().required('Speclization is required')
                , Category: yup.string().required('Category is required')
                , YearOfPassing: yup.number().typeError('Year Of Passing should be a number').required('Year Of Passing is required')
                , Score: yup.string().required('Score is required')
                , StartDate: yup.date().nullable().required('Date is required.').typeError('A valid date is required')
                , EndDate: yup.date().nullable().required('Date is required.').typeError('A valid date is required')
                , Comments: yup.string().required('Comments is required')
            }))
        })

        return (
            <Formik ref={this.setFormikInstance} initialValues={this.InitializedUserProfile} validationSchema={validate}
                enableReinitialize={false} validateOnBlur={true} validateOnChange={true}
                onSubmit={(values, actions) => {
                    // console.log('Submitted:', values);
                    // this.onProfileSubmit(values, actions);
                }}>
                {(formik) => (
                    <form onSubmit={formik.handleSubmit} onBlur={(ev) => {
                        this.props.onFormValidationChange(formik.isValid, formik.values, 'Education');
                    }}>
                        <div className='body-content'>
                            <div className='row'>
                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                    <div className='widget-card full-height'>
                                        <div className='widget-card-head'>
                                            <span className='widget-card-head-icon'>
                                                <Icon iconName='HomeSolid' />
                                            </span>
                                            <h2 className='widget-card-head-title'>QUALIFICATION</h2>
                                        </div>
                                        <div className='widget-card-body'>
                                            <div className='row'>
                                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                                    <FieldArray name='QualificationMaster'>
                                                        {faProps => (<div>{
                                                            formik.values && formik.values.QualificationMaster
                                                                && formik.values.QualificationMaster.length > 0 ? (
                                                                formik.values.QualificationMaster.map((tnc: IQualificationMaster, n: number) => (
                                                                    <div key={n}>
                                                                        <div className='row'>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Education:&nbsp;</Label>
                                                                                <Dropdown placeHolder='Select Type' className='form-control' id={`QualificationMaster-${n}-EducationId`} options={
                                                                                    (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.EducationChoices : []
                                                                                } required={true} selectedKey={tnc.EducationId}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`QualificationMaster.${n}.EducationId`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`QualificationMaster.${n}.EducationId`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`QualificationMaster.${n}.EducationId`, val.key);
                                                                                    }}
                                                                                    errorMessage={formik.errors[`QualificationMaster.${n}.EducationId`] && formik.touched[`QualificationMaster.${n}.EducationId`] ? formik.errors[`QualificationMaster.${n}.EducationId`] as string : ''}
                                                                                />
                                                                                <ErrorMessage name={`QualificationMaster.${n}.EducationId`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Institute:&nbsp;</Label>
                                                                                <TextField type='text' className='form-control' id={`QualificationMaster-${n}-Institute`} name={`QualificationMaster.${n}.Institute`} required={true}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`QualificationMaster.${n}.Institute`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`QualificationMaster.${n}.Institute`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`QualificationMaster.${n}.Institute`, val);
                                                                                    }} value={formik.values.QualificationMaster[n].Institute}
                                                                                    errorMessage={formik.errors[`QualificationMaster.${n}.Institute`] && formik.touched[`QualificationMaster.${n}.Institute`] ? formik.errors[`QualificationMaster.${n}.Institute`] as string : ''}
                                                                                ></TextField>
                                                                                <ErrorMessage name={`QualificationMaster.${n}.Institute`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Speclization:&nbsp;</Label>
                                                                                <TextField type='text' className='form-control' id={`QualificationMaster-${n}-Speclization`} name={`QualificationMaster.${n}.Speclization`} required={true}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`QualificationMaster.${n}.Speclization`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`QualificationMaster.${n}.Speclization`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`QualificationMaster.${n}.Speclization`, val);
                                                                                    }} value={formik.values.QualificationMaster[n].Speclization}
                                                                                    errorMessage={formik.errors[`QualificationMaster.${n}.Speclization`] && formik.touched[`QualificationMaster.${n}.Speclization`] ? formik.errors[`QualificationMaster.${n}.Speclization`] as string : ''}
                                                                                ></TextField>
                                                                                <ErrorMessage name={`QualificationMaster.${n}.Speclization`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Category:&nbsp;</Label>
                                                                                <Dropdown placeHolder='Select Type' className='form-control' id={`QualificationMaster-${n}-Category`} options={
                                                                                    (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.QualificationMasterCategoryChoices : []
                                                                                } required={true} selectedKey={tnc.Category}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`QualificationMaster.${n}.Category`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`QualificationMaster.${n}.Category`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`QualificationMaster.${n}.Category`, val.key);
                                                                                    }}
                                                                                    errorMessage={formik.errors[`QualificationMaster.${n}.Category`] && formik.touched[`QualificationMaster.${n}.Category`] ? formik.errors[`QualificationMaster.${n}.Category`] as string : ''}
                                                                                />
                                                                                <ErrorMessage name={`QualificationMaster.${n}.Category`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Year of Passing:&nbsp;</Label>
                                                                                <TextField type='number' className='form-control' id={`QualificationMaster-${n}-YearOfPassing`} name={`QualificationMaster.${n}.YearOfPassing`} required={true}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`QualificationMaster.${n}.YearOfPassing`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`QualificationMaster.${n}.YearOfPassing`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`QualificationMaster.${n}.YearOfPassing`, val);
                                                                                    }} value={formik.values.QualificationMaster[n].YearOfPassing}
                                                                                    errorMessage={formik.errors[`QualificationMaster.${n}.YearOfPassing`] && formik.touched[`QualificationMaster.${n}.YearOfPassing`] ? formik.errors[`QualificationMaster.${n}.YearOfPassing`] as string : ''}
                                                                                ></TextField>
                                                                                <ErrorMessage name={`QualificationMaster.${n}.YearOfPassing`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Score:&nbsp;</Label>
                                                                                <TextField type='number' className='form-control' id={`QualificationMaster-${n}-Score`} name={`QualificationMaster.${n}.Score`} required={true}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`QualificationMaster.${n}.Score`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`QualificationMaster.${n}.Score`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`QualificationMaster.${n}.Score`, val);
                                                                                    }} value={formik.values.QualificationMaster[n].Score}
                                                                                    errorMessage={formik.errors[`QualificationMaster.${n}.Score`] && formik.touched[`QualificationMaster.${n}.Score`] ? formik.errors[`QualificationMaster.${n}.Score`] as string : ''}
                                                                                ></TextField>
                                                                                <ErrorMessage name={`QualificationMaster.${n}.Score`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Start Date&nbsp;</Label>
                                                                                <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date' isRequired={true}
                                                                                    value={formik.values.QualificationMaster[n].StartDate}
                                                                                    // maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}
                                                                                    onSelectDate={(val) => {
                                                                                        // formik.setFieldTouched('StartDate', true);
                                                                                        formik.setFieldValue(`QualificationMaster.${n}.StartDate`, val);
                                                                                    }}
                                                                                    onAfterMenuDismiss={() => {
                                                                                        formik.setFieldTouched(`QualificationMaster.${n}.StartDate`, true);
                                                                                    }}
                                                                                ></DatePicker>
                                                                                <ErrorMessage name={`QualificationMaster.${n}.StartDate`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>End Date&nbsp;</Label>
                                                                                <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date' isRequired={true}
                                                                                    value={formik.values.QualificationMaster[n].EndDate}
                                                                                    // maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}
                                                                                    onSelectDate={(val) => {
                                                                                        // formik.setFieldTouched('StartDate', true);
                                                                                        formik.setFieldValue(`QualificationMaster.${n}.EndDate`, val);
                                                                                    }}
                                                                                    onAfterMenuDismiss={() => {
                                                                                        formik.setFieldTouched(`QualificationMaster.${n}.EndDate`, true);
                                                                                    }}
                                                                                ></DatePicker>
                                                                                <ErrorMessage name={`QualificationMaster.${n}.EndDate`} component='div' className='error-message' />
                                                                            </div>
                                                                            
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Comments:&nbsp;</Label>
                                                                                <TextField type='text' className='form-control' id={`QualificationMaster-${n}-Comments`} name={`QualificationMaster.${n}.Comments`} required={true}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`QualificationMaster.${n}.Comments`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`QualificationMaster.${n}.Comments`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`QualificationMaster.${n}.Comments`, val);
                                                                                    }} value={formik.values.QualificationMaster[n].Comments}
                                                                                    errorMessage={formik.errors[`QualificationMaster.${n}.Comments`] && formik.touched[`QualificationMaster.${n}.Comments`] ? formik.errors[`QualificationMaster.${n}.Comments`] as string : ''}
                                                                                ></TextField>
                                                                                <ErrorMessage name={`QualificationMaster.${n}.Comments`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <span className='line-item-icon'>
                                                                                    {(formik.values.QualificationMaster.length == n + 1 && !formik.errors.QualificationMaster) && (
                                                                                        <Link type='button' onClick={() => {
                                                                                            faProps.push(QualificationMaster);
                                                                                            formik.validateForm(formik.values);
                                                                                            this.props.onFormValidationChange(false, formik.values, 'Education')
                                                                                        }}>
                                                                                            <Icon iconName='CircleAdditionSolid' />
                                                                                        </Link>
                                                                                    )}
                                                                                </span>
                                                                                <span className='line-item-icon'>
                                                                                    {(formik.values.QualificationMaster.length > 1) && (
                                                                                        <Link type='button' onClick={() => {
                                                                                            faProps.remove(n);
                                                                                            formik.validateForm(formik.values);
                                                                                            this.props.onFormValidationChange(formik.isValid, formik.values, 'Education')
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
                                                                    text='Next' onClick={() => {
                                                                        this.props.onFormValidationChange(formik.isValid, formik.values, 'Education');
                                                                        window.location.href = '#/createUserProfile/Dependants'; }} />
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

        );
    }
}