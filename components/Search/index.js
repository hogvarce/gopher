import { PureComponent } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import Router from 'next/router';
import { onSearch, setServer, getServer } from '../../store'
import css from './styles.css';

class Search extends PureComponent {
    state = {
        search: '',
    };

    componentDidMount() {
        const { query: { search } } = this.props.router;
        const { dispatch } = this.props;
        dispatch(getServer());
        if (search) {
            this.setState({
                search: search,
            }, () => {
                dispatch(onSearch({ query: search }));
            });
        }
    }

    onSearch = (e) => {
        const { dispatch } = this.props;
        Router.push({
            pathname: '/',
            query: { search: e.target.value }
        });
        this.setState({
            search: e.target.value,
        }, () => {
            dispatch(onSearch({ query: this.state.search, limit: 20 }));
        });
    };

    changeServer = (e) => {
        const { dispatch } = this.props;
        dispatch(setServer({ server: e.target.value }));
    };

    render() {
        const { server } = this.props;
        const { search } = this.state;
        return (
            <div className={css.search}>
                <div>
                    <label className={css.label}>server</label>
                    <input className={css.server} value={server} onChange={this.changeServer} />
                </div>
                <div>
                    <label className={css.label}>search</label>
                    <input className={css.input} value={search} onChange={this.onSearch} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { server } = state;
    return {
        server,
    };
};

export default connect(mapStateToProps)(withRouter(Search))
