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

                <div className=''>

                    <NavLink to='/course-details-teacher' className='back-button'>
                        <button>Back</button>
                    </NavLink>

                    <h1>Create new task</h1>

                    <form>
                        <div>

                            <div>
                                <label> courseName: {appStorage.selectedCourseFull.courseName} </label>
                            </div>

                            <div>
                                <label> taskName </label>
                                <input type="text" value={uploadStorage.newTaskName}
                                    onChange={(e) => { uploadStorage.setNewTaskName(e.target.value) }}
                                />
                            </div>

                            <div>
                                <label> taskDescription </label>
                                <textarea value={uploadStorage.newTaskDescription} cols={50} rows={3}
                                    onChange={(e) => uploadStorage.setNewTaskDescription(e.target.value)}></textarea>
                            </div>

                            <div>
                                <label> taskDeadline </label>
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

                        <button type="button" onClick={() => {uploadStorage.createNewTask().then(() => {navigate('/course-details-teacher', { replace: true })})}}>Create</button>

                    </form>

                </div>
            }
        </>
    )
})
