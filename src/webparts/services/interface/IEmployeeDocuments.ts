import { IUserProps, UserProps } from "./IUserProps";

export interface IEmployeeDocuments {
    Id?: number;
    Title?: string;
    Document?: FileList
    LinkFilename?: string;
    FileLeafRef?: string;
    Employee?: { Id?: number, Title?: string, EmployeeName?: string };
    EmployeeId?: string;
    Category?: string;
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date;
    Modified?: Date;
}

export const EmployeeDocuments = {
    Id: 0,
    Title: '',
    Document: null,
    LinkFilename: '',
    FileLeafRef: '',
    Employee: { Id: null, Title: '', EmployeeName: '' },
    EmployeeId: '',
    Category: '',
    Author: UserProps,
    Editor: UserProps,
    Created: null,
    Modified: null
} 