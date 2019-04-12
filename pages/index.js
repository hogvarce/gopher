import Layout from '../components/Layout';
import Search from '../components/Search';
import List from '../components/LIst';
import css from './index.css';

const Index = () => (
    <Layout>
        <h1 className={css.header}>Media search</h1>
        <Search />
        <List />
    </Layout>
)

export default Index
