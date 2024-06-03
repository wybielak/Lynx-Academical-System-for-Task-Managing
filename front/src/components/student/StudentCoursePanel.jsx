import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../mobx/Store';
import { NavLink } from 'react-router-dom';
import IdToNameMaper from '../IdToNameMaper';

export default observer(function StudentCoursePanel() {

    const { appStorage } = useStore();

    useEffect(() => {
        appStorage.getCurrentCourseData()
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
                </div>
            
            </div>
        </>
    )
})
