const elements = {
    startScreen: document.getElementById('start-screen'),
    questionScreen: document.getElementById('question-screen'),
    explanationScreen: document.getElementById('explanation-screen'),
    endScreen: document.getElementById('end-screen'),
    question: document.getElementById('question'),
    answers: document.getElementById('answer-buttons'),
    progress: document.getElementById('progress'),
    score: document.getElementById('score-value'),
    finalScore: document.getElementById('final-score'),
    explanationText: document.getElementById('explanation-text'),
    timeLeft: document.getElementById('time-left'),
    timerCircle: document.querySelector('.progress-circle'),
    explanationQuestion: document.getElementById('explanation-question'),
    explanationAnswers: document.getElementById('explanation-answers'),
    sortContainer: document.getElementById('sort-container'),
    submitSort: document.getElementById('submit-sort'),
    multiSelectContainer: document.getElementById('multi-select-container'),
    submitMulti: document.getElementById('submit-multi')
};

let quizState = {
    questions: [],
    currentIndex: 0,
    score: 0,
    timer: null,
    timePerQuestion: 15,
    selectedAnswer: null,
    sortType: 'random',
    currentOrder: [],
    selectedMultiAnswers: []
};

const questions = [
    {
        question: 'What is the recommended size of a Scrum team?',
        answers: [
            { text: '3-9 members', correct: true },
            { text: '10-15 members', correct: false },
            { text: '1-3 members', correct: false },
            { text: '20+ members', correct: false }
        ],
        explanation: 'The ideal Scrum team size is 3-9 members. This size allows for diverse skills while maintaining effective communication and coordination.',
        difficulty: 1
    },
    {
        question: 'How long is a typical Sprint?',
        answers: [
            { text: '1 week', correct: false },
            { text: '2 weeks', correct: true },
            { text: '1 month', correct: false },
            { text: '3 months', correct: false }
        ],
        explanation: 'A typical Sprint lasts 2 weeks. This duration provides a balance between making meaningful progress and adapting to changes quickly.',
        difficulty: 1
    },
    {
        question: 'Who is responsible for managing the Product Backlog?',
        answers: [
            { text: 'Scrum Master', correct: false },
            { text: 'Development Team', correct: false },
            { text: 'Product Owner', correct: true },
            { text: 'Stakeholders', correct: false }
        ],
        explanation: 'The Product Owner is responsible for managing the Product Backlog. They prioritize items and ensure the backlog reflects the product vision.',
        difficulty: 2
    },
    {
        question: 'What is the main purpose of the Daily Scrum?',
        answers: [
            { text: 'Plan for the day', correct: true },
            { text: 'Report to management', correct: false },
            { text: 'Solve problems', correct: false },
            { text: 'Assign tasks', correct: false }
        ],
        explanation: 'The main purpose of the Daily Scrum is to plan for the day. Team members synchronize their work and plan for the next 24 hours.',
        difficulty: 3
    },
    {
        question: 'Which of these is NOT a Scrum artifact?',
        answers: [
            { text: 'Product Backlog', correct: false },
            { text: 'Sprint Backlog', correct: false },
            { text: 'Burndown Chart', correct: true },
            { text: 'Increment', correct: false }
        ],
        explanation: 'The Burndown Chart is not an official Scrum artifact. The three Scrum artifacts are Product Backlog, Sprint Backlog, and Increment.',
        difficulty: 3
    },
    {
        type: 'sort',
        question: 'Arrange the Scrum events in chronological order:',
        answers: [
            { text: 'Daily Scrum', correctOrder: 2 },
            { text: 'Sprint Planning', correctOrder: 1 },

            { text: 'Sprint Retrospective', correctOrder: 4 },
            { text: 'Sprint Review', correctOrder: 3 }

        ],
        explanation: 'Correct order: 1) Sprint Planning, 2) Daily Scrum, 3) Sprint Review, 4) Sprint Retrospective. These events create regularity and minimize need for other meetings.',
        difficulty: 3
    },
    {
        type: 'multi-select',
        question: 'Which of these are Scrum values? (Select all that apply)',
        answers: [
            { text: 'Courage', correct: true },
            { text: 'Commitment', correct: true },  
            { text: 'Focus', correct: true },
            { text: 'Respect', correct: true },
            { text: 'Openness', correct: true },    
            { text: 'Transparency', correct: false }, 
            { text: 'Documentation', correct: false },
            { text: 'Micromanagement', correct: false }
        ],
        explanation: 'The five Scrum values are: Courage, Focus, Commitment, Respect, and Openness.',
        difficulty: 2
    }
];

function init() {
    document.getElementById('start-button').addEventListener('click', startQuiz);
    document.getElementById('next-button').addEventListener('click', nextQuestion);
    document.getElementById('restart-button').addEventListener('click', restartQuiz);
    elements.submitSort.addEventListener('click', () => {
        clearInterval(quizState.timer);
        showExplanation();
    });
    elements.submitMulti.addEventListener('click', () => {
        clearInterval(quizState.timer);
        showExplanation();
    });
}

function showScreen(screenName) {
    const screens = [
        elements.startScreen,
        elements.questionScreen,
        elements.explanationScreen,
        elements.endScreen
    ];
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(`${screenName}-screen`).classList.add('active');
}

function startQuiz() {
    const sortType = document.getElementById('sort-type').value;
    quizState = {
        questions: sortQuestions([...questions], sortType),
        currentIndex: 0,
        score: 0,
        timer: null,
        timePerQuestion: 15,
        selectedAnswer: null,
        sortType: sortType,
        currentOrder: [],
        selectedMultiAnswers: []
    };
    elements.score.textContent = '0';
    showScreen('question');
    loadQuestion();
}

function sortQuestions(questions, sortType) {
    switch(sortType) {
        case 'original':
            return questions;
        case 'hardest':
            return questions.sort((a, b) => b.difficulty - a.difficulty);
        default:
            return questions.sort(() => Math.random() - 0.5);
    }
}

function loadQuestion() {
    resetState();
    const currentQuestion = quizState.questions[quizState.currentIndex];
    
    elements.question.textContent = currentQuestion.question;
    elements.answers.innerHTML = '';
    elements.sortContainer.innerHTML = '';
    elements.multiSelectContainer.innerHTML = '';
    
    if (currentQuestion.type === 'sort') {
        elements.answers.classList.add('hidden');
        elements.sortContainer.classList.remove('hidden');
        elements.submitSort.classList.remove('hidden');
        createSortableItems();
    } else if (currentQuestion.type === 'multi-select') {
        elements.answers.classList.add('hidden');
        elements.sortContainer.classList.add('hidden');
        elements.multiSelectContainer.classList.remove('hidden');
        elements.submitMulti.classList.remove('hidden');
        
        currentQuestion.answers.forEach(answer => {
            const div = document.createElement('div');
            div.className = 'multi-select-item';
            div.textContent = answer.text;
            div.dataset.correct = answer.correct;
            
            div.addEventListener('click', () => {
                if (!quizState.selectedMultiAnswers.includes(answer)) {
                    quizState.selectedMultiAnswers.push(answer);
                    div.classList.add('selected');
                } else {
                    quizState.selectedMultiAnswers = quizState.selectedMultiAnswers.filter(a => a !== answer);
                    div.classList.remove('selected');
                }
            });
            
            elements.multiSelectContainer.appendChild(div);
        });
    } else {
        elements.answers.classList.remove('hidden');
        elements.sortContainer.classList.add('hidden');
        elements.submitSort.classList.add('hidden');
        elements.submitMulti.classList.add('hidden');
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.className = 'btn';
            button.textContent = answer.text;
            button.dataset.correct = answer.correct;
            button.addEventListener('click', (e) => selectAnswer(e, answer));
            elements.answers.appendChild(button);
        });
    }
    
    elements.progress.style.width = `${(quizState.currentIndex + 1) / quizState.questions.length * 100}%`;
    startTimer();
}

function createSortableItems() {
    quizState.currentOrder = [...quizState.questions[quizState.currentIndex].answers];
    
    quizState.currentOrder.forEach(answer => {
        const div = document.createElement('div');
        div.className = 'sortable-item';
        div.textContent = answer.text;
        div.draggable = true;
        
        div.addEventListener('dragstart', () => {
            div.classList.add('dragging');
            div.style.opacity = '0.8';
        });
        
        div.addEventListener('dragend', () => {
            div.classList.remove('dragging');
            div.style.opacity = '1';
            saveCurrentOrder();
        });
        
        elements.sortContainer.appendChild(div);
    });

    elements.sortContainer.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(elements.sortContainer, e.clientY);
        const draggable = document.querySelector('.dragging');
        
        if (!draggable) return;
        
        const placeholder = document.createElement('div');
        placeholder.className = 'sortable-placeholder';
        
        if (afterElement) {
            elements.sortContainer.insertBefore(placeholder, afterElement);
        } else {
            elements.sortContainer.appendChild(placeholder);
        }
        
        if (afterElement) {
            elements.sortContainer.insertBefore(draggable, afterElement);
        } else {
            elements.sortContainer.appendChild(draggable);
        }
        
        requestAnimationFrame(() => {
            if (placeholder.parentElement) {
                placeholder.remove();
            }
        });
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.sortable-item:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function saveCurrentOrder() {
    quizState.currentOrder = Array.from(elements.sortContainer.children)
        .filter(item => item.classList.contains('sortable-item'))
        .map(item => quizState.questions[quizState.currentIndex].answers.find(a => a.text === item.textContent));
}

function startTimer() {
    let timeLeft = quizState.timePerQuestion;
    elements.timeLeft.textContent = timeLeft;
    elements.timerCircle.style.strokeDashoffset = 113;
    
    quizState.timer = setInterval(() => {
        timeLeft--;
        elements.timeLeft.textContent = timeLeft;
        elements.timerCircle.style.strokeDashoffset = 113 - (113 * (1 - timeLeft / quizState.timePerQuestion));
        
        if (timeLeft <= 0) handleTimeout();
    }, 1000);
}

function handleTimeout() {
    clearInterval(quizState.timer);
    if (quizState.questions[quizState.currentIndex].type === 'sort' || 
        quizState.questions[quizState.currentIndex].type === 'multi-select') {
        showExplanation();
    } else {
        highlightAnswers();
        showExplanation();
    }
}

function selectAnswer(event, answer) {
    clearInterval(quizState.timer);
    quizState.selectedAnswer = answer;
    highlightAnswers(event.target);
    showExplanation();
}

function highlightAnswers(selectedButton) {
    const correctAnswer = elements.answers.querySelector('[data-correct="true"]');
    if (correctAnswer) correctAnswer.classList.add('correct');
    
 
    if (selectedButton && selectedButton.dataset.correct !== 'true') {
        selectedButton.classList.add('wrong');
    }
    
    
    Array.from(elements.answers.children).forEach(button => {
        button.disabled = true;
    });
}

function showExplanation() {
    const currentQuestion = quizState.questions[quizState.currentIndex];
    elements.explanationQuestion.textContent = currentQuestion.question;
    elements.explanationAnswers.innerHTML = '';

    if (currentQuestion.type === 'sort') {
        const userOrder = quizState.currentOrder;
        const correctOrder = [...currentQuestion.answers].sort((a, b) => a.correctOrder - b.correctOrder);

        userOrder.forEach((answer, index) => {
            const div = document.createElement('div');
            div.className = `explanation-answer-item ${
                answer.correctOrder === index + 1 ? 'correct' : 'wrong'
            }`;
            
            const position = document.createElement('span');
            position.textContent = `${index + 1}. `;
            position.style.fontWeight = 'bold';
            
            const text = document.createElement('span');
            text.textContent = answer.text;
            
            div.appendChild(position);
            div.appendChild(text);
            elements.explanationAnswers.appendChild(div);
        });

        const isFullyCorrect = userOrder.every((answer, index) => 
            answer.correctOrder === index + 1
        );
        if (isFullyCorrect) {
            quizState.score++;
            elements.score.textContent = quizState.score;
        }
    } else if (currentQuestion.type === 'multi-select') {
        const selectedAnswers = quizState.selectedMultiAnswers;
        const correctAnswers = currentQuestion.answers.filter(a => a.correct);
        
        currentQuestion.answers.forEach(answer => {
            const div = document.createElement('div');
            const wasSelected = selectedAnswers.some(selected => selected.text === answer.text);
            
            // Dynamic class assignment
            let stateClass = '';
            if (answer.correct) {
                stateClass = 'correct'; // Always highlight correct answers
            } else if (wasSelected) {
                stateClass = 'wrong'; // Highlight incorrectly selected answers
            }
            
            div.className = `explanation-answer-item multi-select-item ${stateClass}`;
            div.textContent = answer.text;
            
            elements.explanationAnswers.appendChild(div);
        });

        // Update scoring logic
        const allCorrectSelected = correctAnswers.every(ca => 
            selectedAnswers.some(sa => sa.text === ca.text)
        );
        const noIncorrectSelected = selectedAnswers.every(sa => sa.correct);
        
        if (allCorrectSelected && noIncorrectSelected) {
            quizState.score++;
            elements.score.textContent = quizState.score;
        }
    } else {
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.className = 'btn';
            button.textContent = answer.text;
            if (answer.correct) {
                button.classList.add('correct');
            } else if (quizState.selectedAnswer === answer) {
                button.classList.add('wrong');
            }
            elements.explanationAnswers.appendChild(button);
        });
    }
    
    elements.explanationText.textContent = currentQuestion.explanation;
    showScreen('explanation');
}

function nextQuestion() {
    quizState.currentIndex++;
    quizState.selectedAnswer = null;
    quizState.selectedMultiAnswers = [];
    
    if (quizState.currentIndex < quizState.questions.length) {
        showScreen('question');
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    elements.finalScore.textContent = `${quizState.score}/${quizState.questions.length}`;
    showScreen('end');
}

function resetState() {
    clearInterval(quizState.timer);
    elements.timeLeft.textContent = quizState.timePerQuestion;
    elements.timerCircle.style.strokeDashoffset = 113;
    quizState.selectedMultiAnswers = [];
}

function restartQuiz() {
    showScreen('start');
}

init();