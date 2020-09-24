import React,{useState,useEffect} from 'react'
    const PUBLIC_KEY = '1f2c294cbbf04d4d3f91953ccd41356b'
    const HASH = '18d91b1be3513b3b44314046810a850c'


    const MARVEL_CHARACTER = `https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`

    const [comics, setComics] = useState([])

    useEffect(()=> {
        fetch(MARVEL_CHARACTER)
        .then(res => res.json())
        .then(res => setComics(res.data.results))
    },[])

export const getComicsByFormat = (format= '') => {
    if(format === '') {
        return []
    }

    format = format.toLocaleLowerCase()

    return comics.filter(comic => comic.includes(format))
}