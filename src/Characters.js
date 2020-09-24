import React,{useState,useEffect} from 'react'
import Character from './Character'
import './Characters.css'
import InfiniteScroll from 'react-infinite-scroll-component';

const Characters = () => {

    const PUBLIC_KEY = '1f2c294cbbf04d4d3f91953ccd41356b'
    const HASH = '18d91b1be3513b3b44314046810a850c'
   
    const [characters, setCharacters] = useState([])
    const [count, setCount]= useState(8)
    const [offset, setOffset] = useState(0)
    const [order, setOrder]= useState('name')
   
  
    const MARVEL_CHARACTER = `https://gateway.marvel.com:443/v1/public/characters?orderBy=${order}&limit=${count}&offset=${offset}&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`

    useEffect(()=> {

        fetch(MARVEL_CHARACTER)
        .then(res => res.json())
        .then(res => setCharacters([...res.data.results]))
        setOffset(offset => offset + count +1)
    },[ ,order])

    const infiniteData = async () => {
        setOffset(offset => offset + count +1)
        await fetch(MARVEL_CHARACTER)
        .then(res => res.json())
        .then(res => setCharacters([...characters,...res?.data?.results]))
    }


    return (
        <div className="characters">
              <div className="characters__selectOrder">
              <select value={order}
            onChange={e => setOrder(e.target.value)}
            >

                <option >Order by name</option>
                <option value='name'>Ascendant</option>
                <option value='-name'>Descendant</option>
            </select>
              </div>
            <div className="characters__title">
            <h2>Characters</h2> 
            
            </div>

            <div className="characters__orderSelect">
                
              

            </div>

        <div className="characters__list">

        <InfiniteScroll
        className="characters__list row"
        dataLength={characters.length}
        next={infiniteData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>}
        
        >
        {characters?.filter(character => !character?.thumbnail?.path.includes('image_not_available') && 
       !character?.thumbnail?.extension.includes('gif')).map( character => (
                <Character

                key={character?.id}
                character={character}
                
                />
            ))}


        </InfiniteScroll>


        </div>
        </div>
    )
}

export default Characters
