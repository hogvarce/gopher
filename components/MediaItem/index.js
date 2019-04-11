import css from './styles.css';

const Index = ({ mediaItem }) => (
    <li key={mediaItem.id}>
        <div className={css.imageBox}><img src={`https://mos-itv01.svc.iptv.rt.ru${mediaItem.logo}?height=377&keep_ratio=true&width=264&progressive=true`} alt={mediaItem.name} /></div>
        <div>
            <h4 className={css.title}>{mediaItem.name}</h4>
        </div>
    </li>
);

export default Index;
