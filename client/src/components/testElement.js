import React, { useContext } from 'react';
import { Context } from "../index";
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { TEST_ROUTE } from '../utils/consts';
import "../styles/testElement.css"; // Підключаємо CSS-файл

const colors = [
    '#6e995b', '#742727', '#635c5c', '#ddab35',
    '#df0808', '#3f7915', '#153f79', '#79153f'
];

const TestElement = ({ currentTest, index }) => {
    const navigate = useNavigate();
    const { test } = useContext(Context);

    const colorIndex = index % colors.length;
    const selectedColor = colors[colorIndex];

    return (
        <Card
            className="test-card"
            border="light"
            onClick={() => {
                test.setCurrentTest(currentTest);
                navigate(TEST_ROUTE + '/' + currentTest.id, { state: { color: selectedColor } });
            }}
        >
            <div className="test-card-header" style={{ backgroundColor: selectedColor }}>
                {currentTest.title}
            </div>
            <div className="test-card-body" style={{padding: '10px'}}>
                <div>{currentTest.description}</div>
            </div>
        </Card>
    );
};

export default TestElement;
