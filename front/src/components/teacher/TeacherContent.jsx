import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import { auth } from '../../config/FirebaseConfig'
import { useStore } from '../../mobx/Store'
import AddUser from './AddUser'
import AddCourse from './AddCourse'
import TeacherCoursesList from './TeacherCoursesList'
import TeacherCoursePanel from './TeacherCoursePanel'
import TeacherTaskPanel from './TeacherTaskPanel'
import Header from '../Header'

const teacherRouter = createBrowserRouter([
    {
        path: '/',
        element: <><TeacherCoursesList /> <AddCourse /> <AddUser /></>,
    },
    {
        path: '/course-details-teacher',
        element: <TeacherCoursePanel />,
    },
    {
        path: '/task-details-teacher',
        element: <TeacherTaskPanel />,
    },
]);

export default observer(function TeacherContent() {

    const { appStorage } = useStore();
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        setLoading(true)
        appStorage.getMyCourses().then(() => setLoading(false))

        // możliwe błędy typu race condition
        // https://react.dev/learn/synchronizing-with-effects#fetching-data
        // https://react.dev/learn/you-might-not-need-an-effect#fetching-data
        // może będzie to trza zmienić, ale na razie zostawiam w taki bardziej 'naiwny' sposób
        // //NOTE WORK IN PROGRESS

    }, [])

    return (
        <>
            {loading ?
                // <div className='loadingScreen'> Wait... </div> // Hmm? //#REVIEW
                <div> Wait... </div>
                :
                <div className='teacher-content content'>

                    <Header role='Teacher' userName={auth?.currentUser?.email} />

                    <RouterProvider router={teacherRouter} />

                </div>
            }
        </>
    )
})
