import { Country, ICountry } from "./ICountry";
import { IUserProps, UserProps } from "./IUserProps";

export interface IState {
    Id?: number;
    Title?: string;
    Country?: ICountry;
    CountryId?: string | number;
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date;
    Modified?: Date;
}

export const State = {
    Id: 0,
    Title: '',
    Country: Country,
    CountryId: '',
    Author: UserProps,
    Editor: UserProps,
    Created: null,
    Modified: null
}