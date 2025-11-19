document.addEventListener('DOMContentLoaded', () => {
    // --- STATE MANAGEMENT ---
    let appState = {
        currentView: 'selector-view',
        exams: {},
        settings: {
            timeLimit: 0,
            questionOrder: 'random',
            answerOrder: 'random',
            showSidebar: 'disabled',
            sidebarCollapsed: false,
            showImages: 'yes',
            autoAdvance: 'no',
            theme: 'system'
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
    const examListContainer = document.getElementById('exam-list-container');
    const loaderStatus = document.getElementById('loader-status');
    const testTitle = document.getElementById('test-title');
    const questionCounter = document.getElementById('question-counter');
    const timerDisplay = document.getElementById('timer');
    const questionContainer = document.getElementById('question-container');
    
    // Sidebar elements
    const questionSidebar = document.getElementById('question-sidebar');
    const sidebarContent = document.getElementById('sidebar-content');
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    
    // Sidebar Stats Elements
    const sbStatTotal = document.getElementById('sb-stat-total').querySelector('.sb-value');
    const sbStatCorrect = document.getElementById('sb-stat-correct').querySelector('.sb-value');
    const sbStatIncorrect = document.getElementById('sb-stat-incorrect').querySelector('.sb-value');
    const sbStatUnanswered = document.getElementById('sb-stat-unanswered').querySelector('.sb-value');

    // Sidebar Containers for filtering
    const sbStatIncorrectContainer = document.getElementById('sb-stat-incorrect');
    const sbStatTotalContainer = document.getElementById('sb-stat-total');
    const sbStatCorrectContainer = document.getElementById('sb-stat-correct');
    const sbStatUnansweredContainer = document.getElementById('sb-stat-unanswered');


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
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContainer = document.getElementById('modal-container');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalQuestionText = document.getElementById('modal-question-text');
    const modalOptionsContainer = document.getElementById('modal-options-container');
    const modalCheckBtn = document.getElementById('modal-check-btn');
    const modalCorrectAnswer = document.getElementById('modal-correct-answer');
    const exportProgressBtn = document.getElementById('export-progress-btn');
    const importProgressBtn = document.getElementById('import-progress-btn');
    const importFileInput = document.getElementById('import-file-input');
    const importExportMsg = document.getElementById('import-export-msg');
    const practiceTop10Btn = document.getElementById('practice-top-10-failed-btn');
    const practiceTop100Btn = document.getElementById('practice-top-100-failed-btn');
    const practiceRecentBtn = document.getElementById('practice-recent-failed-btn');
    const practiceOver50FailedBtn = document.getElementById('practice-over-50-failed-btn');
    const resultsFooterButtons = document.getElementById('results-footer-buttons');
    
    const progressChartContainer = document.getElementById('progress-chart-container');
    const additionalChartsGrid = document.getElementById('additional-charts-grid');
    const achievementsContainer = document.getElementById('achievements-container');
    const themeToggleFab = document.getElementById('theme-toggle-fab');

    // Modales
    const resetModalOverlay = document.getElementById('reset-modal-overlay');
    const resetConfirmInput = document.getElementById('reset-confirm-input');
    const resetCancelBtn = document.getElementById('reset-cancel-btn');
    const resetConfirmBtn = document.getElementById('reset-confirm-btn');
    
    const restoreStatsBtn = document.getElementById('restore-stats-btn');
    const restoreModalOverlay = document.getElementById('restore-modal-overlay');
    const restoreModalInstruction = document.getElementById('restore-modal-instruction');
    const restoreOptionsContainer = document.getElementById('restore-options-container');
    const restoreConfirmInput = document.getElementById('restore-confirm-input');
    const restoreCancelBtn = document.getElementById('restore-cancel-btn');
    const restoreConfirmBtn = document.getElementById('restore-confirm-btn');


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

    const saveCurrentTestState = () => {
        if (appState.currentTest && !appState.currentTest.isFinished) {
            const additionalTime = appState.currentTest.startTime ? (Date.now() - appState.currentTest.startTime) / 1000 : 0;

            const testStateToSave = {
                ...appState.currentTest,
                timeElapsed: appState.currentTest.timeElapsed + additionalTime
            };
            localStorage.setItem('testAppPausedTest', JSON.stringify(testStateToSave));
        }
    };

    const loadState = () => {
        const settings = localStorage.getItem('testAppSettings');
        if (settings) {
            appState.settings = { ...appState.settings, ...JSON.parse(settings) };
            applyTheme();
        }

        const stats = localStorage.getItem('testAppStats');
        if (stats) appState.stats = JSON.parse(stats);

        const pausedTest = localStorage.getItem('testAppPausedTest');
        if (pausedTest) {
            try {
                appState.currentTest = JSON.parse(pausedTest);
                if (appState.currentTest && !appState.currentTest.isFinished) {
                    resumeContainer.classList.remove('hidden');
                } else {
                    resumeContainer.classList.add('hidden');
                    localStorage.removeItem('testAppPausedTest');
                }
            } catch (e) {
                console.error("Error parsing paused test data:", e);
                localStorage.removeItem('testAppPausedTest');
            }
        }
    };
    
    // --- THEME LOGIC ---
    const updateThemeTooltip = (isDark) => {
        // Lógica inteligente para el título del botón
        if (themeToggleFab) {
            themeToggleFab.title = isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro";
        }
    };

    const applyTheme = () => {
        const theme = appState.settings.theme;
        let isDark = false;
        if (theme === 'dark') isDark = true;
        else if (theme === 'system') isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }

        // Actualizar título del botón
        updateThemeTooltip(isDark);
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (appState.settings.theme === 'system') applyTheme();
    });

    // FAB Toggle Logic
    themeToggleFab.addEventListener('click', () => {
        const isCurrentlyDark = document.documentElement.hasAttribute('data-theme');
        const newTheme = isCurrentlyDark ? 'light' : 'dark';
        appState.settings.theme = newTheme;
        
        saveState();
        applyTheme();
        updateSettingsUI(); 
    });
    
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
            importExportMsg.classList.add('hidden');
        }
    };

    const handleNavClick = (viewId) => {
        if (appState.currentView === 'test-view') {
            pauseTest();
        }
        showView(viewId);
        if (viewId === 'stats-view') {
            renderStats();
            updateRestoreButtonVisibility();
        }
    };

    // --- Lógica para exámenes de práctica globales ---
    const getGlobalFailedQuestions = (sortBy = 'count') => {
        const aggregatedFailed = {}; 
        for (const examCode in appState.stats) {
            for (const qId in appState.stats[examCode].failedQuestions) {
                const stat = appState.stats[examCode].failedQuestions[qId];
                const count = (typeof stat === 'object') ? stat.count : stat;
                const lastFailed = (typeof stat === 'object') ? stat.lastFailed : 0;
    
                if (!aggregatedFailed[qId]) {
                    aggregatedFailed[qId] = { count: 0, lastFailed: 0 };
                }
    
                aggregatedFailed[qId].count += count;
                if (lastFailed > aggregatedFailed[qId].lastFailed) {
                    aggregatedFailed[qId].lastFailed = lastFailed;
                }
            }
        }
        const allQuestionsById = new Map();
        for (const examCode in appState.exams) {
            appState.exams[examCode].questions.forEach(q => {
                if (!allQuestionsById.has(q.id)) {
                    allQuestionsById.set(q.id, q);
                }
            });
        }
        let fullFailedQuestions = Object.entries(aggregatedFailed).map(([qId, stats]) => {
            const question = allQuestionsById.get(parseInt(qId));
            if (question) {
                return {
                    ...question,
                    failureCount: stats.count,
                    lastFailed: stats.lastFailed
                };
            }
            return null;
        }).filter(Boolean);
    
        if (sortBy === 'count') {
            fullFailedQuestions.sort((a, b) => b.failureCount - a.failureCount);
        } else { 
            fullFailedQuestions.sort((a, b) => b.lastFailed - a.lastFailed);
        }
        return fullFailedQuestions;
    };
    
    const getOver50PercentFailedQuestions = () => {
        const allQuestionsById = new Map();
        for (const examCode in appState.exams) {
            appState.exams[examCode].questions.forEach(q => {
                if (!allQuestionsById.has(q.id)) {
                    allQuestionsById.set(q.id, q);
                }
            });
        }
        const questionStats = {}; 
        for (const examCode in appState.stats) {
            const stats = appState.stats[examCode];
            if (stats.failedQuestions) {
                for (const qId in stats.failedQuestions) {
                    if (!questionStats[qId]) questionStats[qId] = { correct: 0, incorrect: 0 };
                    const stat = stats.failedQuestions[qId];
                    const count = (typeof stat === 'object') ? stat.count : stat;
                    questionStats[qId].incorrect += count;
                }
            }
            if (stats.correctQuestions) {
                for (const qId in stats.correctQuestions) {
                    if (!questionStats[qId]) questionStats[qId] = { correct: 0, incorrect: 0 };
                    const stat = stats.correctQuestions[qId];
                    questionStats[qId].correct += stat.count;
                }
            }
        }
        const resultQuestions = [];
        for (const qId in questionStats) {
            const { correct, incorrect } = questionStats[qId];
            const totalAttempts = correct + incorrect;
            if (totalAttempts > 0 && (incorrect / totalAttempts) > 0.5) {
                const question = allQuestionsById.get(parseInt(qId));
                if (question) {
                    question.failureRate = (incorrect / totalAttempts);
                    resultQuestions.push(question);
                }
            }
        }
        resultQuestions.sort((a, b) => b.failureRate - a.failureRate);
        return resultQuestions;
    };

    const startGlobalPracticeFailedTest = (count) => {
        const topFailedQuestions = getGlobalFailedQuestions('count');
        if (topFailedQuestions.length === 0) return;
        const questionsForTest = topFailedQuestions.slice(0, count);
        startTest(`PRACTICE_GLOBAL_TOP_${count}`, questionsForTest.length, questionsForTest, true);
    };
    
    const startRecentlyFailedTest = (count) => {
        const recentlyFailedQuestions = getGlobalFailedQuestions('date');
        if (recentlyFailedQuestions.length === 0) return;
        const questionsForTest = recentlyFailedQuestions.slice(0, count);
        startTest(`PRACTICE_GLOBAL_RECENT_${count}`, questionsForTest.length, questionsForTest, true);
    };

    const startOver50FailedTest = () => {
        const questions = getOver50PercentFailedQuestions();
        if (questions.length === 0) return;
        startTest(`PRACTICE_GLOBAL_OVER_50_FAILED`, questions.length, questions, true);
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
        
        const allFailedQuestionsCount = getGlobalFailedQuestions('count').length;
        const over50FailedQuestions = getOver50PercentFailedQuestions();
        const over50FailedCount = over50FailedQuestions.length;

        if (allFailedQuestionsCount > 0) {
            practiceTop10Btn.disabled = false;
            practiceTop10Btn.textContent = `Practicar las 10 más falladas (${Math.min(10, allFailedQuestionsCount)})`;
            practiceTop100Btn.disabled = false;
            practiceTop100Btn.textContent = `Practicar las 100 más falladas (${Math.min(100, allFailedQuestionsCount)})`;
            practiceRecentBtn.disabled = false;
            practiceRecentBtn.textContent = `Practicar 20 falladas recientemente (${Math.min(20, allFailedQuestionsCount)})`;
        } else {
            practiceTop10Btn.disabled = true;
            practiceTop10Btn.textContent = `Practicar las 10 más falladas (0)`;
            practiceTop100Btn.disabled = true;
            practiceTop100Btn.textContent = `Practicar las 100 más falladas (0)`;
            practiceRecentBtn.disabled = true;
            practiceRecentBtn.textContent = `Practicar 20 falladas recientemente (0)`;
        }

        if (over50FailedCount > 0) {
            practiceOver50FailedBtn.disabled = false;
            practiceOver50FailedBtn.textContent = `Practicar >50% Falladas (${over50FailedCount})`;
        } else {
            practiceOver50FailedBtn.disabled = true;
            practiceOver50FailedBtn.textContent = `Practicar >50% Falladas (0)`;
        }


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
        
        // Calcular estadísticas actuales del test para el header del sidebar
        let correctCount = 0;
        let incorrectCount = 0;
        let unansweredCount = 0; 
        const totalQuestions = test.questions.length;

        test.questions.forEach((q, index) => {
            const userAnswer = test.userAnswers[index];
            if (userAnswer && userAnswer.length > 0) {
                const isCorrect = JSON.stringify(userAnswer.sort()) === JSON.stringify([...q.correct_answers].sort());
                if (isCorrect) correctCount++;
                else incorrectCount++;
            } else {
                unansweredCount++;
            }
        });

        // Actualizar DOM de estadísticas
        sbStatTotal.textContent = totalQuestions;
        sbStatCorrect.textContent = correctCount;
        sbStatIncorrect.textContent = incorrectCount;
        sbStatUnanswered.textContent = unansweredCount;

        // Aplicar clases activas a los filtros del header
        sbStatTotalContainer.classList.toggle('active', test.sidebarFilter === 'all');
        sbStatCorrectContainer.classList.toggle('active', test.sidebarFilter === 'correct');
        sbStatIncorrectContainer.classList.toggle('active', test.sidebarFilter === 'incorrect');
        sbStatUnansweredContainer.classList.toggle('active', test.sidebarFilter === 'unanswered');

        test.questions.forEach((q, index) => {
            // Usar la función helper para determinar si se muestra
            if (!matchesSidebarFilter(index)) return;

            const userAnswer = test.userAnswers[index];
            const hasAnswer = userAnswer && userAnswer.length > 0;
            const isCorrect = hasAnswer ? (JSON.stringify(userAnswer.sort()) === JSON.stringify([...q.correct_answers].sort())) : null;

            const card = document.createElement('div');
            card.className = 'sidebar-question-card';
            card.textContent = `Pregunta ${index + 1}`;
            card.dataset.index = index;

            if (index === test.currentIndex) {
                card.classList.add('current-question');
            }

            if (hasAnswer && index !== test.currentIndex) {
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

    // Listeners para el header del sidebar
    const setupSidebarStatsListeners = () => {
        const toggleFilter = (filter) => {
            if (appState.currentTest) {
                // Si clicas el mismo, vuelve a 'all', si no, pone el nuevo
                appState.currentTest.sidebarFilter = appState.currentTest.sidebarFilter === filter ? 'all' : filter;
                renderQuestionSidebar();
                renderQuestion(); // Actualizar navegación de botones
            }
        };

        sbStatIncorrectContainer.addEventListener('click', () => toggleFilter('incorrect'));
        sbStatCorrectContainer.addEventListener('click', () => toggleFilter('correct'));
        sbStatUnansweredContainer.addEventListener('click', () => toggleFilter('unanswered'));
        sbStatTotalContainer.addEventListener('click', () => {
             if (appState.currentTest) {
                appState.currentTest.sidebarFilter = 'all';
                renderQuestionSidebar();
                renderQuestion(); // Actualizar navegación de botones
            }
        });
    };


    // --- TEST LOGIC ---
    const startTest = (examCode, questionCount, specificQuestions = null, isPractice = false) => {
        localStorage.removeItem('testAppPausedTest');
        resumeContainer.classList.add('hidden');

        const isGlobalPractice = examCode.startsWith('PRACTICE_GLOBAL');
        let examName;
    
        if (examCode.startsWith('PRACTICE_GLOBAL_TOP')) {
            examName = `Top ${questionCount} Preguntas Más Falladas`;
        } else if (examCode.startsWith('PRACTICE_GLOBAL_RECENT')) {
            examName = `${questionCount} Preguntas Falladas Recientemente`;
        } else if (examCode.startsWith('PRACTICE_GLOBAL_OVER_50_FAILED')) {
            examName = `Preguntas con >50% de Fallos`;
        } else {
            const exam = appState.exams[examCode];
            examName = exam.exam_name;
        }


        let questions;
        if (specificQuestions) {
            questions = JSON.parse(JSON.stringify(specificQuestions));
        } else {
            const exam = appState.exams[examCode];
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
            examName,
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
            sidebarFilter: 'all' 
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

    // --- NAVIGATION & FILTER HELPER FUNCTIONS ---

    // Verifica si una pregunta en un índice dado cumple con el filtro activo
    const matchesSidebarFilter = (index) => {
        const test = appState.currentTest;
        if (!test) return false;
        if (test.sidebarFilter === 'all') return true;

        const q = test.questions[index];
        const userAnswer = test.userAnswers[index];
        const hasAnswer = userAnswer && userAnswer.length > 0;
        
        if (test.sidebarFilter === 'unanswered') {
            return !hasAnswer;
        }

        if (hasAnswer) {
            const isCorrect = JSON.stringify(userAnswer.sort()) === JSON.stringify([...q.correct_answers].sort());
            if (test.sidebarFilter === 'correct') return isCorrect;
            if (test.sidebarFilter === 'incorrect') return !isCorrect;
        }
        
        return false;
    };

    // Encuentra el siguiente/anterior índice que cumpla con el filtro
    const findAdjacentIndex = (currentIndex, direction) => {
        const test = appState.currentTest;
        if (!test) return -1;

        let i = currentIndex + direction;
        while (i >= 0 && i < test.questions.length) {
            if (matchesSidebarFilter(i)) {
                return i;
            }
            i += direction;
        }
        return -1;
    };

    const renderQuestion = () => {
        const test = appState.currentTest;
        if (!test) return;
        
        // Asegurarse que la pregunta actual cumple el filtro (si se cambió de filtro mientras se estaba en ella)
        // O simplemente mostrarla, pero la navegación se adapta.
        // Mostramos siempre la pregunta actual aunque no cumpla el filtro para evitar estado vacío.
        
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

        // --- LÓGICA DE BOTONES DE NAVEGACIÓN ACTUALIZADA ---
        const prevIndex = findAdjacentIndex(test.currentIndex, -1);
        const nextIndex = findAdjacentIndex(test.currentIndex, 1);

        prevBtn.disabled = prevIndex === -1;
        
        // Si hay siguiente filtro válido, mostrar Next.
        // Si no hay, y estamos en la última pregunta absoluta, mostrar Finalizar.
        // Si no hay siguiente filtro válido, pero NO es la última absoluta (ej. filtro "Mal" y la última es "Bien"), ocultamos Next.
        
        if (nextIndex !== -1) {
            nextBtn.classList.remove('hidden');
            finishBtn.classList.add('hidden');
        } else {
            nextBtn.classList.add('hidden');
            // Mostrar botón finalizar solo si estamos en la última pregunta absoluta O si ya no hay más preguntas del filtro
            // Por consistencia, permitimos finalizar si no hay más preguntas "Siguientes" disponibles en el filtro actual.
            finishBtn.classList.remove('hidden');
        }
        
        // Caso especial: Si el usuario está en la última pregunta absoluta, siempre mostrar Finalizar
        if (test.currentIndex === test.questions.length - 1) {
            finishBtn.classList.remove('hidden');
            nextBtn.classList.add('hidden');
        }

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
            
            // Auto-avance para preguntas simples
            if (appState.settings.autoAdvance === 'yes') {
                // Pequeño delay para ver la selección
                setTimeout(() => {
                    changeQuestion(1);
                }, 100);
            }
        } else {
            const index = currentSelection.indexOf(selectedValue);
            if (index > -1) {
                currentSelection.splice(index, 1);
                optionButton.classList.remove('selected');
            } else {
                currentSelection.push(selectedValue);
                optionButton.classList.add('selected');
            }
            
            // Auto-avance para preguntas múltiples
            if (appState.settings.autoAdvance === 'yes') {
                // Si el número de respuestas seleccionadas coincide con el número de respuestas correctas, avanza
                if (currentSelection.length === question.correct_answers.length) {
                    setTimeout(() => {
                        changeQuestion(1);
                    }, 100);
                }
            }
        }
        test.userAnswers[test.currentIndex] = currentSelection.sort();
        saveCurrentTestState();
        
        // Actualizar contadores del sidebar al responder
        renderQuestionSidebar();
    };

    const changeQuestion = (direction) => {
        const test = appState.currentTest;
        if (!test || questionContainer.classList.contains('animating')) return;

        if (test.revisitedFromSidebar[test.currentIndex]) {
            test.isLocked[test.currentIndex] = true;
        }
        
        saveCurrentTestState();

        // USAR LA LÓGICA FILTRADA
        const newIndex = findAdjacentIndex(test.currentIndex, direction);

        if (newIndex !== -1) {
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
        const isGlobalPractice = test.examCode.startsWith('PRACTICE_GLOBAL');
        const examStats = !isGlobalPractice ? (appState.stats[test.examCode] || { attempts: [], failedQuestions: {} }) : null;
    
        test.questions.forEach((q, index) => {
            const userAnswer = test.userAnswers[index] || [];
            const isCorrect = JSON.stringify(userAnswer.sort()) === JSON.stringify([...q.correct_answers].sort());
    
            if (isCorrect) {
                correctCount++;
            }
    
            // Lógica de actualización de estadísticas
            if (examStats) {
                if (test.isPracticeFailedTest) {
                    if (isCorrect) {
                        delete examStats.failedQuestions[q.id];
                    }
                } else {
                    if (isCorrect) {
                        if (!examStats.correctQuestions) examStats.correctQuestions = {};
                        const stat = examStats.correctQuestions[q.id];
                        if (!stat) {
                            examStats.correctQuestions[q.id] = { count: 1, lastPassed: Date.now() };
                        } else {
                            stat.count++;
                            stat.lastPassed = Date.now();
                        }
                    } else {
                        const stat = examStats.failedQuestions[q.id];
                        if (typeof stat === 'number' || !stat) {
                            examStats.failedQuestions[q.id] = { count: (stat || 0) + 1, lastFailed: Date.now() };
                        } else {
                            stat.count++;
                            stat.lastFailed = Date.now();
                        }
                    }
                }
            }
        });
    
        const score = (correctCount / test.questions.length) * 100;
    
        if (examStats) {
            examStats.attempts.push({
                date: new Date().toISOString(),
                score: score,
                time: test.timeElapsed,
                questionCount: test.questions.length
            });
            appState.stats[test.examCode] = examStats;
            saveState();
            renderExamSelector();
        }
    
        renderResults(score, correctCount);
        localStorage.removeItem('testAppPausedTest');
        resumeContainer.classList.add('hidden');
        showView('results-view');
    };

    const pauseTest = () => {
        stopTimer();
        saveCurrentTestState();
        if (appState.currentTest && !appState.currentTest.isFinished) {
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

        // Identificar preguntas falladas de este examen específico
        const failedQuestionsInThisTest = test.questions.filter((q, index) => {
            const userAnswer = test.userAnswers[index] || [];
            return JSON.stringify(userAnswer.sort()) !== JSON.stringify([...q.correct_answers].sort());
        });

        let summaryHTML = `
        <h3 class="result-status ${statusClass}">${statusText}</h3>
        <div class="results-grid">
        <div class="result-card"><h4>Puntuación</h4><p>${formatPercentage(score)}</p></div>
        <div class="result-card"><h4>Correctas</h4><p>${correctCount} de ${test.questions.length}</p></div>
        <div class="result-card"><h4>Tiempo</h4><p>${Math.floor(test.timeElapsed / 60)}m ${Math.floor(test.timeElapsed % 60)}s</p></div>
        </div>`;
        
        // Limpiar el footer primero
        resultsFooterButtons.innerHTML = '';
        resultsFooterButtons.appendChild(restartTestBtn);

        // Botón para reintentar falladas (a la derecha del reiniciar)
        if (failedQuestionsInThisTest.length > 0) {
            const retryBtn = document.createElement('button');
            retryBtn.id = 'retry-failed-results-btn';
            retryBtn.className = 'warning-btn';
            retryBtn.textContent = `Reintentar las ${failedQuestionsInThisTest.length} Falladas`;
            retryBtn.addEventListener('click', () => {
                startTest(
                    test.examCode, 
                    failedQuestionsInThisTest.length, 
                    failedQuestionsInThisTest, 
                    true
                );
            });
            resultsFooterButtons.appendChild(retryBtn);
        }

        resultsSummary.innerHTML = summaryHTML;
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
        const originalSelect = statsExamSelect;
        originalSelect.innerHTML = '<option value="all">Estadísticas Generales</option>';
    
        const customOptionsContainer = document.querySelector('.custom-options');
        customOptionsContainer.innerHTML = '';
    
        const allOptionEl = document.createElement('div');
        allOptionEl.className = 'custom-option';
        allOptionEl.textContent = 'Estadísticas Generales';
        allOptionEl.dataset.value = 'all';
        customOptionsContainer.appendChild(allOptionEl);
    
        Object.keys(appState.exams).forEach(examCode => {
            const option = document.createElement('option');
            option.value = examCode;
            option.textContent = appState.exams[examCode].exam_name;
            originalSelect.appendChild(option);
    
            const customOptionEl = document.createElement('div');
            customOptionEl.className = 'custom-option';
            customOptionEl.textContent = appState.exams[examCode].exam_name;
            customOptionEl.dataset.value = examCode;
            customOptionsContainer.appendChild(customOptionEl);
        });
    
        displayStatsForSelection();
    };

    const displayStatsForSelection = () => {
        const selectedCode = statsExamSelect.value;
    
        const attempts = selectedCode === 'all'
            ? Object.values(appState.stats).flatMap(s => s.attempts)
            : (appState.stats[selectedCode]?.attempts || []);
        
        // Renderizar gráfico
        renderChart(attempts);
        renderAdditionalCharts(attempts); // NUEVO
        
        // Check logros
        checkAchievements();
        
        displayCalculatedStats(attempts);
    
        if (selectedCode !== 'all') {
            displayExamSpecificStats(selectedCode);
        } else {
            const recentAttempts = attempts.filter(a => a.questionCount >= 30).slice(-5);
            
            if (recentAttempts.length > 0) {
                const recentAvgScore = recentAttempts.reduce((sum, a) => sum + a.score, 0) / recentAttempts.length;
                
                let title = "";
                let message = "";
                let cssClass = "";

                if (recentAvgScore >= 95) {
                    title = "¡Nivel Experto!";
                    message = `Tu puntuación media reciente es un impresionante <strong>${formatPercentage(recentAvgScore)}</strong>. Estás más que listo para el examen real. ¡Sigue así para asegurar el máximo resultado!`;
                    cssClass = 'prepared';
                } else if (recentAvgScore >= 85) {
                    title = "¡Estás preparado!";
                    message = `Tienes una media reciente de <strong>${formatPercentage(recentAvgScore)}</strong>. Estás por encima de la nota de corte. Mantén este nivel de práctica y repasa los fallos puntuales para asegurar.`;
                    cssClass = 'prepared';
                } else if (recentAvgScore >= 75) {
                    title = "Casi lo tienes...";
                    message = `Tu media reciente es del <strong>${formatPercentage(recentAvgScore)}</strong>. Estás cerca del aprobado (85%), repasa tus puntos débiles y lo conseguirás.`;
                    cssClass = 'neutral'; 
                } else if (recentAvgScore >= 60) {
                    title = "Necesitas más estudio";
                    message = `Con una media reciente del <strong>${formatPercentage(recentAvgScore)}</strong>, aún hay riesgo de suspender. Concéntrate en los simulacros de las preguntas que más fallas y repasa la teoría básica.`;
                    cssClass = 'unprepared';
                } else {
                    title = "Nivel Inicial / Bajo";
                    message = `Tu media reciente es <strong>${formatPercentage(recentAvgScore)}</strong>. Se recomienda estudiar el temario a fondo antes de seguir haciendo tests intensivos para evitar memorizar respuestas incorrectas.`;
                    cssClass = 'unprepared';
                }

                readinessContainer.className = cssClass;
                readinessContainer.innerHTML = `<h4>${title}</h4><p>${message}</p>`;

            } else {
                readinessContainer.className = 'neutral';
                readinessContainer.innerHTML = '<h4>Evaluación de Preparación General</h4><p>Realiza más tests (de al menos 30 preguntas) para que el sistema pueda evaluar tu nivel de preparación con precisión.</p>';
            }
    
            const aggregatedFailed = {};
            Object.values(appState.stats).forEach(examStat => {
                for (const qId in examStat.failedQuestions) {
                    const stat = examStat.failedQuestions[qId];
                    const count = (typeof stat === 'object') ? stat.count : stat;
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
    
    // --- CHART LOGIC (Spline + Gradient + Tooltip) ---
    const renderChart = (attempts) => {
        progressChartContainer.innerHTML = '';

        const sortedAttempts = attempts.sort((a, b) => new Date(a.date) - new Date(b.date));
        const data = sortedAttempts.slice(-20);

        if (data.length < 2) {
            progressChartContainer.innerHTML = '<p class="no-data-msg">Se necesitan al menos 2 intentos para generar una gráfica.</p>';
            return;
        }

        const width = progressChartContainer.clientWidth - 20;
        const height = progressChartContainer.clientHeight - 20;
        const padding = 25; // Aumentado para etiquetas

        const yScale = (val) => height - padding - (val / 100) * (height - 2 * padding);
        const xScale = (index) => padding + (index / (data.length - 1)) * (width - 2 * padding);

        // --- SMOOTHING LOGIC (Catmull-Rom Spline to Cubic Bezier) ---
        const getControlPoints = (p0, p1, p2, t = 0.3) => {
            const d01 = Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2));
            const d12 = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
            const fa = t * d01 / (d01 + d12);
            const fb = t * d12 / (d01 + d12);
            const p1x = p1.x - fa * (p2.x - p0.x);
            const p1y = p1.y - fa * (p2.y - p0.y);
            const p2x = p1.x + fb * (p2.x - p0.x);
            const p2y = p1.y + fb * (p2.y - p0.y);
            return [{x: p1x, y: p1y}, {x: p2x, y: p2y}];
        }

        const points = data.map((d, i) => ({ x: xScale(i), y: yScale(d.score) }));
        
        let pathD = `M ${points[0].x},${points[0].y}`;
        
        for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[i - 1] || points[i];
            const p1 = points[i];
            const p2 = points[i + 1];
            const p3 = points[i + 2] || p2;

            const cp1 = getControlPoints(p0, p1, p2)[1];
            const cp2 = getControlPoints(p1, p2, p3)[0];

            pathD += ` C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${p2.x},${p2.y}`;
        }

        const areaPathD = `${pathD} L ${points[points.length-1].x},${height-padding} L ${points[0].x},${height-padding} Z`;

        const circles = data.map((d, i) => {
            const x = xScale(i);
            const y = yScale(d.score);
            
            return `<circle cx="${x}" cy="${y}" class="chart-dot">
                        <title>Puntuación: ${d.score.toFixed(1)}%\nFecha: ${new Date(d.date).toLocaleDateString()}</title>
                    </circle>`;
        }).join('');

        const svg = `
            <svg class="chart-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
                <!-- Ejes -->
                <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" class="chart-axis"/>
                <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" class="chart-axis"/>
                
                <!-- Grid lines -->
                <line x1="${padding}" y1="${yScale(0)}" x2="${width - padding}" y2="${yScale(0)}" class="chart-grid"/>
                <line x1="${padding}" y1="${yScale(50)}" x2="${width - padding}" y2="${yScale(50)}" class="chart-grid"/>
                <line x1="${padding}" y1="${yScale(85)}" x2="${width - padding}" y2="${yScale(85)}" class="chart-grid" style="stroke:var(--success-color);stroke-dasharray:0;opacity:0.5"/>
                <line x1="${padding}" y1="${yScale(100)}" x2="${width - padding}" y2="${yScale(100)}" class="chart-grid"/>

                <!-- Etiquetas Eje Y -->
                <text x="${padding - 5}" y="${yScale(0) + 3}" class="chart-label">0%</text>
                <text x="${padding - 5}" y="${yScale(50) + 3}" class="chart-label">50%</text>
                <text x="${padding - 5}" y="${yScale(100) + 3}" class="chart-label">100%</text>

                <!-- Área (Relleno) -->
                <path d="${areaPathD}" class="chart-area" />

                <!-- Línea Curva -->
                <path d="${pathD}" class="chart-line" />
                
                <!-- Puntos -->
                ${circles}
            </svg>
        `;

        progressChartContainer.innerHTML += svg; // Append SVG
    };

    // --- NUEVAS GRÁFICAS ADICIONALES MEJORADAS ---
    const renderAdditionalCharts = (attempts) => {
        additionalChartsGrid.innerHTML = '';
        
        if (!attempts || attempts.length === 0) return;

        const scoreDistributionSVG = renderScoreDistributionChart(attempts);
        const passFailSVG = renderPassFailChart(attempts);

        // Card 1: Distribución
        const distCard = document.createElement('div');
        distCard.className = 'extra-chart-card';
        distCard.innerHTML = `<h4>Distribución de Puntuaciones</h4>${scoreDistributionSVG}`;
        additionalChartsGrid.appendChild(distCard);

        // Card 2: Pass/Fail
        const passFailCard = document.createElement('div');
        passFailCard.className = 'extra-chart-card';
        passFailCard.innerHTML = `<h4>Ratio Aprobados/Suspendidos</h4>${passFailSVG}`;
        additionalChartsGrid.appendChild(passFailCard);
    };

    const renderScoreDistributionChart = (attempts) => {
        // Bins: <60, 60-84, 85-100
        const bins = [0, 0, 0]; 
        const labels = ['<60%', '60-84%', '85-100%'];
        const fillUrls = ['url(#gradFail)', 'url(#gradMid)', 'url(#gradPass)'];
        
        attempts.forEach(a => {
            if (a.score < 60) bins[0]++;
            else if (a.score < 85) bins[1]++;
            else bins[2]++;
        });

        const maxVal = Math.max(...bins);
        const height = 180;
        const width = 220;
        const barWidth = 40;
        const gap = 25;
        const startX = 35;
        const bottomY = height - 25;

        const bars = bins.map((val, i) => {
            const h = maxVal > 0 ? (val / maxVal) * (bottomY - 20) : 0; 
            const x = startX + i * (barWidth + gap);
            const y = bottomY - h;
            
            // Solo dibujar si hay valor para evitar artefactos
            if (val === 0) return `
                <text x="${x + barWidth/2}" y="${bottomY + 15}" class="bar-label">${labels[i]}</text>
            `;

            return `
                <rect x="${x}" y="${y}" width="${barWidth}" height="${h}" rx="4" ry="4" fill="${fillUrls[i]}" class="bar-rect">
                    <title>${labels[i]}: ${val} exámenes</title>
                </rect>
                <text x="${x + barWidth/2}" y="${y - 5}" class="bar-value">${val}</text>
                <text x="${x + barWidth/2}" y="${bottomY + 15}" class="bar-label">${labels[i]}</text>
            `;
        }).join('');

        return `
            <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}">
                <defs>
                    <linearGradient id="gradFail" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:var(--chart-fail-start);stop-opacity:1" />
                        <stop offset="100%" style="stop-color:var(--chart-fail-end);stop-opacity:1" />
                    </linearGradient>
                    <linearGradient id="gradMid" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:var(--chart-mid-start);stop-opacity:1" />
                        <stop offset="100%" style="stop-color:var(--chart-mid-end);stop-opacity:1" />
                    </linearGradient>
                    <linearGradient id="gradPass" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:var(--chart-pass-start);stop-opacity:1" />
                        <stop offset="100%" style="stop-color:var(--chart-pass-end);stop-opacity:1" />
                    </linearGradient>
                </defs>
                <!-- Eje X -->
                <line x1="20" y1="${bottomY}" x2="${width - 20}" y2="${bottomY}" class="chart-axis" />
                <!-- Grid Lines -->
                <line x1="20" y1="20" x2="${width - 20}" y2="20" class="bar-grid" />
                <line x1="20" y1="${(bottomY-20)/2 + 20}" x2="${width - 20}" y2="${(bottomY-20)/2 + 20}" class="bar-grid" />
                ${bars}
            </svg>`;
    };

    const renderPassFailChart = (attempts) => {
        const passCount = attempts.filter(a => a.score >= 85).length;
        const failCount = attempts.length - passCount;
        const total = attempts.length;
        
        if (total === 0) return '';

        const size = 180;
        const cx = size / 2;
        const cy = size / 2;
        const r = 70;
        const strokeWidth = 18;
        const circumference = 2 * Math.PI * r;

        const passRatio = passCount / total;
        const passDash = passRatio * circumference;
        const offset = -90; // Empezar arriba (las 12 en punto)

        // Calculamos el dasharray para el segmento de aprobados
        const dashArray = (passRatio === 1 || passRatio === 0) 
            ? `${passDash} ${circumference}` 
            : `${passDash} ${circumference - passDash}`;

        return `
            <svg width="100%" height="100%" viewBox="0 0 ${size} ${size}">
                <defs>
                    <!-- Gradiente Verde (Aprobados) -->
                    <linearGradient id="gradDonutPass" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:var(--chart-pass-start);stop-opacity:1" />
                        <stop offset="100%" style="stop-color:var(--chart-pass-end);stop-opacity:1" />
                    </linearGradient>
                    
                    <!-- Gradiente Rojo (Suspendidos) -->
                    <linearGradient id="gradDonutFail" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:var(--chart-fail-start);stop-opacity:1" />
                        <stop offset="100%" style="stop-color:var(--chart-fail-end);stop-opacity:1" />
                    </linearGradient>
                </defs>
                
                <!-- Círculo de Fondo (Suspendidos - Rojo) -->
                <!-- Este círculo está completo por debajo. Lo que no tape el verde, se verá rojo. -->
                <circle cx="${cx}" cy="${cy}" r="${r}" 
                    fill="transparent" 
                    stroke="url(#gradDonutFail)" 
                    stroke-width="${strokeWidth}" 
                    class="donut-segment"
                >
                    <title>Suspendidos: ${failCount} (${((1-passRatio)*100).toFixed(1)}%)</title>
                </circle>
                
                <!-- Segmento de Aprobados (Verde - Superpuesto) -->
                <circle cx="${cx}" cy="${cy}" r="${r}" 
                    fill="transparent" 
                    stroke="url(#gradDonutPass)" 
                    stroke-width="${strokeWidth}" 
                    stroke-dasharray="${dashArray}" 
                    stroke-dashoffset="0"
                    transform="rotate(${offset} ${cx} ${cy})"
                    class="donut-segment"
                    style="transition: stroke-dasharray 0.8s cubic-bezier(0.4, 0, 0.2, 1);"
                >
                    <title>Aprobados: ${passCount} (${(passRatio*100).toFixed(1)}%)</title>
                </circle>

                <!-- Texto Central -->
                <text x="${cx}" y="${cy - 5}" class="donut-text-main">
                    ${Math.round(passRatio * 100)}%
                </text>
                <text x="${cx}" y="${cy + 15}" class="donut-text-sub">
                    Aprobados
                </text>
            </svg>
        `;
    };


    // --- ACHIEVEMENTS LOGIC (UPDATED) ---
    const achievementsList = [
        { 
            id: 'first_steps', 
            title: 'Primeros Pasos', 
            desc: 'Completa tu primer examen.', 
            check: (stats) => stats.totalAttempts >= 1, 
            icon: '🥚',
            getProgress: (stats) => stats.totalAttempts >= 1 ? '' : 'Haz 1 examen.'
        },
        { 
            id: 'student', 
            title: 'Estudiante', 
            desc: 'Completa 10 exámenes.', 
            check: (stats) => stats.totalAttempts >= 10, 
            icon: '📚',
            getProgress: (stats) => stats.totalAttempts >= 10 ? '' : `Faltan ${10 - stats.totalAttempts} exámenes.`
        },
        { 
            id: 'streak', 
            title: 'En Racha', 
            desc: 'Aprueba 5 exámenes seguidos.', 
            check: (stats) => stats.maxStreak >= 5, 
            icon: '🔥',
            getProgress: (stats) => stats.maxStreak >= 5 ? '' : `Racha actual: ${stats.currentStreak}/5`
        },
        { 
            id: 'survivor', 
            title: 'Superviviente', 
            desc: 'Aprueba un examen con la nota justa (85-89%).', 
            check: (stats) => stats.hasCloseCall, 
            icon: '😅',
            getProgress: (stats) => stats.hasCloseCall ? '' : 'Aprueba entre 85% y 89%.'
        },
        { 
            id: 'speedster', 
            title: 'Velocista', 
            desc: 'Aprueba un examen de >50 preguntas con media < 10s/pregunta.', 
            check: (stats) => stats.hasSpeedRun, 
            icon: '⚡',
            getProgress: (stats) => stats.hasSpeedRun ? '' : 'Sé más rápido en un test largo.'
        },
        { 
            id: 'marathoner', 
            title: 'Maratonista', 
            desc: 'Completa un examen de más de 50 preguntas.', 
            check: (stats) => stats.hasLongExam, 
            icon: '🏃',
            getProgress: (stats) => stats.hasLongExam ? '' : 'Haz un examen > 50 pregs.'
        },
        { 
            id: 'scholar', 
            title: 'Erudito', 
            desc: 'Responde correctamente a 500 preguntas en total.', 
            check: (stats) => stats.totalCorrect >= 500, 
            icon: '🧠',
            getProgress: (stats) => stats.totalCorrect >= 500 ? '' : `Faltan ${500 - stats.totalCorrect} aciertos.`
        },
        { 
            id: 'expert', 
            title: 'Experto', 
            desc: 'Completa 50 exámenes.', 
            check: (stats) => stats.totalAttempts >= 50, 
            icon: '🎓',
            getProgress: (stats) => stats.totalAttempts >= 50 ? '' : `Faltan ${50 - stats.totalAttempts} exámenes.`
        },
        { 
            id: 'master', 
            title: 'Maestro', 
            desc: 'Mantén una media global superior al 90% (mín. 5 exámenes).', 
            check: (stats) => stats.totalAttempts >= 5 && stats.avgScore > 90, 
            icon: '👑',
            getProgress: (stats) => {
                if (stats.totalAttempts < 5) return `Faltan ${5 - stats.totalAttempts} exámenes.`;
                return stats.avgScore > 90 ? '' : `Media actual: ${stats.avgScore.toFixed(1)}%`;
            }
        },
        { 
            id: 'perfectionist', 
            title: 'Perfeccionista', 
            desc: 'Obtén un 100% en un examen de 50 preguntas o más.', 
            check: (stats) => stats.hasPerfectScore, 
            icon: '💎',
            getProgress: (stats) => stats.hasPerfectScore ? '' : '100% en test >50 pregs.'
        },
        { 
            id: 'dedicated', 
            title: 'Dedicado', 
            desc: 'Pasa más de 50 horas estudiando en total.', 
            check: (stats) => stats.totalTime >= 180000, 
            icon: '⏳',
            getProgress: (stats) => {
                const hoursLeft = Math.ceil((180000 - stats.totalTime) / 3600);
                return stats.totalTime >= 180000 ? '' : `Faltan aprox. ${hoursLeft} horas.`;
            }
        },
        { 
            id: 'veteran', 
            title: 'Veterano', 
            desc: 'Responde a un total de 10.000 preguntas.', 
            check: (stats) => stats.totalQuestionsAnswered >= 10000, 
            icon: '🛡️',
            getProgress: (stats) => stats.totalQuestionsAnswered >= 10000 ? '' : `Faltan ${10000 - stats.totalQuestionsAnswered} pregs.`
        }
    ];

    const checkAchievements = () => {
        let totalAttempts = 0;
        let totalTime = 0;
        let totalCorrect = 0;
        let totalScoreSum = 0;
        let hasPerfectScore = false;
        let hasCloseCall = false;
        let hasSpeedRun = false;
        let currentStreak = 0;
        let maxStreak = 0;
        let totalQuestionsAnswered = 0;
        let hasLongExam = false;

        const allAttempts = Object.values(appState.stats).flatMap(s => s.attempts).sort((a, b) => new Date(a.date) - new Date(b.date));

        totalAttempts = allAttempts.length;

        allAttempts.forEach(attempt => {
            totalTime += attempt.time;
            totalScoreSum += attempt.score;
            totalQuestionsAnswered += attempt.questionCount;
            
            // Maratonista: > 50 preguntas
            if (attempt.questionCount > 50) hasLongExam = true;

            const correctInExam = Math.round((attempt.score / 100) * attempt.questionCount);
            totalCorrect += correctInExam;

            // PERFECCIONISTA: 100% en examen >= 50 preguntas
            if (attempt.score === 100 && attempt.questionCount >= 50) hasPerfectScore = true;
            
            if (attempt.score >= 85 && attempt.score < 90) hasCloseCall = true;
            
            // Velocista: > 50 preguntas Y tiempo medio < 10s Y aprobado (>=85)
            if (attempt.questionCount > 50 && (attempt.time / attempt.questionCount) < 10 && attempt.score >= 85) {
                hasSpeedRun = true;
            }

            if (attempt.score >= 85) {
                currentStreak++;
            } else {
                currentStreak = 0;
            }
            if (currentStreak > maxStreak) maxStreak = currentStreak;
        });

        const avgScore = totalAttempts > 0 ? (totalScoreSum / totalAttempts) : 0;

        const computedStats = {
            totalAttempts, totalTime, totalCorrect, avgScore, hasPerfectScore, hasCloseCall, hasSpeedRun, maxStreak, totalQuestionsAnswered, hasLongExam, currentStreak
        };

        achievementsContainer.innerHTML = '';
        achievementsList.forEach(achievement => {
            const isUnlocked = achievement.check(computedStats);
            const card = document.createElement('div');
            card.className = `achievement-card ${isUnlocked ? 'unlocked' : ''}`;
            
            // Si está bloqueado, añadir data-progress para el tooltip CSS
            if (!isUnlocked) {
                const progressText = achievement.getProgress(computedStats);
                card.setAttribute('data-progress', progressText);
                card.title = 'Logro Bloqueado';
            } else {
                card.title = '¡Logro Desbloqueado!';
            }

            card.innerHTML = `
                <span class="achievement-icon">${achievement.icon}</span>
                <div class="achievement-title">${achievement.title}</div>
                <div class="achievement-desc">${achievement.desc}</div>
            `;
            achievementsContainer.appendChild(card);
        });
    };

    // ... (Rest of the code: displayCalculatedStats, etc.)
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

        const failed = Object.entries(examStat.failedQuestions)
            .sort((a, b) => (b[1].count || b[1]) - (a[1].count || a[1])) // Retrocompatible
            .slice(0, 10);
        
        failedQuestionsList.innerHTML = '';
        if (failed.length === 0) {
            failedQuestionsList.innerHTML = '<li>¡Ninguna pregunta fallada para este examen!</li>';
        } else {
            failed.forEach(([qId, stat]) => {
                const count = typeof stat === 'object' ? stat.count : stat;
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
    
    const updateRestoreButtonVisibility = () => {
        const backups = JSON.parse(localStorage.getItem('testAppStatsBackups') || '[]');
        restoreStatsBtn.classList.toggle('hidden', backups.length === 0);
    };
    
    const openResetConfirmationModal = () => {
        resetConfirmInput.value = '';
        resetConfirmBtn.disabled = true;
        resetModalOverlay.classList.remove('hidden');
        resetConfirmInput.focus();
    };
    
    const closeResetConfirmationModal = () => {
        resetModalOverlay.classList.add('hidden');
    };

    const handleResetConfirmation = () => {
        // 1. Crear la copia de seguridad antes de borrar
        const backupsJSON = localStorage.getItem('testAppStatsBackups');
        const backups = backupsJSON ? JSON.parse(backupsJSON) : [];
        backups.unshift({ // Añadir al principio para que la más reciente sea la primera
            timestamp: new Date().toISOString(),
            stats: JSON.parse(JSON.stringify(appState.stats)) // Deep copy
        });
        // Limitar a 5 copias de seguridad
        if (backups.length > 5) backups.length = 5;
        localStorage.setItem('testAppStatsBackups', JSON.stringify(backups));
    
        // 2. Lógica de reseteo existente
        const selectedCode = statsExamSelect.value;
        if (selectedCode === 'all') {
            appState.stats = {};
        } else if (appState.stats[selectedCode]) {
            delete appState.stats[selectedCode];
        }
        
        // 3. Guardar el nuevo estado (vacío) y actualizar la UI
        saveState();
        displayStatsForSelection();
        renderExamSelector();
        closeResetConfirmationModal();
        
        // 4. Mostrar el botón de restaurar
        updateRestoreButtonVisibility();
    };

    const openRestoreModal = () => {
        const backups = JSON.parse(localStorage.getItem('testAppStatsBackups') || '[]');
    
        if (backups.length === 0) {
            return;
        }
    
        restoreOptionsContainer.innerHTML = '';
        restoreModalInstruction.innerHTML = '';
    
        if (backups.length === 1) {
            restoreModalInstruction.innerHTML = `Se restaurará la copia de seguridad creada el: <strong>${new Date(backups[0].timestamp).toLocaleString()}</strong>`;
            restoreOptionsContainer.style.display = 'none';
        } else {
            restoreModalInstruction.innerHTML = '<strong>Selecciona la copia de seguridad que quieres restaurar:</strong>';
            restoreOptionsContainer.style.display = 'flex';
            backups.forEach((backup, index) => {
                const button = document.createElement('button');
                button.textContent = `Copia del ${new Date(backup.timestamp).toLocaleString()}`;
                button.dataset.backupIndex = index;
                if (index === 0) {
                    button.classList.add('active'); // Seleccionar la primera por defecto
                }
                button.addEventListener('click', (e) => {
                    restoreOptionsContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                });
                restoreOptionsContainer.appendChild(button);
            });
        }
    
        restoreConfirmInput.value = '';
        restoreConfirmBtn.disabled = true;
        restoreModalOverlay.classList.remove('hidden');
        restoreConfirmInput.focus();
    };

    const closeRestoreModal = () => {
        restoreModalOverlay.classList.add('hidden');
    };

    const handleRestoreConfirmation = () => {
        const backups = JSON.parse(localStorage.getItem('testAppStatsBackups') || '[]');
        if (backups.length === 0) return;

        let selectedIndex = 0;
        if (backups.length > 1) {
            const activeButton = restoreOptionsContainer.querySelector('button.active');
            if (activeButton) {
                selectedIndex = parseInt(activeButton.dataset.backupIndex, 10);
            }
        }

        const statsToRestore = backups[selectedIndex].stats;
        appState.stats = JSON.parse(JSON.stringify(statsToRestore)); // Deep copy

        // Eliminar la copia restaurada de la lista
        backups.splice(selectedIndex, 1);
        if (backups.length > 0) {
            localStorage.setItem('testAppStatsBackups', JSON.stringify(backups));
        } else {
            localStorage.removeItem('testAppStatsBackups');
        }

        saveState();
        displayStatsForSelection();
        renderExamSelector();
        updateRestoreButtonVisibility();
        closeRestoreModal();
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
        const { timeLimit, questionOrder, answerOrder, showSidebar, showImages, autoAdvance, theme } = appState.settings;
        document.querySelectorAll('#setting-time-group button').forEach(btn =>
            btn.classList.toggle('active', Number(btn.dataset.value) === timeLimit));
        document.querySelectorAll('#q-order-group button').forEach(btn =>
            btn.classList.toggle('active', btn.dataset.value === questionOrder));
        document.querySelectorAll('#a-order-group button').forEach(btn =>
            btn.classList.toggle('active', btn.dataset.value === answerOrder));
        document.querySelectorAll('#sidebar-setting-group button').forEach(btn =>
            btn.classList.toggle('active', btn.dataset.value === showSidebar));
        document.querySelectorAll('#image-setting-group button').forEach(btn =>
            btn.classList.toggle('active', btn.dataset.value === showImages));
        document.querySelectorAll('#auto-advance-group button').forEach(btn =>
            btn.classList.toggle('active', btn.dataset.value === autoAdvance));
        document.querySelectorAll('#theme-setting-group button').forEach(btn =>
            btn.classList.toggle('active', btn.dataset.value === theme));
    };

    const saveSettings = () => {
        const timeLimit = Number(document.querySelector('#setting-time-group .active').dataset.value);
        const questionOrder = document.querySelector('#q-order-group .active').dataset.value;
        const answerOrder = document.querySelector('#a-order-group .active').dataset.value;
        const showSidebar = document.querySelector('#sidebar-setting-group .active').dataset.value;
        const showImages = document.querySelector('#image-setting-group .active').dataset.value;
        const autoAdvance = document.querySelector('#auto-advance-group .active').dataset.value;
        const theme = document.querySelector('#theme-setting-group .active').dataset.value;

        appState.settings = { ...appState.settings, timeLimit, questionOrder, answerOrder, showSidebar, showImages, autoAdvance, theme };

        saveState();
        updateSidebarState();
        applyTheme(); // Aplicar cambios de tema inmediatamente
    };
    
    // --- IMPORT/EXPORT LOGIC ---
    const exportTestState = () => {
        const pausedTestJSON = localStorage.getItem('testAppPausedTest');
        importExportMsg.classList.add('hidden');

        if (!pausedTestJSON) {
            importExportMsg.textContent = 'No hay ningún examen en curso para exportar.';
            importExportMsg.style.color = 'var(--danger-color)';
            importExportMsg.classList.remove('hidden');
            return;
        }

        try {
            const pausedTest = JSON.parse(pausedTestJSON);
            const blob = new Blob([pausedTestJSON], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            
            const now = new Date();
            const timestamp = now.toISOString().slice(0, 19).replace('T', '_').replace(/:/g, '-');
            
            a.href = url;
            a.download = `progreso_${pausedTest.examCode}_${timestamp}.json`;
            document.body.appendChild(a);
            a.click();
            
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);

            importExportMsg.textContent = 'Progreso exportado con éxito.';
            importExportMsg.style.color = 'var(--success-color)';
            importExportMsg.classList.remove('hidden');
        } catch (error) {
            console.error('Error al exportar el estado:', error);
            importExportMsg.textContent = 'Error al exportar.';
            importExportMsg.style.color = 'var(--danger-color)';
            importExportMsg.classList.remove('hidden');
        }
    };

    const importTestState = (event) => {
        const file = event.target.files[0];
        importExportMsg.classList.add('hidden');
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target.result;
                const importedState = JSON.parse(content);

                // Validation
                if (
                    importedState.examCode &&
                    appState.exams[importedState.examCode] &&
                    Array.isArray(importedState.questions) &&
                    typeof importedState.currentIndex === 'number' &&
                    !importedState.isFinished
                ) {
                    localStorage.setItem('testAppPausedTest', content);
                    loadState(); 
                    
                    importExportMsg.textContent = '¡Progreso importado con éxito! Ahora puedes continuar el examen.';
                    importExportMsg.style.color = 'var(--success-color)';
                    importExportMsg.classList.remove('hidden');
                    
                    showView('selector-view'); 
                } else {
                    let errorMsg = 'El archivo de importación es inválido o no compatible.';
                    if(importedState.isFinished) errorMsg = 'No se puede importar un examen ya finalizado.';
                    else if (importedState.examCode && !appState.exams[importedState.examCode]) errorMsg = `El examen '${importedState.examCode}' no se encuentra en esta aplicación.`;
                    throw new Error(errorMsg);
                }
            } catch (error) {
                console.error('Error al importar el estado:', error);
                importExportMsg.textContent = `Error: ${error.message}`;
                importExportMsg.style.color = 'var(--danger-color)';
                importExportMsg.classList.remove('hidden');
            } finally {
                importFileInput.value = '';
            }
        };

        reader.onerror = () => {
            importExportMsg.textContent = 'Error al leer el archivo.';
            importExportMsg.style.color = 'var(--danger-color)';
            importExportMsg.classList.remove('hidden');
            importFileInput.value = '';
        };

        reader.readAsText(file);
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
        longPressTimer = setTimeout(() => { showAnswer(); }, 1000);
    };

    const handleBodyTouchEndOrMove = () => {
        clearTimeout(longPressTimer);
    };
    
    const handleSidebarToggle = () => {
        appState.settings.sidebarCollapsed = !appState.settings.sidebarCollapsed;
        saveState();
        updateSidebarState();
    };

    // --- INITIALIZATION & EVENT LISTENERS ---
    const init = () => {
        loadState();
        setupSettingsView();
        setupModalListeners();
        loadExams();
        setupSidebarStatsListeners();

        // --- INICIO DEL CÓDIGO PARA EL SELECTOR PERSONALIZADO ---
        const customSelectWrapper = document.querySelector('.custom-select-wrapper');
        const customSelectTrigger = customSelectWrapper.querySelector('.custom-select-trigger');
        const customOptions = customSelectWrapper.querySelector('.custom-options');
        const originalSelect = statsExamSelect;

        customSelectTrigger.addEventListener('click', () => {
            customSelectWrapper.classList.toggle('open');
        });

        customOptions.addEventListener('click', (e) => {
            if (e.target.classList.contains('custom-option')) {
                const selectedOption = e.target;
                
                // Actualizar el texto visible
                customSelectTrigger.querySelector('span').textContent = selectedOption.textContent;
                
                // Sincronizar con el <select> original y disparar el evento
                originalSelect.value = selectedOption.dataset.value;
                originalSelect.dispatchEvent(new Event('change'));

                customSelectWrapper.classList.remove('open');
            }
        });

        // Cerrar el selector si se hace clic fuera de él
        window.addEventListener('click', (e) => {
            if (!customSelectWrapper.contains(e.target)) {
                customSelectWrapper.classList.remove('open');
            }
        });
        // --- FIN DEL CÓDIGO PARA EL SELECTOR PERSONALIZADO ---

        updateSidebarState();
        updateRestoreButtonVisibility();

        const header = document.querySelector('header');
        const adjustSidebarPosition = () => {
            if (!header || !questionSidebar) return;
            const headerHeight = header.offsetHeight;
            const headerRect = header.getBoundingClientRect();
            questionSidebar.style.top = (headerRect.bottom <= 0) ? '0px' : `${headerHeight}px`;
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
                const { examCode, questions } = appState.currentTest;
        
                if (examCode.startsWith('PRACTICE_GLOBAL_TOP')) {
                    startGlobalPracticeFailedTest(questions.length);
                } else if (examCode.startsWith('PRACTICE_GLOBAL_RECENT')) {
                    startRecentlyFailedTest(questions.length);
                } else if (examCode.startsWith('PRACTICE_GLOBAL_OVER_50_FAILED')) {
                    startOver50FailedTest();
                } else {
                    startTest(examCode, questions.length);
                }
            }
        });
        
        statsExamSelect.addEventListener('change', displayStatsForSelection);
        
        // Listeners para los modales
        resetStatsBtn.addEventListener('click', openResetConfirmationModal);
        resetCancelBtn.addEventListener('click', closeResetConfirmationModal);
        resetConfirmBtn.addEventListener('click', handleResetConfirmation);
        resetConfirmInput.addEventListener('input', () => {
            resetConfirmBtn.disabled = resetConfirmInput.value.toLowerCase() !== 'eliminar';
        });
        resetModalOverlay.addEventListener('click', (e) => {
            if (e.target === resetModalOverlay) closeResetConfirmationModal();
        });

        restoreStatsBtn.addEventListener('click', openRestoreModal);
        restoreCancelBtn.addEventListener('click', closeRestoreModal);
        restoreConfirmBtn.addEventListener('click', handleRestoreConfirmation);
        restoreConfirmInput.addEventListener('input', () => {
            restoreConfirmBtn.disabled = restoreConfirmInput.value.toLowerCase() !== 'restaurar';
        });
        restoreModalOverlay.addEventListener('click', (e) => {
            if (e.target === restoreModalOverlay) closeRestoreModal();
        });


        resumeBtn.addEventListener('click', resumeTest);
        
        practiceTop10Btn.addEventListener('click', () => startGlobalPracticeFailedTest(10));
        practiceTop100Btn.addEventListener('click', () => startGlobalPracticeFailedTest(100));
        practiceRecentBtn.addEventListener('click', () => startRecentlyFailedTest(20));
        practiceOver50FailedBtn.addEventListener('click', startOver50FailedTest);


        // Listeners for Import/Export
        exportProgressBtn.addEventListener('click', exportTestState);
        importProgressBtn.addEventListener('click', () => importFileInput.click());
        importFileInput.addEventListener('change', importTestState);
    };

    init();
});
