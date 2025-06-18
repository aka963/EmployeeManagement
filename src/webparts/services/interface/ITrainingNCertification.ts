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
    ApprovedById?: string | number;
    Description?: string;
    EmployeeName?: string;
    EndDate?: Date | string;
    ExperienceIn?: ITrainingCertificationMaster
    ExperienceInId?: string | number;
    Grade?: string;
    Institute?: string;
    Location?: string;
    NoOfDays?: string;
    NoOfHours?: string;
    StartDate?: Date | string;
    TodayDate?: Date;
    TrainingCost?: string | number;
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
    ExperienceInId: '',
    Grade: '',
    Institute: '',
    Location: '',
    NoOfDays: '',
    NoOfHours: '',
    StartDate: null,
    TodayDate: null,
    TrainingCost: '',
}

export interface ITrainingNCertificationItem {
    Title?: string;
    ApprovedById?: string | number;
    Description?: string;
    EmployeeName?: string;
    EndDate?: Date | string;
    ExperienceInId?: string | number;
    Grade?: string;
    Institute?: string;
    Location?: string;
    NoOfDays?: string;
    NoOfHours?: string;
    StartDate?: Date | string;
    TodayDate?: Date;
    TrainingCost?: string | number;
}
