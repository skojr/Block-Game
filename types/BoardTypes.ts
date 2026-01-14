import { ReactNode } from "react";

export interface CellData {
  [key: string]: unknown;
}

export interface GameBoardProps {
  rows: number;
  cols: number;
  cells: CellData[];
  onCellClick: (index: number) => void;
  renderCell?: (cell: CellData, index: number) => ReactNode;
}
