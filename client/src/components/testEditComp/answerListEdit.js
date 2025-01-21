import React, { useContext } from 'react';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import { deleteAnswer } from '../../http/answerAPI';
import deleteButton from '../../assets/delete-button.png';
import { Form } from 'react-bootstrap';

const AnswerListEdit = observer(() => {
    const { test } = useContext(Context);

    const handleAnswerChange = (e, answerId) => {
        const { value } = e.target;

        const updatedAnswers = test.answers.map(answer =>
            answer.id === answerId ? { ...answer, answerText: value } : answer
        );

        test.setAnswers(updatedAnswers);
    };

    const removeAnswer = async (answerId) => {
        await deleteAnswer(answerId);
        const updatedAnswers = test.answers.filter(answer => answer.id !== answerId);
        test.setAnswers(updatedAnswers);
    };

    const toogleAnswerCorrectness = (answerId) => {
        const updatedAnswers = test.answers.map(answer =>
            answer.id === answerId ? { ...answer, isCorrect: !answer.isCorrect } : answer
        );
        test.setAnswers(updatedAnswers);
    };

    return (
        <div>
            {test.answers.map((answer) => (
                <div key={answer.id} style={{ marginBottom: "5px", marginLeft: "20px", display: 'flex', marginTop: "10px" }}>
                    <Form.Control
                        type="text"
                        value={answer.answerText}
                        onChange={(e) => handleAnswerChange(e, answer.id)}
                        style={{ marginRight: "5px", width: 200 }}
                        placeholder='Answer text'
                    />
                    <img onClick={() => removeAnswer(answer.id)} style={{ width: 40, height: 40, cursor: "pointer" }} src={deleteButton} alt="Delete button"></img>
                    <button
                        onClick={() => toogleAnswerCorrectness(answer.id)}
                        style={{
                            width: 80,
                            marginLeft: 10,
                            border: 'none',
                            borderRadius: '10px',
                            backgroundColor: answer.isCorrect ? '#30cc1f' : 'red',
                            color: 'white',
                        }}
                    >
                        {answer.isCorrect ? 'Correct' : 'Incorrect'}
                    </button>
                </div>
            ))}
        </div>
    );
});

export default AnswerListEdit;
