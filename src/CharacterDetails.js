import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Navigation,Pagination,EffectFade, EffectCoverflow ,Thumbs} from 'swiper'
import './CharacterDetails.css'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import axios from 'axios';

SwiperCore.use([Navigation, Pagination, Thumbs])

SwiperCore.use([EffectFade]);
SwiperCore.use([EffectCoverflow]);

const CharacterDetails = ({history}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const {characterId} = useParams()
    const PUBLIC_KEY = '1f2c294cbbf04d4d3f91953ccd41356b'
    const HASH = '18d91b1be3513b3b44314046810a850c'

   const MARVEL_CHARACTER = `https://gateway.marvel.com:443/v1/public/characters/${characterId}?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`
    const [character, setCharacter] = useState(null)
    const [characterComics, setCharacterComics] = useState([])
    const [characterStories, setCharacterStories] = useState([])
  
  function truncate (str, n) {
    return str?.length > n ? str.substr(0, n-1) + "..." : str;
}
// fetch every character data
    useEffect(()=> {
        const fetchData = async () => {
           await fetch(MARVEL_CHARACTER)
        .then(res => res.json())
        .then(res => setCharacter(res.data.results[0]))
        
        }

        fetchData()
    },[])
// fetch character Comics:
useEffect(() => {
    const fetchComics = async() => {
        await axios(`http://gateway.marvel.com/v1/public/characters/${characterId}/comics?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`)
        
        .then(res => setCharacterComics(res.data.data.results))
    }

    fetchComics()
}, [])

// fetching character stories:
useEffect(() => {
    const fetchStories = async () => {
        await axios(`http://gateway.marvel.com/v1/public/characters/${characterId}/stories?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`)
        .then(res => setCharacterStories(res.data.data.results))
    }

    fetchStories()
}, [])

const stories_title = characterStories?.map(story => story.title ).filter(story => !story.includes('none'&& 'Cover')).join(',  ')

    return (
        <div className="characterDetail">

            <div className="characterDetail__backIcon">
            <KeyboardBackspaceIcon onClick={() => history.goBack()}/>
            </div>
            <div className="character__Card">
            <img
            className="card-img-top img-thumbnail character__img"
            src={`${character?.thumbnail.path}.${character?.thumbnail?.extension}`} alt={character?.name}/>

            
            <div className="character__CardDescription">
                <h4> <strong>Name:</strong> {character?.name}   </h4>
            <p >{character?.description ? character?.description : 'No description yet'}</p>
            <p> Appears in {character?.comics.available} comics and {character?.series.available} series. </p>
            </div>

            </div>

            <div className="character__comics">
                <div className="character__comicsTitle">
                <h3>Character's comics</h3>

                </div>
                <Swiper
                // style={{display:'flex'}}
                effect="coverflow"
                grabCursor= {true}
                centeredSlides={true}
                className="character__comicsSwiper"
               style={{width: '60%', backgroundColor:'black',display: 'flex', alignItems:'center'}}
               navigation
               
                id="thumbs" spaceBetween={2} slidesPerView={3} onSwiper={setThumbsSwiper}
                >
                    {characterComics?.map(comic => (
                        <SwiperSlide 
                        style={{height:'260px', width:'120px'}}
                        key={comic.id}>
                            <img 
                            style={{height: '180px', width: '120px' ,margin:'0 1rem'}}
                            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                             alt={comic.title}/>
                            <p > {truncate(comic.title, 32)}  </p>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="character__storiesTitle">
                <h3>Character's stories</h3>
                </div>

                <div className="character__storiesRow">
                    {stories_title}.
                </div>

            </div>

        </div>
    )
}

export default CharacterDetails
