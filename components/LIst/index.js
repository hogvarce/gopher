import { connect } from 'react-redux'
import Item from './Item';
import css from './styles.css';

function getId(item) {
    if (item.epg) {
        return item.epg.id;
    }
    return item.media_item.id;
}

const List = ({ items, total_count }) => (
    <div>
        <span className={css.findCount}>Найдено: {total_count}</span>
        <div className={css.container}>
            <div className={css.inner}>
                <ul className={css.list}>
                    {items.map(item => (
                        <Item key={getId(item)} item={item} />
                    ))}
                </ul>
            </div>
        </div>
    </div>
);

const mapStateToProps = (state) => {
    const { items, total_count } = state;
    return {
        items,
        total_count,
    };
};

export default connect(mapStateToProps)(List)
