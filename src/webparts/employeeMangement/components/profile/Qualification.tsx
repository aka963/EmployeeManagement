import * as React from 'react';
import styles from '../EmployeeMangement.module.scss';
import { IEmployeeMangementProps } from '../IEmployeeMangementProps';
import { IQualificationProps } from '../../interface/IQualificationProps';
import { IQualificationMaster } from '../../../services/interface/IQualificationMaster';

import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { TooltipHost, TooltipDelay, DirectionalHint } from 'office-ui-fabric-react/lib/Tooltip';
import Moment from 'react-moment';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class Qualification extends React.Component<IEmployeeMangementProps, IQualificationProps> {
    public qualificationMaster: IQualificationMaster[] = [];
    private _selection: Selection;

    constructor(props: IEmployeeMangementProps) {
        super(props);
        this.qualificationMaster = props.sharedData;
        this._selection = new Selection({
            onSelectionChanged: () => {
                this.setState({
                    selectionDetails: this._getSelectionDetails(),
                });
            }
        });

        const _columns: IColumn[] = [
            {
                key: 'qualification',
                name: 'Qualification',
                fieldName: 'Education',
                minWidth: 70,
                maxWidth: 100,
                isRowHeader: true,
                isResizable: true,
                isSorted: true,
                isSortedDescending: false,
                onColumnClick: this._onColumnClick,
                data: 'string',
                isPadded: true,
                onRender: (item: IQualificationMaster) => {
                    return (
                        <span>
                            {item.Education.Title}
                        </span>
                    );
                }
            },
            {
                key: 'institute',
                name: 'Institute',
                fieldName: 'Institute',
                minWidth: 150,
                maxWidth: 200,
                isRowHeader: true,
                isResizable: true,
                onColumnClick: this._onColumnClick,
                data: 'string',
                isPadded: true
            },
            {
                key: 'specialization',
                name: 'Speclization',
                fieldName: 'Speclization',
                minWidth: 150,
                maxWidth: 200,
                isRowHeader: true,
                isResizable: true,
                onColumnClick: this._onColumnClick,
                data: 'string',
                isPadded: true,
                onRender: (item: IQualificationMaster) => {
                    return (
                        <TooltipHost
                            calloutProps={{ gapSpace: 5 }}
                            tooltipProps={{
                                onRenderContent: () => {
                                    return (
                                        <div>
                                            <ul style={{ margin: 0, padding: 0 }}>
                                                <li><b>Comments</b>: {item.Comments}</li>
                                            </ul>
                                        </div>
                                    );
                                }
                            }}
                            delay={TooltipDelay.zero}
                            id={'emgContToolTip' + item.Id}
                            directionalHint={DirectionalHint.topCenter}>
                            <span aria-describedby={'emgContToolTip' + item.Id}>
                                {item.Speclization}
                            </span>
                        </TooltipHost>
                    );
                }
            },
            {
                key: 'category',
                name: 'Category',
                fieldName: 'Category',
                minWidth: 120,
                maxWidth: 150,
                isRowHeader: true,
                isResizable: true,
                isSorted: false,
                isSortedDescending: false,
                isCollapsable: true,
                data: 'string',
                onColumnClick: this._onColumnClick,
                isPadded: true,
                onRender: (item: IQualificationMaster) => {
                    return (
                        <TooltipHost
                            calloutProps={{ gapSpace: 5 }}
                            tooltipProps={{
                                onRenderContent: () => {
                                    return (
                                        <div>
                                            <ul style={{ margin: 0, padding: 0 }}>
                                                <li><b>Comments</b>: {item.Comments}</li>
                                            </ul>
                                        </div>
                                    );
                                }
                            }}
                            delay={TooltipDelay.zero}
                            id={'emgContToolTip' + item.Id}
                            directionalHint={DirectionalHint.topCenter}>
                            <span aria-describedby={'emgContToolTip' + item.Id}>
                                {item.Category}
                            </span>
                        </TooltipHost>
                    );
                }
            },
            {
                key: 'yearOfPassing',
                name: 'Year Of Passing',
                fieldName: 'YearOfPassing',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                isCollapsable: true,
                data: 'number',
                onColumnClick: this._onColumnClick,
                onRender: (item: IQualificationMaster) => {
                    return (
                        <span>
                            {item.YearOfPassing}
                        </span>
                    );
                }
            },
            {
                key: 'score',
                name: 'Score',
                fieldName: 'Score',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                isCollapsable: true,
                data: 'number',
                onColumnClick: this._onColumnClick,
                onRender: (item: IQualificationMaster) => {
                    return (
                        <span>
                            {item.Score}
                        </span>
                    );
                }
            },
            {
                key: 'startDate',
                name: 'Start Date',
                fieldName: 'StartDate',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                isCollapsable: true,
                data: 'number',
                onColumnClick: this._onColumnClick,
                onRender: (item: IQualificationMaster) => {
                    return (
                        <span>
                            {(item.StartDate !== undefined) ? <Moment format='DD MMM YYYY'>{new Date(item.StartDate).toLocaleDateString()}</Moment> : ''}
                        </span>
                    );
                }
            },
            {
                key: 'endDate',
                name: 'End Date',
                fieldName: 'EndDate',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                isCollapsable: true,
                data: 'number',
                onColumnClick: this._onColumnClick,
                onRender: (item: IQualificationMaster) => {
                    return (
                        <span>
                            {(item.EndDate !== undefined) ? <Moment format='DD MMM YYYY'>{new Date(item.EndDate).toLocaleDateString()}</Moment> : ''}
                        </span>
                    );
                }
            }
        ];

        this.state = {
            QualificationMaster: this._sortItems(this.qualificationMaster, 'Id'), selectionDetails: this._getSelectionDetails()
            , columns: _columns
        };
    }

    public render(): React.ReactElement<IEmployeeMangementProps> {
        const { QualificationMaster, columns, selectionDetails } = this.state;

        return (
            <div className='col-xs-10 col-sm-11 col-md-11 col-lg-11 address-content'>
                <div className='profile-body'>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                            <div className='widget-card full-height'>
                                <div className='widget-card-head'>
                                    <span className='widget-card-head-icon'>
                                        <Icon iconName='Education' />
                                    </span>
                                    <h2 className='widget-card-head-title'>QUALIFICATION</h2>
                                </div>
                                <div className='widget-card-body'>
                                    <div className='row'>
                                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                            <MarqueeSelection selection={this._selection}>
                                                <DetailsList className='address-grid'
                                                    items={QualificationMaster}
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
        const { columns, QualificationMaster } = this.state;
        let newItems: IQualificationMaster[] = QualificationMaster.slice();
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
            QualificationMaster: newItems
        });
    }

    private _sortItems = (items: IQualificationMaster[], sortBy: string, descending = false): IQualificationMaster[] => {
        if (descending) {
            return items.sort((a: IQualificationMaster, b: IQualificationMaster) => {
                if (a[sortBy] < b[sortBy]) {
                    return 1;
                }
                if (a[sortBy] > b[sortBy]) {
                    return -1;
                }
                return 0;
            });
        } else {
            return items.sort((a: IQualificationMaster, b: IQualificationMaster) => {
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