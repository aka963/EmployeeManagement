import { ISubGroupMaster, SubGroupMaster } from "./ISubGroupMaster";
import { IUserProps, UserProps } from "./IUserProps";

export interface IPostingHistory {
    Id?: string;
    Title?: string;
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date | string;
    Modified?: Date | string;
    Employee?: IUserProps;
    SubGroup?: ISubGroupMaster;
    SubGroupId?: string | number;
    FromDate?: Date | string;
    ToDate?: Date | string;
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
    SubGroupId: '',
    FromDate: null,
    ToDate: null
}