export const generateMatrix = (M: number, N: number) => {
  const matrix: { id: number; amount: number }[][] = [];
  let idCounter = 1;

  for (let i = 0; i < M; i++) {
    const row: { id: number; amount: number }[] = [];
    for (let j = 0; j < N; j++) {
      row.push({ id: idCounter++, amount: Math.floor(Math.random() * 900) + 100 });
    }
    matrix.push(row);
  }

  return matrix;
};

export const calculateRowSums = (matrix: { id: number; amount: number }[][]) => {
  return matrix.map(row => row.reduce((sum, cell) => sum + cell.amount, 0));
};

export const calculateColumnAverages = (matrix: { id: number; amount: number }[][], M: number) => {
  const columnSums = Array(matrix[0]?.length).fill(0);

  matrix.forEach(row => {
    row.forEach((cell, columnIndex) => {
      columnSums[columnIndex] += cell.amount;
    });
  });

  return columnSums.map(sum => sum / M);
};