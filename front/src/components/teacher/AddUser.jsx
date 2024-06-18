import React from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../mobx/Store'

export default observer(function AddUser() {

    const { appStorage } = useStore();

    return (
        <>
            <div className='create-user-main'>
                <h1>Utwórz nowego użytkownika</h1>
                <form>
                    <div>
                        <label>Email: </label>
                        <input type="text" value={appStorage.newUserEmail}
                            onChange={(e) => { appStorage.setNewUserEmail(e.target.value) }}
                        />
                    </div>

                    <div>
                        <label>Hasło: </label>
                        <input type="password" value={appStorage.newUserPassword}
                            onChange={(e) => { appStorage.setNewUserPassword(e.target.value) }}
                            onKeyDown={async (event) => {
                                if (event.key === 'Enter') {
                                    appStorage.signIn()
                                }
                            }}
                        />
                    </div>

                    <div>
                        <label>Typ konta: </label>
                        <select value={appStorage.newUserRole}
                            onChange={(e) => { appStorage.setNewUserRole(e.target.value) }}>
                            <option value="student">Student</option>
                            <option value="teacher">Nauczyciel</option>
                        </select>
                    </div>

                </form>

                <button type="button" onClick={appStorage.signIn}>Stwórz</button>
            </div>
        </>
    )
})
