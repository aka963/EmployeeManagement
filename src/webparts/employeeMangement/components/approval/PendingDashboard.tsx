import * as React from 'react';
import styles from '../EmployeeMangement.module.scss';
import { IEmployeeMangementProps } from '../IEmployeeMangementProps';

export default class PendingDashboard extends React.Component<IEmployeeMangementProps, {}> {
    constructor(props: IEmployeeMangementProps) {
        super(props);
    }

    public componentDidMount(): void {
        console.log('Pending Dashboard Reloaded!');
    }

    public render(): React.ReactElement<IEmployeeMangementProps> {
        const {
            description,
            currentSPContext
        } = this.props;

        return (
            <div>
                Pending Dashboard, Coming Soon!
            </div>
        );
    }

}