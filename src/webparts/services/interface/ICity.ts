import { IState, State } from "./IState";
import { IUserProps, UserProps } from "./IUserProps";

export interface ICity {
    Id?: number;
    Title?: string;
    State?: IState;
    StateId?: string | number;
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date;
    Modified?: Date;
}

export const City = {
    Id: 0,
    Title: '',
    State: State,
    StateId: '',
    Author: UserProps,
    Editor: UserProps,
    Created: null,
    Modified: null
}