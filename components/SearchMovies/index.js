import { PureComponent } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import Router from 'next/router';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { onSearchMovies, setServer, getServer } from '../../store'
import css from './styles.css';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
    noLabel: {
        marginTop: theme.spacing.unit * 3,
    },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const genresNames = ["Стартапы","Продажи","Советские","Семейные","Боевики","Индийские","Комедии","Военные","Финансы","Красота","Маркетинг","Мультсериалы","Спортивные","Профессиональные навыки","Концерты","Приключения","Криминал","Фантастика","Творчество","Мелодрамы","Документальные","Мультфильмы","Триллеры","Ужасы","Менеджмент","Детские фильмы","ТВ-шоу","Драмы","Фэнтези","Интернет-маркетинг","Личная эффективность","Карьера","Аниме","Исторические","Детективы","Бизнес"];

function getStyles(name, that) {
    return {
        fontWeight:
            that.state.genres.indexOf(name) === -1
                ? that.props.theme.typography.fontWeightRegular
                : that.props.theme.typography.fontWeightMedium,
    };
}

class Search extends PureComponent {
    state = {
        genres: [],
    };

    componentDidMount() {
        const { dispatch, router: { query: genres } } = this.props;
        const queryGeres = genres.genres ? genres.genres.split(',') : [];
        this.setState({
            genres: queryGeres,
        });
        dispatch(getServer());
        dispatch(onSearchMovies({ genres: queryGeres }));
    }

    changeServer = (e) => {
        const { dispatch } = this.props;
        dispatch(setServer({ server: e.target.value }));
    };

    changeGenres = (e) => {
        this.setState({
            genres: e.target.value
        }, () => {
            const { dispatch, router: { pathname } } = this.props;
            Router.push({
                pathname,
                query: { genres: this.state.genres.join(',') }
            });
            dispatch(onSearchMovies({ genres: this.state.genres }));
        });
    };

    render() {
        const { server, classes } = this.props;
        const { genres } = this.state;
        return (
            <div className={css.search}>
                <div>
                    <label className={css.label}>server</label>
                    <input className={css.server} value={server} onChange={this.changeServer} />
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select-multiple">Genres</InputLabel>
                        <Select
                            classes={{
                                root: css.root,
                            }}
                            multiple
                            value={genres}
                            onChange={this.changeGenres}
                            input={<Input id="select-multiple" />}
                            MenuProps={MenuProps}
                        >
                            {genresNames.map(name => (
                                <MenuItem key={name} value={name} style={getStyles(name, this)}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { url } = state.server;
    return {
        server: url,
    };
};

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(withRouter(Search)));
