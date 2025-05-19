import { IUserProps, UserProps } from "./IUserProps";

export interface IBankMaster {
    Id?: number;
    Title?: string;
    ShortName?: string;
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date;
    Modified?: Date;
}

export const BankMaster = {
    Id: 0,
    Title: '',
    ShortName: '',
    Author: UserProps,
    Editor: UserProps,
    Created: null,
    Modified: null
} 