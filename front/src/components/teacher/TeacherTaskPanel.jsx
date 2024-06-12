import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { NavLink, Navigate } from 'react-router-dom';

import { useStore } from '../../mobx/Store'
import IdToNameMaper from '../IdToNameMaper';

export default observer(function TeacherTaskPanel() {

    const { appStorage } = useStore();
    const { uploadStorage } = useStore();

    return (
        <>
            {!uploadStorage.selectedTaskFull ?
                <Navigate to={'/'} />
                :
                <div className='teacher-content task'>

                    <NavLink to='/course-details-teacher' className='back-button'>
                        <button onClick={() => uploadStorage.clearSelectedTaskFull()}>Back</button>
                    </NavLink>

                    <h2> {uploadStorage.selectedTaskFull.taskName} </h2>

                    <p> Opis: {uploadStorage.selectedTaskFull.taskDescription} </p>

                    Edytuj: <textarea value={uploadStorage.newTaskDescription} cols={50} rows={3} onChange={(e) => uploadStorage.setNewTaskDescription(e.target.value)}></textarea>
                    <button onClick={() => uploadStorage.updateTaskDescription(uploadStorage.selectedTaskFull)}>Zapisz</button>

                    <p> Deadline: {uploadStorage.selectedTaskFull.taskDeadline} </p>

                    <h3> Przesłali: </h3>
                    {uploadStorage.selectedTaskFull.studentsIdsWhoSubmitted.map((studentId) => (
                        <div className='teacher-content task' key={studentId}>
                            <IdToNameMaper id={studentId} />
                            <button onClick={() => uploadStorage.downloadTask(appStorage.selectedCourseFull.courseName, studentId, uploadStorage.selectedTaskFull.taskName)}> Pobierz </button>
                        </div>
                    ))}

                </div>
            }
        </>
    )
})
