import React, { useContext } from 'react';
import { FormContext } from '../../context/FormContext';

const ConsumerComponent = () => {
  const context = useContext(FormContext);

  if (!context) {
    return <div>No context available</div>;
  }

  const { arguments: todo } = context;

  return (
    <div>
      <h1>Form Data</h1>
      {todo.map((item, index) => (
        <div key={index}>
          <p>Rows: {item.rows}</p>
          <p>Columns: {item.columns}</p>
          <p>Highlights: {item.highlights}</p>
        </div>
      ))}
    </div>
  );
};

export default ConsumerComponent;
