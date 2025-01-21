import React, { useContext } from 'react';
import { Context } from "../index";
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
import QuestionElement from './questionElement';
import { deleteQuestion } from '../http/questionAPI';
import editButton from '../assets/edit-button.png';
import deleteButton from '../assets/delete-button.png';

const QuestionList = observer(({ onEditQuestion }) => {
    const { test } = useContext(Context);
    const location = useLocation();
    const isEditPage = location.pathname.includes('/test/') && location.pathname.includes('/edit');

    const removeQuestion = async (questionId) => {
        if (questionId) {
            await deleteQuestion(questionId);
            test.setQuestions(test.questions.filter(q => q.id !== questionId));
        }
    };

    const changeQuestion = (question) => {
        if (onEditQuestion) {
            onEditQuestion(question);
        }
    };

    return (
        <div className='d-flex flex-column ml-4'>
            {test.questions.map((question, index) =>
                <div key={question.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: 400, marginTop: "5px" }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: '10px' }}>{index + 1}.</span> {/* Номер питання */}
                            <QuestionElement question={question} />
                        </div>
                        {isEditPage && (
                            <div style={{ display: 'flex', width: 200 }}>
                                <img onClick={() => changeQuestion(question)} style={{ width: 40, height: 40, cursor: "pointer", marginLeft: '5px' }} src={editButton} alt="Edit button"></img>
                                <img onClick={() => removeQuestion(question.id)} style={{ width: 40, height: 40, cursor: "pointer", marginLeft: '5px' }} src={deleteButton} alt="Delete button"></img>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
});

export default QuestionList;
