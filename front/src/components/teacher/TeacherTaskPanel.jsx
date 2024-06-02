import React from 'react'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../mobx/Store'
import Header from '../Header'

export default observer(function TeacherTaskPanel() {

    const { appStorage } = useStore();
    const { uploadStorage } = useStore();

    return (
        <>
            <div className='teacher-content task'>

                {/* <Header role='Teacher' userName={auth?.currentUser?.email} /> */}

                <h2> {uploadStorage.selectedTaskFull.taskName} </h2>
                <p> {uploadStorage.selectedTaskFull.taskDescription} </p>

                <h3> Przesłali: </h3>
                {uploadStorage.selectedTaskFull.studentsIdsWhoSubmitted.map((studentId) => (
                    <div key={studentId}>
                        {appStorage.myStudentsWithData.map((student) => {
                            if (student.userId == studentId) {
                                return student.name
                            }
                        })}
                    </div>
                ))}


            </div>
        </>
    )
})
