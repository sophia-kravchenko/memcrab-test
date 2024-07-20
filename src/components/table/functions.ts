import { v4 as uuidv4 } from 'uuid';

export const generateMatrix = (M: number, N: number) => {
  const matrix: { id: string; amount: number }[][] = [];

  for (let i = 0; i < M; i++) {
    const row: { id: string; amount: number }[] = [];
    for (let j = 0; j < N; j++) {
      row.push({ id: uuidv4(), amount: Math.floor(Math.random() * 900) + 100 });
    }
    matrix.push(row);
  }

  return matrix;
};

export const calculateRowSums = (matrix: { id: string; amount: number }[][]) => {
  return matrix.map(row => row.reduce((sum, cell) => sum + cell.amount, 0));
};

export const calculateColumnAverages = (matrix: { id: string; amount: number }[][], M: number) => {
  const columnSums = Array(matrix[0]?.length).fill(0);

  matrix.forEach(row => {
    row.forEach((cell, columnIndex) => {
      columnSums[columnIndex] += cell.amount;
    });
  });

  return columnSums.map(sum => sum / M);
};

export const findNearestCells = (matrix: { id: string; amount: number }[][], targetValue: number, x: number) => {
  const allCells = matrix.flat();
  const sortedCells = allCells
    .map(cell => ({
      ...cell,
      difference: Math.abs(cell.amount - targetValue),
    }))
    .sort((a, b) => a.difference - b.difference);

  return sortedCells.slice(0, x + 1).map(cell => cell.id);
};