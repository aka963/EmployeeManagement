require('../../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
import * as React from 'react';
import styles from './EmployeeMangement.module.scss';
import { IEmployeeMangementProps } from './IEmployeeMangementProps';
import { escape } from '@microsoft/sp-lodash-subset';
import TopNavigation from './navigation/TopNavigation';
import { Switch, Route, HashRouter } from 'react-router-dom';
import UserProfile from './profile/UserProfile';
import CreateUserProfile from './profile/create/CreateUserProfile';
import UpdateUserProfile from './profile/update/UpdateUserProfile';
import MainDashboard from './approval/MainDashboard';
import Helper from '../../services/utilities/Helper';
import AllProfile from './hr/AllProfile';
import ViewUserProfile from './profile/view/ViewUserProfile';

export default class EmployeeMangement extends React.Component<IEmployeeMangementProps, {}> {
  constructor(props: IEmployeeMangementProps) {
    super(props);
  }

  public componentDidMount(): void {
    Helper.hideShowLoader('none');
  }

  public render(): React.ReactElement<IEmployeeMangementProps> {
    document.body.style.display = 'block';

    let userPhotoUrl: string = '';
    if (this.props.loggedInUserDetails.ProfileImage !== undefined && this.props.loggedInUserDetails.ProfileImage.Url !== '') {
      userPhotoUrl = this.props.loggedInUserDetails.ProfileImage.Url;
    } else {
      userPhotoUrl = '/_layouts/15/userphoto.aspx?size=L&username=' + this.props.currentSPContext.pageContext.legacyPageContext.userEmail;
    }
    return (
      <div>
        <div id='divLoading' style={{ display: 'none !important' }}>
          <div className='spinner'></div>
        </div>
        <div className={styles.employeeMangement} >
          <div className={styles.container + ' container-fluid'}>
            {/* <div className={styles.row}>
              <div className={styles.column}>
                <span className={styles.title}>Welcome to SharePoint!</span>
                <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
                <p className={styles.description}>{escape(this.props.description)}</p>
                <a href='https://aka.ms/spfx' className={styles.button}>
                  <span className={styles.label}>Learn more</span>
                </a>
              </div>
            </div> */}
            {/* <div className='profile-header'>
              <Icon iconName='PublicContactCard'></Icon>&nbsp;Employee Profile
            </div> */}
            <div className='profile-header'>
              <div className='profile-header-top'>
                <div className='profile-header-top-left'>
                  <a title='EXIM Bank India' className='ms-siteicon-a' href={this.props.currentSPContext.pageContext.web.absoluteUrl}>
                    <img className='ms-siteicon-img' src='/SiteAssets/EximHome/Images/EXIM_Logo.png' alt='' role='presentation' />
                  </a>
                </div>
                <div className='profile-header-top-right'>
                  <div className='profile-header-top-right-user'>
                    <div className='profile-header-top-right-user-details'>
                      <ul>
                        <li>{this.props.loggedInUserDetails.EmployeeName}</li>
                        <li>{this.props.loggedInUserDetails.Designation.Title}</li>
                      </ul>
                    </div>
                    <div className='profile-header-top-right-user-image'>
                      <img className='ms-siteicon-img' src={userPhotoUrl} alt='' role='presentation' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='customDivSeprator'></div>
            <TopNavigation {...this.props} />
            {/* <div className='ms-Grid'> */}
            <div className='row'>
              <div className='col-md-12 col-sm-12 col-lg-12'>
                <HashRouter>
                  <Switch>
                    <Route path='/' exact={true} render={() => <UserProfile {...this.props} />}></Route>
                    <Route path='/myprofile/:currNav' render={() => <UserProfile {...this.props} />}></Route>
                    <Route path='/createUserProfile/:currNav' render={() => <CreateUserProfile {...this.props} />}></Route>
                    <Route path='/updateUserProfile' render={() => <UpdateUserProfile {...this.props} />}></Route>
                    <Route path='/mainDash/:currTab' render={() => <MainDashboard {...this.props} />}></Route>
                    <Route path='/allProfile' render={() => <AllProfile {...this.props} />}></Route>
                    <Route path='/viewProfile/:currNav' render={() => <ViewUserProfile {...this.props} />}></Route>
                  </Switch>
                </HashRouter>
              </div>
            </div>
            {/* </div> */}
            <div className='footer'>
              <div className='left'>
                <img src='/sites/mysites/SiteAssets/EximHome/Images/brand.png' alt='' data-themekey='#' width={150} height={60} />
                <a href='https://www.eximbankindia.in/' target='blank'>EXIM<br />
                  <strong>Bank</strong>
                </a>
                <a href='https://www.eximbankindia.in/press-releases' target='blank'>EXIM<br />
                  <strong>Press Release</strong>
                </a>
                <a href='https://www.eximbankindia.in/exim-finserve.aspx' target='blank'>EXIM<br />
                  <strong>Finserve</strong>
                </a>
              </div>
              <div className='right'>
                <div className='copyright'>
                  <p>All Rights Reserved © EXIMBANK 2025</p>
                </div>
                <div className='disclaimer'>
                  <a href='https://www.eximbankindia.in/terms' target='blank'>Terms of Use</a>
                  <a href='https://www.eximbankindia.in/privacy-policy' target='blank'>Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
