export interface ISPQuery {
    ListTitle?: string;
    SelectQuery?: string;
    ExpandQuery?: string;
    FilterQuery?: string;
    SortQuery?: { orderBy: string, ascending?: boolean }
}

export interface ISPChoiceFieldQuery {
    ListName?: string;
    ColumnNames?: string[];
}