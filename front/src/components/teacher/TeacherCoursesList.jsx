import React from 'react'
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite'

import { auth } from '../../config/FirebaseConfig'
import { useStore } from '../../mobx/Store'
import TeacherCoursePanel from './TeacherCoursePanel';

export default observer(function TeacherCoursesList() {

    const { appStorage } = useStore();

    return (
        <>
            <h1>Your courses</h1>

            <div>
                {appStorage.myCourses.map(course => (
                    <div key={course.id}>

                        - {course.courseName} <button onClick={() => appStorage.handleSelectedCourseId(course.id)}>Przejdź</button>

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
