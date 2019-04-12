import { PureComponent } from 'react';
import Tippy from '@tippy.js/react';
import css from './Item.css';

class MediaItem extends PureComponent {
    render() {
        const { mediaItem } = this.props;
        return (
            <div key={mediaItem.id}>
                <div className={css.imageBox}>
                    <Tippy
                        arrow={true}
                        animation="scale"
                        duration={0}
                        delay={[300, 0]}
                        content={this.renderTip()}>
                        <img src={`https://mos-itv01.svc.iptv.rt.ru${mediaItem.logo}?height=377&keep_ratio=true&width=264&progressive=true`} alt={mediaItem.name} />
                    </Tippy>
                </div>
                <div className={css.textBox}>
                    <h4 className={css.title}>{mediaItem.name}</h4>
                </div>
            </div>
        );
    }

    renderTip = () => {
        const { mediaItem: { description, genres, countries, persons, year } } = this.props;
        const genresString = genres ? genres.join(', ') : null;
        const countriesString = countries ? countries.join(', ') : null;
        return (
            <div>
                <h4>Жанр: {genresString}</h4>
                <div>Год производства: {year}</div>
                <div>Страна производства: {countriesString}</div>
                <div>{persons.map(person => (
                    <div>{person.type} - {person.name}</div>
                ))}</div>
                <div>{description}</div>
            </div>
        );
    };
}

export default MediaItem;
