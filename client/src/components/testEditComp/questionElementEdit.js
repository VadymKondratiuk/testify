import React from 'react'
import Card from 'react-bootstrap/Card'

const QuestionElementEdit = ({ question, onQuestionChange }) => {

    return (
        <Card 
            style={{
                width: 200, 
                cursor: 'pointer', 
                display: 'flex', 
                padding: 10
            }} 
            border={'light'}
        >
            <input
                type="text"
                value={question.questionText}
                onChange={(e) => onQuestionChange(question.id, e.target.value)}
                style={{ marginBottom: "10px", width: "100%" }}
            />
        </Card>
    );
};

export default QuestionElementEdit;