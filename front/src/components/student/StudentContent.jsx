import React from 'react'
import { observer } from 'mobx-react-lite'

import { auth } from '../../config/FirebaseConfig'
import { useStore } from '../../mobx/Store'
import StudentUploadPanel from './StudentUploadPanel'
import Header from '../Header'
import CourseJoin from './CourseJoin'
import StudentMyCourses from './StudentMyCourses'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import StudentCoursePanel from './StudentCoursePanel'
import PageNotFound from '../PageNotFound'

const studentRouter = createBrowserRouter([
    {
        path: '/',
        element: <><CourseJoin /><StudentMyCourses /></>,
    },
    {
        path: '/course-details-student',
        element: <StudentCoursePanel />,
    },
    {
        path: '/task-details-student',
        element: <StudentUploadPanel />,
    },
    {
        path: "*",
        element: <PageNotFound />
    }
]);

export default observer(function StudentContent() {


    return (
        <>
            <div className='student-content content'>

                <Header role='Student' userName={auth?.currentUser?.email} />

                <RouterProvider router={studentRouter} />

            </div>
        </>
    )
})
