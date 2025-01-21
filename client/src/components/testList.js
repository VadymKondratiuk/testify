import React, { useContext } from 'react';
import { Context } from "../index";
import { observer } from 'mobx-react-lite';
import Row from 'react-bootstrap/Row';
import TestElement from './testElement';
import { useLocation, useNavigate } from 'react-router-dom';
import { USER_ROUTE, TEST_ROUTE } from '../utils/consts';
import { deleteTest } from '../http/testAPI';
import editButton from '../assets/edit-button.png';
import statsButton from '../assets/stats-button.png';
import deleteButton from '../assets/delete-button.png';

const TestList = observer(({ tests }) => {
    const { test } = useContext(Context);
    const location = useLocation(); 
    const navigate = useNavigate();

    const updateTest = (currentTest) => {
        test.setCurrentTest(currentTest);
        navigate(TEST_ROUTE + '/' + currentTest.id + '/edit');
    };

    const deleteCurrentTest = async(currentTest) => {
        await deleteTest(currentTest.id);
        test.setTests(test.tests.filter(test => test.id !== currentTest.id));
        console.log(currentTest.id);
    };

    const navigateToStats = (currentTest) => {
        test.setCurrentTest(currentTest);
        navigate(TEST_ROUTE + '/' + currentTest.id + '/stats');
    };

    return (
        <Row className="d-flex justify-content-around">
            {tests.map((currentTest, index) => ( 
                <div key={currentTest.id}>
                    <TestElement currentTest={currentTest} index={index} />
                    {location.pathname === USER_ROUTE ? 
                        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px', marginBottom: '10px'}}>
                            <img onClick={() => updateTest(currentTest)} style={{ width: 40, height: 40, cursor: "pointer" }} src={editButton} alt="Edit button" />
                            <img onClick={() => navigateToStats(currentTest)} style={{ width: 40, height: 40, cursor: "pointer" }} src={statsButton} alt="Stats button" />
                            <img onClick={() => deleteCurrentTest(currentTest)} style={{ width: 40, height: 40, cursor: "pointer" }} src={deleteButton} alt="Delete button" />
                        </div>
                        :
                        <div></div>
                    }
                </div>  
            ))} 
        </Row>
    );
});

export default TestList;
