import { ISubGroupMaster, SubGroupMaster } from "./ISubGroupMaster";
import { IUserProps, UserProps } from "./IUserProps";

export interface IUnitMaster {
    Id?: number;
    Title?: string;
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date;
    Modified?: Date;
    SubGroup?: ISubGroupMaster;
}

export const UnitMaster = {
    Id: 0,
    Title: '',
    Author: UserProps,
    Editor: UserProps,
    Created: null,
    Modified: null,
    SubGroup: SubGroupMaster
}