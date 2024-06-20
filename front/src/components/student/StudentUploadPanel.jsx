import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../mobx/Store'
import { NavLink, Navigate } from 'react-router-dom';
import IdToNameMaper from '../IdToNameMaper';
import { auth } from '../../config/FirebaseConfig';
import { registerLocale } from "react-datepicker";
import { pl } from 'date-fns/locale';

export default observer(function StudentUploadPanel() {

    const { appStorage, uploadStorage } = useStore();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        appStorage.getCurrentTaskData().then(() => setLoading(false))
        appStorage.checkStudentToSubmitted(auth?.currentUser?.uid)
    }, [])

    registerLocale('pl', pl)

    return (
        <>
            {appStorage.currentTaskData == '' ?
                
                <Navigate to={'/course-details-student'} />
                
                :

                loading ?

                    <div>
                        Chwileczkę..
                    </div>

                    :

                    <div className='upload-panel'>
                        {console.log("curr taskData: ", appStorage.currentTaskData)}

                        <NavLink to='/course-details-student' className='back-button'>
                            <button onClick={() => appStorage.setCurrentTaskId('')}>Back</button>
                        </NavLink>

                        <h1>Podgląd zadania</h1>
                        <h2>{appStorage.currentTaskData.taskName}</h2>

                        <div className='info'>
                            {!loading ? <IdToNameMaper id={appStorage.currentTaskData.ownerId} /> : ''}
                        </div>
                        <p> Termin do: {new Date(appStorage.currentTaskData.taskDeadline.seconds * 1000).toLocaleTimeString('pl-PL',
                            {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>

                        <p>{appStorage.currentTaskData.taskDescription}</p>

                        {appStorage.checker == true ? <p style={{ color: 'green', fontWeight: 'bold' }}>Przesłano twoją odpowiedź</p> :
                            <div>
                                <input type='file' multiple id="filesUpload" onChange={(e) => uploadStorage.onChangeFile(e)} />
                                <button onClick={() => { uploadStorage.submitFiles(appStorage.currentCourseData.courseName, auth?.currentUser.email, appStorage.currentTaskData.taskName); appStorage.addStudentToSubmitted(appStorage.currentTaskData.id, auth?.currentUser.uid) }}>Prześlij</button>
                            </div>
                        }

                    </div>}
        </>
    )
})
