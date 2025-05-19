import * as React from 'react';
import styles from '../EmployeeMangement.module.scss';
import { IEmployeeMangementProps } from '../IEmployeeMangementProps';
import { IExperienceProps } from '../../interface/IExperienceProps';
import { IExperienceDetails } from '../../../services/interface/IExperienceDetails';

import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { TooltipHost, TooltipDelay, DirectionalHint } from 'office-ui-fabric-react/lib/Tooltip';
import Moment from 'react-moment';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class Experience extends React.Component<IEmployeeMangementProps, IExperienceProps> {
    public experienceDetails: IExperienceDetails[] = [];
    private _selection: Selection;

    constructor(props: IEmployeeMangementProps) {
        super(props);
        this.experienceDetails = props.sharedData;
        this._selection = new Selection({
            onSelectionChanged: () => {
                this.setState({
                    selectionDetails: this._getSelectionDetails(),
                });
            }
        });

        const _columns: IColumn[] = [
            {
                key: 'previousCompanyName',
                name: 'Previous Company Name',
                fieldName: 'PreviousCompanyName',
                minWidth: 70,
                maxWidth: 100,
                isRowHeader: true,
                isResizable: true,
                isSorted: true,
                isSortedDescending: false,
                onColumnClick: this._onColumnClick,
                data: 'string',
                isPadded: true,
                onRender: (item: IExperienceDetails) => {
                    return (
                        <span>
                            {item.PreviousCompanyName}
                        </span>
                    );
                }
            },
            {
                key: 'designation',
                name: 'Designation',
                fieldName: 'Designation',
                minWidth: 150,
                maxWidth: 200,
                isRowHeader: true,
                isResizable: true,
                onColumnClick: this._onColumnClick,
                data: 'string',
                isPadded: true
            },
            {
                key: 'startDate',
                name: 'Start Date',
                fieldName: 'StartDate',
                minWidth: 70,
                maxWidth: 100,
                isRowHeader: true,
                isResizable: true,
                onColumnClick: this._onColumnClick,
                data: 'string',
                isPadded: true,
                onRender: (item: IExperienceDetails) => {
                    return (
                        <TooltipHost
                            calloutProps={{ gapSpace: 5 }}
                            tooltipProps={{
                                onRenderContent: () => {
                                    return (
                                        <div>
                                            <ul style={{ margin: 0, padding: 0 }}>
                                                <li><b>Company Address</b>: {item.CompanyAddress}</li>
                                                <li><b>Company Contact</b>: {item.CompanyContactNo}</li>
                                                <li><b>Previous Company Experience</b>: {item.PreviousCompanyExp}</li>
                                                <li><b>Job Description</b>: {item.JobDescription}</li>
                                            </ul>
                                        </div>
                                    );
                                }
                            }}
                            delay={TooltipDelay.zero}
                            id={'emgContToolTip' + item.Id}
                            directionalHint={DirectionalHint.topCenter}>
                            <span aria-describedby={'emgContToolTip' + item.Id}>
                                {(item.StartDate !== undefined) ? <Moment format='DD MMM YYYY'>{new Date(item.StartDate).toLocaleDateString()}</Moment> : ''}
                            </span>
                        </TooltipHost>
                    );
                }
            },
            {
                key: 'endDate',
                name: 'End Date',
                fieldName: 'EndDate',
                minWidth: 120,
                maxWidth: 150,
                isRowHeader: true,
                isResizable: true,
                isCollapsable: true,
                data: 'string',
                onColumnClick: this._onColumnClick,
                isPadded: true,
                onRender: (item: IExperienceDetails) => {
                    return (
                        <TooltipHost
                            calloutProps={{ gapSpace: 5 }}
                            tooltipProps={{
                                onRenderContent: () => {
                                    return (
                                        <div>
                                            <ul style={{ margin: 0, padding: 0 }}>
                                                <li><b>Company Address</b>: {item.CompanyAddress}</li>
                                                <li><b>Company Contact</b>: {item.CompanyContactNo}</li>
                                                <li><b>Previous Company Experience</b>: {item.PreviousCompanyExp}</li>
                                                <li><b>Job Description</b>: {item.JobDescription}</li>
                                            </ul>
                                        </div>
                                    );
                                }
                            }}
                            delay={TooltipDelay.zero}
                            id={'emgContToolTip' + item.Id}
                            directionalHint={DirectionalHint.topCenter}>
                            <span aria-describedby={'emgContToolTip' + item.Id}>
                                {(item.EndDate !== undefined) ? <Moment format='DD MMM YYYY'>{new Date(item.EndDate).toLocaleDateString()}</Moment> : ''}
                            </span>
                        </TooltipHost>
                    );
                }
            },
            {
                key: 'jobType',
                name: 'Job type',
                fieldName: 'JobType',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                isCollapsable: true,
                data: 'number',
                onColumnClick: this._onColumnClick,
                onRender: (item: IExperienceDetails) => {
                    return (
                        <span>
                            {item.JobType}
                        </span>
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
                data: 'number',
                onColumnClick: this._onColumnClick,
                onRender: (item: IExperienceDetails) => {
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
                data: 'number',
                onColumnClick: this._onColumnClick,
                onRender: (item: IExperienceDetails) => {
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
                data: 'number',
                onColumnClick: this._onColumnClick,
                onRender: (item: IExperienceDetails) => {
                    return (
                        <span>
                            {item.Country.Title}
                        </span>
                    );
                }
            }
        ];

        this.state = {
            ExperienceDetails: this._sortItems(this.experienceDetails, 'Id'), selectionDetails: this._getSelectionDetails()
            , columns: _columns
        };
    }

    public render(): React.ReactElement<IEmployeeMangementProps> {
        const { ExperienceDetails, columns, selectionDetails } = this.state;

        return (
            <div className='col-xs-10 col-sm-11 col-md-11 col-lg-11 address-content'>
                <div className='profile-body'>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                            <div className='widget-card full-height'>
                                <div className='widget-card-head'>
                                    <span className='widget-card-head-icon'>
                                        <Icon iconName='Market' />
                                    </span>
                                    <h2 className='widget-card-head-title'>EXPERIENCE</h2>
                                </div>
                                <div className='widget-card-body'>
                                    <div className='row'>
                                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                            <MarqueeSelection selection={this._selection}>
                                                <DetailsList className='address-grid'
                                                    items={ExperienceDetails}
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
        const { columns, ExperienceDetails } = this.state;
        let newItems: IExperienceDetails[] = ExperienceDetails.slice();
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
            ExperienceDetails: newItems
        });
    }

    private _sortItems = (items: IExperienceDetails[], sortBy: string, descending = false): IExperienceDetails[] => {
        if (descending) {
            return items.sort((a: IExperienceDetails, b: IExperienceDetails) => {
                if (a[sortBy] < b[sortBy]) {
                    return 1;
                }
                if (a[sortBy] > b[sortBy]) {
                    return -1;
                }
                return 0;
            });
        } else {
            return items.sort((a: IExperienceDetails, b: IExperienceDetails) => {
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