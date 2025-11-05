class Enemy {
    constructor(x, y, type = 0) {
        this.x = x;
        this.y = y;
        this.size = GAME_CONFIG.ENEMY.SIZE;
        this.type = type;
        this.speed = GAME_CONFIG.ENEMY.BASE_SPEED;
        this.velocityX = (Math.random() - 0.5) * this.speed * 2;
        this.velocityY = (Math.random() - 0.5) * this.speed * 2;
        this.color = GAME_CONFIG.ENEMY.COLORS[type % GAME_CONFIG.ENEMY.COLORS.length];
        this.frozen = false;
        this.targetX = Math.random() * GAME_CONFIG.CANVAS_WIDTH;
        this.targetY = Math.random() * GAME_CONFIG.CANVAS_HEIGHT;
    }
    
    update(deltaTime, player, round) {
        if (this.frozen) return;
        
        const speedMultiplier = 1 + (round - 1) * 0.15;
        
        if (this.type === 0) {
            this.velocityY += Math.sin(Date.now() / 500) * 50 * deltaTime;
        } else if (this.type === 1) {
            const dx = player.x - this.x;
            const dy = player.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 0) {
                this.velocityX = (dx / dist) * this.speed * speedMultiplier * 0.5;
                this.velocityY = (dy / dist) * this.speed * speedMultiplier * 0.5;
            }
        } else {
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 10) {
                this.targetX = Math.random() * GAME_CONFIG.CANVAS_WIDTH;
                this.targetY = Math.random() * GAME_CONFIG.CANVAS_HEIGHT;
            }
        }
        
        this.x += this.velocityX * deltaTime;
        this.y += this.velocityY * deltaTime;
        
        if (this.x < 0 || this.x > GAME_CONFIG.CANVAS_WIDTH - this.size) {
            this.velocityX *= -1;
            this.x = Math.max(0, Math.min(GAME_CONFIG.CANVAS_WIDTH - this.size, this.x));
        }
        if (this.y < 0 || this.y > GAME_CONFIG.CANVAS_HEIGHT - this.size) {
            this.velocityY *= -1;
            this.y = Math.max(0, Math.min(GAME_CONFIG.CANVAS_HEIGHT - this.size, this.y));
        }
    }
    
    draw(ctx) {
        if (this.frozen) {
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(this.x + this.size/2, this.y + this.size/2, this.size/2, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#000';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('$', this.x + this.size/2, this.y + this.size/2 + 5);
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size);
            ctx.fillStyle = '#FFF';
            ctx.fillRect(this.x + 4, this.y + 4, 4, 4);
            ctx.fillRect(this.x + 12, this.y + 4, 4, 4);
        }
    }
    
    checkCollision(player) {
        return player.x < this.x + this.size &&
               player.x + player.width > this.x &&
               player.y < this.y + this.size &&
               player.y + player.height > this.y;
    }
}
