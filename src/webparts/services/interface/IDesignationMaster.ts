import { IScaleMaster, ScaleMaster } from "./IScaleMaster";
import { IUserProps, UserProps } from "./IUserProps";

export interface IDesignationMaster {
    Id?: number;
    Title?: string;
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date | string;
    Modified?: Date | string;
    Designation_Hindi?: string;
    Designation_VC?: string;
    DesignationOrder?: number;
    NomineeDirector?: string;
    Scale?: IScaleMaster;
    ScaleId?: string | number;
}

export const DesignationMaster = {
    Id: 0,
    Title: '',
    Author: UserProps,
    Editor: UserProps,
    Created: null,
    Modified: null,
    Designation_Hindi: '',
    Designation_VC: '',
    DesignationOrder: 0,
    NomineeDirector: '',
    Scale: ScaleMaster,
    ScaleId: ''
}