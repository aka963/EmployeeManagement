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
import { IAddressMaster } from '../../../../services/interface/IAddressMaster';

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
                                                                                <Dropdown placeHolder='Select Type' className='form-control' id={`AddressMaster.${n}.AddressType`} options={
                                                                                    (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.ContractTypeChoices : []
                                                                                } required={true}
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
                                                                        </div>
                                                                    </div>
                                                                )
                                                                )) : (<div></div>)
                                                        }</div>)}
                                                    </FieldArray>
                                                </div>
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