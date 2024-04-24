import React from 'react'
import AddUser from './AddUser'
import { auth } from '../config/FirebaseConfig'

export default function TeacherContent() {
  return (
    <>
        <div>TeacherContent</div>
        <div>{auth?.currentUser?.email}</div>
        <AddUser />
    </>
  )
}
