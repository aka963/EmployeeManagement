import { IUserProps, UserProps } from "./IUserProps";

export interface IScaleMaster {
    Id?: number;
    Title?: string;
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date;
    Modified?: Date;
}

export const ScaleMaster = {
    Id: 0,
    Title: '',
    Author: UserProps,
    Editor: UserProps,
    Created: null,
    Modified: null,
}