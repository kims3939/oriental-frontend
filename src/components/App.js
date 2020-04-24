import React from 'react';
import CaseList from './CaseListPage/CaseList';
import { Grid, Hidden } from '@material-ui/core';

import CaseDesktopAppBar from './CaseAppBar/CaseDesktopAppBar';
import CaseMobileAppBar from './CaseAppBar/CaseMobileAppBar';

function App() {
  return (
        <>
            <Hidden only={['xs']}><CaseDesktopAppBar /></Hidden>
            <Hidden only={['xl','lg','md','sm']}><CaseMobileAppBar /></Hidden>
            <Grid container direction='row'>
                <Grid item xl={4} lg={3} md={3}></Grid>
                <Grid item xl={4} lg={6} md={6} sm={12} xs={12}><CaseList /></Grid>
                <Grid item xl={4} lg={3} md={3}></Grid>
            </Grid>
        </>
  );
}

export default App;
