import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

export default function PageNotFound() {

    // let navigate = useNavigate();

    return (
        <div>
            Błędna ścieżka - przekierowuję...
            <Navigate to={'/'} />
        </div>
    )
}
