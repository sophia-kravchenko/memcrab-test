import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from '../../context/FormContext';
import { generateMatrix, calculateRowSums, calculateColumnAverages } from './functions';

const Table = () => {
  const context = useContext(FormContext);
  const { arguments: formDataArray } = context!;
  const formData = formDataArray[formDataArray.length - 1];

  const M = Number(formData.rows);
  const N = Number(formData.columns);

  const [matrix, setMatrix] = useState(generateMatrix(M, N));
  const [rowSums, setRowSums] = useState(calculateRowSums(matrix));
  const [columnAverages, setColumnAverages] = useState(calculateColumnAverages(matrix, M));

  useEffect(() => {
    if (M && N) {
      const newMatrix = generateMatrix(M, N);
      setMatrix(newMatrix);
      setRowSums(calculateRowSums(newMatrix));
      setColumnAverages(calculateColumnAverages(newMatrix, M));
    }
  }, [M, N])

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const newMatrix = [...matrix];
    newMatrix[rowIndex][colIndex].amount += 1;
    setMatrix(newMatrix);
    setRowSums(calculateRowSums(newMatrix));
    setColumnAverages(calculateColumnAverages(newMatrix, M));
  };

  if (!formData || formData.rows === '' || formData.columns === '') {
    return <div>No data available</div>;
  }

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
                <td key={cell.id} onClick={() => handleCellClick(rowIndex, columnIndex)}>
                  {cell.amount}
                </td>
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