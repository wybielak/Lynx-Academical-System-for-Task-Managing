import React from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../mobx/Store'

export default observer(function Auth() {

    const { appStorage } = useStore();

    return (
        <>
            <div className='auth-form'>
                <div className='auth-logo'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/pzeclon.appspot.com/o/polsl.png?alt=media&token=1b135f4c-5f0c-4239-b822-0d46f9871401" alt="" />
                </div>
                <div className='auth-form-content'>
                    <h2>Lynx</h2>
                    <p>Your Ultimate Task Management Solution! Lynx offers educators and students a centralized hub for efficient task management. Simplify your academic workflows, collaborate seamlessly, and stay on track.</p>
                </div>
                <div className='auth-form-inner'>
                    <h1>Login</h1>
                    <form>
                        <label>Email</label>
                        <input placeholder='example@mail.com' className='border' type="text" value={appStorage.email}
                            onChange={(e) => { appStorage.onChangeEmail(e) }}
                        />

                        <label>Password</label>
                        <input placeholder='************' className='border' type="password" value={appStorage.password}
                            onKeyDown={async (event) => {
                                if (event.key === 'Enter') {
                                    appStorage.logIn()
                                }
                            }}
                            onChange={(e) => { appStorage.onChangePassword(e) }}
                        />

                    </form>

                    <div>
                        <button type="button" onClick={appStorage.logIn}>Login</button>
                    </div>
                </div>
            </div>
        </>
    )
})
