import React, {useContext} from 'react'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import QuestionElementEdit from './questionElementEdit'
import AnswerListEdit from './answerListEdit'


const QuestionListEdit = observer(() => {
    const {test} = useContext(Context)

    const handleQuestionChange = (questionId, value) => {
        const updatedQuestions = test.questions.map((question) =>
            question.id === questionId ? { ...question, questionText: value } : question
        );
        test.setQuestions(updatedQuestions);
    };

    return (
        <div className="d-flex flex-column ml-5">
            {test.questions.map((question) => (
                <div key={question.id}>
                    <QuestionElementEdit
                        question={question}
                        onQuestionChange={handleQuestionChange}
                    />
                    <AnswerListEdit question={question} />
                </div>
            ))}
        </div>
    )
})

export default QuestionListEdit