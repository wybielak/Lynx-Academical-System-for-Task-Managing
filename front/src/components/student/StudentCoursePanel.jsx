import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../mobx/Store';
import { NavLink, Navigate } from 'react-router-dom';
import IdToNameMaper from '../IdToNameMaper';

export default observer(function StudentCoursePanel() {

    const { appStorage } = useStore();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        appStorage.getCurrentCourseData().then(() => setLoading(false))
        appStorage.getStudentTasks(appStorage.currentCourseId)
    }, [])

    return (
        <>
            {appStorage.currentCourseData == '' && !loading ? <Navigate to={'/'} /> :

                <div>
                    <NavLink to='/' className='back-button'>
                        <button onClick={() => appStorage.setCurrentCourseId('')}>Back</button>
                    </NavLink>

                    <div className='student-content course'>
                        <h1>Podgląd kursu</h1>
                        <h2> {appStorage.currentCourseData.courseName} </h2>
                        <span>Prowadzący: {!loading ? <IdToNameMaper id={appStorage.currentCourseData.ownerId} /> : ''}</span>
                        {/* To sprawdzić czy może być p w p, zrobić przekierowanie jeśli nie ma pobranych danuch */}
                        <h3> Zadania </h3>
                        {appStorage.tasksListCourse.map((task, index) => (
                            <div className='task' key={index}>
                                <div>
                                    <h3>{task.taskName}</h3>
                                    <p>{task.taskDeadline}</p>
                                </div>
                                <p>{task.taskDescription}</p>
                                <NavLink to='/task-details-student'>
                                    <button onClick={() => appStorage.setCurrentTaskId(task.id)}>Przejdź</button>
                                </NavLink>
                            </div>
                        ))}
                    </div>

                </div>
            }
        </>
    )
})
