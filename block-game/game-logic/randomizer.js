import '../assets/colors'
import colorsList from '../assets/colorsList'
import piecesList from '../assets/piecesList'
import piecesShapes from '../assets/piecesShapes'

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const colorRandomizer = () => {
    var listSize = colorsList.length
    
    var randomNumber = getRandomInt(listSize)
    
    return colorsList[randomNumber]
}

const pieceColorSetter = (pieceShape, color) => 
    pieceShape.map(row => 
        row.map(pixel => 
            (pixel !== 0) ? color : 0
        )
    )

const pieceRandomizer = () => {
    var color = colorRandomizer();

    var listSize = piecesList.length
    
    var randomNumber = getRandomInt(listSize)

    var piece = piecesList[randomNumber]

    var shape = piecesShapes[piece]

    return pieceColorSetter(shape, color)
}

export default pieceRandomizer;