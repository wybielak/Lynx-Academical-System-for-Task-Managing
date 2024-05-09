import React from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../mobx/Store'

export default observer(function Auth() {

    const { appStorage } = useStore();

    return (
        <>
            <form>

                <label>email</label>
                <input className='border' type="text" value={appStorage.email}
                    onChange={(e) => { appStorage.onChangeEmail(e) }}
                />

                <label>password
                    <input className='border' type="text" value={appStorage.password}
                        onKeyDown={async (event) => {
                            if (event.key === 'Enter') {
                                appStorage.logIn()
                            }
                        }}
                        onChange={(e) => { appStorage.onChangePassword(e) }}
                    />
                </label>

            </form>
            
            <div>
                <button type="button" onClick={appStorage.logIn}>log in</button>
            </div>
        </>
    )
})
