import { IQualificationMaster } from "../../services/interface/IQualificationMaster";
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
export interface IQualificationProps {
    QualificationMaster?: IQualificationMaster[];
    columns?: IColumn[];
    selectionDetails?: string;
}