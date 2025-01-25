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
    submitMulti: document.getElementById('submit-multi'),
    mapContainer: document.getElementById('map-container'),
    submitMap: document.getElementById('submit-map')
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
    selectedMultiAnswers: [],
    selectedCountry: null,
    currentMap: null
};

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
    
    elements.submitMap.addEventListener('click', () => {
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
        selectedMultiAnswers: [],
        selectedCountry: null,
        currentMap: null
    };
    elements.score.textContent = '0';
    showScreen('question');
    loadQuestion();
}

function sortQuestions(questions, sortType) {
    switch(sortType) {
        case 'original': return questions;
        case 'hardest': return questions.sort((a, b) => b.difficulty - a.difficulty);
        default: return questions.sort(() => Math.random() - 0.5);
    }
}

function loadQuestion() {
    resetState();
    const currentQuestion = quizState.questions[quizState.currentIndex];
    
    elements.question.textContent = currentQuestion.question;
    elements.answers.innerHTML = '';
    elements.sortContainer.innerHTML = '';
    elements.multiSelectContainer.innerHTML = '';
    elements.mapContainer.innerHTML = '';
    
    elements.answers.classList.remove('hidden');
    elements.sortContainer.classList.add('hidden');
    elements.multiSelectContainer.classList.add('hidden');
    elements.mapContainer.classList.add('hidden');
    elements.submitSort.classList.add('hidden');
    elements.submitMulti.classList.add('hidden');
    elements.submitMap.classList.add('hidden');

    if (currentQuestion.type === 'sort') {
        handleSortQuestion(currentQuestion);
    } 
    else if (currentQuestion.type === 'multi-select') {
        handleMultiSelectQuestion(currentQuestion);
    }
    else if (currentQuestion.type === 'map') {
        handleMapQuestion();
    }
    else {
        handleDefaultQuestion(currentQuestion);
    }
    
    updateProgressBar();
    startTimer();
}

function handleSortQuestion(question) {
    elements.answers.classList.add('hidden');
    elements.sortContainer.classList.remove('hidden');
    elements.submitSort.classList.remove('hidden');
    createSortableItems(question);
}

function handleMultiSelectQuestion(question) {
    elements.answers.classList.add('hidden');
    elements.multiSelectContainer.classList.remove('hidden');
    elements.submitMulti.classList.remove('hidden');
    question.answers.forEach(answer => {
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
}

function handleMapQuestion() {
    elements.answers.classList.add('hidden');
    elements.mapContainer.classList.remove('hidden');
    elements.submitMap.classList.remove('hidden');
    loadMapQuestion();
}

function handleDefaultQuestion(question) {
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.className = 'btn';
        button.textContent = answer.text;
        button.dataset.correct = answer.correct;
        button.addEventListener('click', (e) => selectAnswer(e, answer));
        elements.answers.appendChild(button);
    });
}

function createSortableItems(question) {
    quizState.currentOrder = [...question.answers];
    
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

function loadMapQuestion() {
    elements.mapContainer.innerHTML = '<div id="country-map" style="height: 400px"></div>';
    
    quizState.currentMap = $('#country-map').vectorMap({
        map: 'world_en',
        backgroundColor: 'transparent',
        zoomOnScroll: false,
        regionStyle: {
            initial: {
                fill: '#e0e0e0',
                stroke: '#ffffff',
                strokeWidth: 0.5,
                cursor: 'pointer'
            }
        },
        onRegionClick: function(event, code) {
            $('.jvectormap-region').removeClass('selected');
            $(event.target).addClass('selected');
            quizState.selectedCountry = code.toUpperCase();
        }
    });
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
    if (['sort', 'multi-select'].includes(quizState.questions[quizState.currentIndex].type)) {
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
        handleSortExplanation(currentQuestion);
    } 
    else if (currentQuestion.type === 'multi-select') {
        handleMultiSelectExplanation(currentQuestion);
    }
    else if (currentQuestion.type === 'map') {
        handleMapExplanation(currentQuestion);
    }
    else {
        handleDefaultExplanation(currentQuestion);
    }
    
    elements.explanationText.textContent = currentQuestion.explanation;
    showScreen('explanation');
}

function handleSortExplanation(question) {
    const userOrder = quizState.currentOrder;
    const correctOrder = [...question.answers].sort((a, b) => a.correctOrder - b.correctOrder);

    userOrder.forEach((answer, index) => {
        const div = document.createElement('div');
        div.className = `explanation-answer-item ${answer.correctOrder === index + 1 ? 'correct' : 'wrong'}`;
        
        const position = document.createElement('span');
        position.textContent = `${index + 1}. `;
        position.style.fontWeight = 'bold';
        
        const text = document.createElement('span');
        text.textContent = answer.text;
        
        div.appendChild(position);
        div.appendChild(text);
        elements.explanationAnswers.appendChild(div);
    });

    const isFullyCorrect = userOrder.every((answer, index) => answer.correctOrder === index + 1);
    if (isFullyCorrect) {
        quizState.score++;
        elements.score.textContent = quizState.score;
    }
}

function handleMultiSelectExplanation(question) {
    const selectedAnswers = quizState.selectedMultiAnswers;
    
    question.answers.forEach(answer => {
        const div = document.createElement('div');
        const wasSelected = selectedAnswers.some(selected => selected.text === answer.text);
        
        let stateClass = '';
        if (answer.correct) {
            stateClass = wasSelected ? 'correct' : 'wrong';
        } else {
            stateClass = wasSelected ? 'wrong' : 'correct';
        }
        
        div.className = `explanation-answer-item multi-select-item ${stateClass}`;
        div.textContent = answer.text;
        elements.explanationAnswers.appendChild(div);
    });

    const correctAnswers = question.answers.filter(a => a.correct);
    const allCorrectSelected = correctAnswers.every(ca => 
        selectedAnswers.some(sa => sa.text === ca.text)
    );
    const noIncorrectSelected = selectedAnswers.every(sa => sa.correct);
    
    if (allCorrectSelected && noIncorrectSelected) {
        quizState.score++;
        elements.score.textContent = quizState.score;
    }
}

function handleMapExplanation(question) {
    if (quizState.currentMap) {
        try {
            const colors = {};
            const correctCode = question.correctCountry.toLowerCase();
            const userCode = quizState.selectedCountry?.toLowerCase();

            quizState.currentMap.reset();

            // Highlight correct country in dark green
            colors[correctCode] = '#2E7D32';

            // Highlight wrong selection in red if needed
            if (userCode && userCode !== correctCode) {
                colors[userCode] = '#D32F2F';
            }

            quizState.currentMap.setColors(colors);

            if (userCode === correctCode) {
                quizState.score++;
                elements.score.textContent = quizState.score;
            }

        } catch (error) {
            console.error('Map error:', error);
        }
    }
}

function handleDefaultExplanation(question) {
    let isCorrect = false;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.className = 'btn';
        button.textContent = answer.text;
        
        if (answer.correct) {
            button.classList.add('correct');
            if (quizState.selectedAnswer?.text === answer.text) {
                isCorrect = true;
            }
        } else if (quizState.selectedAnswer?.text === answer.text) {
            button.classList.add('wrong');
        }
        elements.explanationAnswers.appendChild(button);
    });

    if (isCorrect) {
        quizState.score++;
        elements.score.textContent = quizState.score;
    }
}

function nextQuestion() {
    if (quizState.currentMap) {
        $('#country-map').remove();
        quizState.currentMap = null;
    }
    
    quizState.currentIndex++;
    quizState.selectedAnswer = null;
    quizState.selectedMultiAnswers = [];
    quizState.selectedCountry = null;
    
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
    quizState.selectedCountry = null;
}

function updateProgressBar() {
    elements.progress.style.width = `${(quizState.currentIndex + 1) / quizState.questions.length * 100}%`;
}

function restartQuiz() {
    showScreen('start');
}

// Initialize the quiz
init();