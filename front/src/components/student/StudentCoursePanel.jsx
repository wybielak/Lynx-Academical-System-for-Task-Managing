import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../mobx/Store';
import { NavLink } from 'react-router-dom';
import IdToNameMaper from '../IdToNameMaper';

export default observer(function StudentCoursePanel() {

    const { appStorage } = useStore();

    useEffect(() => {
        appStorage.getCurrentCourseData()
        appStorage.getStudentTasks(appStorage.currentCourseId)
    }, [])

    return (
        <>
            <div>
                <NavLink to='/' className='back-button'>
                    <button onClick={() => appStorage.setCurrentCourseId('')}>Back</button>
                </NavLink>

                <div className='student-content course'>
                    <h1>Podgląd kursu</h1>
                    <h2> {appStorage.currentCourseData.courseName} </h2>
                    <p>Prowadzący: <IdToNameMaper id={appStorage.currentCourseData.ownerId} /></p>
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
        </>
    )
})
