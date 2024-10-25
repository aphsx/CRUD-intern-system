import React from 'react';
import SortableTable from './Table';
import Profile from './Profile';

const App = () => {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <SortableTable />
      <br />
      <Profile />
    </div>
  );
};

export default App;
