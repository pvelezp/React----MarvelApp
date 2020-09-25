import React, { useContext ,useState} from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from '@material-ui/core';
import { FavoriteContext } from './FavoriteProvider';
import { useHistory } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import './Favorite.css'


const Favorite = ({favorite}) => {
console.log(favorite)
    const  {dispatch} = useContext(FavoriteContext)
    const [isFavorite] = useState(false)
    const history = useHistory()
    const unFavorite = () => {
        dispatch({
            type: 'REMOVE_FROM_FAVORITES',
            id: favorite.id
        })
    }

    const path = favorite?.hasOwnProperty('characters')  ? 'comic': 'character'

    return (
        <div className="favorite">
            <img
         onClick={() => history.push(`/${path}/${favorite.id}`)}
            src={`${favorite?.thumbnail?.path}.${favorite?.thumbnail?.extension}`} alt={favorite?.name}/>
            <h2>{favorite.name}</h2>
            <IconButton
            onClick={unFavorite}
            >
            { isFavorite ?<FavoriteBorderIcon /> : <FavoriteIcon />}
            </IconButton>
        </div>
    )
}

export default Favorite
