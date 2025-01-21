import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../index";
import { updateTest } from "../http/testAPI";
import { createQuestion, fetchQuestions } from "../http/questionAPI";
import { fetchOneTest } from "../http/testAPI";
import { useNavigate, useParams } from "react-router-dom";
import { USER_ROUTE } from "../utils/consts";
import TitleEdit from "../components/testEditComp/titleEdit";
import QuestionEditor from "../components/testEditComp/questionEditor";
import QuestionList from "../components/questionList";
import { Button, Card, Container } from "react-bootstrap";


const TestEdit = observer(() => {
    const { test } = useContext(Context);
    const navigate = useNavigate();
    const { testId } = useParams();

    const [questionEditorVisible, setQuestionEditorVisible] = useState(false)

    useEffect(() => {

        fetchOneTest(testId).then(data => {
            test.setCurrentTest(data);
            fetchQuestions(data.id).then(data => {
                test.setQuestions(data.rows)
            });
        })
    }, [testId, test]);

    const handleTitleChange = (e) => {
        const { name, value } = e.target;
        test.setCurrentTest({
            ...test.currentTest,
            [name]: value,
        });
    };

    const addQuestion = async () => {
        if(!test.currentTest.id) {
            alert("error in addQuestion: test id is not set");
            return
        }
        const newQuestion = {
            questionText: "",
            testId: test.currentTest.id,
            questionType: "singleChoice"
        }
        await createQuestion(newQuestion).then(data => test.setCurrentQuestion(data));

        setQuestionEditorVisible(true)
    }

    const saveChanges = async () => {
        await updateTest(test.currentTest.id, test.currentTest);
        navigate(USER_ROUTE);
    };

    return (
        <Container className='d-flex justify-content-center align-items-center' style={{minHeight: window.innerHeight - 200}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', margin: '30px'}}>
                <Card style={{marginRight: '30px', padding: '20px', backgroundColor: '#daebf7'}}>
                    <TitleEdit
                        title={test.currentTest.title}
                        description={test.currentTest.description}
                        timeLimit={test.currentTest.timeLimit}
                        onTitleChange={handleTitleChange}
                    />
                    <div style={{display: "flex", justifyContent: "space-between", margin: "20px", width: 300}}>
                        <Button variant="primary" onClick={() => addQuestion()}>Add Question</Button>
                        <Button variant="success" onClick={() => saveChanges()}>Save</Button>
                    </div>
                </Card>
                <Card style={{marginRight: '30px', padding: '20px', minWidth: '400px', backgroundColor: '#daebf7'}}>
                    <h2>Questions:</h2>
                    <QuestionList
                        onEditQuestion={(question) => {
                            test.setCurrentQuestion(question);
                            setQuestionEditorVisible(true);
                        }}
                    />
                </Card>
            </div>

            <QuestionEditor 
                show={questionEditorVisible} 
                onHide={() => setQuestionEditorVisible(false)}
                currentQuestion={test.currentQuestion}
            />
        </Container>
    );
});

export default TestEdit;
