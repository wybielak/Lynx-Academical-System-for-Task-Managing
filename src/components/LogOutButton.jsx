import React from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../mobx/Store'

export default observer(function LogOutButton() {

    const { appStorage } = useStore();

    return (
        <div>
            <button onClick={appStorage.logOut} >log out</button>
        </div>
    )
})
