import React, { useContext } from 'react';
import { Context } from "../index";
import { observer } from 'mobx-react-lite';
import Row from 'react-bootstrap/Row';
import StatElement from './statElement';

const ResultList = observer(() => {
    const { test } = useContext(Context);

    return (
        <Row className="d-flex justify-content-around">
            {test.testAttempts.map((currentTestAttempt, index) => (
                <div key={currentTestAttempt.id}>
                    <StatElement currentTestAttempt={currentTestAttempt} index={index} />
                </div>  
            ))}
        </Row>
    );
});

export default ResultList;
