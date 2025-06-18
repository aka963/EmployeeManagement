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
import { DependentMaster, IDependentMaster } from '../../../../services/interface/IDependentMaster';

export default class AddDependant extends React.Component<IEmployeeMangementProps, ICreateUserProfile> {
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
            DependentMaster: yup.array().of(yup.object().shape({
                Name: yup.string().required('Name is required')
                , DOB: yup.date().nullable().required('Date is required.').typeError('A valid date is required')
                , RelationShip: yup.string().required('Institute is required')
                , DependentType: yup.string().required('Speclization is required')
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
                        this.props.onFormValidationChange(formik.isValid, formik.values, 'Dependants');
                    }}>
                        <div className='body-content'>
                            <div className='row'>
                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                    <div className='widget-card full-height'>
                                        <div className='widget-card-head'>
                                            <span className='widget-card-head-icon'>
                                                <Icon iconName='HomeSolid' />
                                            </span>
                                            <h2 className='widget-card-head-title'>DEPENDANTS</h2>
                                        </div>
                                        <div className='widget-card-body'>
                                            <div className='row'>
                                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                                    <FieldArray name='DependentMaster'>
                                                        {faProps => (<div>{
                                                            formik.values && formik.values.DependentMaster
                                                                && formik.values.DependentMaster.length > 0 ? (
                                                                formik.values.DependentMaster.map((tnc: IDependentMaster, n: number) => (
                                                                    <div key={n}>
                                                                        <div className='row'>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Name:&nbsp;</Label>
                                                                                <TextField type='text' className='form-control' id={`DependentMaster-${n}-Name`} name={`DependentMaster.${n}.Name`} required={true}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`DependentMaster.${n}.Name`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`DependentMaster.${n}.Name`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`DependentMaster.${n}.Name`, val);
                                                                                    }} value={formik.values.DependentMaster[n].Name}
                                                                                    errorMessage={formik.errors[`DependentMaster.${n}.Name`] && formik.touched[`DependentMaster.${n}.Name`] ? formik.errors[`DependentMaster.${n}.Name`] as string : ''}
                                                                                ></TextField>
                                                                                <ErrorMessage name={`DependentMaster.${n}.Name`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Date of Birth&nbsp;</Label>
                                                                                <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date' isRequired={true}
                                                                                    value={formik.values.DependentMaster[n].DOB}
                                                                                    // maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}
                                                                                    onSelectDate={(val) => {
                                                                                        // formik.setFieldTouched('StartDate', true);
                                                                                        formik.setFieldValue(`DependentMaster.${n}.DOB`, val);
                                                                                    }}
                                                                                    onAfterMenuDismiss={() => {
                                                                                        formik.setFieldTouched(`DependentMaster.${n}.DOB`, true);
                                                                                    }}
                                                                                ></DatePicker>
                                                                                <ErrorMessage name={`DependentMaster.${n}.DOB`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>RelationShip:&nbsp;</Label>
                                                                                <Dropdown placeHolder='Select Type' className='form-control' id={`DependentMaster-${n}-RelationShip`} options={
                                                                                    (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.DependentMasterRelationshipChoices : []
                                                                                } required={true} selectedKey={tnc.RelationShip}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`DependentMaster.${n}.RelationShip`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`DependentMaster.${n}.RelationShip`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`DependentMaster.${n}.RelationShip`, val.key);
                                                                                    }}
                                                                                    errorMessage={formik.errors[`DependentMaster.${n}.RelationShip`] && formik.touched[`DependentMaster.${n}.RelationShip`] ? formik.errors[`DependentMaster.${n}.RelationShip`] as string : ''}
                                                                                />
                                                                                <ErrorMessage name={`DependentMaster.${n}.RelationShip`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>DependentType:&nbsp;</Label>
                                                                                <Dropdown placeHolder='Select Type' className='form-control' id={`DependentMaster-${n}-DependentType`} options={
                                                                                    (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.DependentMasterDependentTypeChoices : []
                                                                                } required={true} selectedKey={tnc.DependentType}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`DependentMaster.${n}.DependentType`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`DependentMaster.${n}.DependentType`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`DependentMaster.${n}.DependentType`, val.key);
                                                                                    }}
                                                                                    errorMessage={formik.errors[`DependentMaster.${n}.DependentType`] && formik.touched[`DependentMaster.${n}.DependentType`] ? formik.errors[`DependentMaster.${n}.DependentType`] as string : ''}
                                                                                />
                                                                                <ErrorMessage name={`DependentMaster.${n}.DependentType`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <span className='line-item-icon'>
                                                                                    {(formik.values.DependentMaster.length == n + 1 && !formik.errors.DependentMaster) && (
                                                                                        <Link type='button' onClick={() => {
                                                                                            faProps.push(DependentMaster);
                                                                                            formik.validateForm(formik.values);
                                                                                            this.props.onFormValidationChange(false, formik.values, 'Dependants')
                                                                                        }}>
                                                                                            <Icon iconName='CircleAdditionSolid' />
                                                                                        </Link>
                                                                                    )}
                                                                                </span>
                                                                                <span className='line-item-icon'>
                                                                                    {(formik.values.DependentMaster.length > 1) && (
                                                                                        <Link type='button' onClick={() => {
                                                                                            faProps.remove(n);
                                                                                            formik.validateForm(formik.values);
                                                                                            this.props.onFormValidationChange(formik.isValid, formik.values, 'Dependants')
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
                                                                        this.props.onFormValidationChange(formik.isValid, formik.values, 'Dependants');
                                                                        window.location.href = '#/createUserProfile/Experience'; }} />
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