import React,{useState,useEffect} from 'react'
    const PUBLIC_KEY = '1f2c294cbbf04d4d3f91953ccd41356b'
    const HASH = '18d91b1be3513b3b44314046810a850c'


    const MARVEL_CHARACTER = `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`

    const [characters, setCharacters] = useState([])

    useEffect(()=> {
        fetch(MARVEL_CHARACTER)
        .then(res => res.json())
        .then(res => setCharacters(res.data.results))
    },[])

export const getCharacterById = (id) => {
    return characters.find(character => character.id === id)
 }