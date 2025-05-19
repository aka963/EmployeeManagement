import { IEmployeeCategoryMaster, EmployeeCategoryMaster } from "./IEmployeeCategoryMaster";
import { IUserProps, UserProps } from "./IUserProps";

export interface IEmployeeTypeMaster {
    Id?: number;
    Title?: string;
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date;
    Modified?: Date;
    EmployeeCategory?: IEmployeeCategoryMaster
}

export const EmployeeTypeMaster = {
    Id: 0,
    Title: '',
    Author: UserProps,
    Editor: UserProps,
    Created: null,
    Modified: null,
    EmployeeCategory: EmployeeCategoryMaster
}