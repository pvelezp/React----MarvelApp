import React,{useState, useEffect} from 'react'
import './Story.css'

const Story = ({story}) => {

    const RESOURCE_URI = story.comics.items[0].resourceURI
    const PUBLIC_KEY = '1f2c294cbbf04d4d3f91953ccd41356b'
    const HASH = '18d91b1be3513b3b44314046810a850c'
    const MARVEL_CHARACTER = `${RESOURCE_URI}?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`

    const [comics, setComics] = useState([])

    useEffect(()=> {
        fetch(MARVEL_CHARACTER)
        .then(res => res.json())
        .then(res => setComics(res.data.results))
         // eslint-disable-next-line no-console console.log('eslint will ignore the no-console on this line of code'); 

    },[])



    return (
        <div className="story">
      
       
            <div className="story__title">
            <h2>{story.title}</h2>
            </div>

            <div>
                <h4>Comics:</h4>
                
                    
                 <div className="story__comics">
                 {comics?.map(comic => (
                        <div
                        key={comic.id}
                        >
                             <img
                             style={{height: '100px'}}
                         className="comic__img"
                         src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.name}/>
                        </div>
                   ))}
                   <p>{story.comics.items[0].name}</p>
                 </div>
                
            </div>
            <div style={{display:'flex'}}>
                <h4>Characters</h4>
                <div className="story__characters" style={{display:'flex'}}>
                 {comics[0]?.characters?.items?.map(item => <p key={item.name}>{item.name}</p>)}
                </div>
            </div>
        </div>
    )
}

export default Story
