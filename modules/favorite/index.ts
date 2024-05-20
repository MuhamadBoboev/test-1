import { loadFavoritesIds } from '@modules/favorite/api/loadFavoritesIds'
import { favoriteSlice, clearFavoriteProducts } from '@modules/favorite/model/favoriteSlice'
import { toggleFavorite } from '@modules/favorite/api/toggleFavorite'
import { Favorites } from '@modules/favorite/ui/Favorites'

export { Favorites }
export { favoriteSlice, loadFavoritesIds, toggleFavorite, clearFavoriteProducts }