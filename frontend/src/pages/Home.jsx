import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies, getMovieLottery } from "../services/api"
import "../css/Home.css"

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // If anything changes it will run it again. 
    // If not will be run only during init.
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies...")
            }
            finally {
                setLoading(false)
            }
        }

        loadPopularMovies()
    }, [])  

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim() && searchQuery !== "") return
        if (loading) return

        setLoading(true)
        try {
            if (searchQuery === "") {
                try {
                    const popularMovies = await getPopularMovies()
                    setMovies(popularMovies)
                } catch (err) {
                    console.log(err)
                    setError("Failed to load movies...")
                }
                finally {
                    setLoading(false)
                }
            } else {
                const searchResults = await searchMovies(searchQuery)
                setMovies(searchResults)
            }
            
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to search movies...")
        } finally {
            setLoading(false)
        }
    };

    const handleMovieLottery = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const movieLottery = await getMovieLottery()
            setMovies([movieLottery])
        } catch (err) {
            console.log(err)
            setError("Failed to retrieve lottery movie...")
        } finally {
            setLoading(false)
        }
    }

    return (
    <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input  type="text" 
                    placeholder="Search for movies..." 
                    className="search-input" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
            <button type="button" className="lottery-button" onClick={handleMovieLottery}>Lottery</button>
        </form>
        
        {error && <div className="error-message">{error}</div>}
        
        {loading ? (
            <div className="loading">Loading...</div>
        ) : (
            <div className="movies-grid">
            {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
            ))}
            </div>
        )}
    </div>
    );
}

export default Home;