import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from "react-datepicker";
import { pl } from 'date-fns/locale';

import { useStore } from '../../mobx/Store'

export default observer(function AddTask() {

    const { appStorage } = useStore();
    const { uploadStorage } = useStore();

    // const [newDate, setNewDate] = useState(new Date())

    registerLocale('pl', pl)
    let navigate = useNavigate();

    return (
        <>
            {!appStorage.selectedCourseFull ?

                <Navigate to={'/'} />

                :

                // <div className='teacher-content course'>
                <div className='task'>

                    <NavLink to='/course-details-teacher' className='back-button'>
                        <button>Wróć</button>
                    </NavLink>

                    <h1>Utwórz nowe zadanie</h1>

                    <form>
                        <div>

                            <div>
                                <label> Kurs: {appStorage.selectedCourseFull.courseName} </label>
                            </div>

                            <div>
                                <label> Nazwa zadania </label>
                                <input type="text" value={uploadStorage.newTaskName}
                                    onChange={(e) => { uploadStorage.setNewTaskName(e.target.value) }}
                                />
                            </div>

                            <div>
                                <label> Opis zadania </label>
                                <textarea value={uploadStorage.newTaskDescription} cols={50} rows={3}
                                    onChange={(e) => uploadStorage.setNewTaskDescription(e.target.value)}></textarea>
                            </div>

                            <div>
                                <label> Deadline: </label>
                                <DatePicker
                                    selected={uploadStorage.newTaskDeadline}
                                    onChange={(date) => uploadStorage.setNewTaskDeadline(date)}
                                    // dateFormat="dd/MM/YYYY"
                                    dateFormat="Pp"
                                    placeholderText="Wybierz datę"
                                    showTimeSelect
                                    timeFormat='p'
                                    timeIntervals={15}
                                    locale="pl"
                                />
                            </div>

                        </div>

                        <div className='create-user-main'>
                            <button type="button"
                                onClick={() => { uploadStorage.createNewTask().then(() => { navigate('/course-details-teacher', { replace: true }) }) }}>
                                Stwórz
                            </button>
                        </div>

                    </form>

                </div>
            }
        </>
    )
})
