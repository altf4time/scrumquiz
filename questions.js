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
    },
    // {
    //     type: "map",
    //     question: "Sélectionnez le pays où le framework Scrum a été officiellement défini pour la première fois :",
    //     mapSVG: "world-map.svg",
    //     correctCountry: "us",
    //     explanation: "Scrum a été formalisé aux États-Unis par Jeff Sutherland et Ken Schwaber en 1995.",
    //     difficulty: 2
    // },
    // {
    //     type: "map",
    //     question: "Où est né le mouvement Agile qui a influencé Scrum ?",
    //     mapSVG: "world-map.svg",
    //     correctCountry: "jp",
    //     explanation: "Bien que le manifeste Agile ait été signé aux USA, les concepts clés viennent du système de production Toyota au Japon.",
    //     difficulty: 3
    // },
    // {
    //     type: "map",
    //     question: "Dans quel pays a été signé le Manifeste Agile ?",
    //     mapSVG: "world-map.svg",
    //     correctCountry: "us",
    //     explanation: "Le Manifeste Agile a été rédigé en 2001 dans l'Utah, aux États-Unis.",
    //     difficulty: 2
    // },
    {
        type: "map",
        question: "Dans quel pays est né le framework SAFe (Scaled Agile Framework)?",
        correctCountry: "us",
        explanation: "SAFe a été développé par Dean Leffingwell aux États-Unis pour adapter Agile aux grandes entreprises.",
        difficulty: 2
    },

    // Nouvelle question 2
    {
        type: "map",
        question: "Où a été créée la méthodologie Kanban pour le développement logiciel?",
        correctCountry: "jp",
        explanation: "Kanban a été adapté au développement logiciel par Toyota au Japon, inspiré de leur système de production.",
        difficulty: 3
    },

    // Nouvelle question 3
    {
        type: "map",
        question: "Dans quel pays a émergé la méthode Extreme Programming (XP)?",
        correctCountry: "us",
        explanation: "XP a été formalisé par Kent Beck aux États-Unis dans les années 1990.",
        difficulty: 2
    }

];