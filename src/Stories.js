import React,{useState,useEffect} from 'react'
import './Stories.css'
import Story from './Story';

const Stories = () => {

    const PUBLIC_KEY = '1f2c294cbbf04d4d3f91953ccd41356b'
    const HASH = '18d91b1be3513b3b44314046810a850c'


    const MARVEL_CHARACTER = `https://gateway.marvel.com:443/v1/public/stories?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`

    const [stories, setStories] = useState([])

    useEffect(()=> {
        fetch(MARVEL_CHARACTER)
        .then(res => res.json())
        .then(res => setStories(res.data.results))
    },[])
    return (
        <div className="stories">
            <div className="stories__title">
            <h2>Stories</h2>
            </div>

        <div className="stories__list">
        {stories.map( story => (
                <Story
                key={story.id}
                story={story}
                
                />
            ))}
        </div>
        </div>
    )
}

export default Stories
