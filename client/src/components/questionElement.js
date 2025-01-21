import React from 'react'
import Card from 'react-bootstrap/Card'

const QuestionElement = ({question}) => {

    return (
        <Card 
            style={{
                width: 200, 
                cursor: 'pointer', 
                padding: 10
            }} 
        >
            <div style={{
                maxWidth: 200,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
            }}>
                {question.questionText}
            </div>
        </Card>
    );
};

export default QuestionElement;