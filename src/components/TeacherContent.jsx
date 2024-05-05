import React from 'react'

import { auth } from '../config/FirebaseConfig'
import AddUser from './AddUser'

export default function TeacherContent() {
    return (
        <>
            <div>TeacherContent</div>
            <div>{auth?.currentUser?.email}</div>
            <AddUser />
        </>
    )
}
