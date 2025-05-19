import { IAddressMaster } from "../../services/interface/IAddressMaster";
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
export interface IAddressProps {
    AddressMaster?: IAddressMaster[];
    columns?: IColumn[];
    selectionDetails?: string;
}