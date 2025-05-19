import { IUserProps, UserProps } from "./IUserProps";

export interface IOfficeTypeMaster {
    Id?: number;
    Title?: string;
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date;
    Modified?: Date;
    MasterOfficeType?: string;
    OfficeType?: string;
}

export const OfficeTypeMaster = {
    Id: 0,
    Title: '',
    Author: UserProps,
    Editor: UserProps,
    Created: null,
    Modified: null,
    MasterOfficeType: '',
    OfficeType: ''
}