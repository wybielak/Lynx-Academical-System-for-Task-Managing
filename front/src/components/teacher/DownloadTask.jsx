import React from 'react'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../mobx/Store'
import Header from '../Header'

export default observer(function DownloadTask({ studentId }) {

    const { appStorage } = useStore();
    const { uploadStorage } = useStore();


    return (
        <>
            <div className='teacher-content task'>

                {/* <Header role='Teacher' userName={auth?.currentUser?.email} /> */}

                {appStorage.myStudentsWithData.map((student) => {
                    if (student.userId == studentId) {
                        return (
                            <div key={studentId}>
                                {student.name}
                                <button onClick={() => uploadStorage.downloadTask(appStorage.selectedCourseFull.courseName, student.name, uploadStorage.selectedTaskFull.taskName)}> Pobierz </button>
                            </div>
                        )
                    }
                })}


            </div>
        </>
    )
})
