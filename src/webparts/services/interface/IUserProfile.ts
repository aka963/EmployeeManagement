import { ITrainingNCertification, TrainingNCertification } from "./ITrainingNCertification";
import { AddressMaster, IAddressMaster } from "./IAddressMaster";
import { DependentMaster, IDependentMaster } from "./IDependentMaster";
import { EmergencyContact, IEmergencyContact } from "./IEmergencyContact";
import { ExperienceDetails, IExperienceDetails } from "./IExperienceDetails";
import { IQualificationMaster, QualificationMaster } from "./IQualificationMaster";
import { IRedemptionCode, RedemptionCode } from "./IRedemptionCode";
import { IPostingHistory, PostingHistory } from "./IPostingHistory";
import { IUserProps, UserProps } from "./IUserProps";
import { BankMaster, IBankMaster } from "./IBankMaster";
import { IOfficeMaster, OfficeMaster } from "./IOfficeMaster";
import { DesignationMaster, IDesignationMaster } from "./IDesignationMaster";
import { EmployeeTypeMaster, IEmployeeTypeMaster } from "./IEmployeeTypeMaster";
import { GradeMaster, IGradeMaster } from "./IGradeMaster";
import { IScaleMaster, ScaleMaster } from "./IScaleMaster";
import { IPayScaleMaster, PayScaleMaster } from "./IPayScaleMaster";
import { IShiftAllocatedMaster, ShiftAllocatedMaster } from "./IShiftAllocatedMaster";
import { ISubGroupMaster, SubGroupMaster } from "./ISubGroupMaster";
import { IUnitMaster, UnitMaster } from "./IUnitMaster";
import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { number, string } from "yup";
import { ITrainingCertificationMaster } from "./ITrainingCertificationMaster";
import { EmployeeDocuments, IEmployeeDocuments } from "./IEmployeeDocuments";
import { ICountry } from "./ICountry";
import { IState } from "./IState";
import { ICity } from "./ICity";

export interface IUserProfile {
    UserName?: IUserProps;
    UserNameId?: string | number;
    LeaveLevel1?: IUserProps;
    LeaveLevel1Id?: string | number;
    LeaveLevel2?: IUserProps;
    LeaveLevel2Id?: string | number;
    ReportingManager?: IUserProps;
    ReportingManagerId?: string | number;
    AlternateReportingManager?: IUserProps;
    AlternateReportingManagerId?: string | number;
    CashApprover?: IUserProps;
    NEFTApprover?: IUserProps;
    HHApproverName?: IUserProps;
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date | string
    Modified?: Date | string
    MobileNo_x002e_?: string;
    Designation?: IDesignationMaster;
    DesignationId?: string | number;
    Payscale?: IPayScaleMaster;
    PayscaleId?: string | number;
    Scale?: IScaleMaster;
    ScaleId?: string | number;
    Grade?: IGradeMaster;
    GradeId?: string | number;
    EmployeeType?: IEmployeeTypeMaster;
    EmployeeTypeId?: string | number,
    Unit?: IUnitMaster;
    UnitId?: string | number;
    OfficeLocation?: IOfficeMaster;
    OfficeLocationId?: string | number;
    CurrentOfficeLocation?: IOfficeMaster;
    CurrentOfficeLocationId?: string | number;
    DeputationOfficeLocation?: IOfficeMaster;
    DeputationOfficeLocationId?: string | number;
    CompanyEmail?: string;
    IFSCCode?: string;
    Phone_x0020_No?: string;
    DateOfJoining?: Date | string
    ShiftAllocated?: IShiftAllocatedMaster;
    ShiftAllocatedId?: string;
    FirstName?: string;
    LastName?: string;
    EmployeeName?: string;
    PAN_x0020_No?: string;
    BankName?: IBankMaster;
    BankNameId?: string | number;
    AccountNo?: string;
    PassportExpiryDate?: Date | string;
    DOB?: Date | string;
    Role?: string;
    SubGroup?: [ISubGroupMaster];
    SubGroupId?: [] | { results: [] };
    Id?: string;
    Title?: string;
    Gender?: string;
    BloodGroup?: string;
    Extension?: string;
    ProfileImage?: { Description?: string; Url?: string };
    FaxNo?: string;
    VCDisplayNameEnglish?: string;
    VCDisplayNameHindi?: string;
    Active?: boolean;
    SWCEligibility?: boolean;
    AadharCardNo?: string;
    AlternateEmail?: string;
    AzureADEmailID?: string;
    BranchName?: string;
    DMDType?: string;
    DrivingLicenseNumber?: string;
    EmployeeID?: string;
    EmpType?: string;
    ESIC_x0020_Remarks?: string;
    ESICNumber?: string;
    FatherName?: string;
    FirstName_Hindi?: string;
    LastName_Hindi?: string;
    Level1EmailID?: string;
    MiddleName?: string;
    MiddleName_Hindi?: string;
    MobileNo?: string;
    MotherName?: string;
    Nationality?: string;
    NPS?: string;
    PassportNo_x002e_?: string;
    PaternityLeaveCount?: string;
    PFNumber?: string;
    PranNo?: string;
    VoterID_x0020_No?: string;
    MaternityLeave_Count?: number;
    TotalEOL?: number;
    TotalMaternityLeave?: number;
    Date_x0020_Of_x0020_Resign?: Date | string
    Date_x0020_Of_x0020_Resign_x0020?: Date | string
    DateofAppointment?: Date | string
    DateOfConfirmation?: Date | string
    DateOfPromotion?: Date | string
    DrivingLicenseExpiryDate?: Date | string
    EffectiveDate?: Date | string;
    ESI_x0020_JoiningDate?: Date | string
    ESI_x0020_LeavingDate?: Date | string
    LTCDate?: Date | string
    MarriageDate?: Date | string;
    PassportIssueDate?: Date | string;
    ShiftEffectiveFrom?: Date | string;
    TempDOB?: Date | string;
    TodayDate?: Date | string
    ContractType?: string;
    EmployeeTitle?: string;
    MartialStatus?: string;
    PhysicallyHandicaped?: string;
    ProbationPeriod?: string;
    SingleParent?: string;
    WeeklyOff?: string | [];
    Religion?: string;
    Caste?: string;
    DesignationJoinedAs?: string;
    AppointmentDate?: Date | string
    DesignationAppointedAs?: string;
    ConfirmationDate?: Date | string
    PromotionScale?: string;
    PromotionEffectiveDate?: Date | string;
    DesignationPromotedTo?: IDesignationMaster;
    PromotionConfirmationDate?: Date | string;
    EmployeeDocuments?: IEmployeeDocuments[];
    EmergencyContact?: IEmergencyContact[];
    AddressMaster?: IAddressMaster[];
    RedemptionCode?: IRedemptionCode[];
    DependentMaster?: IDependentMaster[];
    TrainingNCertificate?: ITrainingNCertification[];
    QualificationMaster?: IQualificationMaster[];
    ExperienceDetails?: IExperienceDetails[];
    PostingHistory?: IPostingHistory[];
}

export interface IUserProfileLoadData {
    BankMaster?: IBankMaster[];
    OfficeMaster?: IOfficeMaster[];
    DesignationMaster?: IDesignationMaster[];
    EmployeeTypeMaster?: IEmployeeTypeMaster[];
    GradeMaster?: IGradeMaster[];
    ScaleMaster?: IScaleMaster[];
    PayScaleMaster?: IPayScaleMaster[];
    ShiftAllocatedMaster?: IShiftAllocatedMaster[];
    SubGroupMaster?: ISubGroupMaster[];
    UnitMaster?: IUnitMaster[];
    TrainingCertificationMaster?: ITrainingCertificationMaster[];
    CountryMaster?: ICountry[];
    StateMaster?: IState[];
    CityMaster?: ICity[];

    BankChoices?: IDropdownOption[];
    OfficeChoices?: IDropdownOption[];
    DesignationChoices?: IDropdownOption[];
    EmployeeTypeChoices?: IDropdownOption[];
    GradeChoices?: IDropdownOption[];
    ScaleChoices?: IDropdownOption[];
    PayScaleChoices?: IDropdownOption[];
    ShiftAllocatedChoices?: IDropdownOption[];
    SubGroupChoices?: IDropdownOption[];
    UnitChoices?: IDropdownOption[];
    TrainingCertificationChoices?: IDropdownOption[];
    CountryChoices?: IDropdownOption[];
    StateChoices?: IDropdownOption[];
    CityChoices?: IDropdownOption[];

    BloodGroupChoices?: IDropdownOption[];
    ContractTypeChoices?: IDropdownOption[];
    EmployeeTitleChoices?: IDropdownOption[];
    GenderChoices?: IDropdownOption[];
    MaritalStatusChoices?: IDropdownOption[];
    PhysicallyHandicapedChoices?: IDropdownOption[];
    ProbationPeriodChoices?: IDropdownOption[];
    RoleChoices?: IDropdownOption[];
    SingleParentChoices?: IDropdownOption[];
    WeeklyOffChoices?: IDropdownOption[];
    TrainingNCertificationLocationChoices?: IDropdownOption[];
    AddressMasterAccomdationTypeChoices?: IDropdownOption[];
}

export const InitializedUserProfile: IUserProfile = {
    UserName: UserProps,
    UserNameId: '',
    LeaveLevel1: UserProps,
    LeaveLevel1Id: '',
    LeaveLevel2: UserProps,
    LeaveLevel2Id: '',
    ReportingManager: UserProps,
    ReportingManagerId: '',
    AlternateReportingManager: UserProps,
    AlternateReportingManagerId: '',
    CashApprover: UserProps,
    NEFTApprover: UserProps,
    HHApproverName: UserProps,
    Author: UserProps,
    Editor: UserProps,
    Created: null,
    Modified: null,
    MobileNo_x002e_: '',
    Designation: DesignationMaster,
    DesignationId: '',
    Payscale: PayScaleMaster,
    PayscaleId: '',
    Scale: ScaleMaster,
    ScaleId: '',
    Grade: GradeMaster,
    GradeId: '',
    EmployeeType: EmployeeTypeMaster,
    EmployeeTypeId: '',
    Unit: UnitMaster,
    OfficeLocation: OfficeMaster,
    OfficeLocationId: '',
    CurrentOfficeLocation: OfficeMaster,
    CurrentOfficeLocationId: '',
    DeputationOfficeLocation: OfficeMaster,
    DeputationOfficeLocationId: '',
    CompanyEmail: '',
    IFSCCode: '',
    Phone_x0020_No: '',
    DateOfJoining: null,
    ShiftAllocated: ShiftAllocatedMaster,
    ShiftAllocatedId: '',
    FirstName: '',
    LastName: '',
    EmployeeName: '',
    PAN_x0020_No: '',
    BankName: BankMaster,
    BankNameId: '',
    AccountNo: '',
    PassportExpiryDate: '',
    DOB: null,
    Role: '',
    SubGroup: [SubGroupMaster],
    SubGroupId: [],
    Id: '',
    Title: '',
    Gender: '',
    BloodGroup: '',
    Extension: '',
    ProfileImage: { Description: '', Url: '' },
    FaxNo: '',
    VCDisplayNameEnglish: '',
    VCDisplayNameHindi: '',
    Active: false,
    SWCEligibility: false,
    AadharCardNo: '',
    AlternateEmail: '',
    AzureADEmailID: '',
    BranchName: '',
    DMDType: '',
    DrivingLicenseNumber: '',
    EmployeeID: '',
    EmpType: '',
    ESIC_x0020_Remarks: '',
    ESICNumber: '',
    FatherName: '',
    FirstName_Hindi: '',
    LastName_Hindi: '',
    Level1EmailID: '',
    MiddleName: '',
    MiddleName_Hindi: '',
    MobileNo: '',
    MotherName: '',
    Nationality: '',
    NPS: '',
    PassportNo_x002e_: '',
    PaternityLeaveCount: '',
    PFNumber: '',
    PranNo: '',
    VoterID_x0020_No: '',
    MaternityLeave_Count: 0,
    TotalEOL: 0,
    TotalMaternityLeave: 0,
    Date_x0020_Of_x0020_Resign: null,
    Date_x0020_Of_x0020_Resign_x0020: null,
    DateofAppointment: null,
    DateOfConfirmation: null,
    DateOfPromotion: null,
    DrivingLicenseExpiryDate: null,
    EffectiveDate: null,
    ESI_x0020_JoiningDate: null,
    ESI_x0020_LeavingDate: null,
    LTCDate: null,
    MarriageDate: null,
    PassportIssueDate: null,
    ShiftEffectiveFrom: null,
    TempDOB: null,
    TodayDate: null,
    ContractType: '',
    EmployeeTitle: '',
    MartialStatus: '',
    PhysicallyHandicaped: '',
    ProbationPeriod: '',
    SingleParent: '',
    WeeklyOff: [],
    Religion: '',
    Caste: '',
    DesignationJoinedAs: '',
    AppointmentDate: null,
    DesignationAppointedAs: '',
    ConfirmationDate: null,
    PromotionScale: '',
    PromotionEffectiveDate: null,
    DesignationPromotedTo: DesignationMaster,
    PromotionConfirmationDate: null,
    EmployeeDocuments: [{ ...EmployeeDocuments }, { ...EmployeeDocuments }, { ...EmployeeDocuments }, { ...EmployeeDocuments }, { ...EmployeeDocuments }],
    EmergencyContact: [EmergencyContact],
    AddressMaster: [AddressMaster],
    RedemptionCode: [RedemptionCode],
    DependentMaster: [DependentMaster],
    TrainingNCertificate: [TrainingNCertification],
    QualificationMaster: [QualificationMaster],
    ExperienceDetails: [ExperienceDetails],
    PostingHistory: [PostingHistory],
}