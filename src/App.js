import React, {useState, useEffect , useCallback} from 'react';
import AddMovie from './components/AddMovie';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMovieHandler = useCallback(() =>  {
        setIsLoading(true);
        setError(null);
        //fetch('https://swapi.py4e.com/api/films/').then(response => {
        fetch('http://localhost:3001/').then(response => {
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            return response.json();
            }).catch(error => {
                setError(error.message);
            setIsLoading(false);
            })
            .then(data => {
                const transformedMovies = data.results.map(movieData => {
                    return {
                        id: movieData.episode_id,
                        title: movieData.title,
                        openingText: movieData.opening_crawl,
                        releaseDate: movieData.release_date
                };
            });
            setMovies(transformedMovies);
            setIsLoading(false);
        });
    }, []);

    const addMovieHandler = (movie) => {
        console.log(movie);
    };

    useEffect(() => {
        fetchMovieHandler()
    }, [fetchMovieHandler] );

    return (
        <React.Fragment>
            <section>
                <AddMovie onAddMovie={addMovieHandler} />
            </section>
            <section>
                <button onClick={fetchMovieHandler}>Fetch Movies</button>
            </section>
            <section>
                {!isLoading &&  movies.length > 0 && <MoviesList movies={movies} /> }
                {!isLoading &&  movies.length === 0 && !error && <p>Found no movies. </p>}
                { isLoading && <p>Loading...</p> }
                { !isLoading && error && <p>{error}</p> }
            </section>
        </React.Fragment>
    );
}

export default App;
