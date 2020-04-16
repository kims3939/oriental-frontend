import React from 'react';
import CaseDesktopAppBar from './CaseAppBar/CaseDesktopAppBar';
import CaseMobileAppBar from './CaseAppBar/CaseMobileAppBar'

import { Hidden } from '@material-ui/core';

function App() {
  return (
    <>
      <Hidden only={['xs']}><CaseDesktopAppBar /></Hidden>
      <Hidden only={['xl','lg','md','sm']}><CaseMobileAppBar /></Hidden>
    </>
  );
}

export default App;
