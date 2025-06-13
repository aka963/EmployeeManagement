import { IUserProfile } from "./IUserProfile";
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';

export interface IAllProfile {
    userProfile: IUserProfile[];
    filteredProfiles: IUserProfile[];
    pagedProfiles: IUserProfile[];
    columns: IColumn[];
    searchText: string;
    selectionDetails: string;
    currentPage: number;
    pageSize: number;
    isSortedDescending: boolean;
    sortedColumn: string;
    menuTarget: HTMLElement | null;
    showContextMenu: boolean;
    contextMenuProfile: any | null;
}

export const AllProfile = {
    userProfile: [],
    filteredProfiles: [],
    pagedProfiles: [],
    columns: [],
    searchText: '',
    selectionDetails: '',
    currentPage: null,
    pageSize: null,
    isSortedDescending: false,
    sortedColumn: '',
    menuTarget: null,
    showContextMenu: false,
    contextMenuProfile: null
} 