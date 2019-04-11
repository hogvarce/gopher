import css from './styles.css';

const Index = ({ epg }) => (
    <li key={epg.id}>
        <div className={css.imageBox}><img src={`https://mos-itv01.svc.iptv.rt.ru${epg.logo}?height=377&keep_ratio=true&width=264&progressive=true`} alt={epg.name} /></div>
        <div>
            <h4 className={css.title}>{epg.name}</h4>
        </div>
    </li>
);

export default Index;
