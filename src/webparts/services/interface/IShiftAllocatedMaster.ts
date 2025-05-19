import { IUserProps, UserProps } from "./IUserProps";

export interface IShiftAllocatedMaster {
    Id?: number;
    Title?: string;
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date;
    Modified?: Date;
    GracePeriod?: number;
    GTEffectiveDate?: Date;
    HalfdayTime?: string;
    ShiftInTime?: string;
    ShiftName?: string;
    ShiftOutTime?: string;
}

export const ShiftAllocatedMaster = {
    Id: 0,
    Title: '',
    Author: UserProps,
    Editor: UserProps,
    Created: null,
    Modified: null,
    GracePeriod: 0,
    GTEffectiveDate: null,
    HalfdayTime: '',
    ShiftInTime: '',
    ShiftName: '',
    ShiftOutTime: ''
}