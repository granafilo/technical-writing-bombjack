class PowerUp {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.size = GAME_CONFIG.POWERUP.SIZE;
        this.type = type;
        this.collected = false;
        this.pulsePhase = 0;
        this.velocityY = Math.sin(Date.now() / 1000) * 30;
    }
    
    update(deltaTime) {
        this.pulsePhase += deltaTime * 3;
        this.y += Math.sin(this.pulsePhase) * 0.5;
    }
    
    draw(ctx) {
        if (this.collected) return;
        
        const pulse = Math.sin(this.pulsePhase) * 0.2 + 1;
        const size = this.size * pulse;
        
        ctx.fillStyle = this.type === 'B' ? '#00FF00' : '#FF00FF';
        ctx.beginPath();
        ctx.arc(this.x, this.y, size/2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.type, this.x, this.y + 5);
    }
    
    checkCollision(player) {
        if (this.collected) return false;
        
        const dx = (player.x + player.width/2) - this.x;
        const dy = (player.y + player.height/2) - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        return distance < (this.size/2 + player.width/2);
    }
}
