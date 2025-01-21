import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import { fetchOneTest } from "../http/testAPI";
import { Context } from "../index";
import { TEST_ROUTE, LOGIN_ROUTE, HOME_ROUTE } from "../utils/consts";
import { fetchQuestions } from "../http/questionAPI";
import { createTestAttempt } from "../http/testAttemptAPI";
import { jwtDecode } from 'jwt-decode';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/Button';
import { fetchUserName } from "../http/userAPI";

const Test = observer(() => {
    const { test, user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();

    const color = location.state?.color || '#3f7915';

    useEffect(() => {
        const testId = parseInt(location.pathname.split('/').pop(), 10);
        fetchOneTest(testId).then(data => {
            if(!data) {
                navigate(HOME_ROUTE)
            } 
            test.setCurrentTest(data);
            fetchUserName(data.userId).then(data => test.setCurrentTestAuthor(data));
        });
        fetchQuestions(testId).then(data => {
            test.setQuestions(data.rows);
        });
    }, [location.pathname, test]);

    const startTest = async () => {
        const userId = jwtDecode(localStorage.getItem('token')).id;

        test.setStartTime();

        const newTestAttempt = {
            startTime: test.startTime,
            endTime: null,
            score: 0,
            testId: test.currentTest.id,
            userId: userId
        };

        await createTestAttempt(newTestAttempt).then(data => {
            test.setCurrentTestAttempt(data);
    
            const emptyAnswers = Array(test.questions.length).fill(null);
            test.setSelectedAnswers(emptyAnswers);
            test.setSelectedAnswer(null);
    
            navigate(TEST_ROUTE + '/' + test.currentTest.id + '/active');
        });
    };

    return (
        <Container className='d-flex justify-content-center align-items-center' style={{ height: window.innerHeight - 124 }}>
            <Card style={{ width: 800, padding: 0 }}>
                <div style={{
                    backgroundColor: color,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: '36px',
                    padding: '40px'
                }}>
                    {test.currentTest.title}
                </div>

                <div style={{ padding: '20px', fontSize: '18px' }}>
                    <p>{test.currentTest.description}</p>
                    <p>{"Number of questions: " + test.questions.length}</p>
                    <p>{"Time limit: " + test.currentTest.timeLimit + 'm'}</p>
                    <p>{"Author: " + test.currentTestAuthor.firstName + ' ' + test.currentTestAuthor.lastName}</p>
                    {test.currentTest.status === 'private' ?
                        <p>need a password</p>
                        :
                        <></>
                    }
                    <div style={{display: 'flex', justifyContent: 'right'}}>
                        <Button 
                            onClick={user.isAuth ? startTest : () => navigate(LOGIN_ROUTE)} 
                            variant="primary"
                            style={{fontSize: '18px', width: '150px'}}
                        >
                            Start
                        </Button>
                    </div>
                </div>
            </Card>
        </Container>
    );
});

export default Test;
