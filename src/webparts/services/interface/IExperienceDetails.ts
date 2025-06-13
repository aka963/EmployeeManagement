import { City, ICity } from "./ICity";
import { Country, ICountry } from "./ICountry";
import { IState, State } from "./IState";
import { IUserProps, UserProps } from "./IUserProps";

export interface IExperienceDetails {
    Id?: string;
    Title?: string;
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date | string;
    Modified?: Date | string;
    City?: ICity;
    CityId?: string | number;
    CompanyAddress?: string;
    CompanyContactNo?: string;
    Country?: ICountry;
    CountryId?: string | number;
    EmployeeName?: string;
    EndDate?: Date | string;
    JobDescription?: string;
    JobType?: string;
    PreviousCompanyName?: string;
    StartDate?: Date | string;
    State?: IState;
    StateId?: string | number;
    TodayDate?: Date | string;
    Designation?: string;
    PreviousCompanyExp?: number;
}

export const ExperienceDetails = {
    Id: '',
    Title: '',
    Author: UserProps,
    Editor: UserProps,
    Created: null,
    Modified: null,
    City: City,
    CityId: '',
    CompanyAddress: '',
    CompanyContactNo: '',
    Country: Country,
    CountryId: '',
    EmployeeName: '',
    EndDate: null,
    JobDescription: '',
    JobType: '',
    PreviousCompanyName: '',
    StartDate: null,
    State: State,
    StateId: '',
    TodayDate: null,
    Designation: '',
    PreviousCompanyExp: 0,
}