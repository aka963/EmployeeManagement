import { IEmployeeMangementProps } from '../../employeeMangement/components/IEmployeeMangementProps';
import spcrud from './SpCrud';
import { IUserProfile, IUserProfileLoadData } from '../interface/IUserProfile';
import { ISPChoiceFieldQuery, ISPQuery } from '../interface/ISPQuery';
import { IFieldInfo, ISiteUserProps } from '@pnp/sp/presets/all';
import Helper from '../utilities/Helper';
import chs from '../../services/bal/Choices';
import { DataType, IMultiSPQuery } from '../interface/IMultiSPQuery';

export default class CreateUserProfileOps {
    // #region UserProfile Master Query
    public static strBankMasterListTitle: string = 'Bank Master';
    public static strBankMasterColumns: string = 'Id,Title,ShortName';
    public static strBankMasterExpandColumns: string = '';
    public static strBankMasterSortColumns = { orderBy: 'Title', ascending: true };

    public static strOfficeMasterListTitle: string = 'OfficeMaster';
    public static strOfficeMasterColumns: string = 'Id,Title,OfficeYear,City/Id,City/Title,Country/Id,Country/Title,State/Id'
        + ',State/Title,OfficeType/Id,OfficeType/Title,OfficeType/OfficeType,OfficeType/MasterOfficeType,SubGroup/Id'
        + ',SubGroup/SubGroup,SubGroup/ShortName,SubGroup/GroupName';
    // + ',SubGroup/Title,SubGroup/GroupEmail,SubGroup/DMD';
    public static strOfficeMasterExpandColumns: string = 'SubGroup,City,Country,State,OfficeType';
    public static strOfficeMasterSortColumns = { orderBy: 'Title', ascending: true };

    public static strDesignationListTitle: string = 'Desgination Master';
    public static strDesignationColumns: string = 'Id,Title,Designation_Hindi,Designation_VC,DesignationOrder,NomineeDirector'
        + ',Scale/Id,Scale/Title,Designation/Id,Designation/Title';
    public static strDesignationExpandColumns: string = 'Scale,Designation';
    public static strDesignationSortColumns = { orderBy: 'Title', ascending: true };

    public static strEmployeeTypeMasterListTitle: string = 'Employee Type Master';
    public static strEmployeeTypeMasterColumns: string = 'Id,Title,EmployeeCategory/Id,EmployeeCategory/Title';
    public static strEmployeeTypeMasterExpandColumns: string = 'EmployeeCategory';
    public static strEmployeeTypeMasterSortColumns = { orderBy: 'Title', ascending: true };

    public static strGradeMasterListTitle: string = 'Grade Master';
    public static strGradeMasterColumns: string = 'Id,Title,Grade,MaximumCeiling,Scale/Id,Scale/Title';
    public static strGradeMasterExpandColumns: string = 'Scale';
    public static strGradeMasterSortColumns = { orderBy: 'Title', ascending: true };

    public static strScaleMasterListTitle: string = 'ScaleMaster';
    public static strScaleMasterColumns: string = 'Id,Title';
    public static strScaleMasterExpandColumns: string = '';
    public static strScaleMasterSortColumns = { orderBy: 'Title', ascending: true };

    public static strPayScaleMasterListTitle: string = 'PayScaleMaster';
    public static strPayScaleMasterColumns: string = 'Id,Title,Scale/Id,Scale/Title';
    public static strPayScaleMasterExpandColumns: string = 'Scale';
    public static strPayScaleMasterSortColumns = { orderBy: 'Title', ascending: true };

    public static strShiftAllocatedMasterListTitle: string = 'ShiftAllocatedMaster';
    public static strShiftAllocatedMasterColumns: string = 'Id,Title,GracePeriod,GTEffectiveDate,HalfdayTime,ShiftInTime,ShiftName'
        + ',ShiftOutTime';
    public static strShiftAllocatedMasterExpandColumns: string = '';
    public static strShiftAllocatedMasterSortColumns = { orderBy: 'Title', ascending: true };

    public static strSubGroupMasterListTitle: string = 'Sub Group Master';
    public static strSubGroupMasterColumns: string = 'Id,Title,Group/Id,Group/Title,SubGroup,ShortName,GroupName,GroupEmail,DMD,Status';
    public static strSubGroupMasterExpandColumns: string = 'Group';
    public static strSubGroupMasterSortColumns = { orderBy: 'Title', ascending: true };

    public static strUnitMasterListTitle: string = 'UnitMaster';
    public static strUnitMasterColumns: string = 'Id,Title,SubGroup/Id,SubGroup/SubGroup,SubGroup/ShortName,SubGroup/GroupName';
        // + ',SubGroup/Title,SubGroup/GroupEmail,SubGroup/DMD';
    public static strUnitMasterExpandColumns: string = 'SubGroup';
    public static strUnitMasterSortColumns = { orderBy: 'Title', ascending: true };

    public static strEmployeeMasterListTitle: string = 'EmployeeMaster';
    public static strEmployeeMasterChoiceColumns: string[] = ['BloodGroup', 'ContractType', 'EmployeeTitle', 'Gender'
        , 'MaritalStatus', 'PhysicallyHandicaped', 'ProbationPeriod', 'Role', 'SingleParent', 'WeeklyOff'];

    public static strEmployeeMasterColumns: string = 'Title';
    public static strEmployeeMasterExpandColumns: string = '';
    //public static strEmployeeMasterFilterColumns = '(Title eq \'' + userProfile.Title + '\')';
    public static strEmployeeMasterSortColumns = { orderBy: 'Title', ascending: true };

    public static strTrainingNCertificationMasterListTitle: string = 'TrainingCertificationMaster';
    public static strTrainingNCertificationMasterColumns: string = 'Id,Title';
    public static strTrainingNCertificationMasterExpandColumns: string = '';
    public static strTrainingNCertificationMasterSortColumns = { orderBy: 'Title', ascending: true };

    public static strEmpTrainingNCertificationListTitle: string = 'EmpTrainingAndCertification';
    public static strEmpTrainingNCertificationChoiceColumns: string[] = ['Location'];

    // #endregion

    public static async getUserInfo(username: string, props: IEmployeeMangementProps): Promise<ISiteUserProps> {
        let userProps: ISiteUserProps;
        Helper.hideShowLoader('block');
        return spcrud.getUserInfo(username, props).then((resp) => {
            userProps = resp;
            Helper.hideShowLoader('none');
            return userProps;
        }).catch((e) => {
            console.log(e);
            Helper.hideShowLoader('none');
            return userProps;
        });
    }

    public static async getUserProfileDataOnLoad(props: IEmployeeMangementProps): Promise<IUserProfileLoadData> {
        let multiSPQuery: IMultiSPQuery[] = [];

        // #region UserProfile Master Query
        multiSPQuery.push({
            Type: DataType.ListItems, ListTitle: this.strBankMasterListTitle, SelectQuery: this.strBankMasterColumns,
            ExpandQuery: this.strBankMasterExpandColumns, FilterQuery: '', SortQuery: this.strBankMasterSortColumns
        });

        multiSPQuery.push({
            Type: DataType.ListItems, ListTitle: this.strOfficeMasterListTitle, SelectQuery: this.strOfficeMasterColumns,
            ExpandQuery: this.strOfficeMasterExpandColumns, FilterQuery: '', SortQuery: this.strOfficeMasterSortColumns
        });

        multiSPQuery.push({
            Type: DataType.ListItems, ListTitle: this.strDesignationListTitle, SelectQuery: this.strDesignationColumns,
            ExpandQuery: this.strDesignationExpandColumns, FilterQuery: '', SortQuery: this.strDesignationSortColumns
        });

        multiSPQuery.push({
            Type: DataType.ListItems, ListTitle: this.strEmployeeTypeMasterListTitle, SelectQuery: this.strEmployeeTypeMasterColumns,
            ExpandQuery: this.strEmployeeTypeMasterExpandColumns, FilterQuery: '', SortQuery: this.strEmployeeTypeMasterSortColumns
        });

        multiSPQuery.push({
            Type: DataType.ListItems, ListTitle: this.strGradeMasterListTitle, SelectQuery: this.strGradeMasterColumns,
            ExpandQuery: this.strGradeMasterExpandColumns, FilterQuery: '', SortQuery: this.strGradeMasterSortColumns
        });

        multiSPQuery.push({
            Type: DataType.ListItems, ListTitle: this.strScaleMasterListTitle, SelectQuery: this.strScaleMasterColumns,
            ExpandQuery: this.strScaleMasterExpandColumns, FilterQuery: '', SortQuery: this.strScaleMasterSortColumns
        });

        multiSPQuery.push({
            Type: DataType.ListItems, ListTitle: this.strPayScaleMasterListTitle, SelectQuery: this.strPayScaleMasterColumns,
            ExpandQuery: this.strPayScaleMasterExpandColumns, FilterQuery: '', SortQuery: this.strPayScaleMasterSortColumns
        });

        multiSPQuery.push({
            Type: DataType.ListItems, ListTitle: this.strShiftAllocatedMasterListTitle, SelectQuery: this.strShiftAllocatedMasterColumns,
            ExpandQuery: this.strShiftAllocatedMasterExpandColumns, FilterQuery: '', SortQuery: this.strShiftAllocatedMasterSortColumns
        });

        multiSPQuery.push({
            Type: DataType.ListItems, ListTitle: this.strSubGroupMasterListTitle, SelectQuery: this.strSubGroupMasterColumns,
            ExpandQuery: this.strSubGroupMasterExpandColumns, FilterQuery: '', SortQuery: this.strSubGroupMasterSortColumns
        });

        multiSPQuery.push({
            Type: DataType.ListItems, ListTitle: this.strUnitMasterListTitle, SelectQuery: this.strUnitMasterColumns,
            ExpandQuery: this.strUnitMasterExpandColumns, FilterQuery: '', SortQuery: this.strUnitMasterSortColumns
        });

        multiSPQuery.push({
            Type: DataType.ListItems, ListTitle: this.strTrainingNCertificationMasterListTitle, SelectQuery: this.strTrainingNCertificationMasterColumns,
            ExpandQuery: this.strTrainingNCertificationMasterExpandColumns, FilterQuery: '', SortQuery: this.strTrainingNCertificationMasterSortColumns
        });

        multiSPQuery.push({
            Type: DataType.Choices, ListTitle: this.strEmployeeMasterListTitle, ChoiceColumns: this.strEmployeeMasterChoiceColumns
        });

        multiSPQuery.push({
            Type: DataType.Choices, ListTitle: this.strEmpTrainingNCertificationListTitle, ChoiceColumns: this.strEmpTrainingNCertificationChoiceColumns
        });
        // #endregion

        Helper.hideShowLoader('block');
        return spcrud.getMultiDataInBatch(multiSPQuery, props).then((resp) => {
            Helper.hideShowLoader('none');
            let multiResults: IUserProfileLoadData = {
                BankMaster: resp[0], OfficeMaster: resp[1], DesignationMaster: resp[2], EmployeeTypeMaster: resp[3]
                , GradeMaster: resp[4], ScaleMaster: resp[5], PayScaleMaster: resp[6], ShiftAllocatedMaster: resp[7]
                , SubGroupMaster: resp[8], UnitMaster: resp[9], TrainingCertificationMaster: resp[10]

                , BankChoices: Helper.getDropDownOptions(DataType.ListItems, resp[0], 'Select Bank', 'Title')
                , OfficeChoices: Helper.getDropDownOptions(DataType.ListItems, resp[1], 'Select Office', 'Title')
                , DesignationChoices: Helper.getDropDownOptions(DataType.ListItems, resp[2], 'Select Designation', 'Title')
                , EmployeeTypeChoices: Helper.getDropDownOptions(DataType.ListItems, resp[3], 'Select Type', 'Title')
                , GradeChoices: Helper.getDropDownOptions(DataType.ListItems, resp[4], 'Select Grade', 'Title')
                , ScaleChoices: Helper.getDropDownOptions(DataType.ListItems, resp[5], 'Select Scale', 'Title')
                , PayScaleChoices: Helper.getDropDownOptions(DataType.ListItems, resp[6], 'Select Pay Scale', 'Title')
                , ShiftAllocatedChoices: Helper.getDropDownOptions(DataType.ListItems, resp[7], 'Select Shift Allocated', 'Title')
                , SubGroupChoices: Helper.getDropDownOptions(DataType.ListItems, resp[8], 'Select Sub Group', 'Title')
                , UnitChoices: Helper.getDropDownOptions(DataType.ListItems, resp[9], 'Select Unit', 'Title')
                , TrainingCertificationChoices: Helper.getDropDownOptions(DataType.ListItems, resp[9], 'Select Type', 'Title')

                , BloodGroupChoices: Helper.getDropDownOptions(DataType.Choices, resp[11].Choices, 'Select Blood Group')
                , ContractTypeChoices: Helper.getDropDownOptions(DataType.Choices, resp[12].Choices, 'Select Contract Type')
                , EmployeeTitleChoices: Helper.getDropDownOptions(DataType.Choices, resp[13].Choices, 'Select Title')
                , GenderChoices: Helper.getDropDownOptions(DataType.Choices, resp[14].Choices, 'Select Gender')
                , MaritalStatusChoices: Helper.getDropDownOptions(DataType.Choices, resp[15].Choices, 'Select Marital Status')
                , PhysicallyHandicapedChoices: Helper.getDropDownOptions(DataType.Choices, resp[16].Choices, 'Select Whether')
                , ProbationPeriodChoices: Helper.getDropDownOptions(DataType.Choices, resp[17].Choices, 'Select Probation Period')
                , RoleChoices: Helper.getDropDownOptions(DataType.Choices, resp[18].Choices, 'Select Role')
                , SingleParentChoices: Helper.getDropDownOptions(DataType.Choices, resp[19].Choices, 'Select Whether')
                , WeeklyOffChoices: Helper.getDropDownOptions(DataType.Choices, resp[20].Choices, 'Select WeeklyOff')
                , TrainingNCertificationLocationChoices: Helper.getDropDownOptions(DataType.Choices, resp[21].Choices, 'Select Location')
            };
            return multiResults;
        }).catch((e) => {
            console.log(e);
            Helper.hideShowLoader('none');
            return {} as IUserProfileLoadData;
        });
    }

    public static async getEmployeeIdById(strEmployeeId: string, props: IEmployeeMangementProps): Promise<any[]> {
        Helper.hideShowLoader('block');
        return spcrud.getData(this.strEmployeeMasterListTitle, 'Title', '', '(Title eq \'' + strEmployeeId.trim() + '\')'
            , { column: 'Id', isAscending: true }, props).then((resp) => {
                Helper.hideShowLoader('none');
                return resp;
            });
    }
}