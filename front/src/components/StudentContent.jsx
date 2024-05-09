import React from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../mobx/Store'

export default observer(function StudentContent() {

    const { appStorage } = useStore();

    return (
        <>
            <div>StudentContent</div>
            {/* <div>{appStorage.auth?.currentUser?.email}</div> */}
            <div>{appStorage.currentRole}</div>
        </>
    )
})
