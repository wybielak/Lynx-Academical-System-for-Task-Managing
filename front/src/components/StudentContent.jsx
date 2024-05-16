import React from 'react'
import { observer } from 'mobx-react-lite'

import { auth } from '../config/FirebaseConfig'
import { useStore } from '../mobx/Store'
import StudentUploadPanel from './StudentUploadPanel'

export default observer(function StudentContent() {

    const { appStorage } = useStore();

    return (
        <>
            <div className='content'>
                <div>Jesteś zalogowany jako: {auth?.currentUser?.email}</div>
                <div>Kurs [X]</div>
                <br></br>
                <div>Zadanie [Y]</div>
                <br></br>
                <div><StudentUploadPanel /></div>
            </div>
        </>
    )
})
