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
    }, [])

    return (
        <>
            <div className='teacher-content course'>

                {/* <Header role='Teacher' userName={auth?.currentUser?.email} /> */}

                <h2> {appStorage.selectedCourseFull.courseName} </h2>
                <h3> Zadania: </h3>
                {uploadStorage.courseTasks && uploadStorage.courseTasks.length > 0 &&
                    <div>

                        {uploadStorage.courseTasks.map((task) => (
                            <div key={task.id}>

                                {task.taskName}

                                <button onClick={() => uploadStorage.handleSelectedTask(task.id)}>Przejdź</button>

                                {uploadStorage.selectedTaskFull && uploadStorage.selectedTaskFull.id == task.id &&
                                    //TODO przenoszenie na stronę zadania
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
                            <div key={id}>

                                {/* {console.log("byId:", appStorage.getStudentById(id))} */}
                                {/* * {id} */}
                                {appStorage.myStudentsWithData.map((student) => {
                                    if (student.userId == id) { // mapowanie id na nazwe studenta
                                        // console.log("returning", student.name)
                                        return student.name
                                    }
                                })}

                                <button onClick={() => appStorage.addStudentToCourse(appStorage.selectedCourseFull, id)}>Zatwierdź</button>

                            </div>
                        ))}

                    </div>
                }

                <h3> Dodani studenci </h3>
                {appStorage.selectedCourseFull.studentsIds && appStorage.selectedCourseFull.studentsIds.length > 0 &&
                    <div>

                        {appStorage.selectedCourseFull.studentsIds.map((id) => (
                            <div key={id}>

                                {/* * {id} */}
                                {appStorage.myStudentsWithData.map((student) => {
                                    if (student.userId == id) {
                                        // console.log("returning", student.name)
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
