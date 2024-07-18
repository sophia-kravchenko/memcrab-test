import React from 'react';
import './App.css';
import CreateForm from './components/form/CreateForm';
import ConsumerComponent from './components/table/ConsumerComponent';

function App() {
  return (
    <div className="App">
      <h1>Frontend React Test Task</h1>
      <CreateForm />
      <ConsumerComponent />
    </div>
  );
}

export default App;
