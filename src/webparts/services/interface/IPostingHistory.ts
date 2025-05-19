import { ISubGroupMaster, SubGroupMaster } from "./ISubGroupMaster";
import { IUserProps, UserProps } from "./IUserProps";

export interface IPostingHistory {
    Id?: string;
    Title?: string;
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date;
    Modified?: Date;
    Employee?: IUserProps;
    SubGroup?: ISubGroupMaster;
    FromDate?: Date;
    ToDate?: Date;
}

export const PostingHistory = {
    Id: '',
    Title: '',
    Author: UserProps,
    Editor: UserProps,
    Created: null,
    Modified: null,
    Employee: UserProps,
    SubGroup: SubGroupMaster,
    FromDate: null,
    ToDate: null
}