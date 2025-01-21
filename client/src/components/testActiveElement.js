import React, { useState } from "react";
import Button from 'react-bootstrap/Button';

const TestActiveElement = ({ question, answers, setSelectedAnswer }) => {
    const [selectedAnswerId, setSelectedAnswerId] = useState(null); 


    const toggleAnswerSelection = (answer) => {
        setSelectedAnswerId(answer.id); 
        setSelectedAnswer(answer); 
        console.log("Selected Answer ID:", answer.id);
    };

    return (
        <div>
            {question && (
                <>
                    <p style={{fontSize: '26px'}}>{question.questionText}</p>
                    <div>
                        {answers.map((answer) => (
                            <div key={answer.id}>
                                <Button
                                    style={{width: '50%', marginTop: '10px', border: '1px solid black'}}
                                    variant={selectedAnswerId === answer.id ? "success" : 'outiline-success'}
                                    onClick={() => toggleAnswerSelection(answer)}
                                    active='none'
                                >
                                    {answer.answerText}
                                </Button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default TestActiveElement;
