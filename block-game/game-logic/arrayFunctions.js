export function create2DArray(rows, columns) {
    return Array.from({ length: rows }, () => Array(columns).fill(0));
}

export function findall(array, criteria) {
    const items = []
    array.forEach(item => {
        if (criteria(item)) items.push(item)
    })
    return items
}

export function findallIndexes(array, criteria) {
    const items = []
    array.forEach((item, index) => {
        if (criteria(item)) items.push(index)
    })
    return items.reverse()
}

export function removeItemsAt(array, indexes) {
    indexes.forEach(index => {
        array.splice(index, 1)
    })
}

export function unshiftNewRows(array, rows, size, fillWidth = 0) {
    for (let i = 0; i < rows; i++) {
        const newRow = Array(size).fill(fillWidth)
        array.unshift(newRow)
    }
}

export function iterateMatrix(matrix, callback) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => callback(x, y, value))
    })
}

export function rotateMatrix(matrix) {

    const height = matrix.length;
    const width = matrix.reduce((max, row) => Math.max(max, row.length), 0);

    // Create a new array with the transposed dimensions
    const rotatedMatrix = new Array(width);

    for (let i = 0; i < width; i++) {
        rotatedMatrix[i] = new Array(height);
    }

    // Copy values from the original array to the rotated array
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            rotatedMatrix[j][height - 1 - i] = matrix[i][j];
        }
    }

    return rotatedMatrix;
}