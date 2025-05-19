import { City, ICity } from "./ICity";
import { Country, ICountry } from "./ICountry";
import { IOfficeTypeMaster, OfficeTypeMaster } from "./IOfficeTypeMaster";
import { IState, State } from "./IState";
import { ISubGroupMaster, SubGroupMaster } from "./ISubGroupMaster";
import { IUserProps, UserProps } from "./IUserProps";

export interface IOfficeMaster {
    Id?: number;
    Title?: string;
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date;
    Modified?: Date;
    OfficeYear?: string;
    City?: ICity;
    Country?: ICountry;
    OfficeType?: IOfficeTypeMaster;
    State?: IState;
    SubGroup?: ISubGroupMaster
    Address_English?: string;
    Address_Hindi?: string;
    MasterOfficeType?: string;
    OfficeLocation?: string;
    STD_Code?: string;
}

export const OfficeMaster = {
    Id: 0,
    Title: '',
    Author: UserProps,
    Editor: UserProps,
    OfficeYear: '',
    Created: null,
    Modified: null,
    City: City,
    Country: Country,
    OfficeType: OfficeTypeMaster,
    State: State,
    SubGroup: SubGroupMaster,
    Address_English: '',
    Address_Hindi: '',
    MasterOfficeType: '',
    OfficeLocation: '',
    STD_Code: ''
}