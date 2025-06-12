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
import { AddressMaster, IAddressMaster } from '../../../../services/interface/IAddressMaster';

export default class AddAddress extends React.Component<IEmployeeMangementProps, ICreateUserProfile> {
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
            AddressMaster: yup.array().of(yup.object().shape({
                AddressType: yup.string().required('Type is required')
                , AccomodationType: yup.string().required('Type is required')
                , LeaseStartDate: yup.date().nullable().required('Date is required.').typeError('A valid date is required')
                , LeaseEndDate: yup.date().nullable().required('Date is required.').typeError('A valid date is required')
                , MonthlyRent: yup.number().typeError('Rent should be a number').required('Rent is required')
                , Entitlement: yup.string().required('Institute is required')
                , SecurityDepositAmount: yup.number().typeError('Deposit should be a number').required('Deposit is required')
                , Address: yup.string().required('Address is required')
                , CountryId: yup.string().required('Country is required')
                , StateId: yup.string().required('State is required')
                , CityId: yup.string().required('City is required')
                , PinCode: yup.string().required('PinCode is required')
                , TelephoneNo: yup.string().required('TelephoneNo is required')
                , MobileNo: yup.string().required('MobileNo is required')
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
                        this.props.onFormValidationChange(formik.isValid, formik.values, 'Address');
                    }}>
                        <div className='body-content'>
                            <div className='row'>
                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                    <div className='widget-card full-height'>
                                        <div className='widget-card-head'>
                                            <span className='widget-card-head-icon'>
                                                <Icon iconName='HomeSolid' />
                                            </span>
                                            <h2 className='widget-card-head-title'>ADDRESS</h2>
                                        </div>
                                        <div className='widget-card-body'>
                                            <div className='row'>
                                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                                    <FieldArray name='AddressMaster'>
                                                        {faProps => (<div>{
                                                            formik.values && formik.values.AddressMaster
                                                                && formik.values.AddressMaster.length > 0 ? (
                                                                formik.values.AddressMaster.map((tnc: IAddressMaster, n: number) => (
                                                                    <div key={n}>
                                                                        <div className='row'>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Address Type:&nbsp;</Label>
                                                                                <Dropdown placeHolder='Select Type' className='form-control' id={`AddressMaster-${n}-AddressType`} options={
                                                                                    (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.ContractTypeChoices : []
                                                                                } required={true} selectedKey={tnc.AddressType}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.AddressType`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.AddressType`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`AddressMaster.${n}.AddressType`, val.key);
                                                                                    }} 
                                                                                    errorMessage={formik.errors[`AddressMaster.${n}.AddressType`] && formik.touched[`AddressMaster.${n}.AddressType`] ? formik.errors[`AddressMaster.${n}.AddressType`] as string : ''}
                                                                                />
                                                                                <ErrorMessage name={`AddressMaster.${n}.AddressType`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Accomodation Type:&nbsp;</Label>
                                                                                <Dropdown placeHolder='Select Type' className='form-control' id={`AddressMaster-${n}-AccomodationType`} options={
                                                                                    (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.AddressMasterAccomdationTypeChoices : []
                                                                                } required={true} selectedKey={tnc.AccomodationType}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.AccomodationType`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.AccomodationType`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`AddressMaster.${n}.AccomodationType`, val.key);
                                                                                    }}
                                                                                    errorMessage={formik.errors[`AddressMaster.${n}.AccomodationType`] && formik.touched[`AddressMaster.${n}.AccomodationType`] ? formik.errors[`AddressMaster.${n}.AccomodationType`] as string : ''}
                                                                                />
                                                                                <ErrorMessage name={`AddressMaster.${n}.AccomodationType`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Lease Start Date&nbsp;</Label>
                                                                                <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date' isRequired={true}
                                                                                    value={formik.values.AddressMaster[n].LeaseStartDate}
                                                                                    // maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}
                                                                                    onSelectDate={(val) => {
                                                                                        // formik.setFieldTouched('StartDate', true);
                                                                                        formik.setFieldValue(`AddressMaster.${n}.LeaseStartDate`, val);
                                                                                    }}
                                                                                    onAfterMenuDismiss={() => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.LeaseStartDate`, true);
                                                                                    }}
                                                                                ></DatePicker>
                                                                                <ErrorMessage name={`AddressMaster.${n}.LeaseStartDate`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Lease End Date&nbsp;</Label>
                                                                                <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date' isRequired={true}
                                                                                    value={formik.values.AddressMaster[n].LeaseEndDate}
                                                                                    // maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}
                                                                                    onSelectDate={(val) => {
                                                                                        // formik.setFieldTouched('StartDate', true);
                                                                                        formik.setFieldValue(`AddressMaster.${n}.LeaseEndDate`, val);
                                                                                    }}
                                                                                    onAfterMenuDismiss={() => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.LeaseEndDate`, true);
                                                                                    }}
                                                                                ></DatePicker>
                                                                                <ErrorMessage name={`AddressMaster.${n}.LeaseEndDate`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Monthly Rent:&nbsp;</Label>
                                                                                <TextField type='number' className='form-control' id={`AddressMaster-${n}-MonthlyRent`} name={`AddressMaster.${n}.MonthlyRent`} required={true}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.MonthlyRent`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.MonthlyRent`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`AddressMaster.${n}.MonthlyRent`, val);
                                                                                    }} value={formik.values.AddressMaster[n].MonthlyRent}
                                                                                    errorMessage={formik.errors[`AddressMaster.${n}.MonthlyRent`] && formik.touched[`AddressMaster.${n}.MonthlyRent`] ? formik.errors[`AddressMaster.${n}.MonthlyRent`] as string : ''}
                                                                                ></TextField>
                                                                                <ErrorMessage name={`AddressMaster.${n}.MonthlyRent`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Entitlement:&nbsp;</Label>
                                                                                <TextField type='text' className='form-control' id={`AddressMaster-${n}-Entitlement`} name={`AddressMaster.${n}.Entitlement`} required={true}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.Entitlement`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.Entitlement`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`AddressMaster.${n}.Entitlement`, val);
                                                                                    }} value={formik.values.AddressMaster[n].Entitlement}
                                                                                    errorMessage={formik.errors[`AddressMaster.${n}.Entitlement`] && formik.touched[`AddressMaster.${n}.Entitlement`] ? formik.errors[`AddressMaster.${n}.Entitlement`] as string : ''}
                                                                                ></TextField>
                                                                                <ErrorMessage name={`AddressMaster.${n}.Entitlement`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Security Deposit Amount:&nbsp;</Label>
                                                                                <TextField type='number' className='form-control' id={`AddressMaster-${n}-SecurityDepositAmount`} name={`AddressMaster.${n}.SecurityDepositAmount`} required={true}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.SecurityDepositAmount`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.SecurityDepositAmount`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`AddressMaster.${n}.SecurityDepositAmount`, val);
                                                                                    }} value={formik.values.AddressMaster[n].SecurityDepositAmount}
                                                                                    errorMessage={formik.errors[`AddressMaster.${n}.SecurityDepositAmount`] && formik.touched[`AddressMaster.${n}.SecurityDepositAmount`] ? formik.errors[`AddressMaster.${n}.SecurityDepositAmount`] as string : ''}
                                                                                ></TextField>
                                                                                <ErrorMessage name={`AddressMaster.${n}.SecurityDepositAmount`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Address:&nbsp;</Label>
                                                                                <TextField type='text' className='form-control' id={`AddressMaster-${n}-Address`} name={`AddressMaster.${n}.Address`} required={true}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.Address`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.Address`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`AddressMaster.${n}.Address`, val);
                                                                                    }} value={formik.values.AddressMaster[n].Address}
                                                                                    errorMessage={formik.errors[`AddressMaster.${n}.Address`] && formik.touched[`AddressMaster.${n}.Address`] ? formik.errors[`AddressMaster.${n}.Address`] as string : ''}
                                                                                ></TextField>
                                                                                <ErrorMessage name={`AddressMaster.${n}.Address`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Country:&nbsp;</Label>
                                                                                <Dropdown placeHolder='Select Country' className='form-control' id={`AddressMaster-${n}-CountryId`} options={
                                                                                    (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.CountryChoices : []
                                                                                } required={true} selectedKey={tnc.CountryId}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.CountryId`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.CountryId`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`AddressMaster.${n}.CountryId`, val.key);
                                                                                        formik.setFieldValue(`AddressMaster.${n}.StateId`, '');
                                                                                        formik.setFieldValue(`AddressMaster.${n}.CityId`, '');
                                                                                    }}
                                                                                    errorMessage={formik.errors[`AddressMaster.${n}.CountryId`] && formik.touched[`AddressMaster.${n}.CountryId`] ? formik.errors[`AddressMaster.${n}.CountryId`] as string : ''}
                                                                                />
                                                                                <ErrorMessage name={`AddressMaster.${n}.CountryId`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>State:&nbsp;</Label>
                                                                                <Dropdown placeHolder='Select State' className='form-control' id={`AddressMaster-${n}-StateId`} options={
                                                                                    (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.StateMaster.filter(opt => opt.CountryId === formik.values.AddressMaster[n].CountryId).map(val => ({ key: val.Id, text: val.Title, ariaLabel: val.Title })) : []
                                                                                } required={true} selectedKey={tnc.StateId}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.StateId`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.StateId`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`AddressMaster.${n}.StateId`, val.key);
                                                                                        formik.setFieldValue(`AddressMaster.${n}.CityId`, '');
                                                                                    }}
                                                                                    errorMessage={formik.errors[`AddressMaster.${n}.StateId`] && formik.touched[`AddressMaster.${n}.StateId`] ? formik.errors[`AddressMaster.${n}.StateId`] as string : ''}
                                                                                />
                                                                                <ErrorMessage name={`AddressMaster.${n}.StateId`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>City:&nbsp;</Label>
                                                                                <Dropdown placeHolder='Select City' className='form-control' id={`AddressMaster-${n}-CityId`} options={
                                                                                    (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.CityMaster.filter(opt => opt.StateId === formik.values.AddressMaster[n].StateId).map(val => ({ key: val.Id, text: val.Title, ariaLabel: val.Title })) : []
                                                                                } required={true} selectedKey={tnc.CityId}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.CityId`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.CityId`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`AddressMaster.${n}.CityId`, val.key);
                                                                                    }}
                                                                                    errorMessage={formik.errors[`AddressMaster.${n}.CityId`] && formik.touched[`AddressMaster.${n}.CityId`] ? formik.errors[`AddressMaster.${n}.CityId`] as string : ''}
                                                                                />
                                                                                <ErrorMessage name={`AddressMaster.${n}.CityId`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Pincode:&nbsp;</Label>
                                                                                <TextField type='text' className='form-control' id={`AddressMaster-${n}-PinCode`} name={`AddressMaster.${n}.PinCode`} required={true}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.PinCode`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.PinCode`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`AddressMaster.${n}.PinCode`, val);
                                                                                    }} value={formik.values.AddressMaster[n].PinCode}
                                                                                    errorMessage={formik.errors[`AddressMaster.${n}.PinCode`] && formik.touched[`AddressMaster.${n}.PinCode`] ? formik.errors[`AddressMaster.${n}.PinCode`] as string : ''}
                                                                                ></TextField>
                                                                                <ErrorMessage name={`AddressMaster.${n}.PinCode`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Telephone:&nbsp;</Label>
                                                                                <TextField type='text' className='form-control' id={`AddressMaster-${n}-TelephoneNo`} name={`AddressMaster.${n}.TelephoneNo`} required={true}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.TelephoneNo`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.TelephoneNo`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`AddressMaster.${n}.TelephoneNo`, val);
                                                                                    }} value={formik.values.AddressMaster[n].TelephoneNo}
                                                                                    errorMessage={formik.errors[`AddressMaster.${n}.TelephoneNo`] && formik.touched[`AddressMaster.${n}.TelephoneNo`] ? formik.errors[`AddressMaster.${n}.TelephoneNo`] as string : ''}
                                                                                ></TextField>
                                                                                <ErrorMessage name={`AddressMaster.${n}.TelephoneNo`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Mobile:&nbsp;</Label>
                                                                                <TextField type='text' className='form-control' id={`AddressMaster-${n}-MobileNo`} name={`AddressMaster.${n}.MobileNo`} required={true}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.MobileNo`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`AddressMaster.${n}.MobileNo`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`AddressMaster.${n}.MobileNo`, val);
                                                                                    }} value={formik.values.AddressMaster[n].MobileNo}
                                                                                    errorMessage={formik.errors[`AddressMaster.${n}.MobileNo`] && formik.touched[`AddressMaster.${n}.MobileNo`] ? formik.errors[`AddressMaster.${n}.MobileNo`] as string : ''}
                                                                                ></TextField>
                                                                                <ErrorMessage name={`AddressMaster.${n}.MobileNo`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <span className='line-item-icon'>
                                                                                    {(formik.values.AddressMaster.length == n + 1 && !formik.errors.AddressMaster) && (
                                                                                        <Link type='button' onClick={() => {
                                                                                            faProps.push(AddressMaster);
                                                                                            formik.validateForm(formik.values);
                                                                                            this.props.onFormValidationChange(false, formik.values, 'Address')
                                                                                        }}>
                                                                                            <Icon iconName='CircleAdditionSolid' />
                                                                                        </Link>
                                                                                    )}
                                                                                </span>
                                                                                <span className='line-item-icon'>
                                                                                    {(formik.values.AddressMaster.length > 1) && (
                                                                                        <Link type='button' onClick={() => {
                                                                                            faProps.remove(n);
                                                                                            formik.validateForm(formik.values);
                                                                                            this.props.onFormValidationChange(formik.isValid, formik.values, 'Address')
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
                                                                    text='Next' onClick={() => { this.props.onFormValidationChange(formik.isValid, formik.values, 'Address') }} />
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