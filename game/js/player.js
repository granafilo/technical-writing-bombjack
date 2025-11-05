class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = GAME_CONFIG.PLAYER.WIDTH;
        this.height = GAME_CONFIG.PLAYER.HEIGHT;
        this.velocityX = 0;
        this.velocityY = 0;
        this.isGrounded = false;
        this.isGliding = false;
        this.isJumping = false;
        this.jumpTimer = 0;
        this.maxJumpTime = 0.3;
        this.color = GAME_CONFIG.PLAYER.COLOR;
        this.lives = 3;
        this.invincible = false;
        this.invincibleTimer = 0;
    }
    
    update(deltaTime, keys, platforms) {
        this.velocityX = 0;
        
        if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
            this.velocityX = -GAME_CONFIG.PLAYER.MOVE_SPEED;
        }
        if (keys['ArrowRight'] || keys['d'] || keys['D']) {
            this.velocityX = GAME_CONFIG.PLAYER.MOVE_SPEED;
        }
        
        const jumpKeyPressed = keys[' '] || keys['z'] || keys['Z'];
        
        if (jumpKeyPressed && this.isGrounded) {
            this.velocityY = -GAME_CONFIG.PLAYER.JUMP_POWER;
            this.isGrounded = false;
            this.isJumping = true;
            this.jumpTimer = 0;
        }
        
        if (this.isJumping) {
            if (jumpKeyPressed && this.jumpTimer < this.maxJumpTime) {
                this.jumpTimer += deltaTime;
            } else {
                this.isJumping = false;
            }
        }
        
        if (!jumpKeyPressed && this.velocityY < 0) {
            this.velocityY *= 0.5;
            this.isJumping = false;
        }
        
        this.isGliding = jumpKeyPressed && !this.isGrounded && this.velocityY > 0;
        
        const gravity = this.isGliding ? GAME_CONFIG.PLAYER.GLIDE_GRAVITY : GAME_CONFIG.PLAYER.GRAVITY;
        this.velocityY += gravity * deltaTime;
        
        if (this.velocityY > GAME_CONFIG.PLAYER.MAX_FALL_SPEED) {
            this.velocityY = GAME_CONFIG.PLAYER.MAX_FALL_SPEED;
        }
        
        this.x += this.velocityX * deltaTime;
        this.y += this.velocityY * deltaTime;
        
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > GAME_CONFIG.CANVAS_WIDTH) {
            this.x = GAME_CONFIG.CANVAS_WIDTH - this.width;
        }
        
        this.isGrounded = false;
        for (const platform of platforms) {
            if (platform.checkCollision(this)) {
                this.y = platform.y - this.height;
                this.velocityY = 0;
                this.isGrounded = true;
            }
        }
        
        if (this.y + this.height >= GAME_CONFIG.CANVAS_HEIGHT) {
            this.y = GAME_CONFIG.CANVAS_HEIGHT - this.height;
            this.velocityY = 0;
            this.isGrounded = true;
        }
        
        if (this.invincible) {
            this.invincibleTimer -= deltaTime;
            if (this.invincibleTimer <= 0) {
                this.invincible = false;
            }
        }
    }
    
    draw(ctx) {
        if (this.invincible && Math.floor(Date.now() / 100) % 2 === 0) {
            return;
        }
        
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        ctx.fillStyle = '#000';
        ctx.fillRect(this.x + 6, this.y + 6, 4, 4);
        ctx.fillRect(this.x + 14, this.y + 6, 4, 4);
        
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(this.x + 8, this.y + 20, 8, 4);
    }
    
    reset(x, y) {
        this.x = x;
        this.y = y;
        this.velocityX = 0;
        this.velocityY = 0;
        this.isGrounded = false;
        this.isJumping = false;
        this.jumpTimer = 0;
        this.invincible = true;
        this.invincibleTimer = 2;
    }
}
