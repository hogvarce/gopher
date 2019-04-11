import { PureComponent } from 'react';
import Epg from '../Epg';
import MediaItem from '../MediaItem';

class Item extends PureComponent {
    render() {
        const { item } = this.props;
        switch (item.type) {
            case 'epg': {
                return (
                    <Epg epg={item.epg} />
                );
            }
            case 'media_item': {
                return (
                    <MediaItem mediaItem={item.media_item} />
                );
            }
            default:
                return null;
        }
    }
}

export default Item;
