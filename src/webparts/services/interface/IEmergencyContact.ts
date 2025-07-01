import { IUserProps, UserProps } from "./IUserProps";

export interface IEmergencyContact {
    Id?: string;
    Title?: string;
    BloodGroup?: string;
    EmergencyContactNumber1?: string;
    EmergencyContactNumber2?: string;
    EmployeeCode?: string;
    EmployeeName?: string;
    Name1?: string;
    Name2?: string;
    PermanentAddress?: string;
    PresentAddress?: string;
    Relationship1?: string;
    Relationship2?: string
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date;
    Modified?: Date;
}

export const EmergencyContact: IEmergencyContact = {
    Id: '',
    Title: '',
    BloodGroup: '',
    EmergencyContactNumber1: '',
    EmergencyContactNumber2: '',
    EmployeeCode: '',
    EmployeeName: '',
    Name1: '',
    Name2: '',
    PermanentAddress: '',
    PresentAddress: '',
    Relationship1: '',
    Relationship2: '',
    Author: UserProps,
    Editor: UserProps,
    Created: null,
    Modified: null
}

export class IEmergencyContactItem {
    Title?: string = '';
    BloodGroup?: string = '';
    EmergencyContactNumber1?: string = '';
    EmergencyContactNumber2?: string = '';
    EmployeeCode?: string = '';
    EmployeeName?: string = '';
    Name1?: string = '';
    Name2?: string = '';
    PermanentAddress?: string = '';
    PresentAddress?: string = '';
    Relationship1?: string = '';
    Relationship2?: string = '';
}
