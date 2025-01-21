import React, { useState } from 'react'
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE } from '../utils/consts';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { useContext } from 'react';
import { registration, login } from '../http/userAPI';

const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }

    const click = async () => {
        // if (!validateEmail(email)) {
        //     setErrorMessage('Please enter a valid email address');
        //     return;
        // }
        if (password.length < 4 || password.length > 20) {
            setErrorMessage('Password must be between 5 and 20 characters');
            return;
        }
        if (firstName.length > 20) {
            setErrorMessage('First name must not exceed 20 characters');
            return;
        }
        if (lastName.length > 20) {
            setErrorMessage('Last name must not exceed 20 characters');
            return;
        }

        try {
            let data;
            if (isLogin) {
                data = await login(email, password)
            }
            else {
                data = await registration(email, password, firstName, lastName)
            }
            user.setUser(data)
            user.setIsAuth(true)
            navigate(HOME_ROUTE)
            window.location.reload()
        }
        catch (err) {
            setErrorMessage(err.response?.data?.message || 'An error occurred');
        }
    }

    return (
        <Container className='d-flex justify-content-center align-items-center' style={{ height: window.innerHeight - 124 }}>
            <Card style={{ width: 600 }} className='p-5'>
                <h2>{isLogin ? 'Authorization Form' : "Registration Form"}</h2>
                <Form className='d-flex flex-column'>
                    {!isLogin ?
                        <div>
                            <Form.Label className='mt-2'>First Name</Form.Label>
                            <Form.Control
                                placeholder='John'
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                maxLength={20}
                            />
                            <Form.Label className='mt-2'>Last Name</Form.Label>
                            <Form.Control
                                placeholder='Smith'
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                maxLength={20}
                            />
                        </div>
                        :
                        <></>
                    }

                    <Form.Label className='mt-2'>Your email</Form.Label>
                    <Form.Control
                        placeholder='example@gmail.com'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Label className='mt-2'>Your password</Form.Label>
                    <Form.Control
                        placeholder='eXamPle_1&23$4'
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        minLength={5}
                        maxLength={20}
                    />
                    {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
                </Form>

                <Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
                    {isLogin ?
                        <div>Do not have an account? <NavLink to={REGISTRATION_ROUTE}>Sign up</NavLink></div>
                        :
                        <div>Have an account? <NavLink to={LOGIN_ROUTE}>Sign in</NavLink></div>
                    }
                    <Button variant={'outline-success'} onClick={() => click()}>{isLogin ? "Sign in" : "Sign up"}</Button>
                </Row>
            </Card>
        </Container>
    );
})

export default Auth;
