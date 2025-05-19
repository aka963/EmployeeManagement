export interface IUserProps {
    Id?: number;
    Name?: string;
    Title?: string;
    LoginName?: string;
    Email?: string;
    PrincipleType?: number;
    IsSiteAdmin?: boolean;
    UserId?: { NameId?: string; NameIdIssuer?: string; };
}

export const UserProps = {
    Id: 0,
    Name: '',
    Title: '',
    LoginName: '',
    Email: '',
    PrincipleType: 0,
    IsSiteAdmin: false,
    UserId: { NameId: '', NameIdIssuer: '', }
}