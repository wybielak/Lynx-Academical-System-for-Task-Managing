import React from 'react'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom';

import { useStore } from '../../mobx/Store'
import Header from '../Header'
import DownloadTask from './DownloadTask'

export default observer(function TeacherTaskPanel() {

    const { appStorage } = useStore();
    const { uploadStorage } = useStore();

    useEffect(() => {
        //
    }, [])

    return (
        <>
            <div className='teacher-content task'>

                <NavLink to='/course-details-teacher' className='back-button'>
                    <button onClick={() => uploadStorage.clearSelectedTaskFull()}>Back</button>
                </NavLink>

                <h2> {uploadStorage.selectedTaskFull.taskName} </h2>
                
                <p> Opis: {uploadStorage.selectedTaskFull.taskDescription} </p>
                Edytuj: <textarea value={uploadStorage.newDescription} cols={60} rows={5} onChange={(e) => uploadStorage.setNewDescription(e.target.value)}></textarea>
                <button onClick={() => uploadStorage.updateTaskDescription(uploadStorage.selectedTaskFull.id)}>Zapisz</button>

                
                <p> Deadline: {uploadStorage.selectedTaskFull.taskDeadline} </p>

                <h3> Przesłali: </h3>
                {uploadStorage.selectedTaskFull.studentsIdsWhoSubmitted.map((studentId) => (
                    <div key={studentId}>
                        <DownloadTask studentId={studentId} />
                    </div>
                ))}


            </div>
        </>
    )
})
