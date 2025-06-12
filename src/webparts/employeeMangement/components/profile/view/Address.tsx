import * as React from 'react';
import styles from '../../EmployeeMangement.module.scss';
import { IEmployeeMangementProps } from '../../IEmployeeMangementProps';
import { IAddressProps } from '../../../interface/IAddressProps';
import { IAddressMaster } from '../../../../services/interface/IAddressMaster';

import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { TooltipHost, TooltipDelay, DirectionalHint } from 'office-ui-fabric-react/lib/Tooltip';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class Address extends React.Component<IEmployeeMangementProps, IAddressProps> {
    public addressMaster: IAddressMaster[] = [];
    private _selection: Selection;

    constructor(props: IEmployeeMangementProps) {
        super(props);
        this.addressMaster = props.sharedData;
        this._selection = new Selection({
            onSelectionChanged: () => {
                this.setState({
                    selectionDetails: this._getSelectionDetails(),
                });
            }
        });

        const _columns: IColumn[] = [
            {
                key: 'addressType',
                name: 'Type',
                fieldName: 'AddressType',
                minWidth: 70,
                maxWidth: 100,
                isRowHeader: true,
                isResizable: true,
                isSorted: true,
                isSortedDescending: false,
                onColumnClick: this._onColumnClick,
                data: 'string',
                isPadded: true
            },
            {
                key: 'accomodationType',
                name: 'Accomodation',
                fieldName: 'AccomodationType',
                minWidth: 70,
                maxWidth: 90,
                isRowHeader: true,
                isResizable: true,
                onColumnClick: this._onColumnClick,
                data: 'string',
                isPadded: true
            },
            {
                key: 'entitlement',
                name: 'Entitlement',
                fieldName: 'Entitlement',
                minWidth: 70,
                maxWidth: 90,
                isRowHeader: true,
                isResizable: true,
                onColumnClick: this._onColumnClick,
                data: 'string',
                isPadded: true
            },
            {
                key: 'address',
                name: 'Address',
                fieldName: 'Address',
                minWidth: 210,
                maxWidth: 350,
                isRowHeader: true,
                isResizable: true,
                isSorted: false,
                isSortedDescending: false,
                isCollapsable: true,
                data: 'string',
                onColumnClick: this._onColumnClick,
                isPadded: true,
                onRender: (item: IAddressMaster) => {
                    return (
                        <TooltipHost
                            calloutProps={{ gapSpace: 5 }}
                            tooltipProps={{
                                onRenderContent: () => {
                                    return (
                                        <div>
                                            <ul style={{ margin: 0, padding: 0 }}>
                                                <li><b>Lease Start Date</b>: {item.LeaseStartDate}</li>
                                                <li><b>Lease Start Date</b>: {item.LeaseEndDate}</li>
                                                <li><b>Monthly Rent</b>: {item.MonthlyRent}</li>
                                                <li><b>Telephone</b>: {item.TelephoneNo}</li>
                                                <li><b>Mobile</b>: {item.MobileNo}</li>
                                            </ul>
                                        </div>
                                    );
                                }
                            }}
                            delay={TooltipDelay.zero}
                            id={'emgContToolTip' + item.Id}
                            directionalHint={DirectionalHint.topCenter}>
                            <span aria-describedby={'emgContToolTip' + item.Id}>
                                {item.Address}
                            </span>
                        </TooltipHost>
                    );
                }
            },
            {
                key: 'city',
                name: 'City',
                fieldName: 'City',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                isCollapsable: true,
                data: 'string',
                onColumnClick: this._onColumnClick,
                onRender: (item: IAddressMaster) => {
                    return (
                        <span>
                            {item.City.Title}
                        </span>
                    );
                }
            },
            {
                key: 'state',
                name: 'State',
                fieldName: 'State',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                isCollapsable: true,
                data: 'string',
                onColumnClick: this._onColumnClick,
                onRender: (item: IAddressMaster) => {
                    return (
                        <span>
                            {item.State.Title}
                        </span>
                    );
                }
            },
            {
                key: 'country',
                name: 'Country',
                fieldName: 'Country',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                isCollapsable: true,
                data: 'string',
                onColumnClick: this._onColumnClick,
                onRender: (item: IAddressMaster) => {
                    return (
                        <span>
                            {item.Country.Title}
                        </span>
                    );
                }
            },
            {
                key: 'pincode',
                name: 'Pincode',
                fieldName: 'Pincode',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                isCollapsable: true,
                data: 'number',
                onColumnClick: this._onColumnClick,
            }
        ];

        this.state = {
            AddressMaster: this._sortItems(this.addressMaster, 'Id'), selectionDetails: this._getSelectionDetails()
            , columns: _columns
        };
    }

    public render(): React.ReactElement<IEmployeeMangementProps> {
        const { AddressMaster, columns, selectionDetails } = this.state;

        return (
            <div className='col-xs-10 col-sm-11 col-md-11 col-lg-11 address-content'>
                <div className='profile-body'>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                            <div className='widget-card full-height'>
                                <div className='widget-card-head'>
                                    <span className='widget-card-head-icon'>
                                        <Icon iconName='HomeSolid' />
                                    </span>
                                    <h2 className='widget-card-head-title'>ADDRESS</h2>
                                </div>
                                <div className='widget-card-body'>
                                    <div className='row'>
                                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                            <MarqueeSelection selection={this._selection}>
                                                <DetailsList className='address-grid'
                                                    items={AddressMaster}
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
        const { columns, AddressMaster } = this.state;
        let newItems: IAddressMaster[] = AddressMaster.slice();
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
            AddressMaster: newItems
        });
    }

    private _sortItems = (items: IAddressMaster[], sortBy: string, descending = false): IAddressMaster[] => {
        if (descending) {
            return items.sort((a: IAddressMaster, b: IAddressMaster) => {
                if (a[sortBy] < b[sortBy]) {
                    return 1;
                }
                if (a[sortBy] > b[sortBy]) {
                    return -1;
                }
                return 0;
            });
        } else {
            return items.sort((a: IAddressMaster, b: IAddressMaster) => {
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