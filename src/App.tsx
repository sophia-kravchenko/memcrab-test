import React from 'react';
import './App.css';
import CreateForm from './components/form/CreateForm';
import Table from './components/table/Table';

function App() {
  return (
    <div className="App">
      <h1>Frontend React Test Task</h1>
      <CreateForm />
      <Table />
    </div>
  );
}

export default App;
