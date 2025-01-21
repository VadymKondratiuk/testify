import { makeAutoObservable } from "mobx";

export default class TestStore {
    constructor() {
        this._tests = [];

        this._questions = [];
        this._answers = [];

        this._tags = [];

        this._selectedAnswer = {};
        this._selectedAnswers = [];

        this._testAttempts = [];

        this._currentTestAttempt = {};
        this._responses = [];

        this._currentTest = {};
        this._currentQuestion = {};
        this._startTime = null;
        this._endTime = null;

        this._currentTestAuthor = {};

        makeAutoObservable(this);
    }

    setCurrentTestAuthor(currentTestAuthor) {
        this._currentTestAuthor = currentTestAuthor
    } 

    setTestAttempts(testAttempts) {
        this._testAttempts = testAttempts;
    }

    setResponses(responses) {
        this._responses = responses;
    }

    setCurrentTestAttempt(testAttempt) {
        this._currentTestAttempt = testAttempt;
    }

    setSelectedAnswer(answer) {
        this._selectedAnswer = answer;
    }

    setSelectedAnswers(answers) {
        this._selectedAnswers = answers;
    }

    setCurrentQuestion(question) {
        this._currentQuestion = question;
    }

    setTests(tests) {
        this._tests = tests;
    }

    setQuestions(questions) {
        this._questions = questions;
    }

    setAnswers(answers) {
        this._answers = answers;
    }

    setStartTime() {
        this._startTime = new Date();
    }

    setEndTime() {
        this._endTime = new Date();
    }

    setCurrentTest(test) {
        this._currentTest = test;
    }

    get startTime() {
        return this._startTime;
    }

    get endTime() {
        return this._endTime;
    }

    get tests() {
        return this._tests;
    }

    get questions() {
        return this._questions;
    }

    get answers() {
        return this._answers;
    }

    get currentTest() {
        return this._currentTest;
    }

    get currentQuestion() {
        return this._currentQuestion;
    }

    get selectedAnswers() {
        return this._selectedAnswers;
    }

    get selectedAnswer() {
        return this._selectedAnswer;
    }

    get currentTestAttempt() {
        return this._currentTestAttempt;
    }

    get testAttempts() {
        return this._testAttempts
    }

    get responses() {
        return this._responses
    }

    get currentTestAuthor() {
        return this._currentTestAuthor
    }
}
