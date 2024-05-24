import React from 'react'
import { observer } from 'mobx-react-lite'

import { auth } from '../config/FirebaseConfig'
import { useStore } from '../mobx/Store'
import AddUser from './AddUser'
import LogOutButton from './LogOutButton'
import Header from './Header'

export default observer(function TeacherContent() {

    const { appStorage } = useStore();

    return (
        <>
            <div className='teacher-content content'>

                <Header role='Teacher' userName={auth?.currentUser?.email} />
                <AddUser />
            </div>
        </>
    )
})
