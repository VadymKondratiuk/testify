import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TestActiveElement from "../components/testActiveElement";
import { Context } from "../index";
import { HOME_ROUTE, RESULT_ROUTE} from "../utils/consts";
import { fetchAnswers } from "../http/answerAPI";
import { createResponse } from "../http/responseAPI";
import { updateTestAttempt } from "../http/testAttemptAPI";
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/Button';

const colors = [
    '#6e995b', '#742727', '#635c5c', '#ddab35', 
    '#df0808', '#3f7915', '#153f79', '#79153f'
];

const TestActive = observer(() => {
    const { test } = useContext(Context);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [remainingTime, setRemainingTime] = useState(test.currentTest.timeLimit * 60);
    const navigate = useNavigate();
    let isTimeUp = false

    useEffect(() => {
        if (!test.currentTest.id) {
            navigate(HOME_ROUTE); 
        } else {
            test.setCurrentQuestion(test.questions[currentIndex]);

            fetchAnswers(test.currentQuestion.id).then((data) => {
                test.setAnswers(data.rows);
            });
        }
    }, [currentIndex, test, navigate]);

    useEffect(() => {
        if (remainingTime <= 0) {
            isTimeUp = true
            submitTest(); 
            return;
        }

        const timer = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer); 
    }, [remainingTime]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const calculateScore = () => {
        const total = test.selectedAnswers.length;
    
        const correctCount = test.selectedAnswers.filter(value => value && value.isCorrect === true).length;
        const nullCount = test.selectedAnswers.filter(value => value === null).length;
    
        const percentage = ((correctCount + nullCount * 0) / total) * 100; 
        return percentage.toFixed(2);
    };

    const nextQuestion = async () => {
        const updatedAnswers = [...test.selectedAnswers];
        updatedAnswers[currentIndex] = test.selectedAnswer;
        test.setSelectedAnswers(updatedAnswers);
    
        if (currentIndex < test.questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    
        const newResponse = {
            openResponse: "",
            testAttemptId: test.currentTestAttempt.id,
            questionId: test.currentQuestion.id,
            answerId: test.selectedAnswer ? test.selectedAnswer.id : null,
        };
    
        await createResponse(newResponse);
    };
    
    const submitTest = async () => {
        if(!isTimeUp){
            nextQuestion()
        } 

        const remainingResponses = test.questions
            .filter((question, index) => !test.selectedAnswers[index]) 
            .map((question) => ({
                openResponse: "",
                testAttemptId: test.currentTestAttempt.id,
                questionId: question.id,
                answerId: null,
            }));
    
        for (const response of remainingResponses) {
            await createResponse(response);
        }
    
        test.setEndTime();
        const score = calculateScore();
    
        const updatedTestAttempt = {
            endTime: test.endTime,
            score: score,
        };
    
        await updateTestAttempt(test.currentTestAttempt.id, updatedTestAttempt).then(() => {
            navigate(RESULT_ROUTE + "/" + test.currentTestAttempt.id);
        });
    };
    

    const colorIndex = currentIndex % colors.length; 
    const selectedColor = colors[colorIndex];

    return (
        <Container 
            className='d-flex justify-content-center align-items-center' 
            style={{ flexDirection: 'column', height: window.innerHeight - 124 }}
        >
            <Card style={{ width: 600, padding: 0, overflow: 'hidden' }}>
                {/* Верхня кольорова частина */}
                <div style={{
                    height: '50%',
                    backgroundColor: selectedColor,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: '30px',
                    padding: '10px'
                }}>
                    {test.currentTest.title}
                </div>

                {/* Нижня частина */}
                <div style={{ padding: 20 }}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Card style={{ marginBottom: '10px', fontSize: '28px', padding: '5px', width: '20%', alignItems: 'center'}}>
                            {currentIndex + 1 + ' / ' + test.questions.length}
                        </Card>
                        <Card style={{ marginBottom: '10px', fontSize: '28px', padding: '5px', width: '20%', alignItems: 'center'}}>
                            {formatTime(remainingTime)}
                        </Card>
                    </div>

                    {test.currentQuestion && test.answers ? (
                        <TestActiveElement
                            question={test.currentQuestion}
                            answers={test.answers}
                            setSelectedAnswer={(answer) => test.setSelectedAnswer(answer)}
                        />
                    ) : (
                        <div>Loading...</div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'right', marginTop: '20px' }}>
                        {currentIndex >= test.questions.length - 1 ? (
                            <Button style={{ width: '150px' }} variant="primary" onClick={submitTest}>Submit</Button>
                        ) : (
                            <Button style={{ width: '150px' }} variant="primary" onClick={nextQuestion}>Next</Button>
                        )}
                    </div>
                </div>
            </Card>
        </Container>
    );
});

export default TestActive;
