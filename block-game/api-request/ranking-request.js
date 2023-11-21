const url = 'https://block-game-api.vercel.app/api/ranking'

const url_dev = 'http://localhost:3000/api/ranking'

export const ranking = async () => {
    const response = await fetch(url, {
        method: 'GET',
    })

    return await response.json()
}

export const postNewGame = async (name, score) => {    
    if(score < 300) return;

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ name: name, score: score })
    })

    return await response.json()
}