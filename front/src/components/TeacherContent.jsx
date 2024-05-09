import React from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../mobx/Store'

import { auth } from '../config/FirebaseConfig'
import AddUser from './AddUser'

export default observer(function TeacherContent() {

    const { appStorage } = useStore();

    return (
        <>
            <div>TeacherContent</div>
            {/* <div>{auth?.currentUser?.email}</div> */}
            <div>{appStorage.currentRole}</div>
            <AddUser />
        </>
    )
})
