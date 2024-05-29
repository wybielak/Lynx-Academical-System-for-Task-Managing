import React from 'react'
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite'

import { auth } from '../../config/FirebaseConfig'
import { useStore } from '../../mobx/Store'

export default observer(function TeacherCoursesList() {

    const { appStorage } = useStore();

    return (
        <>
            <h1>Your courses</h1>

            <div>
                {appStorage.myCourses.map(course => (
                    <div key={course.id}>
                        - {course.courseName}
                    </div>
                ))}
                {/* <div>
                    <button type="button" onClick={appStorage.getMyCourses}>TestButton</button>
                </div> */}
            </div>

            [#TODO możliwość wyboru i przeniesienie na stronę kursu (routing?)]
            
        </>
    )
})
