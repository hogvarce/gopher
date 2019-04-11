import { PureComponent } from 'react';
import Tippy from '@tippy.js/react'
import css from './styles.css';

class Epg extends PureComponent {
    render() {
        const { epg } = this.props;
        return (
            <div key={epg.id}>
                <div className={css.imageBox}>
                    <Tippy
                        arrow={true}
                        animation="scale"
                        duration={0}
                        delay={[300, 0]}
                        content={this.renderTip()}>
                        <img src={`https://mos-itv01.svc.iptv.rt.ru${epg.logo}?height=377&keep_ratio=true&width=264&progressive=true`} alt={epg.name} />
                    </Tippy>
                </div>
                <div className={css.textBox}>
                    <h4 className={css.title}>{epg.name}</h4>
                </div>
            </div>
        );
    }
    renderTip = () => {
        const { epg: { description, genre } } = this.props;
        return (
            <div>
                <h4>Жанр: {genre}</h4>
                <div>{description}</div>
            </div>
        );
    };
}

export default Epg;
