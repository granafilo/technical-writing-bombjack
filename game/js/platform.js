class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = '#4488FF';
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = '#6699FF';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    checkCollision(player) {
        if (player.velocityY > 0 && // 1. Il giocatore sta cadendo
            player.x + player.width > this.x && // 2. Allineamento Orizzontale
            player.x < this.x + this.width && // 3. Allineamento Orizzontale
            player.y + player.height >= this.y && // 4. Il fondo del giocatore è pari o sotto la cima della piattaforma
            player.y < this.y) { // 5. La cima del giocatore è ancora SOPRA la cima della piattaforma
            return true;
        }
        return false;
    }
}
