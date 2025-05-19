import { IDependentMaster } from "../../services/interface/IDependentMaster";
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
export interface IDependentProps {
    DependentMaster?: IDependentMaster[];
    columns?: IColumn[];
    selectionDetails?: string;
}