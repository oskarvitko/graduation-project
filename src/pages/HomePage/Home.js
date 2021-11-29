import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppBackdrop from '../../components/AppBackdrop/AppBackdrop'
import { auth } from '../../redux/actions/auth-actions'

const Home = () => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.auth)

    const [student, setStudent] = useState(null)

    const fetchData = useCallback(async () => {
        const data = await dispatch(auth())
        setStudent(data)
    }, [dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    if (isLoading) return <AppBackdrop open />

    return (
        <div>
            {student && student.name}
        </div>
    )
}

export default Home