import { IEmployeeMangementProps } from '../../employeeMangement/components/IEmployeeMangementProps';
import spcrud from './SpCrud';
import { ISPChoiceFieldQuery, ISPQuery } from '../interface/ISPQuery';
import { IFieldInfo, ISiteUserProps } from '@pnp/sp/presets/all';
import Helper from '../utilities/Helper';

export default class Choices {
    public static strEmployeeMasterListTitle: string = 'EmployeeMaster';
    public static strEmployeeMasterChoiceColumns: string[] = ['BloodGroup', 'ContractType', 'EmployeeTitle', 'Gender'
        , 'MaritalStatus', 'PhysicallyHandicaped', 'ProbationPeriod', 'Role', 'SingleParent', 'WeeklyOff'];
    
    public static async getEmployeeMasterChoicesField(props: IEmployeeMangementProps): Promise<IFieldInfo[]> {        
        let spChoiceFieldQuery: ISPChoiceFieldQuery[] = [];
        spChoiceFieldQuery.push({
            ListName: this.strEmployeeMasterListTitle, ColumnNames: this.strEmployeeMasterChoiceColumns
        });
        Helper.hideShowLoader('block');

        return await spcrud.getChoicesInBatch(spChoiceFieldQuery, props).then((response) => {
            Helper.hideShowLoader('none');
            return response;
        });
    }
}