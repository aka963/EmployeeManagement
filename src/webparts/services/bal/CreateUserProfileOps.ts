import { IEmployeeMangementProps } from '../../employeeMangement/components/IEmployeeMangementProps';
import spcrud from './SpCrud';
import upOps from './UserProfileOps';
import { IUserProfile, IUserProfileItem, IUserProfileLoadData } from '../interface/IUserProfile';
import { ISPChoiceFieldQuery, ISPQuery } from '../interface/ISPQuery';
import { IFieldInfo, IFileAddResult, IItemAddResult, ISiteUserProps } from '@pnp/sp/presets/all';
import Helper from '../utilities/Helper';
import chs from '../../services/bal/Choices';
import { DataType, IMultiSPQuery } from '../interface/IMultiSPQuery';
import { IListBulkData } from '../interface/IListBulkData';
import { IEmployeeDocuments } from '../interface/IEmployeeDocuments';
import { IEmergencyContactItem } from '../interface/IEmergencyContact';
import { ITrainingNCertificationItem } from '../interface/ITrainingNCertification';
import { IAddressMasterItem } from '../interface/IAddressMaster';
import { IQualificationMasterItem } from '../interface/IQualificationMaster';
import { IDependentMasterItem } from '../interface/IDependentMaster';
import { IExperienceDetailsItem } from '../interface/IExperienceDetails';
import { IPostingHistoryItem } from '../interface/IPostingHistory';

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

    public static strEmployeeMasterColumns: string = 'Title';
    public static strEmployeeMasterExpandColumns: string = '';
    //public static strEmployeeMasterFilterColumns = '(Title eq \'' + userProfile.Title + '\')';
    public static strEmployeeMasterSortColumns = { orderBy: 'Title', ascending: true };

    public static strTrainingNCertificationMasterListTitle: string = 'TrainingCertificationMaster';
    public static strTrainingNCertificationMasterColumns: string = 'Id,Title';
    public static strTrainingNCertificationMasterExpandColumns: string = '';
    public static strTrainingNCertificationMasterSortColumns = { orderBy: 'Title', ascending: true };

    public static strCountryMasterListTitle: string = 'CountryMaster';
    public static strCountryMasterColumns: string = 'Id,Title';
    public static strCountryMasterExpandColumns: string = '';
    public static strCountryMasterSortColumns = { orderBy: 'Title', ascending: true };

    public static strStateMasterListTitle: string = 'StateMaster';
    public static strStateMasterColumns: string = 'Id,Title,CountryId,Country/Title';
    public static strStateMasterExpandColumns: string = 'Country';
    public static strStateMasterSortColumns = { orderBy: 'Title', ascending: true };

    public static strCityMasterListTitle: string = 'CityMaster';
    public static strCityMasterColumns: string = 'Id,Title,StateId,State/Title';
    public static strCityMasterExpandColumns: string = 'State';
    public static strCityMasterSortColumns = { orderBy: 'Title', ascending: true };

    public static strEducationMasterListTitle: string = 'Education Master';
    public static strEducationMasterColumns: string = 'Id,Title';
    public static strEducationMasterExpandColumns: string = '';
    public static strEducationMasterSortColumns = { orderBy: 'Title', ascending: true };

    public static strEmployeeMasterListTitle: string = 'EmployeeMaster';
    public static strEmployeeMasterChoiceColumns: string[] = ['BloodGroup', 'ContractType', 'EmployeeTitle', 'Gender'
        , 'MaritalStatus', 'PhysicallyHandicaped', 'ProbationPeriod', 'Role', 'SingleParent', 'WeeklyOff'];

    public static strEmpTrainingNCertificationListTitle: string = 'EmpTrainingAndCertification';
    public static strEmpTrainingNCertificationChoiceColumns: string[] = ['Location'];

    public static strAddressMasterListTitle: string = 'AddressMaster';
    public static strAddressMasterChoiceColumns: string[] = ['AccomodationType'];

    public static strQualificationMasterListTitle: string = 'Qualification Master';
    public static strQualificationMasterChoiceColumns: string[] = ['Category'];

    public static strDependentMasterListTitle: string = 'Dependent Master';
    public static strDependentMasterChoiceColumns: string[] = ['DependentType', 'RelationShip'];

    public static strEmployeeExperienceDetailListTitle: string = 'EmployeeExperienceDetail';
    public static strEmployeeExperienceDetailChoiceColumns: string[] = ['JobType'];
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
            Type: DataType.ListItems, ListTitle: this.strCountryMasterListTitle, SelectQuery: this.strCountryMasterColumns,
            ExpandQuery: this.strCountryMasterExpandColumns, FilterQuery: '', SortQuery: this.strCountryMasterSortColumns
        });

        multiSPQuery.push({
            Type: DataType.ListItems, ListTitle: this.strStateMasterListTitle, SelectQuery: this.strStateMasterColumns,
            ExpandQuery: this.strStateMasterExpandColumns, FilterQuery: '', SortQuery: this.strStateMasterSortColumns
        });

        multiSPQuery.push({
            Type: DataType.ListItems, ListTitle: this.strCityMasterListTitle, SelectQuery: this.strCityMasterColumns,
            ExpandQuery: this.strCityMasterExpandColumns, FilterQuery: '', SortQuery: this.strCityMasterSortColumns
        });

        multiSPQuery.push({
            Type: DataType.ListItems, ListTitle: this.strEducationMasterListTitle, SelectQuery: this.strEducationMasterColumns,
            ExpandQuery: this.strEducationMasterExpandColumns, FilterQuery: '', SortQuery: this.strEducationMasterSortColumns
        });

        multiSPQuery.push({
            Type: DataType.Choices, ListTitle: this.strEmployeeMasterListTitle, ChoiceColumns: this.strEmployeeMasterChoiceColumns
        });

        multiSPQuery.push({
            Type: DataType.Choices, ListTitle: this.strEmpTrainingNCertificationListTitle, ChoiceColumns: this.strEmpTrainingNCertificationChoiceColumns
        });

        multiSPQuery.push({
            Type: DataType.Choices, ListTitle: this.strAddressMasterListTitle, ChoiceColumns: this.strAddressMasterChoiceColumns
        });

        multiSPQuery.push({
            Type: DataType.Choices, ListTitle: this.strQualificationMasterListTitle, ChoiceColumns: this.strQualificationMasterChoiceColumns
        });

        multiSPQuery.push({
            Type: DataType.Choices, ListTitle: this.strDependentMasterListTitle, ChoiceColumns: this.strDependentMasterChoiceColumns
        });

        multiSPQuery.push({
            Type: DataType.Choices, ListTitle: this.strEmployeeExperienceDetailListTitle, ChoiceColumns: this.strEmployeeExperienceDetailChoiceColumns
        });
        // #endregion

        Helper.hideShowLoader('block');
        return spcrud.getMultiDataInBatch(multiSPQuery, props).then((resp) => {
            Helper.hideShowLoader('none');
            let multiResults: IUserProfileLoadData = {
                BankMaster: resp[0], OfficeMaster: resp[1], DesignationMaster: resp[2], EmployeeTypeMaster: resp[3]
                , GradeMaster: resp[4], ScaleMaster: resp[5], PayScaleMaster: resp[6], ShiftAllocatedMaster: resp[7]
                , SubGroupMaster: resp[8], UnitMaster: resp[9], TrainingCertificationMaster: resp[10], CountryMaster: resp[11]
                , StateMaster: resp[12], CityMaster: resp[13], EducationMaster: resp[14]

                , BankChoices: Helper.getDropDownOptions(DataType.ListItems, resp[0], 'Select Bank', 'Title')
                , OfficeChoices: Helper.getDropDownOptions(DataType.ListItems, resp[1], 'Select Office', 'Title')
                , DesignationChoices: Helper.getDropDownOptions(DataType.ListItems, resp[2], 'Select Designation', 'Title')
                , EmployeeTypeChoices: Helper.getDropDownOptions(DataType.ListItems, resp[3], 'Select Type', 'Title')
                , GradeChoices: Helper.getDropDownOptions(DataType.ListItems, resp[4], 'Select Grade', 'Title')
                , ScaleChoices: Helper.getDropDownOptions(DataType.ListItems, resp[5], 'Select Scale', 'Title')
                , PayScaleChoices: Helper.getDropDownOptions(DataType.ListItems, resp[6], 'Select Pay Scale', 'Title')
                , ShiftAllocatedChoices: Helper.getDropDownOptions(DataType.ListItems, resp[7], 'Select Shift Allocated', 'ShiftName')
                , SubGroupChoices: Helper.getDropDownOptions(DataType.ListItems, resp[8], 'Select All', 'SubGroup')
                , UnitChoices: Helper.getDropDownOptions(DataType.ListItems, resp[9], 'Select Unit', 'Title')
                , TrainingCertificationChoices: Helper.getDropDownOptions(DataType.ListItems, resp[10], 'Select Type', 'Title')
                , CountryChoices: Helper.getDropDownOptions(DataType.ListItems, resp[11], 'Select Country', 'Title')
                , StateChoices: Helper.getDropDownOptions(DataType.ListItems, resp[12], 'Select State', 'Title')
                , CityChoices: Helper.getDropDownOptions(DataType.ListItems, resp[13], 'Select City', 'Title')
                , EducationChoices: Helper.getDropDownOptions(DataType.ListItems, resp[14], 'Select Qualification', 'Title')

                , BloodGroupChoices: Helper.getDropDownOptions(DataType.Choices, resp[15].Choices, 'Select Blood Group')
                , ContractTypeChoices: Helper.getDropDownOptions(DataType.Choices, resp[16].Choices, 'Select Contract Type')
                , EmployeeTitleChoices: Helper.getDropDownOptions(DataType.Choices, resp[17].Choices, 'Select Title')
                , GenderChoices: Helper.getDropDownOptions(DataType.Choices, resp[18].Choices, 'Select Gender')
                , MaritalStatusChoices: Helper.getDropDownOptions(DataType.Choices, resp[19].Choices, 'Select Marital Status')
                , PhysicallyHandicapedChoices: Helper.getDropDownOptions(DataType.Choices, resp[20].Choices, 'Select Whether')
                , ProbationPeriodChoices: Helper.getDropDownOptions(DataType.Choices, resp[21].Choices, 'Select Probation Period')
                , RoleChoices: Helper.getDropDownOptions(DataType.Choices, resp[22].Choices, 'Select Role')
                , SingleParentChoices: Helper.getDropDownOptions(DataType.Choices, resp[23].Choices, 'Select Whether')
                , WeeklyOffChoices: Helper.getDropDownOptions(DataType.Choices, resp[24].Choices, 'Select Weekly Off', '', true)
                , TrainingNCertificationLocationChoices: Helper.getDropDownOptions(DataType.Choices, resp[25].Choices, 'Select Location')
                , AddressMasterAccomdationTypeChoices: Helper.getDropDownOptions(DataType.Choices, resp[26].Choices, 'Select Type')
                , QualificationMasterCategoryChoices: Helper.getDropDownOptions(DataType.Choices, resp[27].Choices, 'Select Type')
                , DependentMasterDependentTypeChoices: Helper.getDropDownOptions(DataType.Choices, resp[28].Choices, 'Select Type')
                , DependentMasterRelationshipChoices: Helper.getDropDownOptions(DataType.Choices, resp[29].Choices, 'Select Relationship')
                , EmployeeExperienceDetailJobTypeChoices: Helper.getDropDownOptions(DataType.Choices, resp[30].Choices, 'Select Type')
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

    public static async insertUserProfile(userProfileParam: IUserProfile, props: IEmployeeMangementProps): Promise<any> {
        Helper.hideShowLoader('block');
        let userProfileItem: IUserProfileItem = new IUserProfileItem();
        userProfileItem = Helper.pickRequiredProperty(userProfileParam, Object.keys(userProfileItem) as []);
        let userProfileImageUrl = { Description: '', Url: '' };

        if (userProfileParam.EmployeeImage.Document && userProfileParam.EmployeeImage.Document.length > 0) {
            const imageFile = userProfileParam.EmployeeImage.Document[0];
            let userProfileImage = await spcrud.uploadFile(props.currentSPContext.pageContext.legacyPageContext.siteServerRelativeUrl + "/EmployeeImages/", imageFile, props)
            const item = await userProfileImage.file.getItem();
            await item.update({ Title: imageFile.name });
            userProfileImageUrl = { Description: imageFile.name, Url: props.currentSPContext.pageContext.legacyPageContext.webAbsoluteUrl + userProfileImage.data.ServerRelativeUrl };
            // userProfileImageUrl = { Description: imageFile.name, Url: userProfileImage.data.LinkingUrl };
            userProfileItem.ProfileImage = userProfileImageUrl;
        }

        return await spcrud.insertData(this.strEmployeeMasterListTitle, userProfileItem, props).then(async (resp: IItemAddResult) => {
            const strUserProfileID = resp.data.Id;
            const userProfile: IUserProfile = await upOps.getUserProfileById(strUserProfileID, props);
            let listBulkData: IListBulkData[] = [];

            let emgContactItems: IEmergencyContactItem[] = [];
            userProfileParam.EmergencyContact.forEach((item, i) => {
                let emgConItem = Helper.pickRequiredProperty(userProfileParam.EmergencyContact[i], Object.keys(new IEmergencyContactItem()) as [])
                emgContactItems.push(emgConItem);
            });
            listBulkData.push({
                listName: 'EmergencyContact', data: emgContactItems
                    .filter(opt => { return opt.Name1 !== null && opt.Name1 !== undefined && opt.Name1.trim() !== ''; })
                    .map((item) => ({ ...item, EmployeeCode: userProfile.Title, Title: item.Name1, EmployeeName: userProfile.EmployeeName }))
            });

            let trainNCertItems: ITrainingNCertificationItem[] = [];
            userProfileParam.TrainingNCertificate.forEach((item, i) => {
                let trainNCertItem = Helper.pickRequiredProperty(userProfileParam.TrainingNCertificate[i], Object.keys(new ITrainingNCertificationItem()) as [])
                trainNCertItems.push(trainNCertItem);
            });
            listBulkData.push({
                listName: 'EmpTrainingAndCertification', data: trainNCertItems
                    .filter(opt => { return opt.Institute !== null && opt.Institute !== undefined && opt.Institute.trim() !== ''; })
                    .map((item) => ({ ...item, Title: userProfile.Title, EmployeeName: userProfile.EmployeeName }))
            });

            let addMasterItems: IAddressMasterItem[] = [];
            userProfileParam.AddressMaster.forEach((item, i) => {
                let addMasterItem = Helper.pickRequiredProperty(item, Object.keys(new IAddressMasterItem()) as [])
                addMasterItems.push(addMasterItem);
            });
            listBulkData.push({
                listName: 'AddressMaster', data: addMasterItems
                    .filter(opt => { return opt.AddressType !== null && opt.AddressType !== undefined && opt.AddressType.trim() !== ''; })
                    .map((item) => ({ ...item, Title: userProfile.Title, EmployeeName: userProfile.EmployeeName }))
            });

            let qualificationMasterItems: IQualificationMasterItem[] = [];
            userProfileParam.QualificationMaster.forEach((item, i) => {
                let qualificationMasterItem = Helper.pickRequiredProperty(item, Object.keys(new IQualificationMasterItem()) as [])
                qualificationMasterItems.push(qualificationMasterItem);
            });
            listBulkData.push({
                listName: 'Qualification Master', data: qualificationMasterItems
                    .filter(opt => { return opt.EducationId !== null && opt.EducationId !== undefined && opt.EducationId !== ''; })
                    .map((item) => ({ ...item, Title: userProfile.Title, EmployeeName: userProfile.EmployeeName }))
            });

            let dependantMasterItems: IDependentMasterItem[] = [];
            userProfileParam.DependentMaster.forEach((item, i) => {
                let dependantMasterItem = Helper.pickRequiredProperty(item, Object.keys(new IDependentMasterItem()) as [])
                dependantMasterItems.push(dependantMasterItem);
            });
            listBulkData.push({
                listName: 'Dependent Master', data: dependantMasterItems
                    .filter(opt => { return opt.Name !== null && opt.Name !== undefined && opt.Name !== ''; })
                    .map((item) => ({ ...item, Title: userProfile.Title, EmployeeName: userProfile.EmployeeName }))
            });
            const expDetailsItem: IExperienceDetailsItem[] = userProfileParam.ExperienceDetails as IExperienceDetailsItem[];

            let experienceDetailsItems: IExperienceDetailsItem[] = [];
            userProfileParam.ExperienceDetails.forEach((item, i) => {
                let experienceDetailsItem = Helper.pickRequiredProperty(item, Object.keys(new IExperienceDetailsItem()) as [])
                experienceDetailsItems.push(experienceDetailsItem);
            });
            listBulkData.push({
                listName: 'EmployeeExperienceDetail', data: experienceDetailsItems
                    .filter(opt => { return opt.PreviousCompanyName !== null && opt.PreviousCompanyName !== undefined && opt.PreviousCompanyName !== ''; })
                    .map((item) => ({ ...item, Title: userProfile.Title, EmployeeName: userProfile.EmployeeName }))
            });

            let postingHistoryItems: IPostingHistoryItem[] = [];
            userProfileParam.PostingHistory.forEach((item, i) => {
                let postingHistoryItem = Helper.pickRequiredProperty(item, Object.keys(new IPostingHistoryItem()) as [])
                postingHistoryItems.push(postingHistoryItem);
            });
            listBulkData.push({
                listName: 'PostingHistory', data: postingHistoryItems
                    .filter(opt => { return opt.SubGroupId !== null && opt.SubGroupId !== undefined && opt.SubGroupId !== ''; })
                    .map((item) => ({ ...item, EmployeeId: userProfile.Id, Title: userProfile.EmployeeName }))
            });

            userProfileParam.EmployeeDocuments = userProfileParam.EmployeeDocuments
                .filter(opt => { return opt.Document !== null && opt.Document != undefined; })
                .map((item) => ({ ...item, EmployeeId: userProfile.Id }));

            return await spcrud.batchInsert(listBulkData, props).then(async (resp) => {
                let empDocuments = await this.uploadEmployeeDocuments(userProfileParam.EmployeeDocuments, 0, props);
                Helper.hideShowLoader('none');
                return resp;
            });
        });
    }

    public static async uploadEmployeeDocuments(empDocuments: IEmployeeDocuments[], f: number, props: IEmployeeMangementProps): Promise<IEmployeeDocuments[]> {
        const file = empDocuments[f].Document[0];
        const empDoc = await spcrud.uploadFile(props.currentSPContext.pageContext.legacyPageContext.siteServerRelativeUrl + "/EmployeeDocuments/", file, props);
        const item = await empDoc.file.getItem();
        return item.update({ EmployeeId: parseInt(empDocuments[f].EmployeeId), Category: empDocuments[f].Category, Title: empDocuments[f].Title }).then(async (brPlanDocResult) => {
            f++;
            if (f <= (empDocuments.length - 1)) {
                await this.uploadEmployeeDocuments(empDocuments, f, props);
            }
            return empDocuments;
        });
    }
}
