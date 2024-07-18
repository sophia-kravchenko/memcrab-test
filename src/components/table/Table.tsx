import React, { useContext } from 'react';
import { FormContext } from '../../context/FormContext';
import { generateMatrix, calculateRowSums, calculateColumnAverages } from './functions';

const Table = () => {
  const context = useContext(FormContext);

  if (!context) {
    return <div>No context available</div>;
  }

  const { arguments: formDataArray } = context;
  const formData = formDataArray[formDataArray.length - 1];

  if (!formData || formData.rows === '' || formData.columns === '') {
    return <div>No data available</div>;
  }

  const M = Number(formData.rows);
  const N = Number(formData.columns);

  const matrix = generateMatrix(M, N);
  const rowSums = calculateRowSums(matrix);
  const columnAverages = calculateColumnAverages(matrix, M);

  return (
    <div>
      <h2>Generated Table</h2>
      <table border={1}>
        <thead>
          <tr>
            <th></th>
            {Array.from({ length: N }, (_, index) => (
              <th key={index}>Column {index + 1}</th>
            ))}
            <th>Sum</th>
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>Row {rowIndex + 1}</td>
              {row.map((cell, columnIndex) => (
                <td key={columnIndex}>{cell.amount}</td>
              ))}
              <td>{rowSums[rowIndex]}</td>
            </tr>
          ))}
          <tr>
            <td>Average</td>
            {columnAverages.map((average, index) => (
              <td key={index}>{average.toFixed(2)}</td>
            ))}
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};



export default Table;