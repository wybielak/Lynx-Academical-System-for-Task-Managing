import React from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../mobx/Store'

export default observer(function Auth() {

    const { appStorage } = useStore();

    return (
        <>
            <form>
                <label>email</label>
                <input className='border' type="text" value={appStorage.email} onChange={(e) => {appStorage.onChangeEmail(e)}}/>
                <label>password</label> 
                <input className='border' type="text" value={appStorage.password} onChange={(e) => {appStorage.onChangePassword(e)}}/>
            </form>
            <div>
                <button type="button" onClick={appStorage.logIn}>log in</button>
            </div>
        </>
    )
})
