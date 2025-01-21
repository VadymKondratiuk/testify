import React, { useContext } from 'react';
import { Context } from "../index";
import { observer } from 'mobx-react-lite';

const AnswerList = observer(({ question }) => {
    const { test } = useContext(Context);

    const answers = test.answers.filter(answer => answer.questionId === question.id);

    return (
        <div>
            {answers.map(answer => (
                <div key={answer.id} style={{ marginBottom: '5px', marginLeft: '20px'}}> 
                    <input
                        type={question.questionType === 'singleChoice' ? 'radio' : 'checkbox'}
                        name={`question-${question.id}`}
                        value={answer.id}
                        required
                        style={{ marginRight: '5px' }}
                    />
                    <label>{answer.answerText}</label>
                </div>
            ))}
        </div>
    );
    
});

export default AnswerList;
