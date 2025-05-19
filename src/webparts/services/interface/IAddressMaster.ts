import { CheckinType } from "@pnp/sp/files";
import { City, ICity } from "./ICity";
import { Country, ICountry } from "./ICountry";
import { IState, State } from "./IState";
import { IUserProps, UserProps } from "./IUserProps";

export interface IAddressMaster {
    Id?: string;
    Title?: string;
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date;
    Modified?: Date;
    AddressType?: string;
    Address?: string;
    PinCode?: string;
    ResedentialPhone?: string;
    Country?: ICountry;
    State?: IState;
    City?: ICity;
    EmployeeName?: string;
    Flag?: string;
    MobileNo?: string;
    TelephoneNo?: string;
    AccomodationType?: string;
    LeaseStartDate?: Date;
    LeaseEndDate?: Date;
    MonthlyRent?: number;
    Entitlement?: string;
    SecurityDepositAmount?: number;
}

export const AddressMaster: IAddressMaster = {
    Id: '',
    Title: '',
    Author: UserProps,
    Editor: UserProps,
    Created: null,
    Modified: null,
    AddressType: '',
    Address: '',
    PinCode: '',
    ResedentialPhone: '',
    Country: Country,
    City: City,
    State: State,
    EmployeeName: '',
    Flag: '',
    MobileNo: '',
    TelephoneNo: '',
    AccomodationType: '',
    LeaseStartDate: null,
    LeaseEndDate: null,
    MonthlyRent: 0,
    Entitlement: '',
    SecurityDepositAmount: 0
}