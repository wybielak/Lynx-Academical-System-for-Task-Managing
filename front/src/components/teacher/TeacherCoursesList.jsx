import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../mobx/Store'
import TeacherCoursePanel from './TeacherCoursePanel';

export default observer(function TeacherCoursesList() {

    const { appStorage } = useStore();

    useEffect(() => {
        appStorage.clearSelectedCourse()
    }, [])

    return (
        <>
            <h1>Your courses</h1>

            <div className='courses-accept'>

                {appStorage.myCourses.map(course => (
                    <div className='courses-accept-info' key={course.id}>

                        <h3>{course.courseName}</h3>
                        <button onClick={() => appStorage.handleSelectedCourse(course.id)}>Przejdź</button>

                        {appStorage.selectedCourseFull && appStorage.selectedCourseFull.id == course.id &&
                            //TODO przenoszenie na stronę kursu
                            <TeacherCoursePanel />
                        }

                    </div>
                ))}

            </div>

        </>
    )
})
