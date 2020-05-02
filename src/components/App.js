import React from 'react';
import CaseList from './CaseListPage/CaseList';
import { Grid, Hidden } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom'; 
import CaseDesktopAppBar from './CaseAppBar/CaseDesktopAppBar';
import CaseMobileAppBar from './CaseAppBar/CaseMobileAppBar';
import CaseUploadCtrl from './CaseUploadPage/CaseUploadCtrl';
import CaseSearch from './CaseSearchPage/CaseSearch';
import { withRouter } from 'react-router-dom';

function App(props) {
  const user = {
    username:'minwoo',
    speciality:'student'
  };

  const { location } = props;
  const isSearch = location.pathname === '/search';

  return (
        <>
            <Hidden only={['xs']}><CaseDesktopAppBar /></Hidden>
            <Hidden only={['xl','lg','md','sm']}><CaseMobileAppBar /></Hidden>
            <Grid container direction='row'>
                <Grid item xl={isSearch ? false : 4} lg={isSearch ? false : 4} md={isSearch ? false: 3}></Grid>
                <Grid item xl={isSearch ? 12 : 4} lg={isSearch ? 12 : 4} md={isSearch ? 12 : 6} sm={12} xs={12}>
                  <Switch>
                      <Route path='/' component={() => <CaseList user={user}/>} exact={true} />
                      <Route path='/upload' component={() => <CaseUploadCtrl user={user} action="upload"/>} exact={true} />
                      <Route path='/search' component={() => <CaseSearch user={user} />} exact={true} />
                  </Switch>
                </Grid>
                <Grid item xl={isSearch ? false : 4} lg={isSearch ? false : 4} md={isSearch ? false : 3}></Grid>
            </Grid>
        </>
  );
}

export default withRouter(App);
