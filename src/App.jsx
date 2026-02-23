import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import MovieCard from './components/MovieCard'
import './index.css'

function App() {
  const [searchTerm, setSearchTerm] = useState(''); 
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      // Use a default search term if searchTerm is empty
      const query = searchTerm.trim() === '' ? 'movie' : searchTerm;

      setIsLoading(true);
      setErrorMessage('');

      try {
        // Fetch first page to get total results
        const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`);
        const data = await response.json();
        
        if (data.Response === 'True') {
          let allMovies = [...data.Search];
          const totalResults = parseInt(data.totalResults);
          const totalPages = Math.min(Math.ceil(totalResults / 10), 2); // Fetch up to 2 pages (20 movies)
          
          // Fetch additional pages if available
          const pagePromises = [];
          for (let page = 2; page <= totalPages; page++) {
            pagePromises.push(
              fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&page=${page}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`)
                .then(res => res.json())
                .then(pageData => pageData.Response === 'True' ? pageData.Search : [])
            );
          }
          
          const additionalResults = await Promise.all(pagePromises);
          allMovies = allMovies.concat(...additionalResults);
          
          // Sort movies alphabetically by title and limit to 20
          const sortedMovies = allMovies
            .sort((a, b) => a.Title.localeCompare(b.Title))
            .slice(0, 20);
          setMovies(sortedMovies);
          console.log(`Movies found: ${sortedMovies.length} out of ${totalResults} total`);
        } else {
          console.log('API Error:', data.Error);
          setMovies([]);
          setErrorMessage(data.Error || 'No movies found');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setErrorMessage('Failed to fetch movies. Please try again.');
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovies();
  }, [searchTerm]);

  return (
    <>
      <main>
        <div className="pattern" />
        <div className="wrapper">
          <header>
            <img src="/src/assets/hero.png" alt="Hero Banner" />
            <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy without the Hassle</h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          <section className="all-movies">
            <h2>All Movies</h2>
            {isLoading ? (
              <p className="text-white">Loading movies...</p>
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {movies.map(movie => (
                  <MovieCard key={movie.imdbID} movie={movie} />
                ))}
              </ul> 
            )}  


            <div className="trending-movies">
              {/* Movie cards will go here */}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default App
