import React, { useEffect } from 'react';

import { Alert } from 'react-bootstrap'

export default function AlertComponent({ message, closeMessage, type, hasHeader }) {

    useEffect(() => {
        setTimeout(() => {
            closeMessage(false)
        }, 4000)
    })

    return <Alert className={hasHeader ? "alert-main header-height" :"alert-main"} key={message} variant={type}>
        {message}
    </Alert>
}