import "../css/Favorites.css"
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
    const {favorites} = useMovieContext();
    console.log(favorites)

    if (favorites) {
        return (
            <div className="favorites">
                <h2>Your Favorites</h2>
                <div className="movies-grid">
                {favorites.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
                </div>
            </div>
            )
    } else {
        return (
        <div className="favorites-empty">
            <h2>No favorite movies yet</h2>
            <p>Start addinng movies to your favorites and they will appear</p>
        </div>
        )
    }
}

export default Favorites;