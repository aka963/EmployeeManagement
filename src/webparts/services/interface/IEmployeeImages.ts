import { IUserProps, UserProps } from "./IUserProps";

export interface IEmployeeImages {
    Id?: number;
    Title?: string;
    Document?: FileList
    LinkFilename?: string;
    FileLeafRef?: string;
    File_x0020_Type?: string;
    FileRef?: string;
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date;
    Modified?: Date;
}

export const EmployeeImages = {
    Id: 0,
    Title: '',
    Document: null,
    LinkFilename: '',
    FileLeafRef: '',
    File_x0020_Type: '',
    FileRef: '',
    Author: UserProps,
    Editor: UserProps,
    Created: null,
    Modified: null
}

export interface IEmployeeImagesItem {
    Title?: string;
    Document?: FileList
}