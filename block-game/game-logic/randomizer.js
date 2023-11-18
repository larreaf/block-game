import '../assets/colors'
import colorsList from '../assets/colorsList'
import piecesList from '../assets/piecesList'
import piecesShapes from '../assets/piecesShapes'

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const colorRandomizer = () => {
    let listSize = colorsList.length
    
    let randomNumber = getRandomInt(listSize)
    
    return colorsList[randomNumber]
}

const pieceColorSetter = (pieceShape, color) => 
    pieceShape.map(row => 
        row.map(pixel => 
            (pixel !== 0) ? color : 0
        )
    )

const pieceRandomizer = () => {
    let color = colorRandomizer();

    let listSize = piecesList.length
    
    let randomNumber = getRandomInt(listSize)

    let piece = piecesList[randomNumber]

    let shape = piecesShapes[piece]

    return pieceColorSetter(shape, color)
}

export default pieceRandomizer;