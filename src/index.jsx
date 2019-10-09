import React from 'react';
import ReactDOM from 'react-dom';
import AccountDataChangeForm from './js/components/container/AccountDataChangeForm/AccountDataChangeForm.jsx';
import userData from './data/userData.json';

const {
  userName,
  userStatus,
  city,
  password,
  email,
  lastChangeDataTime,
} = userData;

const rootElement = document.getElementById('container');
ReactDOM.render(<AccountDataChangeForm
  userName={userName}
  userStatus={userStatus}
  city={city}
  password={password}
  email={email}
  lastChangeDataTime={lastChangeDataTime}
/>, rootElement);
