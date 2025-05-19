import { ITrainingCertificationMaster, TrainingCertificationMaster } from "./ITrainingCertificationMaster";
import { IUserProps, UserProps } from "./IUserProps";

export interface ITrainingNCertification {
    Id?: string;
    Title?: string;
    Author?: IUserProps;
    Editor?: IUserProps;
    Created?: Date;
    Modified?: Date;
    ApprovedBy?: IUserProps;
    Description?: string;
    EmployeeName?: string;
    EndDate?: Date;
    ExperienceIn?: ITrainingCertificationMaster
    Grade?: string;
    Institute?: string;
    Location?: string;
    NoOfDays?: string;
    NoOfHours?: string;
    StartDate?: Date;
    TodayDate?: Date;
    TrainingCost?: number;
}

export const TrainingNCertification = {
    Id: '',
    Title: '',
    Author: UserProps,
    Editor: UserProps,
    Created: null,
    Modified: null,
    ApprovedBy: UserProps,
    Description: '',
    EmployeeName: '',
    EndDate: null,
    ExperienceIn: TrainingCertificationMaster,
    Grade: '',
    Institute: '',
    Location: '',
    NoOfDays: '',
    NoOfHours: '',
    StartDate: null,
    TodayDate: null,
    TrainingCost: 0,
}