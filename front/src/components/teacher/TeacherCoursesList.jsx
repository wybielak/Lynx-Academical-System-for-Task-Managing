import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom';

import { useStore } from '../../mobx/Store'

export default observer(function TeacherCoursesList() {

    const { appStorage } = useStore();

    useEffect(() => {

        appStorage.clearSelectedCourseFull()
        appStorage.getMyCourses()

    }, [])

    return (
        <>
            <h1>Twoje kursy</h1>

            <div className='courses-accept'>

                {appStorage.myCourses.map(course => (
                    <div className='courses-accept-info' key={course.id}>

                        <h3>{course.courseName}</h3>

                        <NavLink to='/course-details-teacher' >
                            <button onClick={() => appStorage.handleSelectCourse(course.id)}>Przejdź</button>
                        </NavLink>

                    </div>
                ))}

            </div>

        </>
    )
})
