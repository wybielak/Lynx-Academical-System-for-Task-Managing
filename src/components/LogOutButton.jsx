import React from 'react'
import { signOut } from 'firebase/auth'

import { auth } from '../config/FirebaseConfig'

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
