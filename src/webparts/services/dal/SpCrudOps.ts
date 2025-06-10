import { IEmployeeMangementProps } from '../../employeeMangement/components/IEmployeeMangementProps';
import { IFile, IFileAddResult, IFieldInfo, IItemAddResult, IItemUpdateResult, IListInfo, Web, ISiteGroupInfo, IWeb, IList } from '@pnp/sp/presets/all';
import { ConsoleListener, Logger, LogLevel } from '@pnp/logging';
import { sp, SPBatch } from '@pnp/sp';
import { ISiteUserInfo, ISiteUserProps } from '@pnp/sp/site-users/types';
import { ISPChoiceFieldQuery, ISPQuery } from '../interface/ISPQuery';
import { DataType, IMultiSPQuery } from '../interface/IMultiSPQuery';

export default class SpCrudOps {
    public static async getData(listName: string, columnsToRetrieve: string, columnsToExpand: string, filters: string, orderby: { column: string, isAscending: boolean }, props: IEmployeeMangementProps): Promise<any[]> {
        const web: IWeb = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        return await web.lists.getByTitle(listName).items.select(columnsToRetrieve).expand(columnsToExpand).filter(filters).orderBy(orderby.column, orderby.isAscending).get();
    }

    public static async getItemById(listName: string, columnsToRetrieve: string, columnsToExpand: string, itemId: number, props: IEmployeeMangementProps): Promise<any[]> {
        const web: IWeb = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        return await web.lists.getByTitle(listName).items.getById(itemId).select(columnsToRetrieve).expand(columnsToExpand).get();
    }

    public static async insertData(listName: string, data: {}, props: IEmployeeMangementProps): Promise<IItemAddResult> {
        const web: IWeb = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        return await web.lists.getByTitle(listName).items.add(data);
    }

    public static async updateData(listName: string, itemId: number, data: {}, props: IEmployeeMangementProps): Promise<IItemUpdateResult> {
        const web: IWeb = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        return await web.lists.getByTitle(listName).items.getById(itemId).update(data);
    }

    public static async deleteData(listName: string, itemId: number, props: IEmployeeMangementProps): Promise<void> {
        const web: IWeb = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        return await web.lists.getByTitle(listName).items.getById(itemId).delete();
    }

    public static async getListInfo(listName: string, props: IEmployeeMangementProps): Promise<IListInfo> {
        const web: IWeb = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        const list: IList = await web.lists.getByTitle(listName);
        const listInfo: IListInfo = await list.select('Id,Title')();

        return listInfo;
    }

    public static async getBatchData(listDetails: ISPQuery[], props: IEmployeeMangementProps): Promise<any> {
        const web: IWeb = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        const batch: SPBatch = web.createBatch();
        const listItemPromise = [];
        for (let i = 0; i < listDetails.length; i++) {
            const list: IList = web.lists.getByTitle(listDetails[i].ListTitle);
            const listItem = list.items
                .select(listDetails[i].SelectQuery)
                .expand(listDetails[i].ExpandQuery)
                .filter(listDetails[i].FilterQuery)
                .orderBy(listDetails[i].SortQuery.orderBy, listDetails[i].SortQuery.ascending)
                .top(15000)
                .inBatch(batch).get();
            listItemPromise.push(listItem);
        }
        const listItemResult = [];

        return await batch.execute().then(async (resp) => {
            // console.log(resp);
            for (let i = 0; i < listItemPromise.length; i++) {
                const items = await listItemPromise[i];
                listItemResult.push(items);
            }
            return listItemResult;
        }).catch((e) => {
            console.log(e);
            return listItemResult;
        });
    }

    public static async batchInsert(listName: string, data: [], props: IEmployeeMangementProps): Promise<IItemAddResult[]> {
        const web: IWeb = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        const list: IList = web.lists.getByTitle(listName);
        const entityTypeFullName = await list.getListItemEntityTypeFullName();
        const batch = web.createBatch();
        const itemAddResult: IItemAddResult[] = [];

        for (let d = 0; d < data.length; d++) {
            await list.items.inBatch(batch).add(data[d], entityTypeFullName).then(b => {
                itemAddResult.push(b);
            }).catch((e) => { console.log(e); });
        }

        return await batch.execute().then((v: void) => {
            return itemAddResult;
        });
    }

    public static async batchUpdate(listName: string, data: [], props: IEmployeeMangementProps): Promise<IItemUpdateResult[]> {
        const web: IWeb = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        const list: IList = web.lists.getByTitle(listName);
        const entityTypeFullName = await list.getListItemEntityTypeFullName();
        const batch = web.createBatch();
        const itemUpdateResult: IItemUpdateResult[] = [];

        for (let d = 0; d < data.length; d++) {
            await list.items.getById(data[d]['Id']).inBatch(batch).update(data[d], entityTypeFullName).then(b => {
                itemUpdateResult.push(b);
                console.log(b);
            }).catch((e) => { console.log(e); });
        }

        return await batch.execute().then((v: void) => {
            return itemUpdateResult;
        });
    }

    public static async batchDelete(listName: string, data: [], props: IEmployeeMangementProps): Promise<void> {
        const web: IWeb = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        const list: IList = web.lists.getByTitle(listName);
        const batch = web.createBatch();

        for (let d = 0; d < data.length; d++) {
            await list.items.getById(data[d]['Id']).inBatch(batch).delete();
        }

        return await batch.execute();
    }

    public static async uploadFile(folderServerRelativeUrl: string, file: File, props: IEmployeeMangementProps): Promise<IFileAddResult> {
        Logger.subscribe(new ConsoleListener());
        Logger.activeLogLevel = LogLevel.Verbose;

        const web: IWeb = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        const ticks = ((new Date().getTime() * 10000) + 621355968000000000);
        if (file.size <= 10485760) {
            return await web.getFolderByServerRelativeUrl(folderServerRelativeUrl).files.addUsingPath(encodeURI(ticks.toString() + '_' + file.name), file, { Overwrite: true });
        }
        else {
            return await web.getFolderByServerRelativeUrl(folderServerRelativeUrl).files.addChunked(ticks.toString() + '_' + file.name, file, data => {
                Logger.log({ data: data, level: LogLevel.Verbose, message: 'progress' });
            }, true);
        }
    }

    public static async updateFileContent(fileServerRelativeUrl: string, file: File, props: IEmployeeMangementProps): Promise<IFileAddResult | IFile> {
        Logger.subscribe(new ConsoleListener());
        Logger.activeLogLevel = LogLevel.Verbose;

        const web: IWeb = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        if (file.size <= 10485760) {
            return await web.getFileByServerRelativeUrl(fileServerRelativeUrl).setContent(file);
        }
        else {
            return await web.getFileByServerRelativeUrl(fileServerRelativeUrl).setContentChunked(file, data => {
                Logger.log({ data: data, level: LogLevel.Verbose, message: 'progress' });
            });
        }
    }

    public static async deleteFile(fileServerRelativeUrl: string, props: IEmployeeMangementProps): Promise<void> {
        Logger.subscribe(new ConsoleListener());
        Logger.activeLogLevel = LogLevel.Verbose;

        const web: IWeb = Web(props.currentSPContext.pageContext.web.absoluteUrl);

        return await web.getFileByServerRelativeUrl(fileServerRelativeUrl).delete();
    }

    public static async getSPListColumn(listName: string, columnInternalName: string, props: IEmployeeMangementProps): Promise<IFieldInfo> {
        const web: IWeb = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        return await web.lists.getByTitle(listName).fields.getByInternalNameOrTitle(columnInternalName).select('Choices,ID').get();
    }

    public static async currentProfile(props: IEmployeeMangementProps): Promise<any> {
        return await sp.profiles.myProperties.get().then((response) => {
            // return await sp.web.currentUser.get().then((response)=>{
            // console.log(response);
            return response;
        });
    }

    public static async currentUser(props: IEmployeeMangementProps): Promise<ISiteUserInfo> {
        const web: IWeb = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        return await web.currentUser.get().then((response) => {
            // return await sp.web.currentUser.get().then((response)=>{
            // console.log(response);
            return response;
        });
    }

    public static async parentCurrentUserGroups(props: IEmployeeMangementProps): Promise<ISiteGroupInfo[]> {
        const web: IWeb = Web(window.location.protocol + '//' + window.location.host);
        return await web.currentUser.groups.get().then((response) => {
            // console.log(response);
            return response;
        });
    }

    public static async currentUserGroups(props: IEmployeeMangementProps): Promise<ISiteGroupInfo[]> {
        const web: IWeb = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        return await web.currentUser.groups.get().then((response) => {
            // console.log(response);
            return response;
        });
    }

    public static async getSiteUsers(props: IEmployeeMangementProps): Promise<ISiteUserInfo[]> {
        const web: IWeb = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        return await web.siteUsers.get().then((response) => {
            // console.log(response);
            return response;
        });
    }

    public static async getAllItemsRecursively(listName: string, columnsToRetrieve: string, columnsToExpand: string, filters: string, orderby: { column: string, isAscending: boolean }, items1: any[] = [], startItemId?: number, itemCount?: number, props?: IEmployeeMangementProps): Promise<any[]> {
        const query = startItemId > 0 ? `ID gt ${startItemId}` : '';
        const web: IWeb = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        const items: any[] = await web.lists.getByTitle(listName).items.select(columnsToRetrieve).expand(columnsToExpand).filter(query).orderBy(orderby.column, orderby.isAscending).top(itemCount).getAll();
        if (items.length === 0) {
            return items1;
        } else {
            items1.push(...items);
            const lastItemId = items[items.length - 1].Id;
            return await this.getAllItemsRecursively(listName, columnsToRetrieve, columnsToExpand, filters, { column: 'Id', isAscending: true }, items1, lastItemId, 5000, props);
        }
    }

    public static async getContentType(libraryName: string, props?: IEmployeeMangementProps): Promise<any> {
        const web: IWeb = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        const items: any[] = await web.lists.getByTitle(libraryName).contentTypes();
        return items;

    }

    public static async uploadContentTypeFile(fileName: string, ContentTypeId: string, templateFileUrl: string, folderServerRelativeUrl: string, props: IEmployeeMangementProps): Promise<IFileAddResult> {
        const web: IWeb = Web(props.currentSPContext.pageContext.web.absoluteUrl);

        try {
            const fileBlob = await web.getFileByServerRelativeUrl(templateFileUrl).getBlob();
            const copiedFile: IFileAddResult = await web.getFolderByServerRelativeUrl(folderServerRelativeUrl).files.add(fileName, fileBlob, true); //  Add file with the given name, overwrite if exists
            return copiedFile;
            //  //    alert('File copied successfully!');
            //  //      const item = await copiedFile.getItem();
            //  //      await item.update({
            //  //        ContentTypeId: ContentTypeId, //  Replace with actual content type ID
            //  //      });
            //      alert('File Created !!');
        } catch (error) {
            console.error(error);
        }
    }

    public static async getUserInfo(username: string, props: IEmployeeMangementProps): Promise<ISiteUserProps> {
        const web: IWeb = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        return (await web.ensureUser(username)).data;
    }

    public static async getChoicesInBatch(listDetails: ISPChoiceFieldQuery[], props: IEmployeeMangementProps): Promise<IFieldInfo[]> {
        const web: IWeb = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        const batch: SPBatch = web.createBatch();
        const columnChoicePromise = [];
        for (let i = 0; i < listDetails.length; i++) {
            const list: IList = web.lists.getByTitle(listDetails[i].ListName);
            for (let n = 0; n < listDetails[i].ColumnNames.length; n++) {
                const columnName = listDetails[i].ColumnNames[n];
                const column = list.fields.getByTitle(columnName)
                    // .select(listDetails[i].SelectQuery)
                    // .expand(listDetails[i].ExpandQuery)
                    // .filter(listDetails[i].FilterQuery)
                    // .orderBy(listDetails[i].SortQuery.Column, listDetails[i].SortQuery.IsAscending)
                    // .top(15000)
                    .inBatch(batch).get();
                columnChoicePromise.push(column);
            }
        }
        const choiceResult: IFieldInfo[] = [];

        return await batch.execute().then(async (resp) => {
            // console.log(resp);
            for (let i = 0; i < columnChoicePromise.length; i++) {
                const columns = await columnChoicePromise[i];
                choiceResult.push(columns);
            }
            return choiceResult;
        }).catch((e) => {
            console.log(e);
            return choiceResult;
        });
    }

    public static async getMultiDataInBatch(listDetails: IMultiSPQuery[], props: IEmployeeMangementProps): Promise<any[]> {
        const web: IWeb = Web(props.currentSPContext.pageContext.web.absoluteUrl);
        const batch: SPBatch = web.createBatch();
        const dataPromise = [];
        for (let i = 0; i < listDetails.length; i++) {
            const list: IList = web.lists.getByTitle(listDetails[i].ListTitle);
            if (listDetails[i].Type === DataType.ListItems) {
                const listItem = list.items
                    .select(listDetails[i].SelectQuery)
                    .expand(listDetails[i].ExpandQuery)
                    .filter(listDetails[i].FilterQuery)
                    .orderBy(listDetails[i].SortQuery.orderBy, listDetails[i].SortQuery.ascending)
                    .top(15000)
                    .inBatch(batch).get();
                dataPromise.push(listItem);
            } else if (listDetails[i].Type === DataType.Choices) {
                for (let n = 0; n < listDetails[i].ChoiceColumns.length; n++) {
                    const columnName = listDetails[i].ChoiceColumns[n];
                    const column = list.fields.getByTitle(columnName)
                        // .select(listDetails[i].SelectQuery)
                        // .expand(listDetails[i].ExpandQuery)
                        // .filter(listDetails[i].FilterQuery)
                        // .orderBy(listDetails[i].SortQuery.Column, listDetails[i].SortQuery.IsAscending)
                        // .top(15000)
                        .inBatch(batch).get();
                    dataPromise.push(column);
                }
            }
        }
        const dataResults: any[] = [];

        return await batch.execute().then(async (resp) => {
            // console.log(resp);
            for (let i = 0; i < dataPromise.length; i++) {
                const results = await dataPromise[i];
                dataResults.push(results);
            }
            return dataResults;
        }).catch((e) => {
            console.log(e);
            return dataResults;
        });
    }
}