import React from 'react'
import './Comic.css'

const Comic = ({comic}) => {
   console.log(comic)

    function truncate (str, n) {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }



    return (
        <div className="comic col-12 col-sm-6 col-md-4 col-lg-3">
            <img
            className="comic__img"
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.name}/>
            {/* <h2>{comic.name}</h2> */}
            <div className="comic__content">
    <h2 className="comic__title">{comic.title}</h2>
    <p className="comic__description">{truncate(comic?.description, 80)}</p>
  </div>
        </div>
    )
}

export default Comic
