import * as React from 'react';
import styles from '../EmployeeMangement.module.scss';
import { IEmployeeMangementProps } from '../IEmployeeMangementProps';

export default class RequestDashboard extends React.Component<IEmployeeMangementProps, {}> {
    constructor(props: IEmployeeMangementProps) {
        super(props);
    }

    public componentDidMount(): void {
        console.log('Request Dashboard Reloaded!');
    }

    public render(): React.ReactElement<IEmployeeMangementProps> {
        const {
            description,
            currentSPContext
        } = this.props;

        return (
            <div>
                Request Dashboard, Coming Soon!
            </div>
        );
    }

}