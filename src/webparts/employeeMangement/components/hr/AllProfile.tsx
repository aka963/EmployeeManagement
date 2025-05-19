import * as React from 'react';
import styles from '../EmployeeMangement.module.scss';
import { IEmployeeMangementProps } from '../IEmployeeMangementProps';

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class AllProfile extends React.Component<IEmployeeMangementProps, {}> {
    constructor(props: IEmployeeMangementProps) {
        super(props);
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
                        <Icon iconName='ContactLink' />
                    </span>
                    <h2 className='widget-card-head-title'>ALL PROFILE</h2>
                    <span className='widget-card-head-btn'>
                        <PrimaryButton data-automation-id='btn-create-profile' iconProps={{ iconName: 'AddFriend' }}
                            text='Create Profile' onClick={() => { window.location.href = '#/createUserProfile/General'; }} />
                    </span>
                </div>
                <div className='widget-card-body'>
                    Hr Dashboard, Coming Soon!
                </div>
            </div>
        );
    }

}