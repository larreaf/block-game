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