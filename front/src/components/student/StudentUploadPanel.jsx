import React from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../mobx/Store'

export default observer(function StudentUploadPanel() {

    const { uploadStorage } = useStore();

    return (
        <>
            <div className='uploadPanel'>

                <h1>Upload</h1>

                <div>[#TODO wybór zadań]</div>
                <div>[#hardcoded przesyłanie do Zielonka_Programowanie Gesiek Zad1]</div>

                <br></br>

                <div>
                    <input type='file' multiple id="filesUpload" onChange={(e) => uploadStorage.onChangeFile(e)} />
                    <button onClick={uploadStorage.submitFiles}>Prześlij</button>
                </div>

            </div>
        </>
    )
})
