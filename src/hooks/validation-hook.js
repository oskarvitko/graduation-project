import { useEffect, useState } from "react"

export const useValidation = (recievedForm) => {
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({})

    useEffect(() => {
        setForm(recievedForm)
    }, [recievedForm])

    const setError = (fieldName, result, message, isValid) => {
        if (result === false) return rule(fieldName, false)

        if (isValid) {
            setErrors(prev => ({ ...prev, [fieldName]: null }))
            return rule(fieldName, true)
        } else {
            setErrors(prev => ({ ...prev, [fieldName]: message }))
            return rule(fieldName, false)
        }
    }

    const rule = (fieldName, result = null) => {
        const field = form[fieldName]
        const isValid = setError.bind(null, fieldName, result)

        return {
            result,
            isRequired: (message) => isValid.call(null, message, isRequired(field)),
            isEqual: (value, message) => isValid.call(null, message, isEqual(field, value)),
            isEmail: (message) => isValid.call(null, message, isEmail(field)),
            minLength: (value, message) => isValid.call(null, message, minLength(field, value)),
            maxLength: (value, message) => isValid.call(null, message, maxLength(field, value)),
        }
    }

    const validate = rules =>
        rules.reduce((result, value) => {
            if (!result) return false
            if (!value) result = false
            return result
        }, true)

    return [errors, validate, rule]
}

const isRequired = field => !!field

const isEqual = (field, value) => field === value

const isEmail = field => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(field).toLowerCase())
}

const maxLength = (field, value) => String(field).length <= Number(value)

const minLength = (field, value) => String(field).length >= Number(value)