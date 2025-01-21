import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { fetchAnswers } from "../http/answerAPI";

const QuestionAnswerElement = ({ question, index, responses }) => {
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        if (question?.id) {
            fetchAnswers(question.id).then((data) => setAnswers(data.rows));
        }
    }, [question]);

    return (
        <div>
            {question && (
                <>  
                    <h3 style={{ fontSize: "26px", marginBottom: "10px", marginTop: "30px" }}>
                        {`${index + 1}. ${question.questionText}`}
                    </h3>
                    <div>
                        {answers.map((answer) => {
                            const isChosen = responses.some(
                                (response) => response.questionId === question.id && response.answerId === answer.id
                            );

                            return (
                                <Card
                                    key={answer.id}
                                    style={{
                                        width: "75%",
                                        marginTop: "10px",
                                        padding: "10px",
                                        backgroundColor: answer.isCorrect ? "#d4edda" : "#f8d7da",
                                        border: answer.isCorrect ? "1px solid #c3e6cb" : "1px solid #f5c6cb",
                                    }}
                                >
                                    <div>
                                        {answer.answerText}
                                        {isChosen && (
                                            <span style={{ color: "blue", marginLeft: "10px" }}>--- chosen answer</span>
                                        )}
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default QuestionAnswerElement;
