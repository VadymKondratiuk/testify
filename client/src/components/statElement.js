import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../index";
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { RESULT_ROUTE } from '../utils/consts';
import { fetchUserName } from '../http/userAPI';

const colors = [
    '#6e995b', '#742727', '#635c5c', '#ddab35', 
    '#df0808', '#3f7915', '#153f79', '#79153f'
];

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    return date.toLocaleString('en-EN', options); 
};

const StatElement = ({ currentTestAttempt, index }) => {
    const navigate = useNavigate();
    const { test } = useContext(Context);
    const [userName, setUserName] = useState("Loading..."); // Стан для назви тесту

    const colorIndex = index % colors.length;
    const selectedColor = colors[colorIndex];

    useEffect(() => {
        const fetchName = async () => {
            try {
                let fetchedUser;
                if(!currentTestAttempt.userId) {
                    setUserName("Unknown User");
                } 
                else {
                    fetchedUser = await fetchUserName(currentTestAttempt.userId);
                    setUserName(fetchedUser.firstName + ' ' + fetchedUser.lastName); 
                }
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };

        fetchName();
    }, [currentTestAttempt.userId]);

    return (
        <Card
            className='mt-3'
            style={{
                width: 200,
                height: 200,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                padding: 0,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)', // Додавання тіні
                transition: 'transform 0.2s ease, box-shadow 0.2s ease', // Анімація при наведенні
            }}
            border={'light'}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0px 6px 15px rgba(0, 0, 0, 0.25)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.15)';
            }} 
            onClick={() => {
                test.setCurrentTestAttempt(currentTestAttempt);
                navigate(RESULT_ROUTE + '/' + currentTestAttempt.id, { state: { color: selectedColor } });
            }}
        >
            <div style={{
                height: '50%',
                backgroundColor: selectedColor,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontSize: '18px',
                overflow: 'hidden'
            }}>
                {userName} {/* Відображаємо назву тесту */}
            </div>
            
            <div style={{
                height: '50%',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden'
            }}>
                <div> {"Date: " + formatDate(currentTestAttempt.startTime)}</div>
                <div> {"Score: " + currentTestAttempt.score}</div>
            </div>
        </Card>
    );
};

export default StatElement;
