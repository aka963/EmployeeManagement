export interface IRedemptionCode {
    Id?: string;
    Title?: string;
    EmpId?: { Title?: string; EmployeeName?: string };
    RedemptionCode?: string;
    CodeRedemptionLink?: string;
    Application?: string
}

export const RedemptionCode = {
    Id: '',
    Title: '',
    EmpId: { Title: '', EmployeeName: '' },
    RedemptionCode: '',
    CodeRedemptionLink: '',
    Application: ''
}