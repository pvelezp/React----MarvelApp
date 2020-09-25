import React,{useState,useEffect} from 'react'
import Comic from './Comic';
import './Comics.css'
import SearchIcon from '@material-ui/icons/Search'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';
import { MenuItem, Select } from '@material-ui/core';

const Comics = () => {
    const PUBLIC_KEY = '1f2c294cbbf04d4d3f91953ccd41356b'
    const HASH = '18d91b1be3513b3b44314046810a850c'
    const [order, setOrder]= useState('issueNumber')
    
    const [offset, setOffset] = useState(0)
    const [count, setCount]= useState(30)
    const MARVEL_CHARACTER = `https://gateway.marvel.com:443/v1/public/comics?orderBy=${order}&limit=${count}&offset=${offset}&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`


    const [comics, setComics] = useState([])

    const [titleText, setTitleText]= useState('')
    const [filteredData, setFilteredData] = useState([])
    const [issue, setIssue] = useState('')
   
    const [format, setFormat] =useState('')

   
    useEffect(()=> {
        fetch(MARVEL_CHARACTER)
        .then(res => res.json())
        .then(res =>setComics(res.data.results))
    },[ ,order])

    const infiniteData = async () => {
        setOffset(offset => offset + count +1)
        await fetch(MARVEL_CHARACTER)
        .then(res => res.json())
        .then(res => setComics([...comics,...res?.data?.results]))
    }


    // search by format 
    const searchByFormat =  (e) => {
        e.preventDefault()
       setFormat(e.target.value)
        const filterData = async () => {
            await axios.get(`https://gateway.marvel.com:443/v1/public/comics?format=${format}&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`)
            .then(res => setFilteredData(res.data.data.results))
        }
        filterData()
    }


    // Search by issue number
    const searchByIssueNumber = (e) => {
        e.preventDefault()
        const filterData = async () => {
            await axios.get(`https://gateway.marvel.com:443/v1/public/comics?issueNumber=${issue}&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`)
            .then(res => setFilteredData(res.data.results))
        }
        filterData()
        setIssue('')
    }

    // search by name
    const searchByComicName = (e) => {
        e.preventDefault()
        const filterData = async () => {
            await axios.get(`https://gateway.marvel.com:443/v1/public/comics?title=${titleText}&ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`)
            .then(res => setFilteredData(res.data.data.results))
        }
        filterData()
        setTitleText('')
    }


    

    return (
        <div className="comics">
            <h2>Comics</h2>

      
            <div className="comics__orderSelect">
                <h5>Order by:</h5>
            <Select
            className="comics__select"
             value={order}
            onChange={e => setOrder(e.target.value)}
            >
                <MenuItem className="orderBy__option" value='issueNumber'>Ascendant</MenuItem>
                <MenuItem  className="orderBy__option" value='-issueNumber'>Descendant</MenuItem>
            </Select>

            </div>
         
           
            <div className="comics__filters">
               
                   <h4>Search by format:</h4>
                <Select
                value={format}
                onChange={searchByFormat}
                >
                    <MenuItem value='comic'>Comic</MenuItem>
                    <MenuItem value='magazine'>Magazine</MenuItem> 
                    <MenuItem value='trade paperback'>Trade paperback</MenuItem>
             <MenuItem value='hardcover'>Hardcover</MenuItem>
                    <MenuItem value='digest'>Digest</MenuItem>
                    <MenuItem value='digital comic'>Digital Comic</MenuItem>
                    <MenuItem value='infinite comic'>Infinite Comic</MenuItem> 

                </Select>
              
                <div className="comics__filter">
                <form onSubmit={searchByIssueNumber}>
                <SearchIcon />
                    <input 
                    value={issue}
                    onChange={e => setIssue(e.target.value)}
                    type="number" placeholder="Find by Issue Number"/>
                    <button type="submit">Buscar</button>
                </form>
                </div>
                <div className="comics__filter">
                <form onSubmit={searchByComicName}>
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
         filteredData.length !== 0 ? (
             filteredData.map(comic => (
                <Comic
                key={comic.id}
                comic={comic}
                
                />
             ))
         )
       :
               (
                <InfiniteScroll
                className="characters__list row"
                dataLength={comics.length}
                next={infiniteData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <b>Yay! You have seen it all</b>
                    </p>}
                
                >
                   
               { comics?.filter(comic => comic?.images?.length).map( comic => (
                    <Comic
                    key={comic.id}
                    comic={comic}
                    
                    />
                ))}
                </InfiniteScroll>
               )
             
  
        }
        </div>
        </div>
    )
}

export default Comics
