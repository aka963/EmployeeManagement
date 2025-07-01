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
    CountryId?: string
    State?: IState;
    StateId?: string;
    City?: ICity;
    CityId?: string;
    EmployeeName?: string;
    Flag?: string;
    MobileNo?: string;
    TelephoneNo?: string;
    AccomodationType?: string;
    LeaseStartDate?: Date | string;
    LeaseEndDate?: Date | string;
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
    CountryId: '',
    City: City,
    CityId: '',
    State: State,
    StateId: '',
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

export class IAddressMasterItem {
    Title?: string = '';
    AddressType?: string = '';
    Address?: string = '';
    PinCode?: string = '';
    ResedentialPhone?: string = '';
    CountryId?: string = '';
    StateId?: string = '';
    CityId?: string = '';
    EmployeeName?: string = '';
    MobileNo?: string = '';
    TelephoneNo?: string = '';
    AccomodationType?: string = '';
    LeaseStartDate?: Date | string = null;
    LeaseEndDate?: Date | string = null;
    MonthlyRent?: number = 0;
    Entitlement?: string = '';
    SecurityDepositAmount?: number = 0;
}
