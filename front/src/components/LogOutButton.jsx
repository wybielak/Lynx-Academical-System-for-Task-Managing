import React from 'react'
import { auth } from '../config/FirebaseConfig'
import { signOut } from 'firebase/auth'

export default function LogOutButton() {

    const logOut = async () => {
        try {
            await signOut(auth)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <button onClick={logOut} >log out</button>
        </div>
    )
}
