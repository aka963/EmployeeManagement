import { IEmployeeMangementProps } from '../../employeeMangement/components/IEmployeeMangementProps';
import spcrud from './SpCrud';
import { IUserProfile } from '../interface/IUserProfile';
import { ISPChoiceFieldQuery, ISPQuery } from '../interface/ISPQuery';
import Helper from '../utilities/Helper';
import { IFieldInfo } from '@pnp/sp/fields';

export default class UserProfileOps {
    public static strEmployeeMasterListTitle: string = 'EmployeeMaster';
    public static strEmployeeMasterColumns: string = 'UserName/Name,EmployeeTitle,LeaveLevel1/Title,ReportingManager/Title,AlternateReportingManager/Title'
        + ',LeaveLevel2/Title,CashApprover/Title,NEFTApprover/Title,HHApproverName/Title,MobileNo_x002e_,Designation/Title'
        + ',Payscale/Title,Scale/Title,EmployeeType/Title,CurrentOfficeLocation/Title,CompanyEmail,IFSCCode'
        + ',Phone_x0020_No,DateOfJoining,ShiftAllocated/ShiftName,EmployeeName,FirstName,MiddleName,LastName,FirstName_Hindi'
        + ',MiddleName_Hindi,LastName_Hindi,FatherName,MotherName,PAN_x0020_No,BankName/Title,Religion,Caste,MartialStatus'
        + ',AlternateEmail,Phone_x0020_No,Nationality,AadharCardNo,VoterID_x0020_No,PAN_x0020_No,DrivingLicenseNumber'
        + ',DrivingLicenseExpiryDate,PassportNo_x002e_,PassportIssueDate,PassportExpiryDate,BranchName,AccountNo,IFSCCode'
        + ',PFNumber,ESICNumber,ESIC_x0020_Remarks,PranNo,NPS,OfficeLocation/Title,Grade/Title,Payscale/Title,WeeklyOff'
        + ',AccountNo,PassportExpiryDate,DOB,Role,SubGroup/SubGroup,SubGroup/GroupName,Id,Title,Gender,BloodGroup'
        + ',Extension,ProfileImage,Phone_x0020_No,FaxNo,VCDisplayNameEnglish,VCDisplayNameHindi,Active,Unit/Title'
        + ',DeputationOfficeLocation/Title,ShiftAllocated/Title,ShiftEffectiveFrom,PaternityLeaveCount,MaternityLeave_Count'
        + ',TotalEOL,TotalMaternityLeave,DesignationJoinedAs,AppointmentDate,DesignationAppointedAs,ConfirmationDate,PromotionScale'
        + ',PromotionEffectiveDate,DesignationPromotedTo/Id,DesignationPromotedTo/Title,PromotionConfirmationDate';
    public static strEmployeeMasterExpandColumns: string = 'UserName,LeaveLevel1,ReportingManager,AlternateReportingManager'
        + ',LeaveLevel2,CashApprover,OfficeLocation,NEFTApprover,HHApproverName,Designation,Payscale,Grade,Payscale'
        + ',EmployeeType,CurrentOfficeLocation,ShiftAllocated,BankName,Unit,DeputationOfficeLocation,ShiftAllocated'
        + ',SubGroup,Scale,DesignationPromotedTo';

        public static strEmployeeMasterListTitleDASH: string = 'EmployeeMaster';

        public static strEmployeeMasterColumnsDASH: string = 'Title,EmployeeName,Scale/Title,Grade/Title,CompanyEmail,CurrentOfficeLocation/Title,MobileNo_x002e_,Designation/Title,UserName/Name,EmployeeTitle,ReportingManager/Title'
        public static strEmployeeMasterExpandColumnsDASH: string = 'UserName,CurrentOfficeLocation,ReportingManager,Designation,Grade,Scale'


    public static strAddressMasterListTitle: string = 'AddressMaster';
    public static strAddressMasterColumns: string = 'Id,Title,AddressType,Address,PinCode,ResedentialPhone,Country/Title,Country/Id'
        + ',City/Title,City/Id,State/Title,State/Id,AccomodationType,LeaseStartDate,LeaseEndDate,MonthlyRent,Entitlement'
        + ',SecurityDepositAmount,TelephoneNo,MobileNo';
    public static strAddressExpandColumns: string = 'Country,City,State';

    public static strEmergencyContactListTitle: string = 'EmergencyContact';
    public static strEmergencyContactColumns: string = 'Id,Title,BloodGroup,EmergencyContactNumber1,EmergencyContactNumber2'
        + ',EmployeeCode,EmployeeName,Name1,Name2,PermanentAddress,PresentAddress,Relationship1,Relationship2';
    public static strEmergencyContactExpandColumns: string = '';

    public static strRedemptionCodeListTitle: string = 'RedemptionCode';
    public static strRedemptionCodeColumns: string = 'Id,Title,EmpId/Title,EmpId/EmployeeName,RedemptionCode,CodeRedemptionLink,Application';
    public static strRedemptionCodeExpandColumns: string = 'EmpId';

    public static strDependentMasterListTitle: string = 'Dependent Master';
    public static strDependentMasterColumns: string = 'Id,Title,Confirmed_x0020_By_x0020_Employe,EmployeeName,Name,DOB,RelationShip'
        + ',StayingWithOfficer,DependentType,Status';
    public static strDependentMasterExpandColumns: string = '';

    public static strTrainingNcertificateListTitle: string = 'EmpTrainingAndCertification';
    public static strTrainingNcertificateColumns: string = 'Id,Title,ApprovedBy/Id,ApprovedBy/Title,Description,EmployeeName'
        + ',EndDate,ExperienceIn/Id,ExperienceIn/Title,Grade,Institute,Location,NoOfDays,NoOfHours,StartDate,TodayDate,TrainingCost';
    public static strTrainingNcertificateExpandColumns: string = 'ApprovedBy,ExperienceIn';

    public static strQualificationMasterListTitle: string = 'Qualification Master';
    public static strQualificationMasterColumns: string = 'Id,Title,Author/Id,Author/Title,Editor/Id,Editor/Title,Created,Modified'
        + ',Comments,Duration,Education/Id,Education/Title,EmployeeName,EndDate,Flag,Score,Speclization,StartDate,TodayDate'
        + ',Institute,Category,YearOfPassing';
    public static strQualificationMasterExpandColumns: string = 'Author,Editor,Education';

    public static strEmployeeExperienceListTitle: string = 'EmployeeExperienceDetail';
    public static strEmployeeExperienceColumns: string = 'Id,Title,Author/Id,Author/Title,Editor/Id,Editor/Title,Created,Modified'
        + ',City/Id,City/Title,CompanyAddress,CompanyContactNo,Country/Id,Country/Title,EmployeeName,EndDate,JobDescription'
        + ',JobType,PreviousCompanyName,StartDate,State/Id,State/Title,TodayDate,Designation,PreviousCompanyExp';
    public static strEmployeeExperienceExpandColumns: string = 'City,Country,State,Author,Editor';

    public static strPostingHistoryListTitle: string = 'PostingHistory';
    public static strPostingHistoryColumns: string = 'Id,Title,Author/Id,Author/Title,Editor/Id,Editor/Title,Created,Modified'
        + ',Employee/Id,Employee/Title,SubGroup/Id,SubGroup/SubGroup,SubGroup/Title,FromDate,ToDate';
    public static strPostingHistoryExpandColumns: string = 'Employee,SubGroup,Author,Editor';

    public static strEmployeeMasterChoiceColumns: string[] = ['BloodGroup', 'ContractType', 'EmployeeTitle', 'Gender'
        , 'MaritalStatus', 'PhysicallyHandicaped', 'ProbationPeriod', 'Role', 'SingleParent', 'WeeklyOff'];

    public static async getUserProfileByUserName(username: string, props: IEmployeeMangementProps): Promise<IUserProfile> {
        let spListQuery: ISPQuery[] = [];

        // username = 'i:0#.f|membership|shushant.v';
        // username = 'i:0#.f|membership|swarup.c';
        // username = 'i:0#.f|membership|kiran.p';
        // username = 'i:0#.f|membership|harsha.b';
        // username = 'i:0#.f|membership|nishita.s';

        spListQuery.push({
            ListTitle: this.strEmployeeMasterListTitle, SelectQuery: this.strEmployeeMasterColumns
            , ExpandQuery: this.strEmployeeMasterExpandColumns
            , FilterQuery: '(UserName/Name eq \'' + username + '\') and Active eq 1'
            , SortQuery: { orderBy: 'Id', ascending: true }
        });
        Helper.hideShowLoader('block');

        if (props.currentSPContext.pageContext.legacyPageContext.systemUserKey.toLowerCase() === username.toLowerCase()) {
            if (props.loggedInUserDetails && props.loggedInUserDetails.UserName) {
                Helper.hideShowLoader('none');
                return props.loggedInUserDetails;
            }
        }
        return await spcrud.getBatchData(spListQuery, props).then(async (resp) => {
            const userProfile: IUserProfile = resp[0][0];
            userProfile.UserName = await spcrud.getUserInfo(username, props);
            userProfile.UserName.Name = userProfile.UserName.LoginName;
            spListQuery.splice(0, 1);

            spListQuery.push({
                ListTitle: this.strAddressMasterListTitle, SelectQuery: this.strAddressMasterColumns
                , ExpandQuery: this.strAddressExpandColumns
                , FilterQuery: '(Title eq \'' + userProfile.Title + '\')'
                , SortQuery: { orderBy: 'Id', ascending: false }
            });

            spListQuery.push({
                ListTitle: this.strEmergencyContactListTitle, SelectQuery: this.strEmergencyContactColumns
                , ExpandQuery: this.strEmergencyContactExpandColumns
                , FilterQuery: '(EmployeeCode eq \'' + userProfile.Title + '\')'
                , SortQuery: { orderBy: 'Id', ascending: false }
            });

            spListQuery.push({
                ListTitle: this.strRedemptionCodeListTitle, SelectQuery: this.strRedemptionCodeColumns
                , ExpandQuery: this.strRedemptionCodeExpandColumns
                , FilterQuery: '(EmpId/Title eq \'' + userProfile.Title + '\')'
                , SortQuery: { orderBy: 'Id', ascending: false }
            });

            spListQuery.push({
                ListTitle: this.strDependentMasterListTitle, SelectQuery: this.strDependentMasterColumns
                , ExpandQuery: this.strDependentMasterExpandColumns
                , FilterQuery: '(Title eq \'' + userProfile.Title + '\')'
                , SortQuery: { orderBy: 'Id', ascending: false }
            });

            spListQuery.push({
                ListTitle: this.strTrainingNcertificateListTitle, SelectQuery: this.strTrainingNcertificateColumns
                , ExpandQuery: this.strTrainingNcertificateExpandColumns
                , FilterQuery: '(Title eq \'' + userProfile.Title + '\')'
                , SortQuery: { orderBy: 'Id', ascending: false }
            });

            spListQuery.push({
                ListTitle: this.strQualificationMasterListTitle, SelectQuery: this.strQualificationMasterColumns
                , ExpandQuery: this.strQualificationMasterExpandColumns
                , FilterQuery: '(Title eq \'' + userProfile.Title + '\')'
                , SortQuery: { orderBy: 'Id', ascending: false }
            });

            spListQuery.push({
                ListTitle: this.strEmployeeExperienceListTitle, SelectQuery: this.strEmployeeExperienceColumns
                , ExpandQuery: this.strEmployeeExperienceExpandColumns
                , FilterQuery: '(Title eq \'' + userProfile.Title + '\')'
                , SortQuery: { orderBy: 'Id', ascending: false }
            });

            spListQuery.push({
                ListTitle: this.strPostingHistoryListTitle, SelectQuery: this.strPostingHistoryColumns
                , ExpandQuery: this.strPostingHistoryExpandColumns
                , FilterQuery: '(Title eq \'' + userProfile.Title + '\')'
                , SortQuery: { orderBy: 'Id', ascending: false }
            });

            return await spcrud.getBatchData(spListQuery, props).then((response) => {
                userProfile.AddressMaster = response[0];
                userProfile.EmergencyContact = response[1];
                userProfile.RedemptionCode = response[2];
                userProfile.DependentMaster = response[3];
                userProfile.TrainingNCertificate = response[4];
                userProfile.QualificationMaster = response[5];
                userProfile.ExperienceDetails = response[6];
                userProfile.PostingHistory = response[7];
                Helper.hideShowLoader('none');
                return userProfile;
            });

        }).catch((e) => {
            console.log(e);
            const userProfile: IUserProfile = {};
            return userProfile;
        });
    }
   
 public static async getAllUserProfile(props: IEmployeeMangementProps): Promise<IUserProfile> {
        let spListQueryAll: ISPQuery[] = [];
        spListQueryAll.push({
            ListTitle: this.strEmployeeMasterListTitleDASH, SelectQuery: this.strEmployeeMasterColumnsDASH
            , ExpandQuery: this.strEmployeeMasterExpandColumnsDASH
            , FilterQuery: 'Active eq 1'
            , SortQuery: { orderBy: 'Id', ascending: true }
        });
        Helper.hideShowLoader('block');

     
        return await spcrud.getBatchData(spListQueryAll, props).then(async (resp) => {
            const userProfile: IUserProfile = resp;
          
            return userProfile;


        }).catch((e) => {
            console.log(e);
            const userProfile: IUserProfile = {};
            return userProfile;
        });
    }
}
