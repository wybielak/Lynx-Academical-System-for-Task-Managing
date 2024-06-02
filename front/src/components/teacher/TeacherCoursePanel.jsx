import React from 'react'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../mobx/Store'
import Header from '../Header';
import TeacherTaskPanel from './TeacherTaskPanel';

export default observer(function TeacherCoursePanel() {

    const { appStorage } = useStore();
    const { uploadStorage } = useStore();

    useEffect(() => {
        appStorage.loadAllStudentsDataInCourse()
        uploadStorage.getCourseTasks()
        uploadStorage.clearSelectedTaskFull()
    }, [])

    return (
        <>
            <div className='teacher-content course'>

                {/* <Header role='Teacher' userName={auth?.currentUser?.email} /> */}

                <h1>Podgląd kursu</h1>
                <h2> {appStorage.selectedCourseFull.courseName} </h2>
                <h3> Zadania </h3>
                {uploadStorage.courseTasks && uploadStorage.courseTasks.length > 0 &&
                    <div>

                        {uploadStorage.courseTasks.map((task) => (
                            <div className="student-info" key={task.id}>

                                {task.taskName}

                                <button onClick={() => uploadStorage.handleSelectedTask(task.id)}>Przejdź</button>

                                {uploadStorage.selectedTaskFull && uploadStorage.selectedTaskFull.id == task.id &&
                                    //TODO przenoszenie na osobną stronę zadania
                                    <TeacherTaskPanel />
                                }

                            </div>
                        ))}

                    </div>
                }

                <h3> Oczekujący studenci </h3>
                {appStorage.selectedCourseFull.waitingStudentsIds && appStorage.selectedCourseFull.waitingStudentsIds.length > 0 &&
                    <div>

                        {appStorage.selectedCourseFull.waitingStudentsIds.map((id) => (
                            <div className="student-info" key={id}>

                                <p>
                                    {appStorage.myStudentsWithData.map((student) => {
                                        if (student.userId == id) { // mapowanie id na nazwe studenta
                                            return student.name
                                        }
                                    })}
                                </p>
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

                                {appStorage.myStudentsWithData.map((student) => {
                                    if (student.userId == id) { // mapowanie id na nazwe studenta
                                        return student.name
                                    }
                                })}

                            </div>
                        ))}

                    </div>
                }

            </div>
        </>
    )
})
