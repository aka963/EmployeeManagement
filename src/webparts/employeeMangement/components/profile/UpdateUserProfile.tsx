import * as React from 'react';
import styles from '../EmployeeMangement.module.scss';
import { IEmployeeMangementProps } from '../IEmployeeMangementProps';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export default class UpdateUserProfile extends React.Component<IEmployeeMangementProps, {}> {
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
                        <Icon iconName='EditContact' />
                    </span>
                    <h2 className='widget-card-head-title'>UPDATE PROFILE</h2>
                </div>
                <div className='widget-card-body'>
                    Edit User Profile, Coming Soon!
                </div>
            </div>
        );
    }

}