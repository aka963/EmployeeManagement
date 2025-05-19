import * as React from 'react';
import styles from '../EmployeeMangement.module.scss';
import { IEmployeeMangementProps } from '../IEmployeeMangementProps';

export default class ApprovedDashboard extends React.Component<IEmployeeMangementProps, {}> {
    constructor(props: IEmployeeMangementProps) {
        super(props);
    }

    public componentDidMount(): void {
        console.log('Approved Dashboard Reloaded!');
    }

    public render(): React.ReactElement<IEmployeeMangementProps> {
        const {
            description,
            currentSPContext
        } = this.props;

        return (
            <div>
                Approved Dashboard, Coming Soon!
            </div>
        );
    }

}