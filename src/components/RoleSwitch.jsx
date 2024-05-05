import { getDocs, collection, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react';

import StudentContent from './StudentContent';
import TeacherContent from './TeacherContent';
import LogOutButton from './LogOutButton';
import { auth } from '../config/FirebaseConfig'
import { db } from '../config/FirebaseConfig'

export default function RoleSwitch() {

    const [currentRole, setCurrentRole] = useState([])
    const rolesRef = collection(db, 'roles')

    const getRoles = async () => {
        try {
            const roleQuery = query(rolesRef, where("userId", "==", auth?.currentUser?.uid))
            const data = await getDocs(roleQuery)
            const filteredData = data.docs.map((doc) => ({ ...doc.data() }))
            setCurrentRole(filteredData[0].role)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => { getRoles() }, [])

    return (
        <>
            <LogOutButton />
            {currentRole == 'teacher' ? <TeacherContent /> : <StudentContent />}
        </>
    )
}
