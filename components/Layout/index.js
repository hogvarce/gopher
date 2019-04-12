import Head from 'next/head';
import Link from '../Link';
import css from './styles.css';

const Layout = props => (
    <div>
        <Head>
            <title>Media search</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <link rel="stylesheet" href="/static/styles.css" />
        </Head>
        <nav className={css.menu}>
            <Link href="/" activeClassName={css.activeLink}><a className={css.link}>Home</a></Link>
            <Link href="/movies" activeClassName={css.activeLink}><a className={css.link}>Movies</a></Link>
        </nav>
        <div className={css.root}>
            {props.children}
        </div>
    </div>
)

export default Layout
