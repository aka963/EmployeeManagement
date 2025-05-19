import * as React from 'react';
import styles from '../EmployeeMangement.module.scss';
import { IEmployeeMangementProps } from '../IEmployeeMangementProps';
import { IPostingHistoryProps } from '../../interface/IPostingHistoryProps';
import { IPostingHistory } from '../../../services/interface/IPostingHistory';

import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { TooltipHost, TooltipDelay, DirectionalHint } from 'office-ui-fabric-react/lib/Tooltip';
import Moment from 'react-moment';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class PostingHistory extends React.Component<IEmployeeMangementProps, IPostingHistoryProps> {
    public postingHistory: IPostingHistory[] = [];
    private _selection: Selection;

    constructor(props: IEmployeeMangementProps) {
        super(props);
        this.postingHistory = props.sharedData;
        this._selection = new Selection({
            onSelectionChanged: () => {
                this.setState({
                    selectionDetails: this._getSelectionDetails(),
                });
            }
        });

        const _columns: IColumn[] = [
            {
                key: 'subGroup',
                name: 'Department',
                fieldName: 'SubGroup',
                minWidth: 150,
                maxWidth: 200,
                isRowHeader: true,
                isResizable: true,
                isSorted: true,
                isSortedDescending: false,
                onColumnClick: this._onColumnClick,
                data: 'string',
                isPadded: true,
                onRender: (item: IPostingHistory) => {
                    return (
                        <span>
                            {item.SubGroup.SubGroup}
                        </span>
                    );
                }
            },
            {
                key: 'fromDate',
                name: 'From Date',
                fieldName: 'FromDate',
                minWidth: 150,
                maxWidth: 200,
                isRowHeader: true,
                isResizable: true,
                onColumnClick: this._onColumnClick,
                data: 'Date',
                isPadded: true,
                onRender: (item: IPostingHistory) => {
                    return (
                        <span>
                            {(item.FromDate !== undefined) ? <Moment format='DD MMM YYYY'>{new Date(item.FromDate).toLocaleDateString()}</Moment> : ''}
                        </span>
                    );
                }
            },
            {
                key: 'toDate',
                name: 'To Date',
                fieldName: 'ToDate',
                minWidth: 150,
                maxWidth: 200,
                isRowHeader: true,
                isResizable: true,
                onColumnClick: this._onColumnClick,
                data: 'Date',
                isPadded: true,
                onRender: (item: IPostingHistory) => {
                    return (
                        <span>
                            {(item.ToDate !== undefined) ? <Moment format='DD MMM YYYY'>{new Date(item.ToDate).toLocaleDateString()}</Moment> : ''}
                        </span>
                    );
                }
            }
        ];

        this.state = {
            PostingHistory: this._sortItems(this.postingHistory, 'Id'), selectionDetails: this._getSelectionDetails()
            , columns: _columns
        };
    }

    public render(): React.ReactElement<IEmployeeMangementProps> {
        const { PostingHistory, columns, selectionDetails } = this.state;

        return (
            <div className='col-xs-10 col-sm-11 col-md-11 col-lg-11 address-content'>
                <div className='profile-body'>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                            <div className='widget-card full-height'>
                                <div className='widget-card-head'>
                                    <span className='widget-card-head-icon'>
                                        <Icon iconName='BranchFork2' />
                                    </span>
                                    <h2 className='widget-card-head-title'>POSTING HISTORY</h2>
                                </div>
                                <div className='widget-card-body'>
                                    <div className='row'>
                                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                            <MarqueeSelection selection={this._selection}>
                                                <DetailsList className='address-grid'
                                                    items={PostingHistory}
                                                    columns={columns}
                                                    setKey='set'
                                                    layoutMode={DetailsListLayoutMode.justified}
                                                    isHeaderVisible={true}
                                                    selection={this._selection}
                                                    selectionPreservedOnEmptyClick={true}
                                                    onItemInvoked={this._onItemInvoked}
                                                    enterModalSelectionOnTouch={true}
                                                    selectionMode={SelectionMode.none}
                                                />
                                            </MarqueeSelection>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }


    private _getSelectionDetails(): string {
        const selectionCount = this._selection.getSelectedCount();

        switch (selectionCount) {
            case 0:
                return 'No items selected';
            case 1:
                return '1 item selected: ' + (this._selection.getSelection()[0] as any).name;
            default:
                return `${selectionCount} items selected`;
        }
    }

    private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
        const { columns, PostingHistory } = this.state;
        let newItems: IPostingHistory[] = PostingHistory.slice();
        const newColumns: IColumn[] = columns.slice();
        const currColumn: IColumn = newColumns.filter((currCol: IColumn, idx: number) => {
            return column.key === currCol.key;
        })[0];
        newColumns.forEach((newCol: IColumn) => {
            if (newCol === currColumn) {
                currColumn.isSortedDescending = !currColumn.isSortedDescending;
                currColumn.isSorted = true;
            } else {
                newCol.isSorted = false;
                newCol.isSortedDescending = true;
            }
        });
        newItems = this._sortItems(newItems, currColumn.fieldName, currColumn.isSortedDescending);
        this.setState({
            columns: newColumns,
            PostingHistory: newItems
        });
    }

    private _sortItems = (items: IPostingHistory[], sortBy: string, descending = false): IPostingHistory[] => {
        if (descending) {
            return items.sort((a: IPostingHistory, b: IPostingHistory) => {
                if (a[sortBy] < b[sortBy]) {
                    return 1;
                }
                if (a[sortBy] > b[sortBy]) {
                    return -1;
                }
                return 0;
            });
        } else {
            return items.sort((a: IPostingHistory, b: IPostingHistory) => {
                if (a[sortBy] < b[sortBy]) {
                    return -1;
                }
                if (a[sortBy] > b[sortBy]) {
                    return 1;
                }
                return 0;
            });
        }
    }

    private _onItemInvoked(item: any): void {
        alert(`Item invoked: ${item.name}`);
    }

}