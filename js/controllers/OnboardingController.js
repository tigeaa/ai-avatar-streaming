export class OnboardingController {
    constructor(onTestComplete) {
        this.onTestComplete = onTestComplete;
        this.testProblems = this.generateTestProblems(5); // 5 problems for the test
        this.currentProblemIndex = 0;
        this.results = []; // To store the time taken for each problem
        this.startTime = 0;

        // Bind methods
        this.startTest = this.startTest.bind(this);
        this.nextProblem = this.nextProblem.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
    }

    /**
     * Generates a set of simple arithmetic problems.
     * @param {number} count - The number of problems to generate.
     * @returns {Array<Object>} An array of problem objects.
     */
    generateTestProblems(count) {
        const problems = [];
        for (let i = 0; i < count; i++) {
            const num1 = Math.floor(Math.random() * 10) + 1; // 1-10
            const num2 = Math.floor(Math.random() * 10) + 1; // 1-10
            problems.push({
                text: `${num1} + ${num2} = ?`,
                answer: num1 + num2,
            });
        }
        return problems;
    }

    /**
     * Starts the calculation speed test.
     */
    startTest() {
        this.currentProblemIndex = 0;
        this.results = [];
        this.nextProblem();
    }

    /**
     * Displays the next problem in the test or ends the test if all problems are done.
     */
    nextProblem() {
        if (this.currentProblemIndex >= this.testProblems.length) {
            this.endTest();
            return;
        }

        const problem = this.testProblems[this.currentProblemIndex];
        const modalContent = document.querySelector('#onboarding-modal .modal-content');

        modalContent.innerHTML = `
            <h2>計算速度テスト (${this.currentProblemIndex + 1}/${this.testProblems.length})</h2>
            <p class="problem-text">${problem.text}</p>
            <input type="number" id="test-answer-input" class="test-input">
            <button id="test-submit-button" class="btn btn-primary">回答</button>
        `;

        document.getElementById('test-submit-button').addEventListener('click', this.handleAnswer);
        document.getElementById('test-answer-input').focus();

        this.startTime = Date.now();
    }

    /**
     * Handles the user's answer submission.
     */
    handleAnswer() {
        const answerInput = document.getElementById('test-answer-input');
        const userAnswerRaw = answerInput.value;

        if (userAnswerRaw.trim() === '' || isNaN(userAnswerRaw)) {
            alert('有効な数値を入力してください。');
            answerInput.value = '';
            answerInput.focus();
            return;
        }

        const endTime = Date.now();
        const timeTaken = (endTime - this.startTime) / 1000; // in seconds
        this.results.push(timeTaken);

        const userAnswer = parseInt(userAnswerRaw, 10);
        const correctAnswer = this.testProblems[this.currentProblemIndex].answer;

        if (userAnswer !== correctAnswer) {
            // Simple handling for wrong answers - just record time and move on
            console.warn(`Incorrect answer. User answered ${userAnswer}, correct was ${correctAnswer}`);
        }

        this.currentProblemIndex++;
        this.nextProblem();
    }

    /**
     * Ends the test and calculates the average time.
     */
    endTest() {
        const averageTime = this.results.reduce((a, b) => a + b, 0) / this.results.length;
        console.log(`Test complete. Average time: ${averageTime.toFixed(2)} seconds`);

        if (this.onTestComplete) {
            this.onTestComplete(averageTime);
        }
    }
}
