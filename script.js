document.addEventListener('DOMContentLoaded', () => {
    // --- INICIO: CONFIGURACIÓN Y SERVICIOS DE FIREBASE ---
    // ESTA ES TU CONFIGURACIÓN PERSONALIZADA DE FIREBASE
    const firebaseConfig = {
        apiKey: "AIzaSyD8ylepVkzwrocqQy-xMXhokfXhnOeY1dg",
        authDomain: "huawei-test-a299c.firebaseapp.com",
        projectId: "huawei-test-a299c",
        storageBucket: "huawei-test-a299c.firebasestorage.app",
        messagingSenderId: "135933806476",
        appId: "1:135933806476:web:63726d908397072b5a38a9",
        measurementId: "G-28EQVGQS2B"
      };

    // Inicializar Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();
    // --- FIN: CONFIGURACIÓN Y SERVICIOS DE FIREBASE ---


    // --- STATE MANAGEMENT ---
    let appState = {
        user: null,
        currentView: 'selector-view',
        exams: {},
        settings: {
            timeLimit: 0,
            questionOrder: 'random',
            answerOrder: 'random',
            syncMode: 'sync', // 'sync' o 'local'. Por defecto 'sync'.
            showSidebar: 'disabled',
            sidebarCollapsed: false,
            showImages: 'yes',
        },
        stats: {},
        currentTest: null,
        timerInterval: null,
    };

    // --- GESTURE & MODAL STATE ---
    let modalCurrentQuestion = null;
    let touchStartX = 0;
    let touchStartY = 0;
    let longPressTimer = null;
    let lastTapTime = 0;


    // --- DOM ELEMENTS ---
    const views = {
        selector: document.getElementById('selector-view'),
        test: document.getElementById('test-view'),
        results: document.getElementById('results-view'),
        stats: document.getElementById('stats-view'),
        settings: document.getElementById('settings-view'),
    };
    const navButtons = {
        selector: document.getElementById('nav-selector'),
        stats: document.getElementById('nav-stats'),
        settings: document.getElementById('nav-settings'),
    };
    const authContainer = document.getElementById('auth-container');
    const userStatusContainer = document.getElementById('user-status');
    const loginContainer = document.getElementById('login-container');
    const userEmailSpan = document.getElementById('user-email');
    const loginAnonymousBtn = document.getElementById('login-anonymous-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const examListContainer = document.getElementById('exam-list-container');
    const loaderStatus = document.getElementById('loader-status');
    const testTitle = document.getElementById('test-title');
    const questionCounter = document.getElementById('question-counter');
    const timerDisplay = document.getElementById('timer');
    const questionContainer = document.getElementById('question-container');
    const questionSidebar = document.getElementById('question-sidebar');
    const sidebarContent = document.getElementById('sidebar-content');
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const questionText = document.getElementById('question-text');
    const questionImageContainer = document.getElementById('question-image-container');
    const optionsContainer = document.getElementById('options-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finishBtn = document.getElementById('finish-btn');
    const showAnswerBtn = document.getElementById('show-answer-btn');
    const backToHomeBtn = document.getElementById('back-to-home-btn');
    const resultsSummary = document.getElementById('results-summary');
    const reviewContainer = document.getElementById('review-container');
    const examTitleSummarySpan = document.querySelector('.exam-title-summary span');
    const restartTestBtn = document.getElementById('restart-test-btn');
    const resumeContainer = document.getElementById('resume-test-container');
    const resumeBtn = document.getElementById('resume-btn');
    const statsExamSelect = document.getElementById('stats-exam-select');
    const statsDetailsContainer = document.getElementById('stats-details');
    const failedQuestionsList = document.getElementById('failed-questions-list');
    const readinessContainer = document.getElementById('readiness-container');
    const resetStatsBtn = document.getElementById('reset-stats-btn');
    const settingsSavedMsg = document.getElementById('settings-saved-msg');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContainer = document.getElementById('modal-container');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalQuestionText = document.getElementById('modal-question-text');
    const modalOptionsContainer = document.getElementById('modal-options-container');
    const modalCheckBtn = document.getElementById('modal-check-btn');
    const modalCorrectAnswer = document.getElementById('modal-correct-answer');


    // --- LÓGICA DE AUTENTICACIÓN Y DATOS ---
    const onAuthStateChanged = (user) => {
        appState.user = user ? { uid: user.uid, isAnonymous: user.isAnonymous } : null;
        updateAuthUI();
        loadPausedTest(); // Comprueba si hay un examen pausado según la configuración actual.
    };
    
    const updateAuthUI = () => {
        if (appState.user) {
            userEmailSpan.textContent = `Sesión iniciada como: Anónimo (${appState.user.uid.substring(0, 6)}...)`;
            userStatusContainer.classList.remove('hidden');
            loginContainer.classList.add('hidden');
        } else {
            userStatusContainer.classList.add('hidden');
            loginContainer.classList.remove('hidden');
        }
    };

    const signInAnonymously = () => auth.signInAnonymously().catch(error => console.error("Error al iniciar sesión:", error));
    const signOut = () => auth.signOut();

    // --- LÓGICA DE GUARDADO/CARGA CONDICIONAL ---

    // Funciones específicas de Firestore
    const saveTestToFirestore = () => {
        if (!appState.user || !appState.currentTest || appState.currentTest.isFinished) return;
        const additionalTime = appState.currentTest.startTime ? (Date.now() - appState.currentTest.startTime) / 1000 : 0;
        const testStateToSave = {
            ...appState.currentTest,
            timeElapsed: appState.currentTest.timeElapsed + additionalTime
        };
        db.collection('pausedExams').doc(appState.user.uid).set(testStateToSave).catch(e => console.error("Error guardando en Firestore:", e));
    };
    const loadTestFromFirestore = async () => {
        if (!appState.user) return null;
        try {
            const doc = await db.collection('pausedExams').doc(appState.user.uid).get();
            return doc.exists ? doc.data() : null;
        } catch (error) {
            console.error("Error cargando desde Firestore:", error);
            return null;
        }
    };
    const clearTestFromFirestore = () => {
        if (appState.user) {
            db.collection('pausedExams').doc(appState.user.uid).delete().catch(e => console.error("Error eliminando de Firestore:", e));
        }
    };

    // Funciones específicas de LocalStorage
    const saveTestToLocalStorage = () => {
        if (!appState.currentTest || appState.currentTest.isFinished) return;
        const additionalTime = appState.currentTest.startTime ? (Date.now() - appState.currentTest.startTime) / 1000 : 0;
        const testStateToSave = {
            ...appState.currentTest,
            timeElapsed: appState.currentTest.timeElapsed + additionalTime
        };
        localStorage.setItem('testAppPausedTest', JSON.stringify(testStateToSave));
    };
    const loadTestFromLocalStorage = () => {
        const pausedTest = localStorage.getItem('testAppPausedTest');
        return pausedTest ? JSON.parse(pausedTest) : null;
    };
    const clearTestFromLocalStorage = () => {
        localStorage.removeItem('testAppPausedTest');
    };

    // Funciones "Dispatcher" que deciden qué método usar
    const saveCurrentTestState = () => {
        if (appState.settings.syncMode === 'sync' && appState.user) {
            saveTestToFirestore();
        } else {
            saveTestToLocalStorage();
        }
    };

    const loadPausedTest = async () => {
        let pausedTest = null;
        if (appState.settings.syncMode === 'sync' && appState.user) {
            pausedTest = await loadTestFromFirestore();
        } else {
            pausedTest = loadTestFromLocalStorage();
        }

        if (pausedTest) {
            appState.currentTest = pausedTest;
            resumeContainer.classList.remove('hidden');
        } else {
            appState.currentTest = null;
            resumeContainer.classList.add('hidden');
        }
    };
    
    const clearPausedTest = () => {
        if (appState.settings.syncMode === 'sync' && appState.user) {
            clearTestFromFirestore();
        }
        clearTestFromLocalStorage(); // Siempre limpiamos el local para evitar conflictos
    };


    // --- UTILITY FUNCTIONS ---
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const formatPercentage = (value) => {
        if (isNaN(value)) return '0%';
        const formatted = value.toFixed(1);
        return `${formatted.replace(/\.0$/, '')}%`;
    };

    const saveState = () => {
        localStorage.setItem('testAppSettings', JSON.stringify(appState.settings));
        localStorage.setItem('testAppStats', JSON.stringify(appState.stats));
    };
    
    const loadState = () => {
        const settings = localStorage.getItem('testAppSettings');
        if (settings) {
            appState.settings = { ...appState.settings, ...JSON.parse(settings) };
        }
        const stats = localStorage.getItem('testAppStats');
        if (stats) appState.stats = JSON.parse(stats);
    };

    // --- Lógica de Visibilidad del Panel Lateral ---
    const updateSidebarState = () => {
        const shouldBeVisible = appState.settings.showSidebar === 'enabled' && appState.currentView === 'test-view';
        
        if (shouldBeVisible) {
            questionSidebar.classList.remove('hidden');
            if (appState.settings.sidebarCollapsed) {
                questionSidebar.classList.add('sidebar-collapsed');
                sidebarToggleBtn.title = 'Mostrar Panel';
            } else {
                questionSidebar.classList.remove('sidebar-collapsed');
                sidebarToggleBtn.title = 'Ocultar Panel';
            }
        } else {
            questionSidebar.classList.add('hidden');
        }
    };

    // --- VIEW NAVIGATION ---
    const showView = (viewId) => {
        appState.currentView = viewId;
        Object.values(views).forEach(view => view.classList.remove('active'));
        views[viewId.replace('-view', '')].classList.add('active');
        
        updateSidebarState();

        if (viewId === 'settings-view') {
            updateSettingsUI();
        }
    };

    const handleNavClick = (viewId) => {
        if (appState.currentView === 'test-view') {
            pauseTest();
        }
        showView(viewId);
        if (viewId === 'stats-view') renderStats();
    };

    // --- EXAM LOADING & SELECTION ---
    const loadExams = () => {
        loaderStatus.textContent = 'Cargando exámenes...';

        const examDataSources = [
            window.examData_H12_811_V1_0_full,
            window.examData_H12_811_V1_0_ENU_882,
            window.examData_H12_811_V1_0_extra,
            window.examData_H12_811_V1_0_p_1_50,
            window.examData_H12_811_V1_0_p_51_100,
            window.examData_H12_811_V1_0_p_101_150,
            window.examData_H12_811_V1_0_p_151_200,
            window.examData_H12_811_V1_0_p_201_250,
            window.examData_H12_811_V1_0_p_251_300,
            window.examData_H12_811_V1_0_p_301_350,
            window.examData_H12_811_V1_0_p_351_400,
            window.examData_H12_811_V1_0_p_401_450,
            window.examData_H12_811_V1_0_p_451_500,
            window.examData_H12_811_V1_0_p_501_550,
            window.examData_H12_811_V1_0_p_551_590,
            window.examData_H12_811_V1_0_p_591_600,
            window.examData_H12_811_V1_0_p_601_650,
            window.examData_H12_811_V1_0_p_651_700,
            window.examData_H12_811_V1_0_p_701_750,
            window.examData_H12_811_V1_0_p_751_800,
            window.examData_H12_811_V1_0_p_801_850,
            window.examData_H12_811_V1_0_p_851_900,
            window.examData_H12_811_V1_0_p_901_931,
        ];

        try {
            examDataSources.forEach(examData => {
                if (examData) {
                    if (appState.exams[examData.exam_code]) {
                        appState.exams[examData.exam_code].questions.push(...examData.questions);
                    } else {
                        appState.exams[examData.exam_code] = examData;
                    }
                }
            });

            for (const code in appState.exams) {
                const seen = new Set();
                appState.exams[code].questions = appState.exams[code].questions.filter(q => {
                    const duplicate = seen.has(q.id);
                    seen.add(q.id);
                    return !duplicate;
                });
            }

            renderExamSelector();
            loaderStatus.textContent = '';
        } catch (error) {
            loaderStatus.textContent = 'Error al procesar los datos de los exámenes.';
            console.error(error);
        }
    };

    const renderExamSelector = () => {
        examListContainer.innerHTML = '';
        Object.values(appState.exams).forEach(exam => {
            const failedCount = appState.stats[exam.exam_code] ? Object.keys(appState.stats[exam.exam_code].failedQuestions).length : 0;

            const examItem = document.createElement('div');
            examItem.className = 'exam-item';
            examItem.innerHTML = `
            <div class="exam-item-info">
            <h4>${exam.exam_name} (${exam.exam_code})</h4>
            <div class="question-count-selector">
            <label for="q-count-${exam.exam_code}">Nº de preguntas:</label>
            <input type="number" class="question-count-input" id="q-count-${exam.exam_code}" value="${exam.questions.length}" min="1" max="${exam.questions.length}">
            </div>
            </div>
            <div class="exam-item-controls">
            <button class="start-btn" data-exam-code="${exam.exam_code}">Iniciar</button>
            <button class="practice-failed-btn" data-exam-code="${exam.exam_code}" ${failedCount === 0 ? 'disabled' : ''}>
            Practicar Falladas (${failedCount})
            </button>
            </div>
            `;
            examListContainer.appendChild(examItem);
        });

        document.querySelectorAll('.start-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const examCode = e.target.dataset.examCode;
                const questionCount = document.getElementById(`q-count-${examCode}`).value;
                startTest(examCode, Number(questionCount));
            });
        });

        document.querySelectorAll('.practice-failed-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const examCode = e.target.dataset.examCode;
                startPracticeFailedTest(examCode);
            });
        });
    };
    
    // --- Lógica del Panel Lateral ---
    const renderQuestionSidebar = () => {
        const test = appState.currentTest;
        if (!test) return;

        sidebarContent.innerHTML = '';

        test.questions.forEach((q, index) => {
            const card = document.createElement('div');
            card.className = 'sidebar-question-card';
            card.textContent = `Pregunta ${index + 1}`;
            card.dataset.index = index;

            if (index === test.currentIndex) {
                card.classList.add('current-question');
            }

            const userAnswer = test.userAnswers[index];
            if (userAnswer && userAnswer.length > 0 && index !== test.currentIndex) {
                const isCorrect = JSON.stringify(userAnswer.sort()) === JSON.stringify([...q.correct_answers].sort());
                card.classList.add(isCorrect ? 'answered-correct' : 'answered-incorrect');
            }

            card.addEventListener('click', () => {
                const clickedIndex = Number(card.dataset.index);

                if (test.currentIndex !== clickedIndex) {
                    if (test.revisitedFromSidebar[test.currentIndex]) {
                        test.isLocked[test.currentIndex] = true;
                    }

                    test.currentIndex = clickedIndex;
                    test.revisitedFromSidebar[test.currentIndex] = true;
                    renderQuestion();
                }
            });

            sidebarContent.appendChild(card);
        });
    };

    // --- TEST LOGIC ---
    const startTest = (examCode, questionCount, specificQuestions = null, isPractice = false) => {
        clearPausedTest();
        resumeContainer.classList.add('hidden');

        const exam = appState.exams[examCode];
        let questions;

        if (specificQuestions) {
            questions = JSON.parse(JSON.stringify(specificQuestions));
        } else {
            let allQuestionsCopy = JSON.parse(JSON.stringify(exam.questions));

            if (appState.settings.questionOrder === 'random') {
                shuffleArray(allQuestionsCopy);
            }

            questions = allQuestionsCopy.slice(0, questionCount);
        }

        if (appState.settings.answerOrder === 'random') {
            questions.forEach(question => {
                if (!question.options || question.options.length < 2) return;
                const originalOptionDetails = question.options.map(opt => ({
                    letter: opt.substring(0, 1),
                    text: opt.substring(opt.indexOf('.') + 1).trim()
                }));
                const textsToShuffle = originalOptionDetails.map(opt => opt.text);
                shuffleArray(textsToShuffle);
                const newOptions = [];
                const letterRemap = {};
                for (let i = 0; i < originalOptionDetails.length; i++) {
                    const newLetter = String.fromCharCode(65 + i);
                    const newText = textsToShuffle[i];
                    newOptions.push(`${newLetter}. ${newText}`);
                    const originalDetail = originalOptionDetails.find(d => d.text === newText);
                    if (originalDetail) letterRemap[originalDetail.letter] = newLetter;
                }
                const newCorrectAnswers = question.correct_answers
                .map(originalLetter => letterRemap[originalLetter])
                .filter(Boolean);
                question.options = newOptions;
                question.correct_answers = newCorrectAnswers;
            });
        }

        appState.currentTest = {
            examCode,
            examName: exam.exam_name,
            questions,
            userAnswers: Array(questions.length).fill(null),
            answersRevealed: Array(questions.length).fill(false),
            revisitedFromSidebar: Array(questions.length).fill(false),
            isLocked: Array(questions.length).fill(false),
            currentIndex: 0,
            startTime: Date.now(),
            timeElapsed: 0,
            isFinished: false,
            isPracticeFailedTest: isPractice,
        };

        startTimer();
        renderQuestion();
        showView('test-view');
    };

    const startPracticeFailedTest = (examCode) => {
        const stats = appState.stats[examCode];
        if (!stats || Object.keys(stats.failedQuestions).length === 0) return;

        const failedQuestionIds = Object.keys(stats.failedQuestions).map(id => parseInt(id));
        const exam = appState.exams[examCode];
        const failedQuestions = exam.questions.filter(q => failedQuestionIds.includes(q.id));

        if (failedQuestions.length > 0) {
            startTest(examCode, failedQuestions.length, failedQuestions, true);
        }
    };

    const renderQuestion = () => {
        const test = appState.currentTest;
        if (!test) return;
        const question = test.questions[test.currentIndex];

        testTitle.textContent = test.examName;
        questionCounter.textContent = `Pregunta ${test.currentIndex + 1} de ${test.questions.length}`;
        questionText.innerHTML = question.question_text;

        questionImageContainer.innerHTML = '';
        questionImageContainer.classList.add('hidden');

        if (appState.settings.showImages === 'yes' && question.image) {
            const images = Array.isArray(question.image) ? question.image : [question.image];
            
            if (images.length > 0) {
                images.forEach(imgSrc => {
                    if(imgSrc) {
                        const imgElement = document.createElement('img');
                        imgElement.src = `images/${imgSrc}`;
                        imgElement.alt = "Imagen de la pregunta";
                        questionImageContainer.appendChild(imgElement);
                    }
                });
                questionImageContainer.classList.remove('hidden');
            }
        }

        optionsContainer.innerHTML = '';
        question.options.forEach(optionText => {
            const optionButton = document.createElement('button');
            optionButton.className = 'option';
            optionButton.textContent = optionText;
            optionButton.dataset.value = optionText.substring(0, 1);

            const userAnswer = test.userAnswers[test.currentIndex];
            if (userAnswer && userAnswer.includes(optionButton.dataset.value)) {
                optionButton.classList.add('selected');
            }

            optionButton.addEventListener('click', () => selectAnswer(optionButton));
            optionsContainer.appendChild(optionButton);
        });

        if (test.isLocked[test.currentIndex]) {
            optionsContainer.classList.add('locked');
        } else {
            optionsContainer.classList.remove('locked');
        }

        prevBtn.disabled = test.currentIndex === 0;
        nextBtn.classList.toggle('hidden', test.currentIndex === test.questions.length - 1);
        finishBtn.classList.toggle('hidden', test.currentIndex !== test.questions.length - 1);

        if (test.answersRevealed[test.currentIndex]) {
            showAnswer();
        } else {
            showAnswerBtn.disabled = false;
        }

        renderQuestionSidebar();
        
        const currentCard = sidebarContent.querySelector('.current-question');
        if (currentCard) {
            currentCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    };

    const selectAnswer = (optionButton) => {
        const test = appState.currentTest;
        if (test.answersRevealed[test.currentIndex] || test.isLocked[test.currentIndex]) {
            return;
        }

        const question = test.questions[test.currentIndex];
        const selectedValue = optionButton.dataset.value;
        let currentSelection = test.userAnswers[test.currentIndex] || [];

        if (question.type === 'single') {
            currentSelection = [selectedValue];
            optionsContainer.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
            optionButton.classList.add('selected');
        } else {
            const index = currentSelection.indexOf(selectedValue);
            if (index > -1) {
                currentSelection.splice(index, 1);
                optionButton.classList.remove('selected');
            } else {
                currentSelection.push(selectedValue);
                optionButton.classList.add('selected');
            }
        }
        test.userAnswers[test.currentIndex] = currentSelection.sort();
        saveCurrentTestState();
    };

    const changeQuestion = (direction) => {
        const test = appState.currentTest;
        if (!test || questionContainer.classList.contains('animating')) return;

        if (test.revisitedFromSidebar[test.currentIndex]) {
            test.isLocked[test.currentIndex] = true;
        }
        
        saveCurrentTestState();

        const newIndex = test.currentIndex + direction;

        if (newIndex >= 0 && newIndex < test.questions.length) {
            const isMobile = window.innerWidth <= 600;

            if (isMobile) {
                const outClass = direction === 1 ? 'slide-out-left' : 'slide-out-right';
                const inClass = direction === 1 ? 'slide-in-right' : 'slide-in-left';

                const handleAnimationEnd = () => {
                    questionContainer.removeEventListener('animationend', handleAnimationEnd);
                    questionContainer.classList.remove(inClass, 'animating');
                };

                const handleAnimationStart = () => {
                    questionContainer.removeEventListener('animationend', handleAnimationStart);
                    test.currentIndex = newIndex;
                    renderQuestion();
                    questionContainer.classList.remove(outClass);
                    questionContainer.addEventListener('animationend', handleAnimationEnd);
                    questionContainer.classList.add(inClass);
                };

                questionContainer.addEventListener('animationend', handleAnimationStart);
                questionContainer.classList.add('animating', outClass);
            } else {
                test.currentIndex = newIndex;
                renderQuestion();
            }
        }
    };

    const finishTest = () => {
        stopTimer();
        const test = appState.currentTest;
        test.isFinished = true;

        let correctCount = 0;
        const examStats = appState.stats[test.examCode] || { attempts: [], failedQuestions: {} };

        test.questions.forEach((q, index) => {
            const userAnswer = test.userAnswers[index] || [];
            const isCorrect = JSON.stringify(userAnswer.sort()) === JSON.stringify([...q.correct_answers].sort());

            if (isCorrect) {
                correctCount++;
                if (test.isPracticeFailedTest) {
                    delete examStats.failedQuestions[q.id];
                }
            } else {
                if (!test.isPracticeFailedTest) {
                    examStats.failedQuestions[q.id] = (examStats.failedQuestions[q.id] || 0) + 1;
                }
            }
        });

        const score = (correctCount / test.questions.length) * 100;
        examStats.attempts.push({
            date: new Date().toISOString(),
            score: score,
            time: test.timeElapsed,
            questionCount: test.questions.length
        });
        appState.stats[test.examCode] = examStats;

        saveState();
        renderExamSelector();
        renderResults(score, correctCount);
        
        clearPausedTest();
        resumeContainer.classList.add('hidden');
        showView('results-view');
    };

    const pauseTest = () => {
        stopTimer();
        if (appState.currentTest && !appState.currentTest.isFinished) {
            saveCurrentTestState();
            resumeContainer.classList.remove('hidden');
        }
    };

    const resumeTest = () => {
        if (appState.currentTest) {
            appState.currentTest.startTime = Date.now();
            startTimer();
            renderQuestion();
            showView('test-view');
            resumeContainer.classList.add('hidden');
        }
    };

    const startTimer = () => {
        if (appState.timerInterval) clearInterval(appState.timerInterval);
        appState.currentTest.startTime = Date.now();

        appState.timerInterval = setInterval(() => {
            const test = appState.currentTest;
            const timeLimit = appState.settings.timeLimit * 60;
            const totalElapsed = test.timeElapsed + (Date.now() - test.startTime) / 1000;

            if (timeLimit > 0) {
                const remaining = timeLimit - totalElapsed;
                if (remaining <= 0) {
                    timerDisplay.textContent = '00:00';
                    finishTest();
                    return;
                }
                const minutes = Math.floor(remaining / 60).toString().padStart(2, '0');
                const seconds = Math.floor(remaining % 60).toString().padStart(2, '0');
                timerDisplay.textContent = `${minutes}:${seconds}`;
            } else {
                const minutes = Math.floor(totalElapsed / 60).toString().padStart(2, '0');
                const seconds = Math.floor(totalElapsed % 60).toString().padStart(2, '0');
                timerDisplay.textContent = `${minutes}:${seconds}`;
            }
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(appState.timerInterval);
        appState.timerInterval = null;
        if (appState.currentTest && appState.currentTest.startTime) {
            appState.currentTest.timeElapsed += (Date.now() - appState.currentTest.startTime) / 1000;
            appState.currentTest.startTime = null;
        }
    };

    // --- RESULTS & REVIEW ---
    const renderResults = (score, correctCount) => {
        const PASSING_SCORE = 85;
        const test = appState.currentTest;
        const isPassed = score >= PASSING_SCORE;
        const statusText = isPassed ? 'APROBADO' : 'SUSPENDIDO';
        const statusClass = isPassed ? 'passed' : 'failed';

        resultsSummary.innerHTML = `
        <h3 class="result-status ${statusClass}">${statusText}</h3>
        <div class="results-grid">
        <div class="result-card"><h4>Puntuación</h4><p>${formatPercentage(score)}</p></div>
        <div class="result-card"><h4>Correctas</h4><p>${correctCount} de ${test.questions.length}</p></div>
        <div class="result-card"><h4>Tiempo</h4><p>${Math.floor(test.timeElapsed / 60)}m ${Math.floor(test.timeElapsed % 60)}s</p></div>
        </div>`;
        examTitleSummarySpan.textContent = test.examName;

        const getFullAnswerText = (question, answerLetters) => {
            if (!answerLetters || answerLetters.length === 0) return 'No respondida';
            return answerLetters.map(letter => {
                return question.options.find(opt => opt.startsWith(letter)) || letter;
            }).join('<br>');
        };

        reviewContainer.innerHTML = '<h3>Revisión de Preguntas</h3>';
        test.questions.forEach((q, index) => {
            const userAnswer = test.userAnswers[index] || [];
            const isCorrect = JSON.stringify(userAnswer.sort()) === JSON.stringify([...q.correct_answers].sort());
            const reviewDiv = document.createElement('div');
            reviewDiv.className = `review-question ${isCorrect ? 'correct' : 'incorrect'}`;
            reviewDiv.innerHTML = `
            <p><strong>${index + 1}. ${q.question_text}</strong></p>
            <p><strong>Tu respuesta:</strong><br>${getFullAnswerText(q, userAnswer)}</p>
            <p><strong>Respuesta correcta:</strong><br>${getFullAnswerText(q, q.correct_answers)}</p>`;
            reviewContainer.appendChild(reviewDiv);
        });
    };

    const showAnswer = () => {
        const test = appState.currentTest;
        const question = test.questions[test.currentIndex];
        const correctAnswers = question.correct_answers;
        const userAnswer = test.userAnswers[test.currentIndex] || [];

        test.answersRevealed[test.currentIndex] = true;

        optionsContainer.querySelectorAll('.option').forEach(opt => {
            const optValue = opt.dataset.value;
            if (correctAnswers.includes(optValue)) opt.classList.add('correct');
            if (userAnswer.includes(optValue) && !correctAnswers.includes(optValue)) opt.classList.add('user-incorrect');
        });

        optionsContainer.querySelectorAll('.option').forEach(opt => {
            opt.style.cursor = 'not-allowed';
        });
        showAnswerBtn.disabled = true;

        renderQuestionSidebar();
    };

    // --- STATISTICS ---
    const renderStats = () => {
        statsExamSelect.innerHTML = '<option value="all">Estadísticas Generales</option>';
        Object.keys(appState.exams).forEach(examCode => {
            const option = document.createElement('option');
            option.value = examCode;
            option.textContent = appState.exams[examCode].exam_name;
            statsExamSelect.appendChild(option);
        });
        displayStatsForSelection();
    };

    const displayStatsForSelection = () => {
        const selectedCode = statsExamSelect.value;
    
        const attempts = selectedCode === 'all'
            ? Object.values(appState.stats).flatMap(s => s.attempts)
            : (appState.stats[selectedCode]?.attempts || []);
        displayCalculatedStats(attempts);
    
        if (selectedCode !== 'all') {
            displayExamSpecificStats(selectedCode);
        } else {
            const recentAttempts = attempts.filter(a => a.questionCount >= 30).slice(-5);
            if (recentAttempts.length > 0) {
                const recentAvgScore = recentAttempts.reduce((sum, a) => sum + a.score, 0) / recentAttempts.length;
                if (recentAvgScore >= 85) {
                    readinessContainer.className = 'prepared';
                    readinessContainer.innerHTML = `<h4>¡Estás bien preparado en general!</h4><p>Tu puntuación media reciente en todos los exámenes es <strong>${formatPercentage(recentAvgScore)}</strong>. ¡Excelente trabajo!</p>`;
                } else {
                    readinessContainer.className = 'unprepared';
                    readinessContainer.innerHTML = `<h4>Necesitas repasar algunos temas.</h4><p>Tu media de aciertos general es del <strong>${formatPercentage(recentAvgScore)}</strong> (se requiere 85%). Revisa las preguntas más falladas para identificar tus áreas débiles.</p>`;
                }
            } else {
                readinessContainer.className = 'neutral';
                readinessContainer.innerHTML = '<h4>Evaluación de Preparación General</h4><p>Realiza más tests (de al menos 30 preguntas) para una evaluación general precisa.</p>';
            }
    
            const aggregatedFailed = {};
            Object.values(appState.stats).forEach(examStat => {
                for (const qId in examStat.failedQuestions) {
                    const count = examStat.failedQuestions[qId];
                    aggregatedFailed[qId] = (aggregatedFailed[qId] || 0) + count;
                }
            });
    
            const sortedFailed = Object.entries(aggregatedFailed).sort((a, b) => b[1] - a[1]).slice(0, 10);
            
            failedQuestionsList.innerHTML = '';
            if (sortedFailed.length === 0) {
                failedQuestionsList.innerHTML = '<li>¡Felicidades! No tienes preguntas falladas registradas.</li>';
            } else {
                const allQuestionsById = new Map();
                Object.values(appState.exams).forEach(exam => {
                    exam.questions.forEach(q => {
                        if (!allQuestionsById.has(q.id)) {
                            allQuestionsById.set(q.id, q);
                        }
                    });
                });
    
                sortedFailed.forEach(([qId, count]) => {
                    const question = allQuestionsById.get(parseInt(qId));
                    if (question) {
                        const li = document.createElement('li');
                        li.className = 'failed-question-item';
                        li.innerHTML = `
                        <div class="failure-count" title="${count} veces fallada">
                        <span class="count-number">${count}</span>
                        <span class="count-label">Fallos</span>
                        </div>
                        <div class="failed-question-text">${question.question_text}</div>
                        `;
                        li.addEventListener('click', () => openModalWithQuestion(question));
                        failedQuestionsList.appendChild(li);
                    }
                });
            }
        }
    };

    const displayCalculatedStats = (attempts) => {
        const totalAttempts = attempts.length;
        if (totalAttempts === 0) {
            statsDetailsContainer.innerHTML = '<p>Aún no hay estadísticas.</p>';
            return;
        }

        const passCount = attempts.filter(a => a.score >= 85).length;
        const failCount = totalAttempts - passCount;
        const passRate = (passCount / totalAttempts) * 100;
        const failRate = (failCount / totalAttempts) * 100;
        const totalTime = attempts.reduce((sum, a) => sum + a.time, 0);
        const avgTime = totalTime / totalAttempts;

        statsDetailsContainer.innerHTML = `
        <div class="stat-card" title="Número total de exámenes realizados."><h4>Intentos</h4><p>${totalAttempts}</p></div>
        <div class="stat-card" title="Exámenes con una puntuación igual o superior al 85%."><h4>Aprobados</h4><p>${passCount} (${formatPercentage(passRate)})</p></div>
        <div class="stat-card" title="Exámenes con una puntuación inferior al 85%."><h4>Suspendidos</h4><p>${failCount} (${formatPercentage(failRate)})</p></div>
        <div class="stat-card" title="Suma del tiempo empleado en todos los exámenes."><h4>Tiempo Total</h4><p>${Math.floor(totalTime / 3600)}h ${Math.floor((totalTime % 3600) / 60)}m</p></div>
        <div class="stat-card" title="Promedio de tiempo empleado por cada examen."><h4>Tiempo Medio</h4><p>${Math.floor(avgTime / 60)}m ${Math.floor(avgTime % 60)}s</p></div>
        `;
    };

    const displayExamSpecificStats = (examCode) => {
        const examStat = appState.stats[examCode];
        if (!examStat || examStat.attempts.length === 0) {
            readinessContainer.innerHTML = '<h4>Evaluación de Preparación</h4><p>Realiza algunos tests para evaluar tu nivel.</p>';
            readinessContainer.className = 'neutral';
            failedQuestionsList.innerHTML = '';
            return;
        }

        const recentAttempts = examStat.attempts.filter(a => a.questionCount >= 30).slice(-3);
        if (recentAttempts.length > 0) {
            const recentAvgScore = recentAttempts.reduce((sum, a) => sum + a.score, 0) / recentAttempts.length;

            if (recentAvgScore >= 85) {
                readinessContainer.className = 'prepared';
                readinessContainer.innerHTML = `<h4>¡Estás preparado para el examen!</h4><p>Tu puntuación media reciente es <strong>${formatPercentage(recentAvgScore)}</strong>. ¡Sigue así!</p>`;
            } else {
                readinessContainer.className = 'unprepared';
                readinessContainer.innerHTML = `<h4>Aún no estás preparado.</h4><p>Tu media de aciertos es del <strong>${formatPercentage(recentAvgScore)}</strong> (se requiere 85%). Concéntrate en las preguntas que más fallas.</p>`;
            }
        } else {
            readinessContainer.className = 'neutral';
            readinessContainer.innerHTML = '<h4>Evaluación de Preparación</h4><p>Realiza más tests (de al menos 30 preguntas) para una evaluación precisa.</p>';
        }

        const failed = Object.entries(examStat.failedQuestions).sort((a, b) => b[1] - a[1]).slice(0, 10);
        failedQuestionsList.innerHTML = '';
        if (failed.length === 0) {
            failedQuestionsList.innerHTML = '<li>¡Ninguna pregunta fallada para este examen!</li>';
        } else {
            failed.forEach(([qId, count]) => {
                const question = appState.exams[examCode].questions.find(q => q.id == qId);
                if (question) {
                    const li = document.createElement('li');
                    li.className = 'failed-question-item';
                    li.innerHTML = `
                    <div class="failure-count" title="${count} veces fallada">
                    <span class="count-number">${count}</span>
                    <span class="count-label">Fallos</span>
                    </div>
                    <div class="failed-question-text">${question.question_text}</div>
                    `;
                    li.addEventListener('click', () => openModalWithQuestion(question));
                    failedQuestionsList.appendChild(li);
                }
            });
        }
    };

    const resetStatistics = () => {
        const selectedCode = statsExamSelect.value;
        if (confirm(`¿Estás seguro de que quieres resetear las estadísticas para ${selectedCode === 'all' ? 'todos los exámenes' : selectedCode}? Esta acción no se puede deshacer.`)) {
            if (selectedCode === 'all') {
                appState.stats = {};
            } else {
                if (appState.stats[selectedCode]) {
                    delete appState.stats[selectedCode];
                }
            }
            saveState();
            displayStatsForSelection();
            renderExamSelector();
        }
    };

    // --- MODAL LOGIC ---
    const openModalWithQuestion = (question) => {
        modalCurrentQuestion = question;
        modalQuestionText.innerHTML = question.question_text;
        modalOptionsContainer.innerHTML = '';
        modalCorrectAnswer.innerHTML = '';
        modalCheckBtn.disabled = false;

        question.options.forEach(optionText => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.textContent = optionText;
            optionDiv.dataset.value = optionText.substring(0, 1);
            optionDiv.addEventListener('click', () => {
                if (question.type === 'single') {
                    modalOptionsContainer.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
                    optionDiv.classList.add('selected');
                } else {
                    optionDiv.classList.toggle('selected');
                }
            });
            modalOptionsContainer.appendChild(optionDiv);
        });
        modalOverlay.classList.remove('hidden');
    };

    const checkModalAnswer = () => {
        const selectedOptions = [...modalOptionsContainer.querySelectorAll('.option.selected')];
        const selectedAnswers = selectedOptions.map(opt => opt.dataset.value).sort();
        const correctAnswers = [...modalCurrentQuestion.correct_answers].sort();

        modalOptionsContainer.querySelectorAll('.option').forEach(opt => {
            const optValue = opt.dataset.value;
            if (correctAnswers.includes(optValue)) opt.classList.add('correct');
            if (selectedAnswers.includes(optValue) && !correctAnswers.includes(optValue)) opt.classList.add('user-incorrect');
        });
        modalCheckBtn.disabled = true;
    };

    const closeModal = () => {
        modalOverlay.classList.add('hidden');
        modalCurrentQuestion = null;
    };

    const setupModalListeners = () => {
        modalCloseBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
        modalCheckBtn.addEventListener('click', checkModalAnswer);
    };

    // --- SETTINGS (AUTO-GUARDADO) ---
    const setupSettingsView = () => {
        document.querySelectorAll('#settings-view .btn-group button').forEach(button => {
            button.addEventListener('click', () => {
                const group = button.parentElement;
                if (button.classList.contains('active')) return;
                group.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                saveSettings();
            });
        });
    };

    const updateSettingsUI = () => {
        const { timeLimit, questionOrder, answerOrder, syncMode, showSidebar, showImages } = appState.settings;
        document.querySelectorAll('#setting-time-group button').forEach(btn => btn.classList.toggle('active', Number(btn.dataset.value) === timeLimit));
        document.querySelectorAll('#q-order-group button').forEach(btn => btn.classList.toggle('active', btn.dataset.value === questionOrder));
        document.querySelectorAll('#a-order-group button').forEach(btn => btn.classList.toggle('active', btn.dataset.value === answerOrder));
        document.querySelectorAll('#sync-setting-group button').forEach(btn => btn.classList.toggle('active', btn.dataset.value === syncMode));
        document.querySelectorAll('#sidebar-setting-group button').forEach(btn => btn.classList.toggle('active', btn.dataset.value === showSidebar));
        document.querySelectorAll('#image-setting-group button').forEach(btn => btn.classList.toggle('active', btn.dataset.value === showImages));
    };

    const saveSettings = () => {
        const timeLimit = Number(document.querySelector('#setting-time-group .active').dataset.value);
        const questionOrder = document.querySelector('#q-order-group .active').dataset.value;
        const answerOrder = document.querySelector('#a-order-group .active').dataset.value;
        const syncMode = document.querySelector('#sync-setting-group .active').dataset.value;
        const showSidebar = document.querySelector('#sidebar-setting-group .active').dataset.value;
        const showImages = document.querySelector('#image-setting-group .active').dataset.value;

        appState.settings = { ...appState.settings, timeLimit, questionOrder, answerOrder, syncMode, showSidebar, showImages };

        if (syncMode === 'local' && appState.user) {
            clearTestFromFirestore();
        }
        
        loadPausedTest();
        saveState();
        updateSidebarState();
    };

    // --- INPUT HANDLERS (KEYBOARD & TOUCH) ---
    const handleKeyPress = (e) => {
        if (appState.currentView !== 'test-view' || !appState.currentTest) return;
        if (e.target.tagName === 'INPUT') return;

        switch (e.key) {
            case 'ArrowLeft':
                if (!prevBtn.disabled) changeQuestion(-1);
                return;
            case 'ArrowRight':
            case 'Enter':
                e.preventDefault();
                if (!finishBtn.classList.contains('hidden') && e.key === 'Enter') {
                    finishTest();
                } else if (!nextBtn.classList.contains('hidden')) {
                    changeQuestion(1);
                }
                return;
        }

        if (appState.currentTest.answersRevealed[appState.currentTest.currentIndex] || appState.currentTest.isLocked[appState.currentTest.currentIndex]) return;

        if (e.key === ' ') {
            e.preventDefault();
            showAnswer();
            return;
        }

        const key = e.key.toUpperCase();
        let targetOptionValue = null;
        const numberMap = "123456789";
        const letterMap = "ABCDEFGHI";
        const numberIndex = numberMap.indexOf(key);

        if (letterMap.includes(key)) {
            targetOptionValue = key;
        } else if (numberIndex !== -1) {
            targetOptionValue = letterMap[numberIndex];
        }

        if (targetOptionValue) {
            const optionButton = optionsContainer.querySelector(`.option[data-value="${targetOptionValue}"]`);
            if (optionButton) {
                e.preventDefault();
                optionButton.click();
            }
        }
    };

    const handleTouchStart = (e) => {
        if (appState.currentView !== 'test-view' || !appState.currentTest) return;
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e) => {
        if (appState.currentView !== 'test-view' || !appState.currentTest) return;
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const swipeThreshold = 50;

        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > swipeThreshold) {
            if (deltaX < 0 && !nextBtn.classList.contains('hidden')) {
                changeQuestion(1);
            } else if (deltaX > 0 && !prevBtn.disabled) {
                changeQuestion(-1);
            }
        }
    };

    const handleDoubleClick = (e) => {
        if (appState.currentView === 'test-view' && appState.currentTest && !appState.currentTest.answersRevealed[appState.currentTest.currentIndex] && !appState.currentTest.isLocked[appState.currentTest.currentIndex]) {
            showAnswer();
        }
    };

    const handleBodyTouchStart = (e) => {
        if (appState.currentView !== 'test-view' || !appState.currentTest || appState.currentTest.answersRevealed[appState.currentTest.currentIndex] || appState.currentTest.isLocked[appState.currentTest.currentIndex]) {
            return;
        }

        const currentTime = new Date().getTime();
        const timeSinceLastTap = currentTime - lastTapTime;

        if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
            e.preventDefault();
            clearTimeout(longPressTimer);
            showAnswer();
            lastTapTime = 0;
            return;
        }

        lastTapTime = currentTime;

        longPressTimer = setTimeout(() => {
            showAnswer();
        }, 500);
    };

    const handleBodyTouchEndOrMove = (e) => {
        clearTimeout(longPressTimer);
    };
    
    const handleSidebarToggle = () => {
        appState.settings.sidebarCollapsed = !appState.settings.sidebarCollapsed;
        saveState();
        updateSidebarState();
    };

    // --- INITIALIZATION & EVENT LISTENERS ---
    const init = () => {
        auth.onAuthStateChanged(onAuthStateChanged);
        
        loadState();
        updateSettingsUI();

        setupSettingsView();
        setupModalListeners();
        loadExams();
        updateSidebarState();

        const header = document.querySelector('header');
        const adjustSidebarPosition = () => {
            if (!header || !questionSidebar) return;

            const headerHeight = header.offsetHeight;
            const headerRect = header.getBoundingClientRect();

            if (headerRect.bottom <= 0) {
                questionSidebar.style.top = '0px';
            } else {
                questionSidebar.style.top = `${headerHeight}px`;
            }
        };
        adjustSidebarPosition();
        window.addEventListener('scroll', adjustSidebarPosition);

        document.addEventListener('keydown', handleKeyPress);
        document.body.addEventListener('touchstart', handleBodyTouchStart, { passive: false });
        document.body.addEventListener('touchend', handleBodyTouchEndOrMove);
        document.body.addEventListener('touchmove', handleBodyTouchEndOrMove);
        document.body.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.body.addEventListener('touchend', handleTouchEnd, { passive: true });
        sidebarToggleBtn.addEventListener('click', handleSidebarToggle);
        navButtons.selector.addEventListener('click', () => handleNavClick('selector-view'));
        navButtons.stats.addEventListener('click', () => handleNavClick('stats-view'));
        navButtons.settings.addEventListener('click', () => handleNavClick('settings-view'));
        prevBtn.addEventListener('click', () => changeQuestion(-1));
        nextBtn.addEventListener('click', () => changeQuestion(1));
        finishBtn.addEventListener('click', finishTest);
        showAnswerBtn.addEventListener('click', showAnswer);
        backToHomeBtn.addEventListener('click', () => showView('selector-view'));
        restartTestBtn.addEventListener('click', () => {
            if (appState.currentTest) {
                startTest(appState.currentTest.examCode, appState.currentTest.questions.length);
            }
        });
        statsExamSelect.addEventListener('change', displayStatsForSelection);
        resetStatsBtn.addEventListener('click', resetStatistics);
        resumeBtn.addEventListener('click', resumeTest);
        loginAnonymousBtn.addEventListener('click', signInAnonymously);
        logoutBtn.addEventListener('click', signOut);
    };

    init();
});
