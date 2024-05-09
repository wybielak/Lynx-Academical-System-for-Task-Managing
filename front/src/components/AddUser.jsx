import React from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../mobx/Store'

export default observer(function AddUser() {

    const { appStorage } = useStore();

    return (
        <>
            <form>
                <label>email</label>
                <input type="text" value={appStorage.newUserEmail} onChange={(e) => { appStorage.onChangeNewUserEmail(e) }} />

                <label>password</label>
                <input type="text" value={appStorage.newUserPassword} onChange={(e) => { appStorage.onChangeNewUserPassword(e) }} />

                <label>role</label>
                <select ref={appStorage.allRoles}>
                    <option value="student">student</option>
                    <option value="teacher">teacher</option>
                </select>
            </form>

            <div>
                <button type="button" onClick={appStorage.signIn}>create account</button>
            </div>
        </>
    )
})
