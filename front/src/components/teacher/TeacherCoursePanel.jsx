import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { NavLink, Navigate, useNavigate } from 'react-router-dom';

import { useStore } from '../../mobx/Store'
import IdToNameMaper from '../IdToNameMaper';
import AddTask from './AddTask';

export default observer(function TeacherCoursePanel() {

    const { appStorage } = useStore();
    const { uploadStorage } = useStore();
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        setLoading(true)

        if (appStorage.selectedCourseFull != '') {
            uploadStorage.getCourseTasks()
                .then(() => setLoading(false))
        }

    }, [])

    let navigate = useNavigate();

    return (
        <>
            {!appStorage.selectedCourseFull ?
                <Navigate to={'/'} />
                :
                loading ?
                    // <div className='loadingScreen'> Wait... </div> // Hmm? //#REVIEW
                    <div> Wait... </div>
                    :
                    <div className='teacher-content course'>

                        <NavLink to='/' className='back-button'>
                            <button onClick={() => appStorage.clearSelectedCourseFull()}>Back</button>
                        </NavLink>

                        <button type="button" onClick={() => {appStorage.deleteCourse(appStorage.selectedCourseFull.id).then(() => {navigate('/', { replace: true })})}}> Delete course </button>

                        <h1>Podgląd kursu</h1>
                        <h2> {appStorage.selectedCourseFull.courseName} </h2>

                        <h3>Zadania</h3>
                        {uploadStorage.courseTasks && uploadStorage.courseTasks.length > 0 &&
                            <div>
                                {uploadStorage.courseTasks.map((task) => (
                                    <div className="student-info" key={task.id}>
                                        {task.taskName}
                                        <NavLink to='/task-details-teacher' >
                                            <button onClick={() => uploadStorage.handleSelectTask(task.id)}>Przejdź</button>
                                        </NavLink>
                                    </div>
                                ))}
                            </div>
                        }

                        <div className="student-info" >
                            Stwórz nowe zadanie
                            <NavLink to='/create-task-teacher' >
                                <button> Przejdź </button>
                            </NavLink>
                        </div>

                        <h3> Oczekujący studenci </h3>
                        {appStorage.selectedCourseFull.waitingStudentsIds && appStorage.selectedCourseFull.waitingStudentsIds.length > 0 &&
                            <div>

                                {appStorage.selectedCourseFull.waitingStudentsIds.map((id) => (
                                    <div className="student-info" key={id}>
                                        <IdToNameMaper id={id} />
                                        <button onClick={() => appStorage.addStudentToCourse(appStorage.selectedCourseFull, id)}>Zatwierdź</button>
                                    </div>
                                ))}

                            </div>
                        }

                        <h3> Dodani studenci </h3>
                        {appStorage.selectedCourseFull.studentsIds && appStorage.selectedCourseFull.studentsIds.length > 0 &&
                            <div>

                                {appStorage.selectedCourseFull.studentsIds.map((id) => (
                                    <div className="student-info" key={id}>
                                        <IdToNameMaper id={id} />
                                    </div>
                                ))}

                            </div>
                        }
                    </div>

            }
        </>
    )
})
