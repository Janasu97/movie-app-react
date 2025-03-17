import './App.css'
import MovieCard from './components/MovieCard';

function App() {
  const movieNumber = 2;

  return (
    <>
      {movieNumber === 1 ? (
        <MovieCard movie={{title: "Film", release_date: 2024}}/> 
      ) : ( 
        <MovieCard movie={{title: "Second film", release_date: 2020}}/> 
      )} 
    </>
  );
}


export default App
