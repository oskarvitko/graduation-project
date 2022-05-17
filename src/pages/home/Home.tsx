import {
    Card,
    CardActionArea,
    CardContent,
    Divider,
    Grid,
    Typography,
} from '@mui/material'
import classes from './Home.module.scss'
import homeBg from '../../static/home-bg.jpg'
import { ArrowForward } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'

const Home = () => {
    return (
        <div className={classes.home}>
            <h3 className={classes.title}>
                Электронная библиотека
                <br />
                Минского инновационного университета
            </h3>
            <Grid container alignItems={'center'} spacing={2}>
                <Grid item xs={6}>
                    <p className={classes.description}>
                        Электронная библиотека Минского инновационного
                        университета содержит публикации, распределенные по
                        категориям, представленным далее. Кроме текстов статей,
                        пользователи электронной библиотеки могут ознакомиться с
                        выходными данными изданий, получить автоматически
                        сгенерированные ссылки на публикации.
                    </p>
                    <p className={classes.privacy}>
                        © Все права защищены. Материалы размещены в электронной
                        библиотеке Минского инновационного университета для
                        свободного использования. Допускается использовать,
                        копировать, цитировать материалы исключительно в
                        некоммерческих целях с обязательным указанием автора
                        произведения и гиперссылки на настоящую электронную
                        библиотеку. Все остальные действия будут истолкованы как
                        косвенное, умышленное или любое другое присвоение
                        авторских прав Минского инновационного университета или
                        авторов публикаций. Минский инновационный университет не
                        несет ответственности за достоверность и содержание
                        информации, размещенной в электронной библиотеке
                        авторами. Используя материалы электронной библиотеки,
                        посетитель тем самым подтверждает, что он полностью
                        согласен с настоящими условиями и обязуется их
                        выполнять.
                    </p>
                </Grid>
                <Grid item xs={6}>
                    <img
                        src={homeBg}
                        className={classes.img}
                        alt="Электронная библиотека"
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={3}>
                    <Card>
                        <CardActionArea>
                            <NavLink
                                to="/materials"
                                style={{ display: 'block' }}
                            >
                                <CardContent>
                                    <div className={classes.cardContent}>
                                        <span>Учебные издания</span>
                                        <ArrowForward />
                                    </div>
                                </CardContent>
                            </NavLink>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home
