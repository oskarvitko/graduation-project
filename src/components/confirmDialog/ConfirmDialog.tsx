import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogContentText,
    Button,
    DialogActions,
} from '@mui/material'
import useId from '@mui/material/utils/useId'
import React from 'react'

type ConfirmDialogProps = {
    onAccept: () => void
    onCancel: () => void
    title?: string
    text?: string | JSX.Element
    open: boolean
    onClose: () => void
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
    const { onAccept, onCancel, title, text, open, onClose } = props
    const titleId = useId()
    const textId = useId()

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { minWidth: 400 } }}
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {title && <DialogTitle id={titleId}>{title}</DialogTitle>}
            {text && (
                <DialogContent>
                    <DialogContentText id={textId}>{text}</DialogContentText>
                </DialogContent>
            )}
            <DialogActions>
                <Button variant="outlined" color="primary" onClick={onAccept}>
                    Да
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onCancel}
                    autoFocus
                >
                    Нет
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog
