import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useStore } from '../../mobx/Store';
import { auth } from '../../config/FirebaseConfig';
import SingeCourse from './SingeCourse';

export default observer(function StudentMyCourses() {

    const { appStorage } = useStore();

    useEffect(() => {
        appStorage.getCoursesListWithStudent(auth?.currentUser?.uid)
    }, [])

    return (
        <div className='course-join'>
            <h1>Twoje kursy</h1>
            {appStorage.coursesListWithStudent.map((course, index) => (
                    <SingeCourse key={index} courseId={course.id} courseName={course.courseName} ownerId={course.ownerId} button1Display={'none'} button2Display={''} />
                    // <div className='course-join-info' key={index}>
                    //     <div>
                    //         <h3>{course.courseName}</h3>
                    //         <p>{course.ownerId}</p>
                    //     </div>
                    //     <button onClick={() => appStorage.addWaitingStudentToCourse(course.id, auth?.currentUser?.uid)}>Dołącz</button>
                    // </div>
                ))

                }
        </div>
    )
})
