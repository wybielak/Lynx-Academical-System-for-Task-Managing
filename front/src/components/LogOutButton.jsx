import React from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../mobx/Store'

export default observer(function LogOutButton() {

    const { appStorage } = useStore();

    return (
        <div>
            <button className='logOutButton' onClick={appStorage.logOut} >Log out</button>
        </div>
    )
})
