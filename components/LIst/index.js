import { PureComponent } from 'react';
import { Waypoint } from 'react-waypoint';
import { connect } from 'react-redux'
import { withRouter } from 'next/router';
import { onSearch } from '../../store';
import Item from './Item';
import css from './styles.css';

function getId(item) {
    if (item.epg) {
        return item.epg.id;
    }
    return item.media_item.id;
}

class List extends PureComponent {
    state = {
        limit: 20,
    };

    loadMoreContent = () => {
        const { query: { search } } = this.props.router;
        const { dispatch, total_count } = this.props;
        if (this.state.limit < total_count)
            dispatch(onSearch({ query: search, limit: this.state.limit }))
        this.setState({
            limit: this.state.limit + 20,
        });
    };

    render() {
        const {items, total_count} = this.props;
        return (
            <div>
                <span className={css.findCount}>Найдено: {total_count}</span>
                <div className={css.container}>
                    <div className={css.inner}>
                        <div className={css.list}>
                            {items.map(item => (
                                <Item key={getId(item)} item={item}/>
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
    const { items, total_count } = state;
    return {
        items,
        total_count,
    };
};

export default connect(mapStateToProps)(withRouter(List))
