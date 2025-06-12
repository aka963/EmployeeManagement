import * as React from 'react';
import styles from '../../EmployeeMangement.module.scss';
import { IEmployeeMangementProps } from '../../IEmployeeMangementProps';
import { IDependentProps } from '../../../interface/IDependentProps';
import { IDependentMaster } from '../../../../services/interface/IDependentMaster';

import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { TooltipHost, TooltipDelay, DirectionalHint } from 'office-ui-fabric-react/lib/Tooltip';
import Moment from 'react-moment';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class Dependent extends React.Component<IEmployeeMangementProps, IDependentProps> {
    public dependentMaster: IDependentMaster[] = [];
    private _selection: Selection;

    constructor(props: IEmployeeMangementProps) {
        super(props);
        this.dependentMaster = props.sharedData;
        this._selection = new Selection({
            onSelectionChanged: () => {
                this.setState({
                    selectionDetails: this._getSelectionDetails(),
                });
            }
        });

        const _columns: IColumn[] = [
            {
                key: 'nameOfDependent',
                name: 'Name',
                fieldName: 'Name',
                minWidth: 70,
                maxWidth: 100,
                isRowHeader: true,
                isResizable: true,
                isSorted: true,
                isSortedDescending: false,
                onColumnClick: this._onColumnClick,
                data: 'string',
                isPadded: true,
                onRender: (item: IDependentMaster) => {
                    return (
                        <span>
                            {item.Name}
                        </span>
                    );
                }
            },
            {
                key: 'relationShip',
                name: 'RelationShip',
                fieldName: 'RelationShip',
                minWidth: 70,
                maxWidth: 100,
                isRowHeader: true,
                isResizable: true,
                onColumnClick: this._onColumnClick,
                data: 'string',
                isPadded: true
            },
            {
                key: 'stayingWithOfficer',
                name: 'Staying With Officer',
                fieldName: 'StayingWithOfficer',
                minWidth: 70,
                maxWidth: 100,
                isRowHeader: true,
                isResizable: true,
                onColumnClick: this._onColumnClick,
                data: 'string',
                isPadded: true,
                onRender: (item: IDependentMaster) => {
                    return (
                        <TooltipHost
                            calloutProps={{ gapSpace: 5 }}
                            tooltipProps={{
                                onRenderContent: () => {
                                    return (
                                        <div>
                                            <ul style={{ margin: 0, padding: 0 }}>
                                                <li><b>Status</b>: {item.Status}</li>
                                                <li><b>Remarks</b>: {item.Remarks}</li>
                                            </ul>
                                        </div>
                                    );
                                }
                            }}
                            delay={TooltipDelay.zero}
                            id={'emgContToolTip' + item.Id}
                            directionalHint={DirectionalHint.topCenter}>
                            <span aria-describedby={'emgContToolTip' + item.Id}>
                                {item.StayingWithOfficer}
                            </span>
                        </TooltipHost>
                    );
                }
            },
            {
                key: 'dateOfBirth',
                name: 'Date Of Birth',
                fieldName: 'DOB',
                minWidth: 70,
                maxWidth: 100,
                isRowHeader: true,
                isResizable: true,
                isCollapsable: true,
                data: 'string',
                onColumnClick: this._onColumnClick,
                isPadded: true,
                onRender: (item: IDependentMaster) => {
                    return (
                        <TooltipHost
                            calloutProps={{ gapSpace: 5 }}
                            tooltipProps={{
                                onRenderContent: () => {
                                    return (
                                        <div>
                                            <ul style={{ margin: 0, padding: 0 }}>
                                                <li><b>Status</b>: {item.Status}</li>
                                                <li><b>Remarks</b>: {item.Remarks}</li>
                                            </ul>
                                        </div>
                                    );
                                }
                            }}
                            delay={TooltipDelay.zero}
                            id={'emgContToolTip' + item.Id}
                            directionalHint={DirectionalHint.topCenter}>
                            <span aria-describedby={'emgContToolTip' + item.Id}>
                                {(item.DOB !== undefined) ? <Moment format='DD MMM YYYY'>{new Date(item.DOB).toLocaleDateString()}</Moment> : ''}
                            </span>
                        </TooltipHost>
                    );
                }
            },
            {
                key: 'gender',
                name: 'Gender',
                fieldName: 'Gender',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                isCollapsable: true,
                data: 'number',
                onColumnClick: this._onColumnClick,
                onRender: (item: IDependentMaster) => {
                    return (
                        <span>
                            {item.Gender}
                        </span>
                    );
                }
            },
            {
                key: 'dependentType',
                name: 'Dependent Type',
                fieldName: 'DependentType',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                isCollapsable: true,
                data: 'number',
                onColumnClick: this._onColumnClick,
                onRender: (item: IDependentMaster) => {
                    return (
                        <span>
                            {item.DependentType}
                        </span>
                    );
                }
            }
        ];

        this.state = {
            DependentMaster: this._sortItems(this.dependentMaster, 'Id'), selectionDetails: this._getSelectionDetails()
            , columns: _columns
        };
    }

    public render(): React.ReactElement<IEmployeeMangementProps> {
        const { DependentMaster, columns, selectionDetails } = this.state;

        return (
            <div className='col-xs-10 col-sm-11 col-md-11 col-lg-11 address-content'>
                <div className='profile-body'>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                            <div className='widget-card full-height'>
                                <div className='widget-card-head'>
                                    <span className='widget-card-head-icon'>
                                        <Icon iconName='Group' />
                                    </span>
                                    <h2 className='widget-card-head-title'>DEPENDANTS</h2>
                                </div>
                                <div className='widget-card-body'>
                                    <div className='row'>
                                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                            <MarqueeSelection selection={this._selection}>
                                                <DetailsList className='address-grid'
                                                    items={DependentMaster}
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
        const { columns, DependentMaster } = this.state;
        let newItems: IDependentMaster[] = DependentMaster.slice();
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
            DependentMaster: newItems
        });
    }

    private _sortItems = (items: IDependentMaster[], sortBy: string, descending = false): IDependentMaster[] => {
        if (descending) {
            return items.sort((a: IDependentMaster, b: IDependentMaster) => {
                if (a[sortBy] < b[sortBy]) {
                    return 1;
                }
                if (a[sortBy] > b[sortBy]) {
                    return -1;
                }
                return 0;
            });
        } else {
            return items.sort((a: IDependentMaster, b: IDependentMaster) => {
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