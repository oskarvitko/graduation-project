import { Add, Close } from '@mui/icons-material'
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'
import useId from '@mui/material/utils/useId'
import { useGetAllSpecialtiesQuery } from 'api/specialtyApi'
import { useCreateEmployeeMutation } from 'api/userApi'
import AppCircleLoader from 'components/appCircleLoader/appCircleLoader'
import ConfirmDialog from 'components/confirmDialog/ConfirmDialog'
import { createTextInput } from 'pages/auth/TextInput'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ROLES } from '../../constants'

type UserEditMenuProps = {
    createMode: boolean
    employeeType: 'teacher' | 'moderator'
}

const UserEditMenu: React.FC<UserEditMenuProps> = ({
    createMode = true,
    employeeType,
}) => {
    const [open, setOpen] = useState(false)
    const [confirmDialog, setConfirmDialog] = useState(false)
    const { data: specialties, isLoading: specialtiesLoading } =
        useGetAllSpecialtiesQuery('')
    const [createEmployee, { isLoading: employeeLoading }] =
        useCreateEmployeeMutation()
    const selectId = useId()
    const [specialtyId, setSpecialtyId] = useState<string>('')
    const [data, setData] = useState<any>({})

    const loading = employeeLoading || specialtiesLoading

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {},
    })

    useEffect(() => {
        if (specialties) {
            setSpecialtyId(specialties[0].id)
        }
    }, [specialties])

    const TextInput = createTextInput(register, false, errors, 'small')

    const onClose = () => setOpen(false)

    const onSubmit = (data: any) => {
        setData(data)
        setConfirmDialog(true)
    }

    const confirmClose = () => setConfirmDialog(false)

    const saveEmployee = async () => {
        await createEmployee({
            role:
                employeeType === 'moderator' ? ROLES.MODERATOR : ROLES.TEACHER,
            email: data.email,
            password: data.password,
            userName: data.name,
            specialtyId,
        })
        confirmClose()
        setOpen(false)
    }

    return (
        <>
            <Button
                size={'small'}
                startIcon={<Add />}
                sx={addBtnSX}
                variant="outlined"
                onClick={() => setOpen(true)}
            >
                Добавить
            </Button>
            <Dialog
                sx={{
                    '& .MuiDialog-paper': {
                        width: 500,
                        maxHeight: 'none',
                    },
                }}
                open={open}
                onClose={onClose}
            >
                <DialogTitle
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    {createMode ? 'Добавление' : 'Изменение'}{' '}
                    {employeeType === 'moderator'
                        ? 'модератора'
                        : 'преподавателя'}{' '}
                    <IconButton onClick={onClose}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            '& > *': {
                                mt: '15px !important',
                            },
                        }}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <TextInput
                            name="name"
                            label={'ФИО соторудника'}
                            validation={{
                                required: {
                                    value: true,
                                    message: 'Поле должно быть заполнено',
                                },
                            }}
                        />
                        <TextInput
                            name="email"
                            label={'E-mail'}
                            validation={{
                                required: {
                                    value: true,
                                    message: 'Поле должно быть заполнено',
                                },
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message:
                                        'Пожалуйста введите E-mail в формате "user@example.com"',
                                },
                            }}
                        />
                        <TextInput
                            name="password"
                            label={'Пароль'}
                            type={'password'}
                            validation={{
                                required: {
                                    value: true,
                                    message: 'Поле должно быть заполнено',
                                },
                                maxLength: {
                                    value: 40,
                                    message:
                                        'Максимальная длина поля 40 символов',
                                },
                                minLength: {
                                    value: 6,
                                    message:
                                        'Минимальная длина поля 6 символов',
                                },
                            }}
                        />
                        {specialties && (
                            <FormControl size="small" fullWidth>
                                <InputLabel id={selectId}>
                                    Специальность
                                </InputLabel>
                                <Select
                                    labelId={selectId}
                                    value={specialtyId}
                                    label="Специальность"
                                    onChange={(e: SelectChangeEvent) =>
                                        setSpecialtyId(e.target.value)
                                    }
                                >
                                    {specialties.map((item) => (
                                        <MenuItem value={item.id} key={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                        <Divider />
                        <Button
                            sx={{ display: 'block', ml: 'auto' }}
                            variant="outlined"
                            color="success"
                            type="submit"
                        >
                            Создать
                        </Button>
                    </Box>
                </DialogContent>
                <ConfirmDialog
                    open={confirmDialog}
                    text={`Создать ${
                        employeeType === 'moderator'
                            ? 'модератора'
                            : 'преподавателя'
                    } ${data.email}?`}
                    onCancel={confirmClose}
                    onClose={confirmClose}
                    onAccept={saveEmployee}
                />
                {loading && (
                    <AppCircleLoader
                        color={'primary'}
                        invizible={false}
                        size={50}
                    />
                )}
            </Dialog>
        </>
    )
}

export default UserEditMenu

const addBtnSX = {
    width: 250,
}
