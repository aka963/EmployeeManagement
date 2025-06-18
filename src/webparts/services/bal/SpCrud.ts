import { IEmployeeMangementProps } from '../../employeeMangement/components/IEmployeeMangementProps';
import { IFieldInfo, IFile, IFileAddResult, IFileInfo, IItemAddResult, IItemUpdateResult, IListInfo, ISiteUserProps } from '@pnp/sp/presets/all';
import spcrudops from '../dal/SpCrudOps';
import { ISPChoiceFieldQuery, ISPQuery } from '../interface/ISPQuery';
import { IMultiSPQuery } from '../interface/IMultiSPQuery';
import { IListBulkData } from '../interface/IListBulkData';

export default class SpCrud {
    public static async getData(listName: string, columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: IEmployeeMangementProps): Promise<any[]> {
        return await spcrudops.getData(listName, columnsToRetrieve, columnsToExpand, filters, orderby, props);
    }

    public static async getItemById(listName: string, columnsToRetrieve: string, columnsToExpand: string, itemId: number
        , props: IEmployeeMangementProps): Promise<any[]> {
        return await spcrudops.getItemById(listName, columnsToRetrieve, columnsToExpand, itemId, props);
    }

    public static async insertData(listName: string, data: {}, props: IEmployeeMangementProps): Promise<IItemAddResult> {
        return await spcrudops.insertData(listName, data, props);
    }

    public static async updateData(listName: string, itemId: number, data: {}, props: IEmployeeMangementProps): Promise<IItemUpdateResult> {
        return await spcrudops.updateData(listName, itemId, data, props);
    }

    public static async deleteData(listName: string, itemId: number, props: IEmployeeMangementProps): Promise<void> {
        return await spcrudops.deleteData(listName, itemId, props);
    }

    public static async getListInfo(listName: string, props: IEmployeeMangementProps): Promise<IListInfo> {
        return await spcrudops.getListInfo(listName, props);
    }

    public static async getBatchData(listDetails: ISPQuery[], props: IEmployeeMangementProps): Promise<any> {
        return await spcrudops.getBatchData(listDetails, props);
    }

    public static async batchInsert(listBulkData: IListBulkData[], props: IEmployeeMangementProps): Promise<IItemAddResult[]> {
        return await spcrudops.batchInsert(listBulkData, props);
    }

    public static async batchUpdate(listBulkData: IListBulkData[], props: IEmployeeMangementProps): Promise<IItemUpdateResult[]> {
        return await spcrudops.batchUpdate(listBulkData, props);
    }

    public static async batchDelete(listBulkData: IListBulkData[], props: IEmployeeMangementProps): Promise<void> {
        return await spcrudops.batchDelete(listBulkData, props);
    }

    public static async uploadFile(folderServerRelativeUrl: string, file: File, props: IEmployeeMangementProps): Promise<IFileAddResult> {
        return await spcrudops.uploadFile(folderServerRelativeUrl, file, props);
    }

    public static async updateFileContent(fileServerRelativeUrl: string, file: File, props: IEmployeeMangementProps): Promise<IFileAddResult | IFile> {
        return await spcrudops.updateFileContent(fileServerRelativeUrl, file, props);
    }

    public static async deleteFile(fileServerRelativeUrl: string, props: IEmployeeMangementProps): Promise<void> {
        return await spcrudops.deleteFile(fileServerRelativeUrl, props);
    }

    public static async getSPListColumn(listName: string, columnInternalName: string, props: IEmployeeMangementProps): Promise<IFieldInfo> {
        return await spcrudops.getSPListColumn(listName, columnInternalName, props);
    }

    public static async getUserInfo(username: string, props: IEmployeeMangementProps): Promise<ISiteUserProps> {
        return await spcrudops.getUserInfo(username, props);
    }

    public static async getChoicesInBatch(listDetails: ISPChoiceFieldQuery[], props: IEmployeeMangementProps): Promise<IFieldInfo[]> {
        return await spcrudops.getChoicesInBatch(listDetails, props);
    }

    public static async getMultiDataInBatch(listDetails: IMultiSPQuery[], props: IEmployeeMangementProps): Promise<any[]> {
        return await spcrudops.getMultiDataInBatch(listDetails, props);
    }
}
