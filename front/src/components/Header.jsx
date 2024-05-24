import React from 'react'
import LogOutButton from './LogOutButton'

export default function Header({ role, userName }) {
    return (
        <div className='header'>

            <div className="left">
                <img src="https://firebasestorage.googleapis.com/v0/b/pzeclon.appspot.com/o/polsl.png?alt=media&token=1b135f4c-5f0c-4239-b822-0d46f9871401" alt="" />
                <p className='role'>{role}</p>
            </div>

            <div className="right">
                <p className='email'>{userName}</p>
                <LogOutButton />
            </div>

        </div>
    )
}
