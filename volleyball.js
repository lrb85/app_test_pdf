window.VolleyGame = (function () {
    // --- CONFIGURACIÓN ---
    const CANVAS_WIDTH = 800;
    const CANVAS_HEIGHT = 400;
    const NET_HEIGHT = 220;
    const GROUND_Y = 350;
    const BALL_RADIUS = 14;
    const NET_X = 395;
    const NET_WIDTH = 10;
    const NET_TOP_Y = 400 - NET_HEIGHT; // 180

    const ANIMALS = {
        cheetah: { icon: '🐆', baseSpeed: 10, baseJump: 12, basePower: 10, name: 'Guepi', desc: 'Atleta completo' },
        octopus: { icon: '🐙', baseSpeed: 5, baseJump: 10, basePower: 15, name: 'Pulpi', desc: 'Potencia bruta' }, 
        koala: { icon: '🐨', baseSpeed: 4, baseJump: 5, basePower: 7, name: 'Mandis', desc: 'Control técnico' }, 
        dog: { icon: '🐕', baseSpeed: 6, baseJump: 11, basePower: 8, name: 'Goyito', desc: 'Especialista en salto' }, 
        turtle: { icon: '🐢', baseSpeed: 2, baseJump: 2, basePower: 2, name: 'Gary', desc: 'Reto extremo' } 
    };
    
    const STAT_LABELS = { Speed: 'Velocidad', Jump: 'Salto', Power: 'Potencia' };
    const MAX_STAT_LEVEL = 20;
    
    let ctx = null;
    let animationFrameId = null;
    let returnContext = 'stats';
    let skillPointsAvailable = 0;
    let focusedCharIndex = 0;
    let charKeys = Object.keys(ANIMALS);
    
    let gameState = {
        player: null, opponent: null,
        ball: { x: 0, y: 0, vx: 0, vy: 0, radius: BALL_RADIUS },
        score: { player: 0, opponent: 0 },
        timeLeft: 600, 
        isPaused: false, 
        isOver: false, 
        isServing: false, 
        lastTime: 0
    };
    
    const keys = { ArrowLeft: false, ArrowRight: false, ArrowUp: false };
    
    // --- UTILIDADES ---
    const loadVolleyStats = () => {
        const saved = localStorage.getItem('testAppVolleyStats');
        if (saved) return JSON.parse(saved);
        const initial = {};
        Object.keys(ANIMALS).forEach(key => initial[key] = { addedSpeed: 0, addedJump: 0, addedPower: 0 });
        return initial;
    };
    
    const saveVolleyStats = (stats) => localStorage.setItem('testAppVolleyStats', JSON.stringify(stats));
    
    // Coste de mejora
    const getUpgradeCost = (lvl) => {
        if (lvl < 0) return 0; 
        return (lvl + 1) * 3; 
    };
    
    // --- FÍSICAS ---
    
    const resolveCollision = (circle, rect) => {
        const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.w));
        const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.h));
        const dx = circle.x - closestX;
        const dy = circle.y - closestY;
        const distSq = dx * dx + dy * dy;
    
        if (distSq < circle.radius * circle.radius) {
            const dist = Math.sqrt(distSq);
            let nx = (dist === 0) ? 0 : dx / dist;
            let ny = (dist === 0) ? -1 : dy / dist;
            
            const overlap = circle.radius - dist;
            circle.x += nx * overlap;
            circle.y += ny * overlap;
    
            const dot = circle.vx * nx + circle.vy * ny;
            if (dot < 0) {
                circle.vx -= 1.8 * dot * nx;
                circle.vy -= 1.8 * dot * ny;
            }
            return true;
        }
        return false;
    };
    
    const resolveEntityCollision = (ball, char) => {
        if (!char) return false;
        
        const charCX = char.x + char.w / 2;
        const charCY = char.y + char.h / 2;
        
        if (Math.abs(ball.x - charCX) > 100 || Math.abs(ball.y - charCY) > 100) return false;
    
        const distSq = (ball.x - charCX)**2 + (ball.y - charCY)**2;
        const minDist = ball.radius + (char.w / 2); 
    
        if (distSq < minDist * minDist) {
            const dist = Math.sqrt(distSq);
            let nx = (dist === 0) ? 0 : (ball.x - charCX) / dist;
            let ny = (dist === 0) ? -1 : (ball.y - charCY) / dist;
    
            const overlap = minDist - dist;
            ball.x += nx * overlap;
            ball.y += ny * overlap;
    
            let currentSpeed = Math.sqrt(ball.vx**2 + ball.vy**2);
            const minLaunchSpeed = char.power * 1.4; 
            let newSpeed = Math.max(currentSpeed * 0.85, minLaunchSpeed);
            
            if (Math.abs(char.vx) > 0.1 && Math.sign(char.vx) === Math.sign(nx)) {
                newSpeed += Math.abs(char.vx) * 0.5;
            }
    
            ball.vx = nx * newSpeed;
            if (ny > -0.2) ny = -0.5; 
            ball.vy = ny * newSpeed;
            if (Math.abs(ball.vy) < 5) ball.vy -= (char.power * 0.5);
    
            return true;
        }
        return false;
    };
    
    const updatePhysics = () => {
        if (gameState.isPaused || gameState.isOver) return;
    
        const gravity = 0.4, friction = 0.85;
        const p = gameState.player, o = gameState.opponent, b = gameState.ball;
    
        // --- Controles Player (SIEMPRE ACTIVOS) ---
        if (keys.ArrowLeft) p.vx = -p.speed; 
        else if (keys.ArrowRight) p.vx = p.speed;
        
        if (keys.ArrowUp && p.onGround) { 
            p.vy = -p.jump; 
            p.onGround = false; 
        }
    
        // --- Físicas Jugadores ---
        [p, o].forEach(e => {
            e.vy += gravity; e.x += e.vx; e.y += e.vy;
            if(e.onGround) e.vx *= friction;
            if(e.y + e.h > GROUND_Y) { e.y = GROUND_Y - e.h; e.vy = 0; e.onGround = true; }
        });
    
        // Límites Player
        if (p.x < 0) p.x = 0; 
        if (p.x + p.w > NET_X) p.x = NET_X - p.w;
    
        // --- IA OPONENTE MEJORADA (Movimiento Suavizado) ---
        // 1. Determinar objetivo
        let targetX;
        if (b.x > NET_X) {
            // Si el balón está en mi campo, voy a por el balón
            targetX = b.x;
        } else {
            // Si el balón está en el campo contrario, vuelvo al centro de mi zona (aprox 600)
            targetX = 600;
        }

        // 2. Calcular distancia
        const rivalCenterX = o.x + o.w / 2;
        const dist = targetX - rivalCenterX;
        const deadZone = 10; // Zona muerta para evitar temblores

        if (Math.abs(dist) > deadZone) {
            // Dirección del movimiento (-1 izquierda, 1 derecha)
            const dir = Math.sign(dist);
            
            // Velocidad objetivo:
            // Si estamos lejos, usa velocidad máxima.
            // Si estamos cerca (menos de lo que recorrería en un frame), usa la distancia exacta.
            // Esto evita el "overshooting" (pasarse de largo) y el temblor.
            let moveSpeed = Math.min(Math.abs(dist), o.speed);
            
            o.vx = dir * moveSpeed;
        } else {
            // Estamos en posición óptima
            o.vx = 0;
        }

        // 3. Lógica de Salto
        // Solo saltar si el balón está cerca, alto, y en mi lado
        if (o.onGround && b.x > NET_X + 20 && b.y < o.y && Math.abs(b.x - rivalCenterX) < 60) {
             // Salto aleatorio para variar dificultad
            if (Math.random() > 0.1) { 
                o.vy = -o.jump; 
                o.onGround = false; 
            }
        }

        // Límites Oponente
        if (o.x > 800 - o.w) o.x = 800 - o.w; 
        if (o.x < NET_X + NET_WIDTH) o.x = NET_X + NET_WIDTH;
    
        // --- Físicas Pelota ---
        const prevBallX = b.x;
        
        b.vy += gravity * 0.5; 
        b.x += b.vx; 
        b.y += b.vy;
        
        // Anti-Tunneling de Red
        if (b.y + b.radius > NET_TOP_Y) {
            if (prevBallX <= NET_X && b.x > NET_X - b.radius) {
                b.x = NET_X - b.radius;
                b.vx *= -0.8; 
            }
            else if (prevBallX >= NET_X + NET_WIDTH && b.x < NET_X + NET_WIDTH + b.radius) {
                b.x = NET_X + NET_WIDTH + b.radius;
                b.vx *= -0.8; 
            }
        } else {
            resolveCollision(b, { x: NET_X, y: NET_TOP_Y, w: NET_WIDTH, h: NET_HEIGHT });
        }
    
        // Paredes
        if (b.x - b.radius < 0) { b.x = b.radius; b.vx *= -0.8; }
        if (b.x + b.radius > 800) { b.x = 800 - b.radius; b.vx *= -0.8; }
        if (b.y - b.radius < 0) { b.y = b.radius; b.vy *= -0.6; }
    
        // Punto (Suelo)
        if (b.y + b.radius > GROUND_Y) {
            if (b.x < 400) { gameState.score.opponent++; checkWin('opponent'); }
            else { gameState.score.player++; checkWin('player'); }
            if (!gameState.isOver) resetBall(b.x < 400 ? 'opponent' : 'player');
        }
    
        resolveEntityCollision(b, p); 
        resolveEntityCollision(b, o);
    };
    
    const resetBall = (winner) => {
        gameState.isServing = true; 
        
        // Posición de saque ALTA (Arregla pelota baja)
        gameState.ball.x = winner === 'player' ? 200 : 600;
        gameState.ball.y = 100; 
        
        // Saque vertical hacia arriba
        gameState.ball.vx = 0; 
        gameState.ball.vy = -3; 
    
        // Resetear jugadores a posiciones seguras (para evitar rebote fantasma al aparecer)
        if(gameState.player) { gameState.player.x = 100; gameState.player.vx = 0; }
        if(gameState.opponent) { gameState.opponent.x = 640; gameState.opponent.vx = 0; }
    
        // Ya no bloqueamos inputs, permitimos jugar inmediatamente
        setTimeout(() => { 
            gameState.isServing = false;
        }, 500);
    };
    const checkWin = (s) => { if(gameState.score[s] >= 7) endGame(s === 'player'); };
    
    // --- RENDER ---
    const draw = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = '#fff'; ctx.fillRect(NET_X, NET_TOP_Y, NET_WIDTH, NET_HEIGHT);
        ctx.fillStyle = '#e67e22'; ctx.fillRect(0, GROUND_Y, 800, 50);
    
        const p = gameState.player;
        ctx.font = '60px Arial'; ctx.textAlign = 'center';
        ctx.save(); ctx.translate(p.x + p.w/2, p.y + p.h/2); ctx.scale(-1, 1); ctx.fillText(p.icon, 0, 30); ctx.restore();
    
        const o = gameState.opponent;
        ctx.fillText(o.icon, o.x + o.w/2, o.y + o.h - 5);
    
        ctx.beginPath(); ctx.arc(gameState.ball.x, gameState.ball.y, gameState.ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white'; ctx.fill(); ctx.stroke();
        
        document.querySelector('.score-board:nth-child(1) .score-val').textContent = gameState.score.player;
        document.querySelector('.score-board:nth-child(1) .score-name').textContent = p.name;
        document.querySelector('.score-board:nth-child(3) .score-val').textContent = gameState.score.opponent;
        document.querySelector('.score-board:nth-child(3) .score-name').textContent = o.name;
        const m = Math.floor(gameState.timeLeft / 60), s = Math.floor(gameState.timeLeft % 60);
        document.getElementById('volley-timer').textContent = `${m}:${s.toString().padStart(2, '0')}`;
    };
    
    const loop = (t) => {
        if (!gameState.lastTime) gameState.lastTime = t;
        if (t - gameState.lastTime >= 1000) { gameState.timeLeft--; gameState.lastTime = t; if(gameState.timeLeft<=0) handleTimeOut(); }
        updatePhysics(); draw();
        if (!gameState.isOver && !gameState.isPaused) requestAnimationFrame(loop);
    };
    
    // --- UI SELECCIÓN ---
    const init = (canvasId) => {
        const c = document.getElementById(canvasId);
        if (c) { c.width = CANVAS_WIDTH; c.height = CANVAS_HEIGHT; ctx = c.getContext('2d'); }
        
        window.addEventListener('keydown', e => {
            if(!document.getElementById('volley-selection-screen').classList.contains('hidden')) {
                handleSelectionInput(e);
            } else { 
                if(keys.hasOwnProperty(e.code)) keys[e.code]=true; 
                if(e.key.startsWith('Arrow')) e.preventDefault(); 
            }
        });
        
        window.addEventListener('keyup', e => { 
            if(keys.hasOwnProperty(e.code)) keys[e.code]=false; 
        });
    };
    
    const handleSelectionInput = (e) => {
        if (e.key === 'ArrowRight') { focusedCharIndex = (focusedCharIndex + 1) % charKeys.length; renderDetailsPanel(charKeys[focusedCharIndex]); updateFocusVisuals(); }
        else if (e.key === 'ArrowLeft') { focusedCharIndex = (focusedCharIndex - 1 + charKeys.length) % charKeys.length; renderDetailsPanel(charKeys[focusedCharIndex]); updateFocusVisuals(); }
        else if (e.key === ' ') { e.preventDefault(); startGame(charKeys[focusedCharIndex]); }
    };
    
    const updateFocusVisuals = () => {
        document.querySelectorAll('.char-card').forEach((c, i) => {
            if(i === focusedCharIndex) c.classList.add('focused'); else c.classList.remove('focused');
        });
    };
    
    const openSelectionScreen = (points, context) => {
        skillPointsAvailable = points;
        returnContext = context;
        window.lastVolleyContext = context; // Guardar contexto para reintento
    
        const screen = document.getElementById('volley-selection-screen');
        
        screen.innerHTML = `
            <div class="selection-header">
                <h3>Elige tu Jugador</h3>
                <div class="skill-points-display">Puntos: ${skillPointsAvailable}</div>
            </div>
            <div id="volley-char-container" class="char-grid"></div>
            <div id="selection-details-panel"></div>
        `;
        
        screen.classList.remove('hidden');
        document.getElementById('volley-overlay-end').classList.remove('active');
        document.getElementById('volley-overlay-tie').classList.remove('active');
        
        let closeBtn = document.querySelector('.game-wrapper .close-game-btn');
        if(!closeBtn) {
            closeBtn = document.createElement('button');
            closeBtn.className = 'close-game-btn';
            closeBtn.innerHTML = '&times;';
            closeBtn.onclick = closeGame;
            document.querySelector('.game-wrapper').appendChild(closeBtn);
        }
        
        const container = document.getElementById('volley-char-container');
        charKeys.forEach((key, index) => {
            const data = ANIMALS[key];
            const card = document.createElement('div');
            card.className = 'char-card';
            card.innerHTML = `<div class="char-icon">${data.icon}</div><div class="char-name">${data.name}</div>`;
            card.onmouseenter = () => { focusedCharIndex = index; updateFocusVisuals(); renderDetailsPanel(key); };
            card.onclick = () => startGame(key);
            container.appendChild(card);
        });
    
        focusedCharIndex = 0;
        updateFocusVisuals();
        renderDetailsPanel(charKeys[0]);
    };
    
    // Función para disminuir estadística
    const downgradeStat = (key, stat) => {
        const saved = loadVolleyStats();
        const pData = ANIMALS[key];
        const currentAdded = saved[key][`added${stat}`];
        const baseVal = pData[`base${stat}`];
        const total = baseVal + currentAdded;

        // Seguridad: No permitir bajar de 1
        if (total <= 1) return;

        // Lógica de Reembolso
        if (currentAdded > 0) {
            const refund = getUpgradeCost(currentAdded - 1);
            if (window.restoreSkillPoint) {
                for(let i=0; i<refund; i++) window.restoreSkillPoint();
            }
            skillPointsAvailable += refund;
        }

        // Aplicar la bajada
        saved[key][`added${stat}`]--;
        saveVolleyStats(saved);
        
        document.querySelector('.skill-points-display').textContent = `Puntos: ${skillPointsAvailable}`;
        renderDetailsPanel(key); 
    };

    const renderDetailsPanel = (key) => {
        const panel = document.getElementById('selection-details-panel');
        if(!panel) return;
        const data = ANIMALS[key];
        const stats = loadVolleyStats()[key];
        
        let statsHtml = '';
        ['Speed', 'Jump', 'Power'].forEach(stat => {
            const base = data[`base${stat}`];
            const added = stats[`added${stat}`];
            const total = base + added;
            
            // Coste para el SIGUIENTE nivel
            const upgradeCost = getUpgradeCost(added);
            
            const isMaxed = total >= MAX_STAT_LEVEL;
            const canAfford = skillPointsAvailable >= upgradeCost;
            const canDecrease = total > 1; 

            statsHtml += `
                <div class="stat-row">
                    <div class="stat-label">${STAT_LABELS[stat]}</div>
                    
                    <!-- Botón Menos -->
                    <button class="stat-btn minus" 
                        ${!canDecrease ? 'disabled' : ''}
                        onclick="window.VolleyGame.downgradeStat('${key}', '${stat}')">−</button>

                    <div class="stat-track">
                        <!-- Barra base -->
                        <div class="stat-fill" style="width: ${(total/MAX_STAT_LEVEL)*100}%; background: ${added < 0 ? '#dc3545' : ''}"></div>
                    </div>
                    
                    <div class="stat-val-text">${total}/${MAX_STAT_LEVEL}</div>
                    
                    <!-- Badge de coste -->
                    <div class="stat-cost-badge" title="Coste prox. nivel">${isMaxed ? '-' : (upgradeCost === 0 ? 'Free' : upgradeCost+'p')}</div>
                    
                    <!-- Botón Más -->
                    <button class="stat-btn plus" 
                        ${(!canAfford || isMaxed) ? 'disabled' : ''} 
                        onclick="window.VolleyGame.upgradeStat('${key}', '${stat}', ${upgradeCost})">+</button>
                </div>
            `;
        });
    
        panel.innerHTML = `
            <div class="details-header">
                <div class="details-name">${data.icon} ${data.name}</div>
                <div class="details-desc">${data.desc}</div>
            </div>
            <div class="stats-container">${statsHtml}</div>
        `;
    };
    
    const upgradeStat = (key, stat, cost) => {
        // Permitir si tienes puntos O si el coste es 0 (recuperar stats negativas)
        if (skillPointsAvailable >= cost) {
            const saved = loadVolleyStats();
            saved[key][`added${stat}`]++;
            saveVolleyStats(saved);
            
            // Solo consumir puntos si el coste > 0
            if (cost > 0) {
                for(let i=0; i<cost; i++) window.consumeSkillPoint();
                skillPointsAvailable -= cost;
            }
            
            document.querySelector('.skill-points-display').textContent = `Puntos: ${skillPointsAvailable}`;
            renderDetailsPanel(key);
        }
    };
    
    const startGame = (playerKey) => {
        keys.ArrowLeft = false; keys.ArrowRight = false; keys.ArrowUp = false;
        
        document.getElementById('volley-selection-screen').classList.add('hidden');
        const pData = ANIMALS[playerKey], pStats = loadVolleyStats()[playerKey];
        
        // Configurar JUGADOR
        gameState.player = {
            key: playerKey, name: pData.name, icon: pData.icon,
            x: 100, y: 300, w: 60, h: 60, vx: 0, vy: 0, onGround: true,
            speed: (pData.baseSpeed + pStats.addedSpeed) * 0.7,
            jump: (pData.baseJump + pStats.addedJump) * 0.7,
            power: (pData.basePower + pStats.addedPower) * 1
        };
    
        // --- GENERACIÓN DE RIVAL ---
        const oKey = charKeys[Math.floor(Math.random() * charKeys.length)];
        const oData = ANIMALS[oKey];
        
        // 1. Determinar aleatoriamente el nivel de "Buff"
        const roll = Math.random();
        let minBoost = 0, maxBoost = 0;

        if (roll > 0.95) {       // LEYENDA
            minBoost = 10; maxBoost = 15;
        } else if (roll > 0.85) { // Élite
            minBoost = 6; maxBoost = 12;
        } else if (roll > 0.60) { // Difícil
            minBoost = 4; maxBoost = 9;
        } else if (roll > 0.30) { // Normal
            minBoost = 1; maxBoost = 5;
        } else {                  // Fácil
            minBoost = 0; maxBoost = 2;
        }

        const getRandomBoost = () => Math.floor(Math.random() * (maxBoost - minBoost + 1)) + minBoost;
        
        // Helper para asegurar límite 20
        const clamp20 = (val) => Math.min(20, Math.max(1, val));

        // 2. Calcular niveles finales para el rival (Base + Boost) con tope de 20
        const oSpeedLevel = clamp20(oData.baseSpeed + getRandomBoost());
        const oJumpLevel = clamp20(oData.baseJump + getRandomBoost());
        const oPowerLevel = clamp20(oData.basePower + getRandomBoost());
        
        // 3. Calcular Suma Total para etiqueta Dificultad
        const totalStats = oSpeedLevel + oJumpLevel + oPowerLevel;
        let diffName = "", diffColor = "#fff";

        if (totalStats >= 55) { diffName = "LEYENDA"; diffColor = "#ff00ff"; } 
        else if (totalStats >= 45) { diffName = "Muy Difícil"; diffColor = "#ff4444"; }
        else if (totalStats >= 35) { diffName = "Difícil"; diffColor = "#ffad33"; }
        else if (totalStats >= 25) { diffName = "Normal"; diffColor = "#fff"; }
        else { diffName = "Fácil"; diffColor = "#aaffaa"; }

        // 4. UI Dificultad
        let dDisplay = document.getElementById('difficulty-display');
        if(!dDisplay) {
            const center = document.createElement('div'); center.className = 'center-ui';
            const timer = document.getElementById('volley-timer');
            timer.parentNode.insertBefore(center, timer); center.appendChild(timer);
            dDisplay = document.createElement('div'); dDisplay.id = 'difficulty-display';
            center.appendChild(dDisplay);
        }
        dDisplay.innerHTML = `Rival: <span style="color:${diffColor}; font-weight:bold;">${diffName}</span> (Media: ${(totalStats/3).toFixed(0)})`;

        // 5. Configurar Objeto Rival
        // Factor 0.6 en velocidad para controlar el movimiento incluso a nivel 20
        gameState.opponent = {
            key: oKey, name: oData.name, icon: oData.icon,
            x: 640, y: 300, w: 60, h: 60, vx: 0, vy: 0, onGround: true,
            speed: oSpeedLevel * 0.6, // Reducido ligeramente para mejorar control de IA
            jump: oJumpLevel * 0.9,
            power: oPowerLevel * 1.2 
        };
    
        gameState.score = { player: 0, opponent: 0 };
        gameState.timeLeft = 600; gameState.isPaused = false; gameState.isOver = false;
        resetBall('player');
        cancelAnimationFrame(animationFrameId); loop(performance.now());
    };
    
    const handleTimeOut = () => {
        if (gameState.score.player > gameState.score.opponent) endGame(true);
        else if (gameState.score.player < gameState.score.opponent) endGame(false);
        else { gameState.isPaused = true; showTieBreaker(); }
    };
    
    const showTieBreaker = () => {
        const overlay = document.getElementById('volley-overlay-tie'); overlay.classList.add('active');
        const q = window.getTieBreakerQuestion();
        const c = overlay.querySelector('.tie-break-question');
        if (!q) { c.innerHTML = "<h3>Muerte Súbita</h3>"; setTimeout(() => { overlay.classList.remove('active'); gameState.isPaused=false; loop(performance.now()); }, 1500); return; }
        c.innerHTML = `<h4>Desempate</h4><p>${q.text}</p><div class="tie-break-options"></div>`;
        const opts = c.querySelector('.tie-break-options');
        q.options.forEach(opt => {
            const b = document.createElement('button'); b.textContent = opt.text;
            b.onclick = () => { if(opt.isCorrect) endGame(true, "¡Correcto!"); else endGame(false, "Incorrecto"); overlay.classList.remove('active'); };
            opts.appendChild(b);
        });
    };
    
    const endGame = (isWin, msg=null) => {
        gameState.isOver = true; cancelAnimationFrame(animationFrameId);
        const ov = document.getElementById('volley-overlay-end'); ov.classList.add('active');
        document.getElementById('volley-end-title').textContent = isWin ? '¡VICTORIA!' : 'DERROTA';
        document.getElementById('volley-end-title').className = isWin ? 'result-anim win-text' : 'result-anim lose-text';
        document.getElementById('volley-end-msg').textContent = msg || `${gameState.score.player} - ${gameState.score.opponent}`;
        window.registerVolleyResult(gameState.player.key, gameState.opponent.key, isWin, gameState.score.player, gameState.score.opponent);
    };
    
    const closeGame = () => { 
        gameState.isOver = true; 
        cancelAnimationFrame(animationFrameId);
        document.getElementById('volleyball-view').classList.remove('active'); 
        window.returnFromVolleyball(returnContext); 
    };
    
    return { init, openSelectionScreen, closeGame, upgradeStat, downgradeStat: window.VolleyGame ? window.VolleyGame.downgradeStat : downgradeStat };
    })();