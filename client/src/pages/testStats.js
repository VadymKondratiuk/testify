import { observer } from "mobx-react-lite";
import { Context } from "../index";
import React, { useEffect, useContext, useState} from "react";
import { fetchTestAttempts } from "../http/testAttemptAPI";
import StatsList from "../components/statList";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "../styles/user.css";
import { jwtDecode } from "jwt-decode";
import { HOME_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";

const TestStats = observer(() => {
    const { test } = useContext(Context);
    const userId = jwtDecode(localStorage.getItem('token')).id
    const navigate = useNavigate()
    
    useEffect(() => {
        if(test.currentTest.userId !== userId){
            navigate(HOME_ROUTE)
        }        
        fetchTestAttempts(test.currentTest.id, null).then((data) => {
            test.setTestAttempts(data.rows);
        });
    }, [test.currentTest.id, test, navigate, userId]);

    const calcAVGscore = () => {
        if (test.testAttempts.length === 0) {
            return 0; 
        }
    
        const totalScore = test.testAttempts.reduce((sum, testAttempt) => {
            return sum + parseFloat(testAttempt.score); 
        }, 0);
    
        const avgScore = totalScore / test.testAttempts.length;
    
        return avgScore.toFixed(2); 
    };


    const calcAVGDuration = () => {
        if (test.testAttempts.length === 0) {
            return "0 minutes"; 
        }
    
        const totalDuration = test.testAttempts.reduce((sum, testAttempt) => {
            const startTime = new Date(testAttempt.startTime); 
            const endTime = new Date(testAttempt.endTime); 
            const duration = endTime - startTime; 
            return sum + duration;
        }, 0);
    
        const avgDuration = totalDuration / test.testAttempts.length;
    
        const minutes = Math.floor(avgDuration / (1000 * 60));
        const seconds = Math.floor((avgDuration % (1000 * 60)) / 1000);
    
        return `${minutes} minutes ${seconds} seconds`;
    };
    
    return (
        <Container style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
            <Card style={{ width: 600, fontSize: "22px" }} className="p-5 mt-4">
                <h1>{"Test: " + test.currentTest.title}</h1>
                <div>{"Total Attempts: " + test.testAttempts.length}</div>
                <div>{"AVG Score: " + calcAVGscore()}</div>
                <div>{"AVG Duration: " + calcAVGDuration()}</div>

            </Card>
            <Card className="result-list-card mt-4" style={{minWidth: '600px'}}>
                <h1>All Results:</h1>
                <StatsList />
            </Card>
        </Container>
    );
});

export default TestStats;
