import Head from 'next/head';
import Search from '../components/Search';
import List from '../components/List';
import css from './index.css';

const Index = () => (
    <div className={css.root}>
        <Head>
            <title>Media search</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="stylesheet" href="/static/styles.css" />
        </Head>
        <h1 className={css.header}>Media search</h1>
        <Search />
        <List />
    </div>
)

export default Index
