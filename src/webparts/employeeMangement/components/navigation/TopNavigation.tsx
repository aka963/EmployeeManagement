import * as React from 'react';
import styles from '../EmployeeMangement.module.scss';
import { IEmployeeMangementProps } from '../IEmployeeMangementProps';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';
import { escape } from '@microsoft/sp-lodash-subset';
import { ITopNavigationProps } from '../../interface/ITopNavigationProps';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class TopNavigation extends React.Component<IEmployeeMangementProps, ITopNavigationProps> {
    constructor(props: IEmployeeMangementProps) {
        super(props);
        const currHashPath: string = window.location.hash;
        if (currHashPath.split('/')[1]) {
            this.state = { selectedLink: currHashPath.split('/')[1] };
        }
        else {
            this.state = { selectedLink: 'myprofile' };
        }

        this.onNavLinkClick = this.onNavLinkClick.bind(this);
    }

    public onNavLinkClick(ev?: React.MouseEvent<HTMLElement>, link?: INavLink): void {
        if (link && link.key) {
            // console.log('Clicked PivotItem:', item['props']['itemKey']);
            this.setState({ selectedLink: link.key });
        }
    }

    public render(): React.ReactElement<IEmployeeMangementProps> {
        const {
            description,
            currentSPContext
        } = this.props;

        return (
            <div className='emp-mas-top-nav'>
                <div className='row'>
                    <div className='col-xs-3 col-sm-3 col-md-3 col-lg-3 emp-mas-top-nav-left'>
                        &nbsp;&nbsp;&nbsp;<Icon iconName='ContactCardSettings'/> Employee Profile Management
                    </div>
                    <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9'>
                        <Nav onLinkClick={this.onNavLinkClick} className='emp-mas-top-nav-right' groups={[{
                            links: [
                                {
                                    name: 'My Profile', url: '#/myprofile/General', icon: 'ContactInfo', key: 'myprofile'
                                },
                                {
                                    name: 'Approval Dashboard', url: '#/mainDash/reqDash', iconProps: { iconName: 'WorkFlow' }, key: 'mainDash'
                                },
                                {
                                    name: 'All Profile', url: '#/allProfile', iconProps: { iconName: 'Group' }, key: 'allProfile'
                                }
                            ]
                        }]}
                            // expandedStateText={'expanded'}
                            // collapsedStateText={'collapsed'}
                            selectedKey={this.state.selectedLink}
                        />
                    </div>
                </div>
            </div>
        );
    }
}