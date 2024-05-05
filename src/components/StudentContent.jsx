import React from 'react'

import { auth } from '../config/FirebaseConfig'

export default function StudentContent() {
    return (
        <>
            <div>StudentContent</div>
            <div>{auth?.currentUser?.email}</div>
        </>
    )
}
