import { IScaleMaster, ScaleMaster } from "./IScaleMaster";
import { IUserProps, UserProps } from "./IUserProps";

export interface IGradeMaster {
    Id?: number;
    Title?: string;
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date;
    Modified?: Date;
    Scale: IScaleMaster;
}

export const GradeMaster = {
    Id: 0,
    Title: '',
    Author: UserProps,
    Editor: UserProps,
    Created: null,
    Modified: null,
    Scale: ScaleMaster
}