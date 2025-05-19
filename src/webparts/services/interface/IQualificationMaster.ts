import { EducationMaster, IEducationMaster } from "./IEducationMaster";
import { IUserProps, UserProps } from "./IUserProps";

export interface IQualificationMaster {
    Id?: string;
    Title?: string;
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date;
    Modified?: Date;
    Comments?: string;
    Duration?: string;
    Education?: IEducationMaster;
    EmployeeName?: string;
    EndDate?: Date;
    Flag?: string;
    Score?: string;
    Speclization?: string;
    StartDate?: Date;
    TodayDate?: Date;
    Institute?: string;
    Category?: string;
    YearOfPassing?: string;
}

export const QualificationMaster = {
    Id: '',
    Title: '',
    Author: UserProps,
    Editor: UserProps,
    Created: null,
    Modified: null,
    Comments: '',
    Duration: '',
    Education: EducationMaster,
    EmployeeName: '',
    EndDate: null,
    Flag: '',
    Score: '',
    Speclization: '',
    StartDate: null,
    TodayDate: null,
    Institute: '',
    Category: '',
    YearOfPassing: '',
}