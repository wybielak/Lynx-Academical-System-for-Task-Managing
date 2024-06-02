import React from 'react'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { auth } from '../../config/FirebaseConfig'
import { useStore } from '../../mobx/Store'
import AddUser from './AddUser'
import AddCourse from './AddCourse'
import TeacherCoursesList from './TeacherCoursesList'
import Header from '../Header'
import TeacherCoursePanel from './TeacherCoursePanel'

export default observer(function TeacherContent() {

    const { appStorage } = useStore();

    useEffect(() => {
        appStorage.getMyCourses()
        // możliwe błędy typu race condition
        // https://react.dev/learn/synchronizing-with-effects#fetching-data
        // https://react.dev/learn/you-might-not-need-an-effect#fetching-data
        // może będzie to trza zmienić, ale na razie zostawiam w taki bardziej 'naiwny' sposób
    }, [])

    return (
        <>
            <div className='teacher-content content'>

                <Header role='Teacher' userName={auth?.currentUser?.email} />

                <TeacherCoursesList />

                {appStorage.selectedCourseFull && appStorage.selectedCourseFull.id &&
                    //TODO przenoszenie na stronę kursu
                    <TeacherCoursePanel />
                }

                <AddCourse />

                <AddUser />

            </div>
        </>
    )
})
