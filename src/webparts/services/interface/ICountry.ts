import { IUserProps, UserProps } from "./IUserProps";

export interface ICountry {
    Id?: number;
    Title?: string;
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date;
    Modified?: Date;
}

export const Country = {
    Id: 0,
    Title: '',
    Author: UserProps,
    Editor: UserProps,
    Created: null,
    Modified: null
}