import { IPostingHistory } from "../../services/interface/IPostingHistory";
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
export interface IPostingHistoryProps {
    PostingHistory?: IPostingHistory[];
    columns?: IColumn[];
    selectionDetails?: string;
}