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
            <div>
                <h1>Dołącz do kursu</h1>
                {appStorage.coursesList.map((course, index) => (
                    <div key={index}>
                        <h2>{course.courseName}</h2>
                        <button disabled={true} >Dołącz</button>
                    </div>
                ))

                }
            </div>
        </>
    )
})
