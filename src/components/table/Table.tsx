import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from '../../context/FormContext';
import { generateMatrix, calculateRowSums, calculateColumnAverages, findNearestCells } from './functions';

const Table = () => {
  const context = useContext(FormContext);
  const { arguments: formDataArray } = context!;
  const formData = formDataArray[formDataArray.length - 1];

  const M = Number(formData.rows);
  const N = Number(formData.columns);
  const X = Number(formData.highlights);

  const [matrix, setMatrix] = useState(generateMatrix(M, N));
  const [rowSums, setRowSums] = useState(calculateRowSums(matrix));
  const [columnAverages, setColumnAverages] = useState(calculateColumnAverages(matrix, M));
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{ rowIndex: number; colIndex: number } | null>(null);
  const [nearestCells, setNearestCells] = useState<number[]>([]);

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

  const handleMouseOverCell = (rowIndex: number, colIndex: number) => {
    const targetValue = matrix[rowIndex][colIndex].amount;
    const nearestIds = findNearestCells(matrix, targetValue, X);
    setHoveredCell({ rowIndex, colIndex });
    setNearestCells(nearestIds);
  };

  const handleMouseOutCell = () => {
    setHoveredCell(null);
    setNearestCells([]);
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
              {row.map((cell, columnIndex) => {
                const isHovered = hoveredRow === rowIndex;
                const percent = (cell.amount / rowSums[rowIndex]) * 100;
                const isCellHovered = hoveredCell && hoveredCell.rowIndex === rowIndex && hoveredCell.colIndex === columnIndex;
                const isNearest = nearestCells.includes(cell.id);

                let background;
                if (isCellHovered) {
                  background = 'purple';
                } else if (isHovered) {
                  background = `linear-gradient(to right, blue ${percent}%, transparent ${percent}%)`;
                } else if (isNearest) {
                  background = 'lightgreen';
                } else {
                  background = 'transparent';
                }

                return (
                  <td
                    key={cell.id}
                    onClick={() => handleCellClick(rowIndex, columnIndex)}
                    onMouseOver={() => handleMouseOverCell(rowIndex, columnIndex)}
                    onMouseOut={handleMouseOutCell}
                    style={{
                      background,
                      border: isCellHovered ? '2px solid red' : '',
                    }}
                  >
                    {isHovered ? `${percent.toFixed(0)}%` : cell.amount}
                  </td>
                );
              })}
              <td onMouseOver={() => setHoveredRow(rowIndex)} onMouseOut={() => setHoveredRow(null)}>{rowSums[rowIndex]}</td>
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