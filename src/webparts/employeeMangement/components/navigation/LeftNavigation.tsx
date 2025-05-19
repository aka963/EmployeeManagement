import * as React from 'react';
import styles from '../EmployeeMangement.module.scss';
import { IEmployeeMangementProps } from '../IEmployeeMangementProps';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';
import { escape } from '@microsoft/sp-lodash-subset';
import { ILeftNavigationProps } from '../../interface/ILeftNavigationProps';

export default class LeftNavigation extends React.Component<IEmployeeMangementProps, ILeftNavigationProps> {
    constructor(props: IEmployeeMangementProps) {
        super(props);
        const currHashPath: string = window.location.hash;
        if (currHashPath.split('/')[2]) {
            this.state = { parentLink: currHashPath.split('/')[1], selectedLink: currHashPath.split('/')[2] };
        }
        else {
            this.state = { parentLink: 'myprofile', selectedLink: 'General' };
        }

        this.onNavLinkClick = this.onNavLinkClick.bind(this);
    }

    public onNavLinkClick(ev?: React.MouseEvent<HTMLElement>, link?: INavLink): void {
        if (link && link.key) {
            // console.log('Clicked PivotItem:', item['props']['itemKey']);
            this.setState({ selectedLink: link.key });
            this.props.onResponseFromLeftNav(link.key);
        }
    }

    public render(): React.ReactElement<IEmployeeMangementProps> {
        const {
            description,
            currentSPContext
        } = this.props;

        return (
            <div>
                <Nav onLinkClick={this.onNavLinkClick} className='profile-left-nav' groups={[{
                    links: [
                        {
                            name: 'General', url: '#/' + this.state.parentLink + '/General', icon: 'Articles', key: 'General'
                        },
                        {
                            name: 'Address', url: '#/' + this.state.parentLink + '/Address', icon: 'Home', key: 'Address'
                        },
                        {
                            name: 'Education', url: '#/' + this.state.parentLink + '/Education', icon: 'Education', key: 'Education'
                        },
                        {
                            name: 'Dependants', url: '#/' + this.state.parentLink + '/Dependants', icon: 'Family', key: 'Dependants'
                        },
                        {
                            name: 'Experience', url: '#/' + this.state.parentLink + '/Experience', icon: 'Financial', key: 'Experience'
                        },
                        {
                            name: 'Promotions', url: '#/' + this.state.parentLink + '/Promotions', icon: 'Org', key: 'Promotions'
                        },
                        {
                            name: 'Posting', url: '#/' + this.state.parentLink + '/Posting', icon: 'TimelineProgress', key: 'Posting'
                        }
                    ]
                }]}
                    // expandedStateText={'expanded'}
                    // collapsedStateText={'collapsed'}
                    selectedKey={this.state.selectedLink}
                />
            </div>
        );
    }
}