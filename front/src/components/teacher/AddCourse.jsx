import React from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../mobx/Store'

export default observer(function AddCourse() {

    const { appStorage } = useStore();

    return (
        <>
            <div className='create-new-course'>

                <h1>Create new course</h1>

                <form>
                    <div>
                        <label>Course name </label>

                        <input type="text" value={appStorage.newCourseName}
                            onChange={(e) => { appStorage.setNewCourseName(e.target.value) }}
                            onKeyDown={async (event) => {
                                if (event.key === 'Enter') {
                                    appStorage.createNewCourse()
                                }
                            }}
                        />
                    </div>
                    <button type="button" onClick={appStorage.createNewCourse}>Create</button>

                </form>


            </div>
        </>
    )
})
