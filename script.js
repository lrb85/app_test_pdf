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
            raceEnabled: 'enabled', 
            raceCollapsed: false,
            theme: 'system'
        },
        stats: {},
        currentTest: null,
        timerInterval: null,
        raceState: null 
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
    
    // Sidebar elements (Right)
    const questionSidebar = document.getElementById('question-sidebar');
    const sidebarContent = document.getElementById('sidebar-content');
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    
    // Race Track Elements (Left)
    const raceTrackSidebar = document.getElementById('race-track-sidebar');
    const raceToggleBtn = document.getElementById('race-toggle-btn');
    const animalAvatars = {
        cheetah: document.getElementById('animal-cheetah'),
        octopus: document.getElementById('animal-octopus'),
        koala: document.getElementById('animal-koala'),
        dog: document.getElementById('animal-dog'),
        turtle: document.getElementById('animal-turtle')
    };
    const raceResultContainer = document.getElementById('race-result-container');
    const raceStatsLeaderboard = document.getElementById('race-stats-leaderboard');

    // Pause Elements
    const pauseBtn = document.getElementById('pause-test-btn');
    const pauseOverlay = document.getElementById('pause-overlay');
    const resumeOverlayBtn = document.getElementById('resume-overlay-btn');
    const pauseEstimationBox = document.getElementById('pause-estimation-box');


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
    const resultsFooter = document.getElementById('results-footer'); // Elemento del DOM
    
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
                timeElapsed: appState.currentTest.timeElapsed + additionalTime,
                // Guardamos el estado de la carrera para persistencia al recargar
                raceState: appState.raceState 
            };
            localStorage.setItem('testAppPausedTest', JSON.stringify(testStateToSave));
        }
    };

    const loadState = () => {
        const settings = localStorage.getItem('testAppSettings');
        if (settings) {
            appState.settings = { ...appState.settings, ...JSON.parse(settings) };
            if(!appState.settings.raceEnabled) appState.settings.raceEnabled = 'enabled';
            applyTheme();
        }

        const stats = localStorage.getItem('testAppStats');
        if (stats) appState.stats = JSON.parse(stats);

        const pausedTest = localStorage.getItem('testAppPausedTest');
        if (pausedTest) {
            try {
                appState.currentTest = JSON.parse(pausedTest);
                // Restauramos el estado de la carrera desde el objeto guardado
                if (appState.currentTest.raceState) {
                    appState.raceState = appState.currentTest.raceState;
                }

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
        updateThemeTooltip(isDark);
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (appState.settings.theme === 'system') applyTheme();
    });

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

    // --- Lógica de Visibilidad del Panel Carrera ---
    const updateRaceTrackState = () => {
        const shouldBeVisible = appState.settings.raceEnabled === 'enabled' && appState.currentView === 'test-view';
        
        if (shouldBeVisible) {
            raceTrackSidebar.classList.remove('hidden');
            if (appState.settings.raceCollapsed) {
                raceTrackSidebar.classList.add('collapsed');
                raceToggleBtn.title = 'Mostrar Pista';
            } else {
                raceTrackSidebar.classList.remove('collapsed');
                raceToggleBtn.title = 'Ocultar Pista';
            }
        } else {
            raceTrackSidebar.classList.add('hidden');
        }
    };


    // --- VIEW NAVIGATION ---
    const showView = (viewId) => {
        appState.currentView = viewId;
        Object.values(views).forEach(view => view.classList.remove('active'));
        views[viewId.replace('-view', '')].classList.add('active');
        
        updateSidebarState();
        updateRaceTrackState();

        if (viewId === 'settings-view') {
            updateSettingsUI();
            importExportMsg.classList.add('hidden');
        }

        // CORRECCIÓN: Asegurar que el botón de reanudar se muestre si vamos a la vista principal y hay un test pausado
        if (viewId === 'selector-view') {
            if (appState.currentTest && !appState.currentTest.isFinished) {
                resumeContainer.classList.remove('hidden');
            } else {
                resumeContainer.classList.add('hidden');
            }
        }
    };

    const handleNavClick = (viewId) => {
        if (appState.currentView === 'test-view' && appState.currentTest && !appState.currentTest.isPaused) {
            stopTimer();
            appState.currentTest.isPaused = true; 
            saveCurrentTestState();
            resumeContainer.classList.remove('hidden');
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
                // Si está pausado, no permitir navegación
                if (appState.currentTest && appState.currentTest.isPaused) return;

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
            sidebarFilter: 'all',
            isPaused: false
        };

        initRace(); // Inicializar la carrera
        startTimer();
        renderQuestion();
        showView('test-view');
        updatePauseUI();
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
        
        if (nextIndex !== -1) {
            nextBtn.classList.remove('hidden');
            finishBtn.classList.add('hidden');
        } else {
            nextBtn.classList.add('hidden');
            finishBtn.classList.remove('hidden');
        }
        
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
        
        // Si está pausado, deshabilitar interacciones
        if (test.isPaused) {
            disableInteractions();
        }
    };

    const selectAnswer = (optionButton) => {
        const test = appState.currentTest;
        if (!test || test.isPaused) return; // Bloquear si está pausado
        
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
            
            if (appState.settings.autoAdvance === 'yes') {
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
            
            if (appState.settings.autoAdvance === 'yes') {
                if (currentSelection.length === question.correct_answers.length) {
                    setTimeout(() => {
                        changeQuestion(1);
                    }, 100);
                }
            }
        }
        test.userAnswers[test.currentIndex] = currentSelection.sort();
        saveCurrentTestState();
        updateRace();
        renderQuestionSidebar();
    };

    const changeQuestion = (direction) => {
        const test = appState.currentTest;
        if (!test || test.isPaused || questionContainer.classList.contains('animating')) return; // Bloquear si está pausado

        if (test.revisitedFromSidebar[test.currentIndex]) {
            test.isLocked[test.currentIndex] = true;
        }
        
        saveCurrentTestState();

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

    // --- LÓGICA DE PAUSA ---
    const togglePause = () => {
        const test = appState.currentTest;
        if (!test) return;
        
        if (!test.isPaused) {
            // Caso: PAUSAR (De en ejecución a pausado)
            stopTimer(); // Detener el timer y guardar el tiempo acumulado ANTES de cambiar el flag
            test.isPaused = true;
        } else {
            // Caso: REANUDAR (De pausado a en ejecución)
            test.isPaused = false;
            startTimer();
        }
        
        saveCurrentTestState();
        updatePauseUI();
    };

    const updatePauseUI = () => {
        const test = appState.currentTest;
        if (!test) return;

        if (test.isPaused) {
            pauseOverlay.classList.remove('hidden');
            pauseBtn.textContent = '▶️'; // Icono Play
            pauseBtn.title = 'Reanudar Examen';
            
            // Lógica de estimación de tiempo en pausa
            const answeredCount = test.userAnswers.filter(a => a !== null && a.length > 0).length;
            const remainingQs = test.questions.length - answeredCount;
            
            if (answeredCount > 0 && remainingQs > 0) {
                const avgTimePerQuestion = test.timeElapsed / answeredCount;
                const estimatedRemainingSeconds = avgTimePerQuestion * remainingQs;
                
                const pauseDurationMinutes = 5;
                const now = new Date();
                // Tiempo estimado = Ahora + 5 min pausa + Tiempo restante de examen
                const estimatedFinishTime = new Date(now.getTime() + (pauseDurationMinutes * 60000) + (estimatedRemainingSeconds * 1000));
                
                const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                pauseEstimationBox.innerHTML = `
                    <p><strong>Ritmo actual:</strong> ${avgTimePerQuestion.toFixed(1)} segundos/pregunta.</p>
                    <p>Te quedan <strong>${remainingQs}</strong> preguntas.</p>
                    <p>Al ritmo actual tardarás unos <strong>${Math.ceil(estimatedRemainingSeconds / 60)} minutos</strong> más para terminar el examen.</p>
                    <hr style="border:0; border-top:1px solid var(--border-color); margin:10px 0;">
                    <p style="font-size:0.9em; color:var(--text-secondary);">
                        Si reanudas en ${pauseDurationMinutes} minutos, terminarás aproximadamente a las <strong>${formatTime(estimatedFinishTime)}</strong>.
                    </p>
                `;
                pauseEstimationBox.classList.remove('hidden');
            } else {
                pauseEstimationBox.innerHTML = "<p>Responde más preguntas para calcular una estimación de tiempo.</p>";
            }

            disableInteractions();
        } else {
            pauseOverlay.classList.add('hidden');
            pauseBtn.textContent = '⏸️'; // Icono Pausa
            pauseBtn.title = 'Pausar Examen';
            enableInteractions();
        }
    };

    const disableInteractions = () => {
        const options = optionsContainer.querySelectorAll('.option');
        options.forEach(opt => opt.style.pointerEvents = 'none');
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        finishBtn.disabled = true;
        showAnswerBtn.disabled = true;
    };

    const enableInteractions = () => {
        const test = appState.currentTest;
        // Reactivar opciones solo si no están bloqueadas/reveladas
        if (!test.isLocked[test.currentIndex] && !test.answersRevealed[test.currentIndex]) {
            const options = optionsContainer.querySelectorAll('.option');
            options.forEach(opt => opt.style.pointerEvents = 'auto');
        }
        
        const prevIndex = findAdjacentIndex(test.currentIndex, -1);
        prevBtn.disabled = prevIndex === -1;
        
        const nextIndex = findAdjacentIndex(test.currentIndex, 1);
        nextBtn.disabled = nextIndex === -1; // Se gestiona visualmente en renderQuestion, pero aquí aseguramos estado
        
        finishBtn.disabled = false;
        if (!test.answersRevealed[test.currentIndex]) {
             showAnswerBtn.disabled = false;
        }
        
        renderQuestion(); // Re-render para asegurar estado correcto de botones
    };


    // --- LÓGICA DE LA CARRERA ---

    // Función para barajar las pistas visualmente (DOM)
    const shuffleRaceLanes = () => {
        const trackLanesContainer = document.querySelector('.track-lanes');
        if(trackLanesContainer) {
            const lanes = Array.from(trackLanesContainer.children);
            for (let i = lanes.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [lanes[i], lanes[j]] = [lanes[j], lanes[i]];
            }
            lanes.forEach(lane => trackLanesContainer.appendChild(lane));
        }
    };

    // Función para obtener el orden actual de los carriles (IDs)
    const getLaneOrder = () => {
        const trackLanesContainer = document.querySelector('.track-lanes');
        if (!trackLanesContainer) return [];
        return Array.from(trackLanesContainer.children).map(lane => lane.id);
    };

    // Función para restaurar el orden visual basado en una lista de IDs guardada
    const restoreLaneOrder = (orderList) => {
        const trackLanesContainer = document.querySelector('.track-lanes');
        if (!trackLanesContainer || !orderList) return;
        
        orderList.forEach(id => {
            const lane = document.getElementById(id);
            if (lane) {
                trackLanesContainer.appendChild(lane); // Mover al final reordena el DOM
            }
        });
    };

    // Función para generar y asignar tiempos basados en pesos
    const assignWeightedPaces = () => {
        // 1. Definir el mejor tiempo fijo
        const bestTime = 8.0;

        // 2. Pool de tiempos posibles (NO incluye el 8.0 para no duplicarlo)
        const timePool = [
            8.2, 8.5, 8.8, 
            9.0, 9.2, 9.5, 9.8, 
            10.0, 10.2, 10.5, 10.8, 
            11.0, 11.2, 11.5, 
            12.0, 12.5, 
            13.0, 13.5, 
            14.0, 14.5, 
            15.0
        ];

        const rivals = ['octopus', 'koala', 'dog', 'turtle'];

        // Pesos de probabilidad
        const weights = {
            'octopus': 45,
            'koala': 30,
            'dog': 20,
            'turtle': 5
        };

        // 3. Inicializar array con el tiempo fijo
        let selectedTimes = [bestTime];
        
        // 4. Seleccionar 3 tiempos aleatorios más del pool
        const poolCopy = [...timePool];
        for(let i=0; i<3; i++) {
            if(poolCopy.length === 0) break;
            const randIdx = Math.floor(Math.random() * poolCopy.length);
            selectedTimes.push(poolCopy[randIdx]);
            poolCopy.splice(randIdx, 1);
        }

        // 5. Ordenar tiempos de mejor (menor) a peor (mayor)
        selectedTimes.sort((a, b) => a - b);

        const assignedPaces = {};
        let availableRivals = [...rivals];

        // Asignar tiempos ordenados a rivales basados en peso
        for (let i = 0; i < selectedTimes.length; i++) {
            const time = selectedTimes[i];
            let totalWeight = 0;
            availableRivals.forEach(r => totalWeight += weights[r]);

            let randomVal = Math.random() * totalWeight;
            let selectedRival = null;

            for (const rival of availableRivals) {
                randomVal -= weights[rival];
                if (randomVal <= 0) {
                    selectedRival = rival;
                    break;
                }
            }
            
            if (!selectedRival) selectedRival = availableRivals[0];

            assignedPaces[selectedRival] = time;
            availableRivals = availableRivals.filter(r => r !== selectedRival);
        }

        return assignedPaces;
    };

    const initRace = () => {
        if (appState.settings.raceEnabled !== 'enabled') return;
        
        const paces = assignWeightedPaces();

        appState.raceState = {
            cheetah: 0,
            octopus: 0,
            koala: 0,
            dog: 0,
            turtle: 0,
            rivalPaces: paces,
            laneOrder: [] // Inicializamos propiedad nueva
        };
        
        Object.values(animalAvatars).forEach(el => el.style.bottom = '0%');

        // Barajar posición en pista (DOM Shuffling)
        shuffleRaceLanes();

        // NUEVO: Guardar el orden visual resultante para el futuro
        appState.raceState.laneOrder = getLaneOrder();
    };
    
    const handleRaceToggle = () => {
        appState.settings.raceCollapsed = !appState.settings.raceCollapsed;
        saveState();
        updateRaceTrackState();
    };

    const updateRace = () => {
        // Si está deshabilitado o pausado, no actualizar
        if (appState.settings.raceEnabled !== 'enabled' || !appState.currentTest || appState.currentTest.isPaused) return;

        const test = appState.currentTest;
        const totalQs = test.questions.length;
        
        const answeredCount = test.userAnswers.filter(a => a !== null && a.length > 0).length;
        let cheetahProgress = (answeredCount / totalQs) * 100;
        
        // Usar el tiempo calculado en startTimer (más preciso que recalcular aquí con Date.now si hay pausas)
        // Pero para animación suave, usamos la diferencia actual si el timer está corriendo
        let currentElapsed = test.timeElapsed;
        if (appState.timerInterval) {
             currentElapsed += (Date.now() - test.startTime) / 1000;
        }
        
        const calculateRivalProgress = (pacePerQuestion) => {
            const totalTargetTime = totalQs * pacePerQuestion;
            if (totalTargetTime <= 0) return 0;
            let prog = (currentElapsed / totalTargetTime) * 100;
            return Math.min(prog, 100);
        };

        const paces = appState.raceState.rivalPaces;

        appState.raceState.cheetah = Math.min(cheetahProgress, 100);
        appState.raceState.octopus = calculateRivalProgress(paces.octopus);
        appState.raceState.koala = calculateRivalProgress(paces.koala);
        appState.raceState.dog = calculateRivalProgress(paces.dog);
        appState.raceState.turtle = calculateRivalProgress(paces.turtle);

        // Actualizar DOM
        animalAvatars.cheetah.style.bottom = `${appState.raceState.cheetah}%`;
        animalAvatars.octopus.style.bottom = `${appState.raceState.octopus}%`;
        animalAvatars.koala.style.bottom = `${appState.raceState.koala}%`;
        animalAvatars.dog.style.bottom = `${appState.raceState.dog}%`;
        animalAvatars.turtle.style.bottom = `${appState.raceState.turtle}%`;
    };

    // --- SOUND EFFECTS (Longer) ---
    const playSound = (type) => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                const ctx = new AudioContext();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                if (type === 'pass') {
                    // Sonido "Tada" más largo
                    osc.type = 'sine';
                    // Arpegio rápido
                    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
                    osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.2); // E5
                    osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.4); // G5
                    osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.6); // C6
                    
                    gain.gain.setValueAtTime(0.1, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);
                    
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start();
                    osc.stop(ctx.currentTime + 2.0);
                } else if (type === 'fail') {
                    // Sonido "Fail" más largo
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(150, ctx.currentTime);
                    osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.5);
                    osc.frequency.linearRampToValueAtTime(60, ctx.currentTime + 1.5);
                    
                    gain.gain.setValueAtTime(0.1, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
                    
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start();
                    osc.stop(ctx.currentTime + 1.5);
                }
            }
        } catch(e) { console.log("Audio not supported"); }
    };


    // -----------------------------------

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
        
        // --- Lógica de la Carrera (Calculada ANTES de guardar para persistencia) ---
        let raceHTMLString = '';
        let raceDataToSave = null;
        
        if (appState.settings.raceEnabled === 'enabled') {
            const avgTime = test.timeElapsed / test.questions.length;
            const paces = appState.raceState.rivalPaces;

            const participants = [
                { name: 'GUEPI', icon: '🐆', time: avgTime, isUser: true },
                { name: 'PULPI', icon: '🐙', time: paces.octopus, isUser: false },
                { name: 'MANDIS', icon: '🐨', time: paces.koala, isUser: false },
                { name: 'GOYITO', icon: '🐕', time: paces.dog, isUser: false },
                { name: 'GARY', icon: '🐢', time: paces.turtle, isUser: false }
            ];

            participants.sort((a, b) => a.time - b.time);

            const userRank = participants.findIndex(p => p.isUser) + 1;
            const userWonRace = userRank === 1;
            const userPassed = score >= 85; 
            
            // --- CAMBIO AQUÍ: Crear un array simplificado con los resultados de TODOS ---
            const detailedResults = participants.map((p, index) => ({
                name: p.name,
                time: p.time,
                rank: index + 1,
                isUser: p.isUser
            }));

            // Datos para guardar en estadísticas
            raceDataToSave = {
                rank: userRank,
                avgTime: avgTime,
                isWin: userWonRace,
                detailedResults: detailedResults 
            };

            let resultClass = '';
            let msg = '';
            let icon = '';

            if (userWonRace && userPassed) {
                resultClass = 'win-clean';
                icon = '🏆🐆';
                msg = `<h3>¡Victoria!</h3><p>¡Eres el rey de la pista! Ganaste la carrera con <strong>${avgTime.toFixed(1)}s/preg</strong> y aprobaste.</p>`;
            } else if (userWonRace && !userPassed) {
                resultClass = 'win-doping';
                icon = '💉🐆';
                msg = `<h3>Descalificado por Doping</h3><p>Fuiste el más rápido (<strong>${avgTime.toFixed(1)}s/preg</strong>), pero suspendiste.</p>`;
            } else {
                resultClass = 'lose';
                icon = '🐆';
                msg = `<h3>¡A Entrenar Más!</h3><p>Quedaste en posición <strong>${userRank}º</strong>. Tu tiempo: <strong>${avgTime.toFixed(1)}s/preg</strong>.</p>`;
            }

            let rankingHTML = `
                <table class="race-ranking-table">
                    <thead>
                        <tr>
                            <th title="Posición final en la carrera">Pos</th>
                            <th title="Nombre del corredor">Corredor</th>
                            <th title="Tiempo medio por pregunta">Tiempo Medio</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            participants.forEach((p, index) => {
                const rowClass = p.isUser ? 'rank-row user-row' : 'rank-row';
                const medal = index === 0 ? '🥇' : (index === 1 ? '🥈' : (index === 2 ? '🥉' : ''));
                rankingHTML += `
                    <tr class="${rowClass}">
                        <td>${index + 1} ${medal}</td>
                        <td><span class="rank-icon">${p.icon}</span> ${p.name}</td>
                        <td>${p.time.toFixed(1)}s</td>
                    </tr>
                `;
            });
            rankingHTML += `</tbody></table>`;

            // Generar el HTML completo del contenedor de carrera
            // AÑADIDO ID para el icono del animal
            raceHTMLString = `
                <div id="race-result-container" class="${resultClass}">
                    <div id="race-result-icon" style="font-size: 3rem; margin-bottom: 10px; cursor: pointer;" title="¡Haz click para oír tu resultado!">${icon}</div>
                    ${msg}
                    ${rankingHTML}
                </div>
            `;
        }
    
        if (examStats) {
            const attemptData = {
                date: new Date().toISOString(),
                score: score,
                time: test.timeElapsed,
                questionCount: test.questions.length
            };
            
            if (raceDataToSave) {
                attemptData.raceStats = raceDataToSave;
            }

            examStats.attempts.push(attemptData);
            appState.stats[test.examCode] = examStats;
            saveState();
            renderExamSelector();
        }

        // Sonidos
        if (score >= 85) {
            playSound('pass');
        } else {
            playSound('fail');
        }

        // Llamamos a renderResults pasando el HTML de la carrera
        renderResults(score, correctCount, raceHTMLString);

        localStorage.removeItem('testAppPausedTest');
        resumeContainer.classList.add('hidden');
        showView('results-view');
    };

    const pauseTest = () => {
        if (!appState.currentTest || appState.currentTest.isFinished) return;
        // Si ya está pausado, no hace nada (o podría hacer toggle, pero mejor explícito)
        if (!appState.currentTest.isPaused) {
            togglePause();
        }
        saveCurrentTestState();
        resumeContainer.classList.remove('hidden');
    };

    const resumeTest = () => {
        if (appState.currentTest) {
            appState.currentTest.startTime = Date.now();
            
            // Al reanudar desde el menú principal, nos aseguramos de quitar pausa si estaba puesta
            appState.currentTest.isPaused = false;

            updateRaceTrackState();

            // Restaurar orden visual en lugar de barajar aleatoriamente
            if (appState.raceState && appState.raceState.laneOrder && appState.raceState.laneOrder.length > 0) {
                restoreLaneOrder(appState.raceState.laneOrder);
            } else {
                // Fallback por si es un examen antiguo sin orden guardado
                shuffleRaceLanes();
                if (appState.raceState) {
                    appState.raceState.laneOrder = getLaneOrder();
                }
            }

            // CORRECCIÓN: Forzar actualización de posiciones eliminando la transición temporalmente
            // para evitar que se vean deslizarse desde el inicio.
            const avatars = Object.values(animalAvatars);
            avatars.forEach(el => el.style.transition = 'none');
            
            updateRace(); 
            
            // Forzar reflow
            avatars.forEach(el => el.offsetHeight);
            
            // Restaurar transición
            avatars.forEach(el => el.style.transition = '');

            
            startTimer();
            renderQuestion();
            showView('test-view');
            updatePauseUI(); // Asegurar UI correcta
            resumeContainer.classList.add('hidden');
        }
    };


    const startTimer = () => {
        if (appState.timerInterval) clearInterval(appState.timerInterval);
        appState.currentTest.startTime = Date.now();

        appState.timerInterval = setInterval(() => {
            const test = appState.currentTest;
            // Si está pausado, no avanzar (doble check)
            if (test.isPaused) return; 

            const timeLimit = appState.settings.timeLimit * 60;
            const totalElapsed = test.timeElapsed + (Date.now() - test.startTime) / 1000;

            // Actualizar carrera
            updateRace();

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
        if (appState.currentTest && appState.currentTest.startTime && !appState.currentTest.isPaused) {
            // Solo sumar tiempo si no estaba ya pausado antes
            appState.currentTest.timeElapsed += (Date.now() - appState.currentTest.startTime) / 1000;
            appState.currentTest.startTime = null;
        }
    };

    // --- RESULTS & REVIEW ---
    const renderResults = (score, correctCount, raceHTML = '') => { 
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
        
        ${raceHTML} 
        
        <div class="results-grid">
            <div class="result-card"><h4>Puntuación</h4><p>${formatPercentage(score)}</p></div>
            <div class="result-card"><h4>Correctas</h4><p>${correctCount} de ${test.questions.length}</p></div>
            <div class="result-card"><h4>Tiempo</h4><p>${Math.floor(test.timeElapsed / 60)}m ${Math.floor(test.timeElapsed % 60)}s</p></div>
        </div>
    `;
    
    // Lógica de botones del footer
    resultsFooterButtons.innerHTML = '';
    resultsFooterButtons.appendChild(restartTestBtn);

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

    // Mover el footer debajo del H3 de estado
    const statusHeader = resultsSummary.querySelector('.result-status');
    const footerElement = document.getElementById('results-footer');
    if(statusHeader && footerElement) {
        statusHeader.insertAdjacentElement('afterend', footerElement);
    }
    
    // Añadir listener al icono del animal para reproducir sonido
    const animalIcon = document.getElementById('race-result-icon');
    if(animalIcon) {
        animalIcon.addEventListener('click', () => {
            playSound(isPassed ? 'pass' : 'fail');
        });
    }

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
        updateRace(); 
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
        renderAdditionalCharts(attempts);
        
        // Check logros (Recalcula en cada render para permitir bloqueo)
        checkAchievements();
        
        displayCalculatedStats(attempts);
        renderRaceLeaderboard(attempts); 
    
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

    // Función auxiliar para generar números pseudo-aleatorios basados en semilla
    const seededRandom = (seedStr) => {
        let hash = 0;
        for (let i = 0; i < seedStr.length; i++) {
            hash = ((hash << 5) - hash) + seedStr.charCodeAt(i);
            hash |= 0;
        }
        const x = Math.sin(hash) * 10000;
        return x - Math.floor(x);
    };

    // Función centralizada para calcular las estadísticas de la carrera
    const getRaceLeaderboardStats = (attempts) => {
        const raceAttempts = attempts.filter(a => a.raceStats);
        if (raceAttempts.length === 0) return { allRunners: [], totalRaces: 0 };

        const userStats = { name: 'GUEPI', icon: '🐆', isUser: true, wins: 0, dqs: 0, pos: {1:0, 2:0, 3:0, 4:0, 5:0}, totalTime: 0, bestTime: Infinity, count: 0 };
        
        const rivals = [
            { name: 'PULPI', icon: '🐙', basePace: 9.0 },
            { name: 'MANDIS', icon: '🐨', basePace: 11.0 },
            { name: 'GOYITO', icon: '🐕', basePace: 13.0 },
            { name: 'GARY', icon: '🐢', basePace: 15.0 }
        ];

        const rivalStatsMap = {};
        rivals.forEach(r => {
            rivalStatsMap[r.name] = { 
                ...r, 
                isUser: false, 
                wins: 0, 
                dqs: 0, 
                pos: {1:0, 2:0, 3:0, 4:0, 5:0}, 
                totalTime: 0, 
                bestTime: Infinity, 
                count: 0 
            };
        });

        raceAttempts.forEach(attempt => {
            const uTime = attempt.raceStats.avgTime;
            const uRankPure = attempt.raceStats.rank;
            const uScore = attempt.score;
            const uIsPass = uScore >= 85;
            
            userStats.count++;
            userStats.totalTime += uTime;
            if(uTime < userStats.bestTime) userStats.bestTime = uTime;

            let userIsDQ = false;
            if (uRankPure === 1 && !uIsPass) {
                userIsDQ = true;
                userStats.dqs++; 
            } else {
                if (userStats.pos[uRankPure] !== undefined) {
                    userStats.pos[uRankPure]++;
                }
                if (uRankPure === 1 && uIsPass) {
                    userStats.wins++;
                }
            }

            // --- INICIO DE LA CORRECCIÓN ---
            let raceResults = [];

            // CASO 1: Tenemos datos detallados guardados (Nueva lógica)
            if (attempt.raceStats.detailedResults) {
                raceResults = attempt.raceStats.detailedResults;
            } 
            // CASO 2: Datos antiguos (Fallback a simulación)
            else {
                // Simular rivales usando semilla consistente (Lógica antigua)
                const currentRaceRivals = rivals.map(r => {
                    const rand = seededRandom(attempt.date + r.name);
                    const variation = (rand * 0.2) - 0.1; 
                    const time = r.basePace * (1 + variation);
                    return { name: r.name, time: time, isUser: false };
                });

                raceResults = [
                    { name: userStats.name, time: uTime, isUser: true },
                    ...currentRaceRivals
                ];
                
                raceResults.sort((a, b) => a.time - b.time);
            }

            raceResults.forEach((r, idx) => {
                if (!r.isUser) {
                    let rank = idx + 1;
                    
                    // Si estamos usando datos detallados, el rank ya viene calculado, 
                    // pero si usamos el fallback o recálculo, usamos el índice.
                    // En los datos detallados guardados, r.rank ya es correcto.
                    if (attempt.raceStats.detailedResults) {
                        rank = r.rank;
                    } else {
                        // Ajuste si el usuario fue DQ siendo primero (Solo para lógica antigua):
                        if (userIsDQ && raceResults[0].isUser) {
                             rank = idx; 
                        }
                    }

                    const rStat = rivalStatsMap[r.name];
                    if (rStat) {
                        rStat.count++;
                        rStat.totalTime += r.time;
                        if (r.time < rStat.bestTime) rStat.bestTime = r.time;
                        
                        if (rank >= 1 && rank <= 5) {
                            rStat.pos[rank]++;
                            if (rank === 1) rStat.wins++;
                        }
                    }
                }
            });
        });

        const allRunners = [userStats, ...Object.values(rivalStatsMap)];

        allRunners.forEach(r => {
            r.avgTime = r.count > 0 ? r.totalTime / r.count : 0;
        });

        // Ordenar clasificación global (Estilo Medallero Olímpico)
        allRunners.sort((a, b) => {
            if (b.wins !== a.wins) return b.wins - a.wins;
            if (b.pos[2] !== a.pos[2]) return b.pos[2] - a.pos[2];
            if (b.pos[3] !== a.pos[3]) return b.pos[3] - a.pos[3];
            if (b.pos[4] !== a.pos[4]) return b.pos[4] - a.pos[4];
            return b.pos[5] - a.pos[5];
        });
        
        return { allRunners, totalRaces: raceAttempts.length };
    };

    const renderRaceLeaderboard = (attempts) => {
        const { allRunners, totalRaces } = getRaceLeaderboardStats(attempts);

        if (totalRaces === 0) {
            raceStatsLeaderboard.innerHTML = '<p style="text-align:center; color:var(--text-secondary);">Realiza un examen con la "Pista de Atletismo" activada para ver tus estadísticas de carrera.</p>';
            return;
        }

        const userStats = allRunners.find(r => r.isUser);

        // GENERAR HTML
        let rowsHTML = '';
        allRunners.forEach((p, index) => {
            const rowClass = p.isUser ? 'rank-row user-row' : 'rank-row';
            const medal = index === 0 ? '🥇' : (index === 1 ? '🥈' : (index === 2 ? '🥉' : ''));
            
            let breakdown = `
                <span class="pos-tag p1" title="Veces 1º">🥇${p.pos[1]}</span>
                <span class="pos-tag p2" title="Veces 2º">🥈${p.pos[2]}</span>
                <span class="pos-tag p3" title="Veces 3º">🥉${p.pos[3]}</span>
            `;
            if (p.isUser) {
                breakdown += `<span class="pos-tag pdq" title="Veces Descalificado">🚫${p.dqs}</span>`;
            }

            rowsHTML += `
                <tr class="${rowClass}">
                    <td>${index + 1} ${medal}</td>
                    <td style="text-align:left; padding-left:15px;">
                        <span class="rank-icon">${p.icon}</span> 
                        ${p.name}
                    </td>
                    <td style="font-weight:bold; color:var(--success-color);">${p.count}</td>
                    <td class="breakdown-cell">${breakdown}</td>
                    <td>${p.bestTime === Infinity ? '-' : p.bestTime.toFixed(1)}s</td>
                    <td>${p.avgTime.toFixed(1)}s</td>
                </tr>
            `;
        });

        const userWinRate = userStats && userStats.count > 0 ? (userStats.wins / userStats.count * 100) : 0;
        let message = "";
        if (userWinRate > 50) {
            message = "¡Increíble! Eres un auténtico guepardo. Dominas la pista.";
        } else if (userWinRate > 20) {
            message = "¡Buen ritmo! Estás ganando consistencia.";
        } else if (userStats && userStats.dqs > userStats.wins) {
            message = "¡Cuidado! Corres mucho pero fallas demasiado. La velocidad sin control no sirve.";
        } else {
            message = "¡No te rindas! La constancia es la clave.";
        }

        raceStatsLeaderboard.innerHTML = `
            <table class="race-ranking-table full-stats">
                <thead>
                    <tr>
                        <th title="Posición en la tabla">Rank</th>
                        <th title="Nombre del corredor">Corredor</th>
                        <th title="Número total de carreras realizadas">Carreras</th>
                        <th title="Desglose de posiciones históricas">Historial (1º/2º/3º/DQ)</th>
                        <th title="Mejor tiempo registrado por pregunta">Mejor Ritmo</th>
                        <th title="Tiempo promedio histórico por pregunta">Ritmo Global</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHTML}
                </tbody>
            </table>
            <div class="race-motivation">
                "${message}"
            </div>
        `;
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
                
                <!-- Círculo de Fondo (Suspendidos) -->
                <circle cx="${cx}" cy="${cy}" r="${r}" 
                    fill="transparent" 
                    stroke="url(#gradDonutFail)" 
                    stroke-width="${strokeWidth}" 
                    class="donut-segment"
                >
                    <title>Suspendidos: ${failCount} (${((1-passRatio)*100).toFixed(1)}%)</title>
                </circle>
                
                <!-- Segmento de Aprobados -->
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
            desc: 'Aprueba tu primer examen.', // Cambio de texto
            check: (stats) => stats.totalPassed >= 1, // Cambio: totalPassed
            icon: '🥚',
            getProgress: (stats) => stats.totalPassed >= 1 ? '' : 'Aprueba 1 examen.'
        },
        { 
            id: 'student', 
            title: 'Estudiante', 
            desc: 'Aprueba 10 exámenes.', // Cambio de texto
            check: (stats) => stats.totalPassed >= 10, // Cambio: totalPassed
            icon: '📚',
            getProgress: (stats) => stats.totalPassed >= 10 ? '' : `Faltan ${10 - stats.totalPassed} aprobados.`
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
            desc: 'Aprueba 50 exámenes.', // Cambio de texto
            check: (stats) => stats.totalPassed >= 50, // Cambio: totalPassed
            icon: '🎓',
            getProgress: (stats) => stats.totalPassed >= 50 ? '' : `Faltan ${50 - stats.totalPassed} aprobados.`
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
        },
        // --- 4 NUEVOS LOGROS DE CARRERA (ACTUALIZADOS) ---
        {
            id: 'first_victory',
            title: 'Primera Victoria',
            desc: 'Gana una carrera y aprueba el examen.',
            check: (stats) => stats.raceCleanWins >= 1,
            icon: '🥇',
            getProgress: (stats) => stats.raceCleanWins >= 1 ? '' : 'Gana 1 carrera limpiamente.'
        },
        {
            id: 'global_leader',
            title: 'Líder Global',
            desc: 'Sé el primero en la clasificación global tras 5 exámenes.',
            check: (stats) => stats.isGlobalLeader,
            icon: '🌍',
            getProgress: (stats) => {
                if (stats.totalRaces < 5) return `Faltan ${5 - stats.totalRaces} carreras.`;
                return stats.isGlobalLeader ? '' : 'Sé el nº1 en el ranking global.';
            }
        },
        {
            id: 'speed_king',
            title: 'Rey de la Velocidad',
            desc: 'Gana una carrera con un ritmo medio inferior a 8s por pregunta y aprobando.',
            check: (stats) => stats.hasFastWin,
            icon: '🚀',
            getProgress: (stats) => stats.hasFastWin ? '' : 'Gana (<8s/preg) y aprueba.'
        },
        {
            id: 'marathon_racer',
            title: 'Corredor de Fondo',
            desc: 'Completa 10 exámenes con el modo carrera activado.',
            check: (stats) => stats.totalRaces >= 10,
            icon: '🏟️',
            getProgress: (stats) => stats.totalRaces >= 10 ? '' : `Faltan ${10 - stats.totalRaces} carreras.`
        }
    ];

    const checkAchievements = () => {
        let totalAttempts = 0;
        let totalTime = 0;
        let totalPassed = 0;
        let totalCorrect = 0;
        let totalScoreSum = 0;
        let hasPerfectScore = false;
        let hasCloseCall = false;
        let hasSpeedRun = false;
        let currentStreak = 0;
        let maxStreak = 0;
        let totalQuestionsAnswered = 0;
        let hasLongExam = false;
        
        // Variables para logros de carrera
        let raceCleanWins = 0;
        let totalRaces = 0;
        let hasFastWin = false;
        let globalRaceTimeSum = 0;

        const allAttempts = Object.values(appState.stats).flatMap(s => s.attempts).sort((a, b) => new Date(a.date) - new Date(b.date));

        totalAttempts = allAttempts.length;

        allAttempts.forEach(attempt => {
            totalTime += attempt.time;
            totalScoreSum += attempt.score;
            totalQuestionsAnswered += attempt.questionCount;
            
            if (attempt.questionCount > 50) hasLongExam = true;

            const correctInExam = Math.round((attempt.score / 100) * attempt.questionCount);
            totalCorrect += correctInExam;

            if (attempt.score === 100 && attempt.questionCount >= 50) hasPerfectScore = true;
            
            if (attempt.score >= 85 && attempt.score < 90) hasCloseCall = true;
            
            if (attempt.questionCount > 50 && (attempt.time / attempt.questionCount) < 10 && attempt.score >= 85) {
                hasSpeedRun = true;
            }

            if (attempt.score >= 85) {
                totalPassed++; 
                currentStreak++;
            } else {
                currentStreak = 0;
            }
            if (currentStreak > maxStreak) maxStreak = currentStreak;
            
            // Cálculos de carrera
            if (attempt.raceStats) {
                totalRaces++;
                globalRaceTimeSum += attempt.raceStats.avgTime;
                
                if (attempt.raceStats.rank === 1 && attempt.score >= 85) {
                    raceCleanWins++;
                    if (attempt.raceStats.avgTime < 8) hasFastWin = true;
                }
            }
        });

        const avgScore = totalAttempts > 0 ? (totalScoreSum / totalAttempts) : 0;
        
        // Lógica Líder Global
        let isGlobalLeader = false;
        if (totalRaces >= 5) {
            const { allRunners } = getRaceLeaderboardStats(allAttempts); // Usar la función centralizada
            if (allRunners.length > 0 && allRunners[0].isUser) {
                isGlobalLeader = true;
            }
        }

        // 3. AÑADIR totalPassed AL OBJETO computedStats
        const computedStats = {
            totalAttempts, totalPassed, totalTime, totalCorrect, avgScore, hasPerfectScore, hasCloseCall, hasSpeedRun, maxStreak, totalQuestionsAnswered, hasLongExam, currentStreak,
            raceCleanWins, isGlobalLeader, totalRaces, hasFastWin
        };

        achievementsContainer.innerHTML = '';
        achievementsList.forEach(achievement => {
            // Recalcular SIEMPRE para permitir rebloqueo si bajan stats
            const isUnlocked = achievement.check(computedStats);
            
            const card = document.createElement('div');
            card.className = `achievement-card ${isUnlocked ? 'unlocked' : ''}`;
            
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
        // ... (código existente sin cambios relevantes)
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

    // ... resto del código igual ...
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
        const { timeLimit, questionOrder, answerOrder, showSidebar, showImages, autoAdvance, raceEnabled, theme } = appState.settings;
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
        document.querySelectorAll('#race-setting-group button').forEach(btn =>
            btn.classList.toggle('active', btn.dataset.value === raceEnabled));
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
        const raceEnabled = document.querySelector('#race-setting-group .active').dataset.value;
        const theme = document.querySelector('#theme-setting-group .active').dataset.value;

        appState.settings = { ...appState.settings, timeLimit, questionOrder, answerOrder, showSidebar, showImages, autoAdvance, raceEnabled, theme };

        saveState();
        updateSidebarState();
        updateRaceTrackState();
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

        // Si está pausado, ignorar teclas excepto quizás algo específico (aquí bloqueamos todo)
        if (appState.currentTest.isPaused) return;

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
        if (appState.currentView !== 'test-view' || !appState.currentTest || appState.currentTest.isPaused) return;
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e) => {
        if (appState.currentView !== 'test-view' || !appState.currentTest || appState.currentTest.isPaused) return;
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
        if (appState.currentView !== 'test-view' || !appState.currentTest || appState.currentTest.answersRevealed[appState.currentTest.currentIndex] || appState.currentTest.isLocked[appState.currentTest.currentIndex] || appState.currentTest.isPaused) {
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
            const topPos = (headerRect.bottom <= 0) ? '0px' : `${headerHeight}px`;
            
            questionSidebar.style.top = topPos;
            
            if(raceTrackSidebar) {
                // Ajustar también el sidebar de carrera para que no choque con header
                raceTrackSidebar.style.top = (headerRect.bottom <= 0) ? '10px' : `${headerHeight + 10}px`;
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
        // NUEVO: Listener botón de toggle de carrera
        if(raceToggleBtn) raceToggleBtn.addEventListener('click', handleRaceToggle);

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
        
        // NUEVO: Listener para el botón de Pausa
        pauseBtn.addEventListener('click', togglePause);
        resumeOverlayBtn.addEventListener('click', togglePause);


        // Listeners for Import/Export
        exportProgressBtn.addEventListener('click', exportTestState);
        importProgressBtn.addEventListener('click', () => importFileInput.click());
        importFileInput.addEventListener('change', importTestState);
    };

    init();
});
