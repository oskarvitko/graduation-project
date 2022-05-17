import { ArrowForward, MenuBook, Star } from '@mui/icons-material'
import { Card, CardActionArea, CardContent, Grid } from '@mui/material'
import PrivateBlock from 'components/privateBlock/PrivateBlock'
import { NavLink } from 'react-router-dom'
import classes from './Home.module.scss'

type Link = {
    to: string
    isPrivate: boolean
    text: string
    icon?: JSX.Element
}

const links: Link[] = [
    {
        to: '/materials',
        isPrivate: true,
        text: 'Учебные издания',
        icon: <MenuBook color="primary" />,
    },
    {
        to: '/bookmarks',
        isPrivate: true,
        text: 'Избранное',
        icon: <Star color="primary" />,
    },
]

const LinksList: React.FC = () => {
    return (
        <Grid container spacing={2} sx={{ mt: 'auto' }}>
            {links.map((link) =>
                link.isPrivate ? (
                    <PrivateBlock key={link.to}>
                        <Grid item xs={3}>
                            <Card
                                sx={{
                                    boxShadow:
                                        '0px 0px 2px 1px var(--color-primary);',
                                }}
                            >
                                <CardActionArea>
                                    <NavLink
                                        to={link.to}
                                        style={{ display: 'block' }}
                                    >
                                        <CardContent
                                            sx={{ py: '16px !important' }}
                                        >
                                            <div
                                                className={classes.cardContent}
                                            >
                                                {link.icon && link.icon}
                                                <span>{link.text}</span>
                                                <ArrowForward />
                                            </div>
                                        </CardContent>
                                    </NavLink>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </PrivateBlock>
                ) : (
                    <Grid item xs={3} key={link.to}>
                        <Card
                            sx={{
                                boxShadow:
                                    '0px 0px 2px 1px var(--color-primary);',
                            }}
                        >
                            <CardActionArea>
                                <NavLink
                                    to={link.to}
                                    style={{ display: 'block' }}
                                >
                                    <CardContent sx={{ py: '16px !important' }}>
                                        <div className={classes.cardContent}>
                                            {link.icon && link.icon}
                                            <span>{link.text}</span>
                                            <ArrowForward />
                                        </div>
                                    </CardContent>
                                </NavLink>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )
            )}
        </Grid>
    )
}

export default LinksList
