export const ranking = async () => {
    const url = 'https://block-game-api.vercel.app/api/ranking'

    const response = await fetch(url, {
        method: 'GET',
    })
    console.log({response})
    return await response.json()
}