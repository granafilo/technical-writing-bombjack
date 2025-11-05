const GAME_CONFIG = {
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,
    TARGET_FPS: 60,
    
    PLAYER: {
        WIDTH: 24,
        HEIGHT: 32,
        MOVE_SPEED: 150,
        JUMP_POWER: 400,
        GRAVITY: 1200,
        GLIDE_GRAVITY: 300,
        MAX_FALL_SPEED: 600,
        COLOR: '#FFD700'
    },
    
    BOMB: {
        SIZE: 16,
        TOTAL: 24,
        NORMAL_POINTS: 100,
        LIT_POINTS: 200,
        COLOR: '#FF4444',
        LIT_COLOR: '#FFFF00'
    },
    
    ENEMY: {
        SIZE: 20,
        BASE_SPEED: 80,
        SPAWN_INTERVAL: 3000,
        INITIAL_COUNT: 3,
        COLORS: ['#FF00FF', '#00FFFF', '#FF8800']
    },
    
    POWERUP: {
        SIZE: 20,
        BONUS_MULTIPLIER_THRESHOLD: 5000,
        POWER_BALL_SEGMENTS: 20,
        POWER_BALL_DURATION: 5000
    },
    
    TIMER: {
        ROUND_DURATION: 120
    }
};
