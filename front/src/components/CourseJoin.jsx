import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { auth } from '../config/FirebaseConfig'
import { useStore } from '../mobx/Store'
import AddUser from './AddUser'

export default observer(function CourseJoin() {

    const { appStorage } = useStore();

    useEffect(() => {
        appStorage.getCoursesList()
    }, [])

    return (
        <>
            <div className='course-join'>
                <h1>Dołącz do kursu</h1>
                {appStorage.coursesList.map((course, index) => (
                    <div className='course-join-info' key={index}>
                        <div>
                            <h3>{course.courseName}</h3>
                            <p>{course.ownerName}</p>
                        </div>
                        <button>Dołącz</button>
                    </div>
                ))

                }
            </div>
        </>
    )
})
