import Layout from '../components/Layout';
import SearchMovies from '../components/SearchMovies';
import MoviesList from '../components/MoviesList';
import css from './index.css';

const Movies = () => (
    <Layout>
        <h1 className={css.header}>Movies search</h1>
        <SearchMovies />
        <MoviesList />
    </Layout>
);

export default Movies;
