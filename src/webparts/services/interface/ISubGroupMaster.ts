import { GroupMaster, IGroupMaster } from "./IGroupMaster";
import { IUserProps, UserProps } from "./IUserProps";

export interface ISubGroupMaster {
    Id?: number;
    Title?: string;
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date;
    Modified?: Date;
    Group?: IGroupMaster;
    SubGroup?: string;
    ShortName?: string;
    GroupName?: string;
    GroupEmail?: string;
    DMD?: string;
    Status?: string;
}

export const SubGroupMaster = {
    Id: 0,
    Title: '',
    Author: UserProps,
    Editor: UserProps,
    Created: null,
    Modified: null,
    Group: GroupMaster,
    SubGroup: '',
    ShortName: '',
    GroupName: '',
    GroupEmail: '',
    DMD: '',
    Status: '',
}