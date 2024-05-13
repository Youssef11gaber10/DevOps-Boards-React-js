import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../Context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {

    let { token } = useContext(authContext);

    if (token === null) {
        return <Navigate to={'/login'}/>
    }


    return (
        <>
            {children}
        </>
    )

}
