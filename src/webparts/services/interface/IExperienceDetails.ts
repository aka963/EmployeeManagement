import { City, ICity } from "./ICity";
import { Country, ICountry } from "./ICountry";
import { IState, State } from "./IState";
import { IUserProps, UserProps } from "./IUserProps";

export interface IExperienceDetails {
    Id?: string;
    Title?: string;
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date;
    Modified?: Date;
    City?: ICity;
    CompanyAddress?: string;
    CompanyContactNo?: string;
    Country?: ICountry;
    EmployeeName?: string;
    EndDate?: Date;
    JobDescription?: string;
    JobType?: string;
    PreviousCompanyName?: string;
    StartDate?: Date;
    State?: IState;
    TodayDate?: Date;
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
    CompanyAddress: '',
    CompanyContactNo: '',
    Country: Country,
    EmployeeName: '',
    EndDate: null,
    JobDescription: '',
    JobType: '',
    PreviousCompanyName: '',
    StartDate: null,
    State: State,
    TodayDate: null,
    Designation: '',
    PreviousCompanyExp: 0,
}