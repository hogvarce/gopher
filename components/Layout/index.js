import Head from 'next/head';
import css from './styles.css';

const Layout = props => (
    <div>
        <Head>
            <title>Media search</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="stylesheet" href="/static/styles.css" />
        </Head>
        <div className={css.root}>
            {props.children}
        </div>
    </div>
)

export default Layout
