import React from 'react'
import { observer } from 'mobx-react-lite'

import { auth } from '../config/FirebaseConfig'
import { useStore } from '../mobx/Store'

export default observer(function StudentContent() {

    const { appStorage } = useStore();

    return (
        <>
            <div className='uploadPanel'>
                <div>Upload</div>
                <br></br>
                <div>[aktualna zawartość zadania tu] [DELETE]</div>
                <div>[#hardcoded Zielonka_Programowanie Gesiek Zad1]</div>
                <br></br>
                <div>
                    <input type='file' multiple id="filesUpload" onChange={(e) => appStorage.onChangeFile(e)} />
                    <button onClick={appStorage.handleSubmitFilesButton}>Prześlij plik</button>
                </div>
            </div>
        </>
    )
})
