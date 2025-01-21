import { observer } from "mobx-react-lite";
import { Context } from "../index";
import React, { useEffect, useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { fetchTests, createTest } from "../http/testAPI";
import { fetchTestAttempts } from "../http/testAttemptAPI";
import TestList from "../components/testList";
import ResultList from "../components/resultList";
import { jwtDecode } from "jwt-decode";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import UserInfo from "../components/userInfo";
import UserEditor from "../components/userEditor"
import { HOME_ROUTE } from "../utils/consts";
import "../styles/user.css";

const User = observer(() => {
    const { test, user } = useContext(Context);
    const navigate = useNavigate();

    const [userEditorVisible, setUserEditorVisible] = useState(false)

    const userId = jwtDecode(localStorage.getItem("token")).id;

    useEffect(() => {
        fetchTests(userId).then((data) => test.setTests(data.rows));
    }, [userId, test]);

    useEffect(() => {
        fetchTestAttempts(null, userId).then((data) => {
            test.setTestAttempts(data.rows);
        });
    }, [userId, test]);

    const createNewTest = async () => {
        const newTest = {
            title: "New Test",
            description: "New Description",
            userId: userId,
        };

        const createdTest = await createTest(newTest);

        if (createdTest) {
            test.setCurrentTest(createdTest);
            navigate("/test/" + createdTest.id + "/edit");
        } else {
            console.log("Error creating test");
        }
    };

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.clear()
        navigate(HOME_ROUTE)
    }

    return (
        <Container>
            <Row className="mt-3">
                <Col md={4}>
                    <h2>User data:</h2>
                    <Card className="user-info-card" style={{backgroundColor: '#daebf7'}}>
                        <UserInfo />
                        <div style={{display: 'flex'}}>
                            <Button variant='danger' style={{margin: '', width: 100, height: 40}} onClick={logOut}>Log out</Button>
                            <Button variant='success' style={{marginLeft: '10px', width: 100, height: 40}} onClick={() => setUserEditorVisible(true)}>Edit</Button>
                        </div>
                    </Card>
                </Col>
                <Col md={8}>
                    <div className="test-header">
                        <h2>Your tests:</h2>
                        <Button variant="primary" className="create-test-btn" onClick={createNewTest}>
                            Create New Test
                        </Button>
                    </div>

                    <Card className="test-list-card" style={{backgroundColor: '#daebf7'}}>
                        <TestList tests={test.tests}/>
                    </Card>

                    <h2>Your results:</h2>
                    <Card className="result-list-card" style={{backgroundColor: '#daebf7'}}>
                        <ResultList />
                    </Card>
                </Col>
            </Row>
            <UserEditor
                show={userEditorVisible} 
                onHide={() => setUserEditorVisible(false)}
            />
        </Container>
    );
});

export default User;
