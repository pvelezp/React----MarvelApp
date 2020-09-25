import React,{useState,useEffect} from 'react'
import './Stories.css'
import Story from './Story';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress } from '@material-ui/core';


const Stories = () => {

    const PUBLIC_KEY = '1f2c294cbbf04d4d3f91953ccd41356b'
    const HASH = '18d91b1be3513b3b44314046810a850c'
    
    const [offset, setOffset] = useState(0)
    const [count]= useState(30)
    const MARVEL_CHARACTER = `https://gateway.marvel.com:443/v1/public/stories?orderBy=-id&limit=${count}&offset=${offset}&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`

    const [stories, setStories] = useState([])

    useEffect(()=> {
        fetch(MARVEL_CHARACTER)
        .then(res => res.json())
        .then(res => setStories(res?.data?.results))
        setOffset(offset => offset + count +1)
    },[,count])

    const infiniteData = async () => {
        setOffset(offset => offset + count +1)
        await fetch(MARVEL_CHARACTER)
        .then(res => res.json())
        .then(res => setStories([...stories,...res?.data?.results]))
    }


    return (
        <div className="stories">
            <div className="stories__title">
            <h2>Stories</h2>
            </div>

        <div className="stories__list">

        <InfiniteScroll
                className="characters__list row"
                dataLength={stories?.length}
                next={infiniteData}
                hasMore={true}
                loader={<div style={{ width:'100vw', display:'flex', justifyContent:'center'}}><CircularProgress /></div>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <b>Yay! You have seen it all</b>
                    </p>}
                
                >
                   
        {stories?.map( story => (
                <Story
                key={story?.id}
                story={story}
                
                />
            ))}

</InfiniteScroll>  
        </div>
        </div>
    )
}

export default Stories
