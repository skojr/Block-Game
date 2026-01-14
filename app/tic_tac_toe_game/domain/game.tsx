interface Square {
    occupied: boolean;
    isX: boolean;
}

export default function didWin(squares: Square[], cols: number): { won: boolean; winner: "X" | "O" | null } {
    const rows = Math.floor(squares.length / cols);
    
    // Check rows
    for (let row = 0; row < rows; row++) {
        const firstIndex = row * cols;
        const first = squares[firstIndex];
        if (first.occupied) {
            let allSame = true;
            for (let col = 1; col < cols; col++) {
                const current = squares[firstIndex + col];
                if (!current.occupied || current.isX !== first.isX) {
                    allSame = false;
                    break;
                }
            }
            if (allSame) {
                return { won: true, winner: first.isX ? "X" : "O" };
            }
        }
    }
    
    // Check columns
    for (let col = 0; col < cols; col++) {
        const first = squares[col];
        if (first.occupied) {
            let allSame = true;
            for (let row = 1; row < rows; row++) {
                const current = squares[row * cols + col];
                if (!current.occupied || current.isX !== first.isX) {
                    allSame = false;
                    break;
                }
            }
            if (allSame) {
                return { won: true, winner: first.isX ? "X" : "O" };
            }
        }
    }
    
    // Check main diagonal (top-left to bottom-right)
    const topLeft = squares[0];
    if (topLeft.occupied) {
        let allSame = true;
        for (let i = 1; i < rows && i < cols; i++) {
            const current = squares[i * cols + i];
            if (!current.occupied || current.isX !== topLeft.isX) {
                allSame = false;
                break;
            }
        }
        if (allSame && rows === cols) {
            return { won: true, winner: topLeft.isX ? "X" : "O" };
        }
    }
    
    // Check anti-diagonal (top-right to bottom-left)
    const topRight = squares[cols - 1];
    if (topRight.occupied) {
        let allSame = true;
        for (let i = 1; i < rows && i < cols; i++) {
            const current = squares[i * cols + (cols - 1 - i)];
            if (!current.occupied || current.isX !== topRight.isX) {
                allSame = false;
                break;
            }
        }
        if (allSame && rows === cols) {
            return { won: true, winner: topRight.isX ? "X" : "O" };
        }
    }
    
    return { won: false, winner: null };
}
