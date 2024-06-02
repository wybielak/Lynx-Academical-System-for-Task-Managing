import React from 'react'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { auth } from '../../config/FirebaseConfig'
import { useStore } from '../../mobx/Store'
import AddUser from './AddUser'
import AddCourse from './AddCourse'
import TeacherCoursesList from './TeacherCoursesList'
import Header from '../Header'

export default observer(function TeacherCoursePanel() {

    const { appStorage } = useStore();
    useEffect(() => {
        appStorage.loadAllStudentsDataInCourse()
    }, [])

    return (
        <>
            <div className='teacher-content course'>

                {/* <Header role='Teacher' userName={auth?.currentUser?.email} /> */}

                <h1>Podgląd kursu</h1>
                <h2> {appStorage.selectedCourseFull.courseName} </h2>
                <h3> Zadania </h3>

                <h3> Oczekujący studenci </h3>
                {appStorage.selectedCourseFull.waitingStudentsIds && appStorage.selectedCourseFull.waitingStudentsIds.length > 0 &&
                    <div>

                        {appStorage.selectedCourseFull.waitingStudentsIds.map((id) => (
                            <div className="student-info" key={id}>

                                {/* {console.log("byId:", appStorage.getStudentById(id))} */}
                                {/* * {id} */}
                                <p>
                                    {appStorage.myStudentsWithData.map((student) => {
                                        if (student.userId == id) {
                                            // console.log("returning", student.name)
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
                            <div className="student-added" key={id}>

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
