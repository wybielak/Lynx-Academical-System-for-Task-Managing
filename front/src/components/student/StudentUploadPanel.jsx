import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../mobx/Store'
import { NavLink } from 'react-router-dom';
import IdToNameMaper from '../IdToNameMaper';
import { auth } from '../../config/FirebaseConfig';

export default observer(function StudentUploadPanel() {

    const { appStorage, uploadStorage } = useStore();

    useEffect(() => {
        appStorage.getCurrentTaskData()
    }, [])

    return (
        <>
            <div className='upload-panel'>

                <NavLink to='/' className='back-button'>
                    <button onClick={() => appStorage.setCurrentTaskId('')}>Back</button>
                </NavLink>

                <h1>Podgląd zadania</h1>
                <h2>{appStorage.currentTaskData.taskName}</h2>

                <div className='info'>
                    <IdToNameMaper id={appStorage.currentTaskData.ownerId} />
                    <p>Termin do: {appStorage.currentTaskData.taskDeadline}</p>
                </div>

                <p>{appStorage.currentTaskData.taskDescription}</p>

                <div>
                    <input type='file' multiple id="filesUpload" onChange={(e) => uploadStorage.onChangeFile(e)} />
                    <button onClick={() => uploadStorage.submitFiles(appStorage.currentCourseData.courseName, auth?.currentUser.email, appStorage.currentTaskData.taskName)}>Prześlij</button>
                </div>

            </div>
        </>
    )
})
