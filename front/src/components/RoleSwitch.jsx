import React from 'react'
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite'

import { useStore } from '../mobx/Store'
import StudentContent from './StudentContent';
import TeacherContent from './TeacherContent';
import LogOutButton from './LogOutButton';

export default observer(function RoleSwitch() {

    const { appStorage } = useStore();

    useEffect(() => { appStorage.getRoles() }, [])

    return (
        <>
            {appStorage.currentRole == 'teacher' ? <TeacherContent /> : null}
            {appStorage.currentRole == 'student' ? <StudentContent /> : null}
            <LogOutButton />
        </>
    )
})
