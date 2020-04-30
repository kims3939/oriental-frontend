import React from 'react';
import CaseList from './CaseListPage/CaseList';
import { Grid, Hidden } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom'; 
import CaseDesktopAppBar from './CaseAppBar/CaseDesktopAppBar';
import CaseMobileAppBar from './CaseAppBar/CaseMobileAppBar';
import CaseUploadCtrl from './CaseUploadPage/CaseUploadCtrl';
import CaseSearch from './CaseSearchPage/CaseSearch';
function App() {
  const user = {
    username:'minwoo',
    speciality:'student'
  };

  return (
        <>
            <Hidden only={['xs']}><CaseDesktopAppBar /></Hidden>
            <Hidden only={['xl','lg','md','sm']}><CaseMobileAppBar /></Hidden>
            <Grid container direction='row'>
                <Grid item xl={4} lg={4} md={3}></Grid>
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <Switch>
                      <Route path='/' component={() => <CaseList user={user}/>} exact={true} />
                      <Route path='/upload' component={() => <CaseUploadCtrl user={user} action="upload"/>} exact={true} />
                      <Route path='/search' component={() => <CaseSearch user={user} />} exact={true} />
                  </Switch>
                </Grid>
                <Grid item xl={4} lg={4} md={3}></Grid>
            </Grid>
        </>
  );
}

export default App;
