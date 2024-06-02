import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { auth } from '../../config/FirebaseConfig'
import { useStore } from '../../mobx/Store'
import SingeCourse from './SingeCourse'

export default observer(function CourseJoin() {

    const { appStorage } = useStore();

    useEffect(() => {
        appStorage.getCoursesListWithoutStudent(auth?.currentUser?.uid)
        appStorage.getCoursesListWithWaitingStudent(auth?.currentUser?.uid)
    }, [])

    return (
        <>
            <div className='course-join'>
                <h1>Dołącz do kursu</h1>
                {appStorage.coursesListWithoutStudent.map((course, index) => (
                    <SingeCourse key={index} courseId={course.id} courseName={course.courseName} ownerId={course.ownerId} button1Display={''} button2Display={'none'} />
                    // <div className='course-join-info' key={index}>
                    //     <div>
                    //         <h3>{course.courseName}</h3>
                    //         <p>{course.ownerId}</p>
                    //     </div>
                    //     <button onClick={() => appStorage.addWaitingStudentToCourse(course.id, auth?.currentUser?.uid)}>Dołącz</button>
                    // </div>
                ))

                }

                <h1>Oczekujesz na dołączenie</h1>
                {appStorage.coursesListWithWaitingStudent.map((course, index) => (
                    <SingeCourse key={index} courseId={course.id} courseName={course.courseName} ownerId={course.ownerId} button1Display={'none'} button2Display={'none'} />
                    // <div className='course-join-info' key={index}>
                    //     <div>
                    //         <h3>{course.courseName}</h3>
                    //         <p>{course.ownerId}</p>
                    //     </div>
                    // </div>
                ))

                }
            </div>
        </>
    )
})
