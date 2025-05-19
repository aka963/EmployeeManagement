import * as React from 'react';
import styles from '../EmployeeMangement.module.scss';
import { IEmployeeMangementProps } from '../IEmployeeMangementProps';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import { ICreateUserProfile } from '../../interface/ICreateUserProfile';

import * as yup from 'yup';

import LeftNavigation from '../navigation/LeftNavigation';
import { IUserProfile } from '../../../services/interface/IUserProfile';
import AddGeneralProfile from './create/AddGeneralProfile';

export default class CreateUserProfile extends React.Component<IEmployeeMangementProps, ICreateUserProfile> {
    public userProfile: IUserProfile;
    constructor(props: IEmployeeMangementProps) {
        super(props);
        const currNav: string = window.location.hash;
        if (currNav.split('/')[2]) {
            this.state = { selectedLink: currNav.split('/')[2], userProfile: this.userProfile };
        }
        else {
            this.state = { selectedLink: 'General', userProfile: this.userProfile };
        }

        this.responseFromLeftNav = this.responseFromLeftNav.bind(this);
    }

    private responseFromLeftNav(selLink: string): void {
        this.setState({ selectedLink: selLink });
    }

    public render(): React.ReactElement<IEmployeeMangementProps> {
        const {
            description,
            currentSPContext
        } = this.props;

        const validate = yup.object().shape({});

        return (
            <div className='container-fluid'>
                <div className='widget-card'>
                    <div className='widget-card-head'>
                        <span className='widget-card-head-icon'>
                            <Icon iconName='AddFriend' />
                        </span>
                        <h2 className='widget-card-head-title'>ADD PROFILE</h2>
                    </div>
                    <div className='widget-card-body'>
                        <div className='row'>
                            <div className='col-xs-2 col-sm-1 col-md-1 col-lg-1'>
                                <LeftNavigation {...this.props} onResponseFromLeftNav={this.responseFromLeftNav} />
                            </div>
                            <div className='col-xs-10 col-sm-11 col-md-11 col-lg-11'>
                                {(this.state.selectedLink === 'General') ?
                                    <AddGeneralProfile {...this.props} sharedData={this.state.userProfile} /> : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}