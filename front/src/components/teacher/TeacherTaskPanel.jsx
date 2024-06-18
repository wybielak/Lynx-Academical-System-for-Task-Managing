import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from "react-datepicker";
import { pl } from 'date-fns/locale';

import { useStore } from '../../mobx/Store'
import IdToNameMaper from '../IdToNameMaper';

export default observer(function TeacherTaskPanel() {

    const { appStorage } = useStore();
    const { uploadStorage } = useStore();

    registerLocale('pl', pl)
    let navigate = useNavigate();

    return (
        <>
            {!uploadStorage.selectedTaskFull ?
                <Navigate to={'/'} />
                :
                uploadStorage.taskRefreshing ? // do edycji-refreshu taska
                    <div> Momencik... </div>
                    :
                    <div className='teacher-content task'>

                        <NavLink to='/course-details-teacher' className='back-button'>
                            <button onClick={() => uploadStorage.clearSelectedTaskFull()}>Wróć</button>
                        </NavLink>

                        <h2>
                            {uploadStorage.selectedTaskFull.taskName} &nbsp;
                            <button type="button" className='logOutButton'
                                onClick={() => { uploadStorage.deleteTask(uploadStorage.selectedTaskFull.id).then(() => { navigate('/course-details-teacher', { replace: true }) }) }}>
                                Usuń zadanie
                            </button>
                        </h2>

                        <p> Opis: {uploadStorage.selectedTaskFull.taskDescription} </p>

                        Edytuj: <textarea value={uploadStorage.updatedTaskDescription} cols={50} rows={3} onChange={(e) => uploadStorage.setUpdatedTaskDescription(e.target.value)}></textarea>
                        &nbsp;
                        <button onClick={() => uploadStorage.updateTaskDescription(uploadStorage.selectedTaskFull)}>Zapisz</button>


                        <p> Deadline: &nbsp;
                            {/* trza konwertować z timestampa na Date() */}
                            {new Date(uploadStorage.selectedTaskFull.taskDeadline.seconds * 1000).toLocaleTimeString('pl-PL',
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                }
                            )}
                        </p>
                        <div className='calender'>
                            Edytuj: <DatePicker
                                selected={uploadStorage.updatedTaskDeadline}
                                onChange={(date) => uploadStorage.setUpdatedTaskDeadline(date)}
                                // dateFormat="dd/MM/YYYY"
                                dateFormat="Pp"
                                placeholderText="Wybierz datę"
                                showTimeSelect
                                timeFormat='p'
                                timeIntervals={15}
                                locale="pl"
                            />
                            &nbsp;
                            <button onClick={() => uploadStorage.updateTaskDeadline(uploadStorage.selectedTaskFull)}>Zapisz</button>
                        </div>

                        {uploadStorage.selectedTaskFull.studentsIdsWhoSubmitted.length == 0 ?
                            <h4>
                                Brak przesłanych prac
                            </h4>
                            :
                            <>
                                <h3> Przesłali: </h3>
                                {uploadStorage.selectedTaskFull.studentsIdsWhoSubmitted.map((studentId) => (
                                    <div className='course-join-info' key={studentId}>
                                        <IdToNameMaper id={studentId} />
                                        <button
                                            onClick={() => uploadStorage.downloadTask(appStorage.selectedCourseFull.courseName, studentId, uploadStorage.selectedTaskFull.taskName)}>
                                            Pobierz
                                        </button>
                                    </div>
                                ))}
                            </>
                        }

                    </div>
            }
        </>
    )
})
