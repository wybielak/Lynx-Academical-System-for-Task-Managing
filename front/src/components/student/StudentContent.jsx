import React from 'react'
import { observer } from 'mobx-react-lite'

import { auth } from '../../config/FirebaseConfig'
import { useStore } from '../../mobx/Store'
import StudentUploadPanel from './StudentUploadPanel'
import Header from '../Header'
import CourseJoin from './CourseJoin'
import StudentMyCourses from './StudentMyCourses'

export default observer(function StudentContent() {

    const { appStorage } = useStore();

    return (
        <>
            <div className='student-content content'>

                <Header role='Student' userName={auth?.currentUser?.email} />

                <CourseJoin />

                <StudentMyCourses />
                
                <StudentUploadPanel />

            </div>
        </>
    )
})
