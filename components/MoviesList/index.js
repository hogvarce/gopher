import { PureComponent } from 'react';
import { Waypoint } from 'react-waypoint';
import { connect } from 'react-redux'
import { withRouter } from 'next/router';
import { onSearchMovies } from '../../store';
import Item from './Item';
import css from './styles.css';

class List extends PureComponent {

    loadMoreContent = () => {
        const { query: { search } } = this.props.router;
        const { dispatch, total_items, limit } = this.props;
        if (limit < total_items) {
            dispatch(onSearchMovies({query: search, limit: limit + 20 }));
        }
    };

    render() {
        const {items, total_items} = this.props;
        return (
            <div>
                <span className={css.findCount}>Найдено: {total_items}</span>
                <div className={css.container}>
                    <div className={css.inner}>
                        <div className={css.list}>
                            {items.map(item => (
                                <Item key={item.id} mediaItem={item}/>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="infinite-scroll-example__waypoint">
                    <Waypoint
                        onEnter={this.loadMoreContent}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { items, total_items, limit } = state.movies;
    return {
        items,
        total_items,
        limit,
    };
};

export default connect(mapStateToProps)(withRouter(List))
