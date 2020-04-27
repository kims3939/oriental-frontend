import React from 'react';
import CaseUpload from './CaseUploadPage/CaseUpload';

function App() {
  const user = {
    username:'minwoo',
    speciality:'student'
  };

  return (
    <CaseUpload user={user}/>
  );
}

export default App;
