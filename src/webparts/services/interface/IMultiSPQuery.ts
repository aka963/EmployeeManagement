export enum DataType {
    ListItems,
    Choices
}
export interface IMultiSPQuery {
    Type?: DataType;
    ListTitle?: string;
    SelectQuery?: string;
    ExpandQuery?: string;
    FilterQuery?: string;
    SortQuery?: { orderBy: string, ascending?: boolean };
    ChoiceColumns?: string[];
}
