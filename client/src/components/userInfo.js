import { observer } from "mobx-react-lite";
import React from "react";
import { jwtDecode } from 'jwt-decode';

const UserInfo = observer(() => {
    const userInfo = jwtDecode(localStorage.getItem('token'))

    return (
        <div style={{padding: 20, fontSize: 20}}>
            <p>{"First Name: " + userInfo.firstName}</p>
            <p>{"Last Name: " + userInfo.lastName}</p>
            <p>{"Role: " + userInfo.role}</p>
            <p>{"Email addres: " + userInfo.email}</p>
        </div>
    )
})

export default UserInfo