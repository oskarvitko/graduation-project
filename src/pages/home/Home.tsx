import { Button } from '@mui/material'
import { ROLES } from '../../constants'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import UserService from 'services/userService'
import classes from './Home.module.scss'
import { userSlice } from 'store/reducers/userReducer'

const Home = () => {
    const dispatch = useDispatch()

    return <>Главная</>
}

export default Home
