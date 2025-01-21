import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Context } from "../index";
import { fetchOneTestAttempt } from "../http/testAttemptAPI";
import { fetchResponses } from "../http/responseAPI";
import { Container, Card } from "react-bootstrap";
import { fetchOneTest } from "../http/testAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchQuestions } from "../http/questionAPI";
import QuestionAnswerElement from "../components/questionAnswerElement";
import { fetchUserName } from "../http/userAPI";
import { jwtDecode } from "jwt-decode";
import { HOME_ROUTE } from "../utils/consts";

const TestResult = observer(() => {
    const { test } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();

    const userId = jwtDecode(localStorage.getItem('token')).id

    useEffect(() => {
        const testAttemptId = parseInt(location.pathname.split("/").pop(), 10);

        fetchOneTestAttempt(testAttemptId).then((data) => {
            test.setCurrentTestAttempt(data);
            fetchResponses(data.id).then((data) => {
                test.setResponses(data.rows);
            });
            fetchOneTest(data.testId).then((data) => {
                if(data.userId !== userId && test.currentTestAttempt.userId !== userId){
                    navigate(HOME_ROUTE)
                }
                test.setCurrentTest(data);
                fetchQuestions(data.id).then((data) => {
                    test.setQuestions(data.rows);
                });
            });
            fetchUserName(data.userId).then((data) => test.setCurrentTestAuthor(data));
        });
    }, [test, location.pathname, navigate, userId]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        };
        return date.toLocaleString("en-EN", options);
    };

    const calculateAnswerStats = () => {
        let unanswered = 0;

        test.responses.forEach((response) => {
            if (response.answerId === null) {
                unanswered++;
            } 
        });

        return unanswered;
    };

    const unanswered = calculateAnswerStats();

    return (
        <Container
            className="d-flex justify-content-center align-items-center mt-5 mb-5"
            style={{ minHeight: window.innerHeight - 124, flexDirection: "column" }}
        >
            <h2 style={{fontWeight: 'bold'}}>Results</h2>
            <Card style={{ width: 600, fontSize: "22px" }} className="p-5">
                <h2 style={{fontWeight: 'bold'}}>{test.currentTest.title}</h2>
                <div>{"Start time: " + formatDate(test.currentTestAttempt.startTime)}</div>
                <div>{"End time: " + formatDate(test.currentTestAttempt.endTime)}</div>
                <div>{"Passed by: " + test.currentTestAuthor.firstName + " " + test.currentTestAuthor.lastName}</div>
                <div>{"Answered: " + test.questions.length}</div>
                <div>{"Skipped: " + unanswered}</div>
                <div style={{fontWeight: 'bold'}}>{"Score: " + test.currentTestAttempt.score}</div>
            </Card>
            <Card style={{ width: 600, marginTop: "20px" }} className="p-5">
                <h3 style={{fontWeight: 'bold'}}>Answers:</h3>
                {test.questions.map((question, index) => (
                    <QuestionAnswerElement
                        key={question.id}
                        question={question}
                        index={index}
                        responses={test.responses}
                    />
                ))}
            </Card>
        </Container>
    );
});

export default TestResult;
