import * as React from 'react';
import styles from '../EmployeeMangement.module.scss';
import { IEmployeeMangementProps } from '../IEmployeeMangementProps';

import { PivotItem, IPivotItemProps, Pivot } from 'office-ui-fabric-react/lib/Pivot';
import RequestDashboard from './RequestDashboard';
import PendingDashboard from './PendingDashboard';
import RejectedDashboard from './RejectedDashboard';
import ApprovedDashboard from './ApprovedDashboard';
import { Icon } from 'office-ui-fabric-react';
import { IMainDashboardProps } from '../../interface/IMainDashboardProps';

export default class MainDashboard extends React.Component<IEmployeeMangementProps, IMainDashboardProps> {
    constructor(props: IEmployeeMangementProps) {
        super(props);
        const currTab: string = window.location.hash;
        if (currTab.split('/')[2]) {
            this.state = { selectedTab: currTab.split('/')[2] };
        }
        else {
            this.state = { selectedTab: 'reqDash' };
        }
        this.onPivotItemClick = this.onPivotItemClick.bind(this);
    }

    private onPivotItemClick(item?: IPivotItemProps): void {
        if (item && item['props']['itemKey']) {
            // console.log('Clicked PivotItem:', item['props']['itemKey']);
            this.setState({ selectedTab: item['props']['itemKey'] });
            window.location.href = '#/mainDash/' + item['props']['itemKey'];
        }
    }

    public render(): React.ReactElement<IEmployeeMangementProps> {
        const {
            description,
            currentSPContext
        } = this.props;

        return (
            <div className='widget-card full-content-height'>
                <div className='widget-card-head'>
                    <span className='widget-card-head-icon'>
                        <Icon iconName='TaskGroup' />
                    </span>
                    <h2 className='widget-card-head-title'>APPROVAL DASHBOARD</h2>
                </div>
                <div className='widget-card-body'>
                    <Pivot onLinkClick={this.onPivotItemClick} selectedKey={this.state.selectedTab} className='emp-mas-app-dash-tab'>
                        <PivotItem headerText='Request' itemIcon='TextDocumentShared' itemKey='reqDash'>
                            {this.state.selectedTab === 'reqDash' && (
                                <RequestDashboard {...this.props} />
                            )}
                        </PivotItem>
                        <PivotItem headerText='Pending' itemIcon='TaskManager' itemKey='penDash'>
                            {this.state.selectedTab === 'penDash' && (
                                <PendingDashboard {...this.props} />
                            )}
                        </PivotItem>
                        <PivotItem headerText='Rejected' itemIcon='ReceiptUndelivered' itemKey='rejDash'>
                            {this.state.selectedTab === 'rejDash' && (
                                <RejectedDashboard {...this.props} />
                            )}
                        </PivotItem>
                        <PivotItem headerText='Approved' itemIcon='DocumentApproval' itemKey='appDash'>
                            {this.state.selectedTab === 'appDash' && (
                                <ApprovedDashboard {...this.props} />
                            )}
                        </PivotItem>
                    </Pivot>
                </div>
            </div>
        );
    }
}