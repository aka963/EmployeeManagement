import { IExperienceDetails } from "../../services/interface/IExperienceDetails";
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
export interface IExperienceProps {
    ExperienceDetails?: IExperienceDetails[];
    columns?: IColumn[];
    selectionDetails?: string;
}