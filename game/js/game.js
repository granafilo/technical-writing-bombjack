class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = GAME_CONFIG.CANVAS_WIDTH;
        this.canvas.height = GAME_CONFIG.CANVAS_HEIGHT;

        this.keys = {};
        this.gameState = 'start';
        this.lastTime = 0;

        this.score = 0;
        this.round = 1;
        this.scoreMultiplier = 1;
        this.bonusSegments = 0;
        this.timer = GAME_CONFIG.TIMER.ROUND_DURATION;
        this.powerBallActive = false;
        this.powerBallTimer = 0;

        this.player = null;
        this.platforms = [];
        this.bombs = [];
        this.enemies = [];
        this.powerUps = [];

        this.litBombIndex = 0;
        this.litBombSequence = 0;
        this.enemySpawnTimer = 0;
        this.nextBonusThreshold = GAME_CONFIG.POWERUP.BONUS_MULTIPLIER_THRESHOLD;
        this.frozenEnemiesCollected = 0;

        this.setupControls();
    }

    setupControls() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            if (e.key === ' ' && this.gameState === 'playing') {
                e.preventDefault();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }

    start() {
        document.getElementById('start-screen').classList.add('hidden');
        this.gameState = 'playing';
        this.initRound();
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    restart() {
        this.score = 0;
        this.round = 1;
        this.scoreMultiplier = 1;
        this.nextBonusThreshold = GAME_CONFIG.POWERUP.BONUS_MULTIPLIER_THRESHOLD;
        document.getElementById('game-over-screen').classList.add('hidden');
        this.start();
    }

    initRound() {
        this.timer = GAME_CONFIG.TIMER.ROUND_DURATION;
        this.litBombIndex = 0;
        this.litBombSequence = 0;
        this.bonusSegments = 0;
        this.powerBallActive = false;
        this.frozenEnemiesCollected = 0;

        this.player = new Player(
            GAME_CONFIG.CANVAS_WIDTH / 2 - GAME_CONFIG.PLAYER.WIDTH / 2,
            GAME_CONFIG.CANVAS_HEIGHT - 100
        );

        this.createPlatforms();
        this.createBombs();
        this.createEnemies();
        this.powerUps = [];
    }

    createPlatforms() {
        this.platforms = [];
        const levels = 4;
        for (let i = 0; i < levels; i++) {
            const y = 150 + i * 100; // <-- RIGA PROBLEMATICA
            const numPlatforms = 2 + Math.floor(Math.random() * 2);

            for (let j = 0; j < numPlatforms; j++) {
                const width = 80 + Math.random() * 100;
                const x = j * (GAME_CONFIG.CANVAS_WIDTH / numPlatforms) + Math.random() * 50;
                this.platforms.push(new Platform(x, y, width, 15));
            }
        }
    }

    createBombs() {
        this.bombs = [];
        const positions = [];

        for (let i = 0; i < GAME_CONFIG.BOMB.TOTAL; i++) {
            let x, y, tooClose;
            let attempts = 0;

            do {
                x = 50 + Math.random() * (GAME_CONFIG.CANVAS_WIDTH - 100);
                y = 50 + Math.random() * (GAME_CONFIG.CANVAS_HEIGHT - 150);

                tooClose = positions.some(pos => {
                    const dx = pos.x - x;
                    const dy = pos.y - y;
                    return Math.sqrt(dx * dx + dy * dy) < 40;
                });

                attempts++;
            } while (tooClose && attempts < 50);

            positions.push({ x, y });
            const bomb = new Bomb(x, y, i);
            if (i === this.litBombIndex) {
                bomb.isLit = true;
            }
            this.bombs.push(bomb);
        }
    }

    createEnemies() {
        this.enemies = [];
        const count = GAME_CONFIG.ENEMY.INITIAL_COUNT + Math.floor(this.round / 2);

        for (let i = 0; i < count; i++) {
            const side = Math.floor(Math.random() * 4);
            let x, y;

            if (side === 0) {
                x = 0;
                y = Math.random() * GAME_CONFIG.CANVAS_HEIGHT;
            } else if (side === 1) {
                x = GAME_CONFIG.CANVAS_WIDTH;
                y = Math.random() * GAME_CONFIG.CANVAS_HEIGHT;
            } else if (side === 2) {
                x = Math.random() * GAME_CONFIG.CANVAS_WIDTH;
                y = 0;
            } else {
                x = Math.random() * GAME_CONFIG.CANVAS_WIDTH;
                y = GAME_CONFIG.CANVAS_HEIGHT;
            }

            this.enemies.push(new Enemy(x, y, i % 3));
        }
    }

    update(deltaTime) {
        if (this.gameState !== 'playing') return;

        this.timer -= deltaTime;
        if (this.timer <= 0) {
            this.loseLife();
            return;
        }

        this.player.update(deltaTime, this.keys, this.platforms);

        for (const bomb of this.bombs) {
            bomb.update(deltaTime);
            if (bomb.checkCollision(this.player)) {
                this.collectBomb(bomb);
            }
        }

        if (this.powerBallActive) {
            this.powerBallTimer -= deltaTime;
            if (this.powerBallTimer <= 0) {
                this.deactivatePowerBall();
            }
        }

        for (const enemy of this.enemies) {
            enemy.update(deltaTime, this.player, this.round);

            if (enemy.checkCollision(this.player)) {
                if (this.powerBallActive && enemy.frozen) {
                    this.collectFrozenEnemy(enemy);
                } else if (!this.player.invincible && !enemy.frozen) {
                    this.loseLife();
                    return;
                }
            }
        }

        for (const powerUp of this.powerUps) {
            powerUp.update(deltaTime);
            if (powerUp.checkCollision(this.player)) {
                this.collectPowerUp(powerUp);
            }
        }

        this.enemySpawnTimer += deltaTime;
        if (this.enemySpawnTimer > GAME_CONFIG.ENEMY.SPAWN_INTERVAL / 1000) {
            this.spawnEnemy();
            this.enemySpawnTimer = 0;
        }

        const allBombsCollected = this.bombs.every(b => b.collected);
        if (allBombsCollected) {
            this.completeRound();
        }
    }

    collectBomb(bomb) {
        bomb.collected = true;

        let points = bomb.isLit ? GAME_CONFIG.BOMB.LIT_POINTS : GAME_CONFIG.BOMB.NORMAL_POINTS;

        if (bomb.isLit) {
            this.litBombSequence++;
            this.bonusSegments += 2;
            this.litBombIndex++;

            if (this.litBombIndex < this.bombs.length) {
                this.bombs[this.litBombIndex].isLit = true;
            }

            if (this.litBombSequence >= 20) {
                points += 10000;
            }
        } else {
            this.bonusSegments += 1;
        }

        if (this.bonusSegments >= GAME_CONFIG.POWERUP.POWER_BALL_SEGMENTS) {
            this.spawnPowerBall();
            this.bonusSegments = 0;
        }

        this.addScore(points);
    }

    collectPowerUp(powerUp) {
        powerUp.collected = true;

        if (powerUp.type === 'B') {
            if (this.scoreMultiplier < 5) {
                this.scoreMultiplier++;
            }
            this.addScore(1000);
        } else if (powerUp.type === 'P') {
            this.activatePowerBall();
            this.addScore(1000);
        }

        this.powerUps = this.powerUps.filter(p => !p.collected);
    }

    collectFrozenEnemy(enemy) {
        const points = [100, 200, 300, 500, 800, 1200, 2000];
        const pointIndex = Math.min(this.frozenEnemiesCollected, points.length - 1);
        this.addScore(points[pointIndex]);
        this.frozenEnemiesCollected++;

        this.enemies = this.enemies.filter(e => e !== enemy);
    }

    addScore(points) {
        const multipliedPoints = points * this.scoreMultiplier;
        this.score += multipliedPoints;

        if (this.score >= this.nextBonusThreshold) {
            this.spawnBonusMultiplier();
            this.nextBonusThreshold += GAME_CONFIG.POWERUP.BONUS_MULTIPLIER_THRESHOLD;
        }
    }

    spawnBonusMultiplier() {
        const x = Math.random() * (GAME_CONFIG.CANVAS_WIDTH - 50) + 25;
        const y = Math.random() * (GAME_CONFIG.CANVAS_HEIGHT - 100) + 50;
        this.powerUps.push(new PowerUp(x, y, 'B'));
    }

    spawnPowerBall() {
        const x = Math.random() * (GAME_CONFIG.CANVAS_WIDTH - 50) + 25;
        const y = Math.random() * (GAME_CONFIG.CANVAS_HEIGHT - 100) + 50;
        this.powerUps.push(new PowerUp(x, y, 'P'));
    }

    activatePowerBall() {
        this.powerBallActive = true;
        this.powerBallTimer = GAME_CONFIG.POWERUP.POWER_BALL_DURATION / 1000;
        this.frozenEnemiesCollected = 0;

        for (const enemy of this.enemies) {
            enemy.frozen = true;
        }
    }

    deactivatePowerBall() {
        this.powerBallActive = false;
        for (const enemy of this.enemies) {
            enemy.frozen = false;
        }
    }

    spawnEnemy() {
        const side = Math.floor(Math.random() * 4);
        let x, y;

        if (side === 0) x = -20, y = Math.random() * GAME_CONFIG.CANVAS_HEIGHT;
        else if (side === 1) x = GAME_CONFIG.CANVAS_WIDTH + 20, y = Math.random() * GAME_CONFIG.CANVAS_HEIGHT;
        else if (side === 2) x = Math.random() * GAME_CONFIG.CANVAS_WIDTH, y = -20;
        else x = Math.random() * GAME_CONFIG.CANVAS_WIDTH, y = GAME_CONFIG.CANVAS_HEIGHT + 20;

        this.enemies.push(new Enemy(x, y, Math.floor(Math.random() * 3)));
    }

    loseLife() {
        this.player.lives--;

        if (this.player.lives <= 0) {
            this.gameOver();
        } else {
            this.player.reset(
                GAME_CONFIG.CANVAS_WIDTH / 2 - GAME_CONFIG.PLAYER.WIDTH / 2,
                GAME_CONFIG.CANVAS_HEIGHT - 100
            );
            this.timer = GAME_CONFIG.TIMER.ROUND_DURATION;
        }
    }

    completeRound() {
        const timeBonus = Math.floor(this.timer * 50);
        this.addScore(timeBonus);

        if (this.litBombSequence >= 20) {
            this.addScore(5000);
        }

        this.round++;
        this.initRound();
    }

    gameOver() {
        this.gameState = 'gameOver';
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('final-round').textContent = this.round - 1;
        document.getElementById('game-over-screen').classList.remove('hidden');
    }

    draw() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#111';
        for (let i = 0; i < 50; i++) {
            const x = (i * 137) % this.canvas.width;
            const y = (i * 271) % this.canvas.height;
            this.ctx.fillRect(x, y, 2, 2);
        }

        for (const platform of this.platforms) {
            platform.draw(this.ctx);
        }

        for (const bomb of this.bombs) {
            bomb.draw(this.ctx);
        }

        for (const powerUp of this.powerUps) {
            powerUp.draw(this.ctx);
        }

        for (const enemy of this.enemies) {
            enemy.draw(this.ctx);
        }

        if (this.player) {
            this.player.draw(this.ctx);
        }

        this.drawUI();
    }

    drawUI() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, 50);
        this.ctx.fillRect(0, this.canvas.height - 50, this.canvas.width, 50);

        this.ctx.fillStyle = '#FFD700';
        this.ctx.font = 'bold 20px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`SCORE: ${this.score}`, 20, 30);

        this.ctx.textAlign = 'center';
        this.ctx.fillText(`ROUND ${this.round}`, this.canvas.width / 2, 30);

        this.ctx.textAlign = 'right';
        this.ctx.fillText(`TIME: ${Math.ceil(this.timer)}`, this.canvas.width - 20, 30);

        this.ctx.textAlign = 'left';
        this.ctx.fillText(`LIVES: ${this.player ? this.player.lives : 0}`, 20, this.canvas.height - 20);

        this.ctx.textAlign = 'center';
        this.ctx.fillText(`MULTIPLIER: x${this.scoreMultiplier}`, this.canvas.width / 2, this.canvas.height - 20);

        this.ctx.textAlign = 'right';
        const bombsLeft = this.bombs.filter(b => !b.collected).length;
        this.ctx.fillText(`BOMBS: ${bombsLeft}/24`, this.canvas.width - 20, this.canvas.height - 20);

        if (this.powerBallActive) {
            this.ctx.fillStyle = '#FF00FF';
            this.ctx.font = 'bold 16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(`POWER BALL: ${Math.ceil(this.powerBallTimer)}s`, this.canvas.width / 2, 60);
        }

        const segmentWidth = 10;
        const segmentHeight = 5;
        const totalWidth = GAME_CONFIG.POWERUP.POWER_BALL_SEGMENTS * (segmentWidth + 2);
        const startX = (this.canvas.width - totalWidth) / 2;
        const y = this.canvas.height - 60;

        for (let i = 0; i < GAME_CONFIG.POWERUP.POWER_BALL_SEGMENTS; i++) {
            this.ctx.fillStyle = i < this.bonusSegments ? '#00FF00' : '#333';
            this.ctx.fillRect(startX + i * (segmentWidth + 2), y, segmentWidth, segmentHeight);
        }
    }

    gameLoop(currentTime) {
        const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.1);
        this.lastTime = currentTime;

        this.update(deltaTime);
        this.draw();

        requestAnimationFrame((time) => this.gameLoop(time));
    }
}

const game = new Game();
