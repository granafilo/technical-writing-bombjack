# Bomb Jack - Game & Documentation

## Overview
This repository contains both a **playable HTML5 Bomb Jack game** and comprehensive technical documentation. It demonstrates the complete software development lifecycle from documentation to implementation.

### Game Features
- Full implementation of the classic Bomb Jack arcade game
- 24 bombs to collect per round with lit bomb sequence system
- Player movement with unique glide/float mechanic
- Enemy AI with multiple movement patterns
- Power-ups: Bonus Multiplier (B) and Power Ball (P)
- Score multiplier system (up to 5x)
- Progressive difficulty across rounds
- Lives system with invincibility frames
- Round timer and completion bonuses

### Documentation
- Product Requirements Document (PRD)
- Functional Analysis Document (DAF)
- Technical Analysis Document (DAT)
- AI Support Documentation
- Meeting Minutes (Verbali)

The documentation viewer is a static website built with HTML/CSS/JavaScript that displays all markdown documents in an elegant, easy-to-navigate interface.

## Project Structure
```
.
├── game/                       # Playable Bomb Jack game
│   ├── index.html              # Game entry point
│   ├── style.css               # Game styling
│   └── js/
│       ├── constants.js        # Game configuration
│       ├── game.js             # Main game engine
│       ├── player.js           # Player (Jack) controller
│       ├── bomb.js             # Bomb objects and collection
│       ├── enemy.js            # Enemy AI and spawning
│       ├── platform.js         # Platform collision system
│       └── powerup.js          # Power-up system
├── docs/
│   ├── prd.md                  # Product Requirements Document
│   ├── analisi_funzionale.md   # Functional Analysis
│   ├── analisi_tecnica.md      # Technical Analysis
│   └── supporto_AI.md          # AI Support Documentation
├── verbali_riunioni/           # Meeting minutes
│   ├── Verbale Riunione_ Giovedì _Bomb Jack_.md
│   ├── Verbale Riunione_ Lunedì _Bomb Jack_.md
│   ├── Verbale Riunione_ Martedì _Bomb Jack_.md
│   └── Verbale Riunione_ Mercoledì _Bomb Jack_.md
├── index.html                  # Documentation viewer frontend
├── package.json                # Node.js dependencies
└── README.md                   # Project overview
```

## Technology Stack
- **Game Engine**: HTML5 Canvas, Vanilla JavaScript (ES6+)
- **Documentation Viewer**: HTML5, CSS3, JavaScript
- **Markdown Rendering**: Marked.js library
- **HTTP Server**: http-server package (Node.js)
- **Port**: 5000

## Game Controls
- **Arrow Keys / WASD**: Move left/right
- **Space / Z**: Jump (press once) / Glide (hold in air)

## Running Locally
The documentation server runs on port 5000 and serves the static documentation viewer:
```bash
npm start
```

## Features
- Beautiful, modern UI with gradient design
- Navigation between different documentation sections
- Markdown rendering with syntax highlighting
- Responsive design for all screen sizes
- Meeting notes viewer with expandable cards

## Authors
Documentation curated by Filippo Granata, Alessandro Cervini, and Alessandro Tabaku

## Date
Created: November 5, 2025
