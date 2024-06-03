import React, { useEffect, useState } from 'react'
import { useStore } from '../mobx/Store';
import { observer } from 'mobx-react-lite';

export default observer(function IdToNameMaper({ id }) {

    const { appStorage } = useStore();

    const [name, setName] = useState('')
    const [nameLoading, setNameLoading] = useState(false)

    useEffect(() => {
        setNameLoading(true)
        appStorage.getNameById(id).then((name) => {
            setName(name)
            setNameLoading(false)
        })
    }, [name])

    return (
        <>
            {nameLoading ? <p className='name-mapper'>{name}</p> : <p>Loading ...</p>}
        </>
    )
})
