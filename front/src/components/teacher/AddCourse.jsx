import React from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../mobx/Store'

export default observer(function AddCourse() {

    const { appStorage } = useStore();

    return (
        <>
            <div>

                <h1>Create new course</h1>

                <form>
                    <label>Nazwa kursu </label>
                    <input type="text" value={appStorage.newCourseName}
                        onChange={(e) => { appStorage.setNewCourseName(e.target.value) }}
                        onKeyDown={async (event) => {
                            if (event.key === 'Enter') {
                                appStorage.createNewCourse()
                            }
                        }}
                    />
                </form>
                <div>
                    <button type="button" onClick={appStorage.createNewCourse}>Stwórz</button>
                </div>

                [#TODO css]

            </div>
        </>
    )
})
