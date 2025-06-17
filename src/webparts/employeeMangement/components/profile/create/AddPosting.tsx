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
import { PostingHistory, IPostingHistory } from '../../../../services/interface/IPostingHistory';

export default class AddPosting extends React.Component<IEmployeeMangementProps, ICreateUserProfile> {
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
            PostingHistory: yup.array().of(yup.object().shape({
                SubGroupId: yup.string().required('Department is required')
                , FromDate: yup.date().nullable().required('Date is required.').typeError('A valid date is required')
                , ToDate: yup.date().nullable().required('Date is required.').typeError('A valid date is required')
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
                        this.props.onFormValidationChange(formik.isValid, formik.values, 'Posting');
                    }}>
                        <div className='body-content'>
                            <div className='row'>
                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                    <div className='widget-card full-height'>
                                        <div className='widget-card-head'>
                                            <span className='widget-card-head-icon'>
                                                <Icon iconName='HomeSolid' />
                                            </span>
                                            <h2 className='widget-card-head-title'>POSTING</h2>
                                        </div>
                                        <div className='widget-card-body'>
                                            <div className='row'>
                                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                                    <FieldArray name='PostingHistory'>
                                                        {faProps => (<div>{
                                                            formik.values && formik.values.PostingHistory
                                                                && formik.values.PostingHistory.length > 0 ? (
                                                                formik.values.PostingHistory.map((tnc: IPostingHistory, n: number) => (
                                                                    <div key={n}>
                                                                        <div className='row'>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>Department:&nbsp;</Label>
                                                                                <Dropdown placeHolder='Select Type' className='form-control' id={`PostingHistory-${n}-SubGroupId`} options={
                                                                                    (this.state.userProfileLoadData !== undefined) ? this.state.userProfileLoadData.SubGroupChoices : []
                                                                                } required={true} selectedKey={tnc.SubGroupId}
                                                                                    onFocus={(e) => {
                                                                                        formik.setFieldTouched(`PostingHistory.${n}.SubGroupId`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onBlur={(e) => {
                                                                                        formik.setFieldTouched(`PostingHistory.${n}.SubGroupId`, true);
                                                                                        // console.log(formik);
                                                                                    }}
                                                                                    onChanged={(val) => {
                                                                                        formik.setFieldValue(`PostingHistory.${n}.SubGroupId`, val.key);
                                                                                    }}
                                                                                    errorMessage={formik.errors[`PostingHistory.${n}.SubGroupId`] && formik.touched[`PostingHistory.${n}.SubGroupId`] ? formik.errors[`PostingHistory.${n}.SubGroupId`] as string : ''}
                                                                                />
                                                                                {/* <ErrorMessage name={`PostingHistory.${n}.SubGroupId`} component='div' className='error-message' /> */}
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>From Date&nbsp;</Label>
                                                                                <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date' isRequired={true}
                                                                                    value={formik.values.PostingHistory[n].FromDate}
                                                                                    // maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}
                                                                                    onSelectDate={(val) => {
                                                                                        // formik.setFieldTouched('StartDate', true);
                                                                                        formik.setFieldValue(`PostingHistory.${n}.FromDate`, val);
                                                                                    }}
                                                                                    onAfterMenuDismiss={() => {
                                                                                        formik.setFieldTouched(`PostingHistory.${n}.FromDate`, true);
                                                                                    }}
                                                                                ></DatePicker>
                                                                                <ErrorMessage name={`PostingHistory.${n}.FromDate`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <Label>To Date&nbsp;</Label>
                                                                                <DatePicker firstDayOfWeek={DayOfWeek.Sunday} placeholder='Select a date' isRequired={true}
                                                                                    value={formik.values.PostingHistory[n].ToDate}
                                                                                    // maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 3, new Date().getDate())}
                                                                                    onSelectDate={(val) => {
                                                                                        // formik.setFieldTouched('StartDate', true);
                                                                                        formik.setFieldValue(`PostingHistory.${n}.ToDate`, val);
                                                                                    }}
                                                                                    onAfterMenuDismiss={() => {
                                                                                        formik.setFieldTouched(`PostingHistory.${n}.ToDate`, true);
                                                                                    }}
                                                                                ></DatePicker>
                                                                                <ErrorMessage name={`PostingHistory.${n}.ToDate`} component='div' className='error-message' />
                                                                            </div>
                                                                            <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-body-item'>
                                                                                <span className='line-item-icon'>
                                                                                    {(formik.values.PostingHistory.length == n + 1 && !formik.errors.PostingHistory) && (
                                                                                        <Link type='button' onClick={() => {
                                                                                            faProps.push(PostingHistory);
                                                                                            formik.validateForm(formik.values);
                                                                                            this.props.onFormValidationChange(false, formik.values, 'Posting')
                                                                                        }}>
                                                                                            <Icon iconName='CircleAdditionSolid' />
                                                                                        </Link>
                                                                                    )}
                                                                                </span>
                                                                                <span className='line-item-icon'>
                                                                                    {(formik.values.PostingHistory.length > 1) && (
                                                                                        <Link type='button' onClick={() => {
                                                                                            faProps.remove(n);
                                                                                            formik.validateForm(formik.values);
                                                                                            this.props.onFormValidationChange(formik.isValid, formik.values, 'Posting')
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
                                                                    text='Next' onClick={() => { this.props.onFormValidationChange(formik.isValid, formik.values, 'Posting') }} />
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