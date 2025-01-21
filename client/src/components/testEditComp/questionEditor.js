import React, { useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import { updateQuestion } from "../../http/questionAPI";
import {fetchAnswers, updateAnswer} from "../../http/answerAPI";
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../../index";
import {createAnswer} from "../../http/answerAPI";
import AnswerListEdit from "./answerListEdit";

const QuestionEditor = observer(({show, onHide, currentQuestion}) => {
    const { test } = useContext(Context);

    useEffect(() => {
        if (currentQuestion?.id) {
            fetchAnswers(currentQuestion.id).then(data => {
                test.setAnswers(data.rows);
            });
        }
    }, [currentQuestion, test]);
    
    const handleQuestionChange = (e) => {
        const {name, value} = e.target;
        test.setCurrentQuestion({
            ...test.currentQuestion,
            [name]: value,
        });
    };

    const addAnswer = async() => {
        const newAnswer = {
            questionId: test.currentQuestion.id,
            answerText: "",
            isCorrect: false
        };
        
        const createdAnswer =  await createAnswer(newAnswer);
        test.setAnswers([...test.answers, createdAnswer]);
    }

    const saveQuestion = async () => {
        await updateQuestion(test.currentQuestion.id, test.currentQuestion);
        const questionExists = test.questions.some(question => question.id === test.currentQuestion.id);
        let updatedQuestions;
        if (questionExists) {
            updatedQuestions = test.questions.map(question =>
                question.id === test.currentQuestion.id ? test.currentQuestion : question
            );
        } else {
            updatedQuestions = [...test.questions, test.currentQuestion];
        }
        test.setQuestions(updatedQuestions);
        
        for (let i = 0; i < test.answers.length; i++) {
            await updateAnswer(test.answers[i].id, test.answers[i]);
        }

        onHide();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Question Editor
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <p>Question text:</p>
                    <Form.Control
                        name="questionText"
                        value={test.currentQuestion.questionText}
                        onChange={handleQuestionChange}
                        className="mt-3"
                        placeholder="Question text"
                    />
                </Form>
                <AnswerListEdit question={test.currentQuestion} />
                <Button style={{marginTop: 10}} onClick={addAnswer} variant="outline-success" >Add Answer</Button>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Cancel</Button>
                <Button variant="outline-success" onClick={saveQuestion}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default QuestionEditor;