import { PureComponent } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { onSearch } from '../../store'
import css from './styles.css';

class Search extends PureComponent {
    state = {
        search: '',
    };

    componentDidMount() {
        const { query: { search } } = this.props.router;
        if (search) {
            const { dispatch } = this.props;
            this.setState({
                search: search,
            }, () => {
                dispatch(onSearch(search));
            });
        }
    }

    onSearch = (e) => {
        const { dispatch } = this.props;
        this.setState({
            search: e.target.value,
        }, () => {
            dispatch(onSearch(this.state.search));
        });
    };

    render() {
        const { search } = this.state;
        return (
            <div className={css.search}>
                <input className={css.input} value={search} onChange={this.onSearch} />
            </div>
        );
    }
}


export default connect()(withRouter(Search))
