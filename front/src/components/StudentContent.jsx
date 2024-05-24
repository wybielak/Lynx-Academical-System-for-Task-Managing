import React from 'react'
import { observer } from 'mobx-react-lite'

import { auth } from '../config/FirebaseConfig'
import { useStore } from '../mobx/Store'
import StudentUploadPanel from './StudentUploadPanel'
import CourseJoin from './CourseJoin'
import LogOutButton from './LogOutButton'
import Header from './Header'

export default observer(function StudentContent() {

    const { appStorage } = useStore();

    return (
        <>
            <div className='student-content content'>
                <Header role='Student' userName={auth?.currentUser?.email} />
                <div>Jesteś zalogowany jako: {auth?.currentUser?.email}</div>
                <CourseJoin />
                <div>Kurs [X]</div>
                <br></br>
                <div>Zadanie [Y]</div>
                <br></br>
                <div><StudentUploadPanel /></div>

                <LogOutButton />
            </div>
        </>
    )
})
