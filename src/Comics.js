import React,{useState,useEffect} from 'react'
import Comic from './Comic';
import './Comics.css'
import SearchIcon from '@material-ui/icons/Search'

const Comics = () => {
    const PUBLIC_KEY = '1f2c294cbbf04d4d3f91953ccd41356b'
    const HASH = '18d91b1be3513b3b44314046810a850c'
    const MARVEL_CHARACTER = `https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`

    const [comics, setComics] = useState([])

    const [titleText, setTitleText]= useState('')
    const [formatText, setFormatText]= useState('')
    const [issue, setIssue] = useState('')
    const [orderBy, setOrderBy] = useState(false)
   
    useEffect(()=> {
        fetch(MARVEL_CHARACTER)
        .then(res => res.json())
        .then(res => setComics(res.data.results))
    },[])

    // search by format

        var filteredComics = comics

    if(formatText !== '')   { 
    var filteredComics = comics.filter(comic => {
        return comic.format.toLowerCase().includes(formatText.toLowerCase())
    })}

    // search by title

        if(titleText!== ''){
         var filteredComics = comics.filter(comic => {
             return comic.title.toLowerCase().includes(titleText.toLowerCase())
         })}
      // search by issue

      if(issue !== '') {
      var filteredComics = comics.filter(comic => {
        return comic.issueNumber.toString().match(issue.toString())
    }) }

    // sorted by issueNUmber
    const sortComics = (data) => {
         data.sort((a,b) => a.issueNumber - b.issueNumber)
          return data  
    }

    const handleSort = (comics) => {
        setOrderBy(!orderBy)
        if(orderBy){
       sortComics(comics)}
    }


    const handleSearch = e => {}


    return (
        <div className="comics">
            <h2>Comics</h2>
            <button
                    onClick={() => handleSort(comics)}
                    >Ordenar</button>
            <div className="comics__filters">
                <div className="comics__filter">
                   
                <form>
                    <SearchIcon />
                    <input
                    value={formatText}
                    onChange={e => setFormatText(e.target.value)}
                    type="text" placeholder="Find by format"/>
                    <button type="submit">Buscar</button>
                </form>
                </div>
                <div className="comics__filter">
                <form>
                <SearchIcon />
                    <input 
                    value={issue}
                    onChange={e => setIssue(e.target.value)}
                    type="text" placeholder="Find by Issue Number"/>
                    <button type="submit">Buscar</button>
                </form>
                </div>
                <div className="comics__filter">
                <form>
                <SearchIcon />
                    <input
                    value={titleText}
                    onChange={e => setTitleText(e.target.value)}
                    type="text" placeholder="Find by title"/>
                    <button type="submit">Buscar</button>
                </form>
                </div>
            </div>

        <div className="comics__list">
        {
         
       
               
                    filteredComics.filter(comic => comic.images.length).map( comic => (
                        <Comic
                        key={comic.id}
                        comic={comic}
                        
                        />
                    ))
             
  
        }
        </div>
        </div>
    )
}

export default Comics
