import React,{useState, useEffect} from 'react'
import './Story.css'
import { useHistory } from 'react-router-dom';
const Story = ({story}) => {

    const RESOURCE_URI = story?.comics?.items[0]?.resourceURI
    const PUBLIC_KEY = '1f2c294cbbf04d4d3f91953ccd41356b'
    const HASH = '18d91b1be3513b3b44314046810a850c'
    const MARVEL_CHARACTER = `${RESOURCE_URI}?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`
    const history = useHistory()
    const [comics, setComics] = useState([])

    useEffect(()=> {
        fetch(MARVEL_CHARACTER)
        .then(res => res.json())
        .then(res => setComics(res.data.results))


    },[])

    const story_characters = comics[0]?.characters?.items?.map(character => character.name ).join(',  ')

    return (
        <div className="story ">
      
       
            <div className="story__title">
            <h2>{story.title}</h2>
            </div>

            <div className="story__details">
                <h5>Comics:</h5>
                
                    
                 <div className="story__comics">
                 {comics?.filter(comic => comic?.images?.length).filter(comic => comic.thumbnail !== null && !comic.thumbnail.path.includes('image_not_available')).map(comic => (
                        <div
                        key={comic.id}
                        className="story__imgContainer"
                        >
                             <img
                           onClick={() => history.push(`/comic/${comic?.id}`)}
                         className="story__ComicImg"
                         src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.name}/>
                        </div>
                   ))}
                   <p>{story?.comics?.items[0]?.name}</p>
                 </div>
                
            </div>
            <div className="story__characters"
            >
                {story_characters ? <h5>Characters:</h5> : <p>No characters available</p>}
                <div className="story__charactersNames" style={{display:'flex'}}>
                 {story_characters}
                </div>
            </div>
        </div>
    )
}

export default Story
