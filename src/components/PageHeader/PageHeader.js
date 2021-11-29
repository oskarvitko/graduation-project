import { makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../redux/actions/auth-actions'
import Header from '../Header/Header'

const PageHeader = (props) => {
    const classes = makeStyles(styles)()
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        const username = localStorage.getItem('username')
        username && dispatch(setUser({ name: username }))
    }, [dispatch])

    return (
        <div>
            <Header />
            <div className={classes.headerOffset} />
            <main className={classes.content}>{props.children}</main>
        </div>
    )
}

export default PageHeader

const styles = theme => ({
    content: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    headerOffset: {
        ...theme.mixins.toolbar
    }
})