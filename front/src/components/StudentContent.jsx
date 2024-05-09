import React from 'react'
import { observer } from 'mobx-react-lite'

import { auth } from '../config/FirebaseConfig'
import { useStore } from '../mobx/Store'

export default observer(function StudentContent() {

    const { appStorage } = useStore();

    return (
        <>
            <div>Jesteś zalogowany jako: {auth?.currentUser?.email}</div>
            <div>[StudentContent]</div>
        </>
    )
})
