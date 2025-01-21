import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import { fetchAnswers } from "../http/answerAPI";
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/esm/Card';
import QuestionAnswerElement from "./questionAnswerElement";

const QuestionAnswerList = observer(() => {
    const { test } = useContext(Context);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAnswers(test.currentQuestion.id).then((data) => {
            test.setAnswers(data.rows);
        });
    }, [currentIndex, test, navigate]);

    return (
        <Container 
            className='d-flex justify-content-center align-items-center' 
            style={{ flexDirection: 'column', height: window.innerHeight - 124 }}
        >
            <Card style={{ width: 600, padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: 20 }}>
                    {test.currentQuestion && test.answers ? (
                        <QuestionAnswerElement
                            question={test.currentQuestion}
                            answers={test.answers}
                            setSelectedAnswer={(answer) => test.setSelectedAnswer(answer)}
                        />
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </Card>
        </Container>
    );
});

export default QuestionAnswerList;
