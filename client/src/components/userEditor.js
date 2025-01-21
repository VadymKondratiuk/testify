import React, { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { updateUser } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { jwtDecode } from "jwt-decode";

const UserEditor = observer(({ show, onHide }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const userInfo = jwtDecode(localStorage.getItem('token'));

    useEffect(() => {
        if (show) {
            setFirstName(userInfo.firstName || '');
            setLastName(userInfo.lastName || '');
            setEmail(userInfo.email || '');
        }
    }, [show]); 

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }

    const click = async () => {
        if (firstName.length > 20) {
            setErrorMessage('First name must not exceed 20 characters');
            return;
        }
        if (lastName.length > 20) {
            setErrorMessage('Last name must not exceed 20 characters');
            return;
        }
        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address');
            return;
        }
        if(newPassword !== '') {
            if (newPassword.length > 20 || newPassword.length < 5) {
                setErrorMessage('Password must be between 5 and 20 characters');
                return;
            }
        }

        setErrorMessage(''); // очистити попереднє повідомлення про помилку

        const updatedUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            newPassword: newPassword,
            currentPassword: currentPassword
        };

        try {
            const data = await updateUser(userInfo.id, updatedUser);
            localStorage.setItem('token', data);
            onHide();
            window.location.reload();
        } catch (err) {
            setErrorMessage(err.response?.data?.message || 'Incorrect password');
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit User Data
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <p>First Name:</p>
                    <Form.Control
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        className="mt-3 mb-3"
                        placeholder="Enter first name"
                        maxLength={20}
                    />
                    <p>Last Name:</p>
                    <Form.Control
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        className="mb-3"
                        placeholder="Enter last name"
                        maxLength={20}
                    />
                    <p>Email:</p>
                    <Form.Control
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="mb-3"
                        placeholder="Enter email address"
                    />
                    <p>Current Password:</p>
                    <Form.Control
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        className="mb-3"
                        placeholder="Enter current password"
                    />
                    <p>New Password:</p>
                    <Form.Control
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className="mb-3"
                        placeholder="Enter your new password"
                        minLength={5}
                        maxLength={20}
                    />
                </Form>
                {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                <Button variant="outline-success" onClick={click}>Оновити</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UserEditor;
