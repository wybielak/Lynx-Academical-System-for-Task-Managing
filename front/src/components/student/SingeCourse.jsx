import React, { useEffect, useState } from 'react'
import { auth } from '../../config/FirebaseConfig';
import { useStore } from '../../mobx/Store';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import IdToNameMaper from '../IdToNameMaper';

export default observer(function SingeCourse({ courseId, courseName, ownerId, button1Display, button2Display }) {

    const { appStorage } = useStore();
    
    return (
        <>
            <div className='course-join-info'>
                <div>
                    <h3>{courseName}</h3>
                    {/* {ownerNameLoading ? <p>{ownerName}</p> : <p>Ładowanie ...</p>} */}
                    <IdToNameMaper id={ownerId} />
                </div>
                <button style={{ display: button1Display }} onClick={() => appStorage.addWaitingStudentToCourse(courseId, auth?.currentUser?.uid)}>Dołącz</button>
                
                <NavLink style={{ display: button2Display }} to='/course-details-student' >
                    <button onClick={() => appStorage.setCurrentCourseId(courseId)}>Przejdź</button>
                </NavLink>
            </div>
        </>
    )
})
