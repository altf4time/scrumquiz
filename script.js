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
        question: "Qu'est-ce qu'Agile ?",
        answers: [
            { text: "Une méthodologie rigide pour la gestion de projets", correct: false },
            { text: "Une philosophie qui met l'accent sur la flexibilité et la collaboration", correct: true },
            { text: "Un outil de gestion de tâches", correct: false },
            { text: "Un langage de programmation", correct: false }
        ],
        explanation: "Agile est une philosophie centrée sur la flexibilité et la collaboration, permettant une adaptation continue aux changements.",
        difficulty: 1
    },
    {
        question: "Quel est le rôle du Product Owner (PO) dans Scrum ?",
        answers: [
            { text: "Gérer les ressources financières du projet", correct: false },
            { text: "Représenter les intérêts des clients et définir les priorités du produit", correct: true },
            { text: "Superviser l'équipe de développement", correct: false },
            { text: "Tester le logiciel", correct: false }
        ],
        explanation: "Le Product Owner est responsable de maximiser la valeur du produit en priorisant le Product Backlog.",
        difficulty: 2
    },
    {
        question: "Quelle est la durée typique d'un Sprint dans Scrum ?",
        answers: [
            { text: "1 semaine", correct: false },
            { text: "2 à 4 semaines", correct: true },
            { text: "6 mois", correct: false },
            { text: "1 jour", correct: false }
        ],
        explanation: "Un Sprint dure généralement entre 2 et 4 semaines pour maintenir un rythme soutenable.",
        difficulty: 1
    },
    {
        question: "Quel est l'objectif du Daily Scrum ?",
        answers: [
            { text: "Planifier le projet entier", correct: false },
            { text: "Synchroniser l'équipe et identifier les obstacles", correct: true },
            { text: "Présenter le produit final au client", correct: false },
            { text: "Tester le logiciel", correct: false }
        ],
        explanation: "Le Daily Scrum permet à l'équipe de se synchroniser et d'identifier rapidement les blocages.",
        difficulty: 2
    },
    {
        question: "Qu'est-ce qu'un Product Backlog ?",
        answers: [
            { text: "Une liste de bugs à corriger", correct: false },
            { text: "Une liste priorisée des fonctionnalités à développer", correct: true },
            { text: "Un rapport financier du projet", correct: false },
            { text: "Un document de conception technique", correct: false }
        ],
        explanation: "Le Product Backlog est une liste dynamique et priorisée des exigences du produit.",
        difficulty: 2
    },
    {
        question: "Quel événement Scrum permet à l'équipe de réfléchir sur le sprint passé ?",
        answers: [
            { text: "Sprint Planning", correct: false },
            { text: "Sprint Review", correct: false },
            { text: "Sprint Retrospective", correct: true },
            { text: "Daily Scrum", correct: false }
        ],
        explanation: "La Sprint Retrospective est dédiée à l'amélioration continue des processus.",
        difficulty: 2
    },
    {
        question: "Quel artefact visuel est utilisé pour suivre l'avancement d'un sprint ?",
        answers: [
            { text: "Sprint Backlog", correct: false },
            { text: "Burndown Chart", correct: true },
            { text: "Product Backlog", correct: false }
        ],
        explanation: "Le Burndown Chart montre visuellement le travail restant dans le sprint.",
        difficulty: 2
    },
    {
        question: "Quelle est la taille optimale pour une équipe Scrum ?",
        answers: [
            { text: "1 à 3 membres", correct: false },
            { text: "3 à 9 membres", correct: true },
            { text: "10 à 15 membres", correct: false },
            { text: "Aucun maximum", correct: false }
        ],
        explanation: "Une équipe de 3 à 9 membres favorise la communication tout en restant efficace.",
        difficulty: 1
    },
    {
        question: "Que contient le Sprint Backlog ?",
        answers: [
            { text: "Toutes les fonctionnalités prévues", correct: false },
            { text: "Les éléments sélectionnés du Product Backlog", correct: true },
            { text: "Les tâches assignées par le Scrum Master", correct: false }
        ],
        explanation: "Le Sprint Backlog contient les éléments choisis pour le sprint et les tâches associées.",
        difficulty: 2
    },
    {
        question: "Lors de quelle réunion présente-t-on les résultats du sprint ?",
        answers: [
            { text: "Daily Scrum", correct: false },
            { text: "Sprint Review", correct: true },
            { text: "Sprint Planning", correct: false },
            { text: "Sprint Retrospective", correct: false }
        ],
        explanation: "La Sprint Review permet de présenter l'incrément aux stakeholders.",
        difficulty: 2
    },
    {
        question: "Quel est le rôle du Scrum Master ?",
        answers: [
            { text: "Gérer les tâches de l'équipe", correct: false },
            { text: "Faciliter le processus Scrum", correct: true },
            { text: "Définir les fonctionnalités", correct: false },
            { text: "Tester le logiciel", correct: false }
        ],
        explanation: "Le Scrum Master est un servant-leader qui facilite l'adoption de Scrum.",
        difficulty: 3
    },
    {
        question: "Quelle est la première étape du Sprint Planning ?",
        answers: [
            { text: "Identifier les obstacles", correct: false },
            { text: "Sélectionner les tâches du Product Backlog", correct: true },
            { text: "Tester les fonctionnalités", correct: false },
            { text: "Faire une rétrospective", correct: false }
        ],
        explanation: "Le Sprint Planning commence par la sélection des éléments du Product Backlog.",
        difficulty: 2
    },
    {
        question: "Qu'est-ce qu'un incrément dans Scrum ?",
        answers: [
            { text: "Une version non testée", correct: false },
            { text: "Une fonctionnalité non utilisable", correct: false },
            { text: "Un livrable fonctionnel", correct: true }
        ],
        explanation: "L'incrément doit être dans un état utilisable et potentiellement livrable.",
        difficulty: 3
    },
    // Nouvelles questions de tri
    {
        type: "sort",
        question: "Classez les rôles Scrum par ordre d'implication dans le Product Backlog :",
        answers: [
            { text: "Product Owner", correctOrder: 1 },
            { text: "Équipe de Développement", correctOrder: 2 },
            { text: "Stakeholders", correctOrder: 3 }
        ],
        explanation: "Ordre : 1) Product Owner (priorisation), 2) Équipe de Dev (estimation), 3) Stakeholders (feedback).",
        difficulty: 3
    },
    {
        type: "sort",
        question: "Ordre des activités dans un Sprint :",
        answers: [
            { text: "Revue de code", correctOrder: 2 },
            { text: "Développement", correctOrder: 1 },
            { text: "Documentation", correctOrder: 4 },
            { text: "Tests d'acceptation", correctOrder: 3 },
        ],
        explanation: "Le flux standard : Développement → Revue → Tests → Documentation.",
        difficulty: 2
    },
    {
        type: "sort",
        question: "Étapes de la résolution d'un obstacle :",
        answers: [
            { text: "Identifier l'obstacle", correctOrder: 1 },
            { text: "Implémenter la solution", correctOrder: 4 },
            { text: "Proposer des solutions", correctOrder: 3 },
            { text: "Analyser les causes", correctOrder: 2 },
        ],
        explanation: "Processus standard de résolution de problèmes en Scrum.",
        difficulty: 3
    },
    // Nouvelles questions multi-sélection
    {
        type: "multi-select",
        question: "Quels sont les artefacts Scrum ? (Sélectionnez tous les bons)",
        answers: [
            { text: "Product Backlog", correct: true },
            { text: "Burndown Chart", correct: false },
            { text: "Sprint Backlog", correct: true },
            { text: "Tableau Kanban", correct: false },
            { text: "Increment", correct: true }
        ],
        explanation: "Les 3 artefacts officiels : Product Backlog, Sprint Backlog, Increment.",
        difficulty: 3
    },
    {
        type: "multi-select",
        question: "Quels événements ont une durée fixe ?",
        answers: [
            { text: "Sprint Planning", correct: true },
            { text: "Daily Scrum", correct: true },
            { text: "Sprint Retrospective", correct: true },
            { text: "Revue de code", correct: false },
            { text: "Atelier de conception", correct: false }
        ],
        explanation: "Tous les événements Scrum ont une durée fixe sauf les activités techniques.",
        difficulty: 2
    },
    {
        type: "multi-select",
        question: "Quelles sont les responsabilités du Scrum Master ?",
        answers: [
            { text: "Faciliter les réunions", correct: true },
            { text: "Rédiger les user stories", correct: false },
            { text: "Supprimer les obstacles", correct: true },
            { text: "Prioriser le backlog", correct: false },
            { text: "Coacher l'équipe", correct: true }
        ],
        explanation: "Le Scrum Master facilite, coach et supprime les obstacles, mais ne gère pas le contenu.",
        difficulty: 3
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
    
    // Reset all interactive elements
    elements.answers.classList.remove('hidden');
    elements.sortContainer.classList.add('hidden');
    elements.multiSelectContainer.classList.add('hidden');
    elements.submitSort.classList.add('hidden');
    elements.submitMulti.classList.add('hidden');

    if (currentQuestion.type === 'sort') {
        elements.answers.classList.add('hidden');
        elements.sortContainer.classList.remove('hidden');
        elements.submitSort.classList.remove('hidden');
        createSortableItems();
    } else if (currentQuestion.type === 'multi-select') {
        elements.answers.classList.add('hidden');
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
        
        currentQuestion.answers.forEach(answer => {
            const div = document.createElement('div');
            const wasSelected = selectedAnswers.some(selected => selected.text === answer.text);
            
            // Highlighting logic
            let stateClass = '';
            if (answer.correct) {
                stateClass = wasSelected ? 'correct' : 'wrong'; // Green if selected, red if missed
            } else {
                stateClass = wasSelected ? 'wrong' : 'correct'; // Red if selected, green if avoided
            }
            
            div.className = `explanation-answer-item multi-select-item ${stateClass}`;
            div.textContent = answer.text;
            
            elements.explanationAnswers.appendChild(div);
        });

        // Scoring logic
        const correctAnswers = currentQuestion.answers.filter(a => a.correct);
        const allCorrectSelected = correctAnswers.every(ca => 
            selectedAnswers.some(sa => sa.text === ca.text)
        );
        const noIncorrectSelected = selectedAnswers.every(sa => sa.correct);
        
        if (allCorrectSelected && noIncorrectSelected) {
            quizState.score++;
            elements.score.textContent = quizState.score;
        }
    } else {
        let isCorrect = false;
        
        currentQuestion.answers.forEach(answer => {
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