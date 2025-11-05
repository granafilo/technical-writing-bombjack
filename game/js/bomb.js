class Bomb {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.size = GAME_CONFIG.BOMB.SIZE;
        this.collected = false;
        this.isLit = false;
        this.pulsePhase = Math.random() * Math.PI * 2;
    }
    
    update(deltaTime) {
        this.pulsePhase += deltaTime * 5;
    }
    
    draw(ctx) {
        if (this.collected) return;
        
        const pulse = this.isLit ? Math.sin(this.pulsePhase) * 0.3 + 1 : 1;
        const size = this.size * pulse;
        const offset = (this.size - size) / 2;
        
        ctx.fillStyle = this.isLit ? GAME_CONFIG.BOMB.LIT_COLOR : GAME_CONFIG.BOMB.COLOR;
        ctx.beginPath();
        ctx.arc(this.x + this.size/2, this.y + this.size/2, size/2, 0, Math.PI * 2);
        ctx.fill();
        
        if (this.isLit) {
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        
        ctx.fillStyle = '#000';
        ctx.fillRect(this.x + this.size/2 - 2, this.y - 4, 4, 6);
    }
    
    checkCollision(player) {
        if (this.collected) return false;
        
        return player.x < this.x + this.size &&
               player.x + player.width > this.x &&
               player.y < this.y + this.size &&
               player.y + player.height > this.y;
    }
}
