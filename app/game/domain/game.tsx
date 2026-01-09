export default function canMoveTile(indexFrom: number, indexTo: number, cols: number): boolean {
    // can move from indexFrom to indexTo if
        // they are right next to each other
        // they are on top of each other
    const fromRow = Math.floor(indexFrom / cols)
    const fromCol = indexFrom % cols

    const toRow = Math.floor(indexTo / cols)
    const toCol = indexTo % cols
    
    // if in adjacent columns, must be in same row
    if (Math.abs(fromCol - toCol) <= 1 && fromRow === toRow) return true;
    
    // if in adjacent rows, must be in same column
    if (Math.abs(fromRow - toRow) <= 1 && fromCol === toCol) return true;

    // otherwise, not a legal move
    return false;
}