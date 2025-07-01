import { IUserProps, UserProps } from "./IUserProps";

export interface IDependentMaster {
    Id?: string;
    Title?: string;
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date | string;
    Modified?: Date | string;
    Confirmed_x0020_By_x0020_Employe?: string;
    EmployeeName?: string;
    Name?: string;
    DOB?: Date | string;
    RelationShip?: string;
    StayingWithOfficer?: string;
    DependentType?: string;
    Status?: string;
    ApproverResponse?: string;
    Confirmed?: string;
    Deleted?: string;
    Gender?: string;
    HR1Response?: string;
    HR2Response?: string;
    AdminApprovedDate?: Date | string;
    ApprovedDate?: Date | string;
    ConfirmedUpto?: Date | string;
    DateOfJoining?: Date | string;
    Employee_x0020_Confirmation_x002?: Date | string;
    HR1ResponseDate?: Date | string;
    HR2ResponseDate?: Date | string;
    Todate?: Date | string;
    HR1Remark?: string;
    HR2Remark?: string;
    ApprovedByAdmin?: string;
    ApprovedByHR?: string;
    Designation?: string;
    // EmployeeID?: string;
    HR1ApproverName?: string;
    HR2ApproverName?: string;
    MonthlyIncomeifany?: string;
    Remarks?: string;
}

export const DependentMaster = {
    Id: '',
    Title: '',
    Author: UserProps,
    Editor: UserProps,
    Created: null,
    Modified: null,
    Confirmed_x0020_By_x0020_Employe: '',
    EmployeeName: '',
    Name: '',
    DOB: null,
    RelationShip: '',
    StayingWithOfficer: '',
    DependentType: '',
    Status: '',
    ApproverResponse: '',
    Confirmed: '',
    Deleted: '',
    Gender: '',
    HR1Response: '',
    HR2Response: '',
    AdminApprovedDate: null,
    ApprovedDate: null,
    ConfirmedUpto: null,
    DateOfJoining: null,
    Employee_x0020_Confirmation_x002: null,
    HR1ResponseDate: null,
    HR2ResponseDate: null,
    Todate: null,
    HR1Remark: '',
    HR2Remark: '',
    ApprovedByAdmin: '',
    ApprovedByHR: '',
    Designation: '',
    // EmployeeID: '',
    HR1ApproverName: '',
    HR2ApproverName: '',
    MonthlyIncomeifany: '',
    Remarks: '',
}

export class IDependentMasterItem {
    Title?: string = '';
    EmployeeName?: string = '';
    Name?: string = '';
    DOB?: Date | string = null;
    RelationShip?: string = '';
    DependentType?: string = '';
    // EmployeeID?: string = '';
}
