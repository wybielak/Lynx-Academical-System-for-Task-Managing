import React from 'react'
import { observer } from 'mobx-react-lite'

import { auth } from '../config/FirebaseConfig'
import { useStore } from '../mobx/Store'
import AddUser from './AddUser'

export default observer(function TeacherContent() {

    const { appStorage } = useStore();

    return (
        <>
            <div>Jesteś zalogowany jako: {auth?.currentUser?.email}</div>
            <div>[TeacherContent]</div>
            <AddUser />
        </>
    )
})
