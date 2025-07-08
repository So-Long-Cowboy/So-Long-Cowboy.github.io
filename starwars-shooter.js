// Star Wars Shooter Game JavaScript

class StarWarsShooter {
    constructor() {
        this.isActive = false;
        this.score = 0;
        this.targetsHit = 0;
        this.targetsSpawned = 0;
        this.activeTargets = [];
        this.spawnIntervals = [];
        this.gameContainer = null;
        this.crosshair = null;
        this.ui = null;
        this.toggleButton = null;
        this.audioContext = null;
        
        this.init();
    }

    init() {
        this.createGameElements();
        this.setupEventListeners();
        this.initAudio();
    }

    createGameElements() {
        // Create game container
        this.gameContainer = document.createElement('div');
        this.gameContainer.className = 'shooter-game';
        document.body.appendChild(this.gameContainer);

        // Create crosshair
        this.crosshair = document.createElement('div');
        this.crosshair.className = 'crosshair';
        this.gameContainer.appendChild(this.crosshair);

        // Create UI
        this.createUI();

        // Create toggle button
        this.createToggleButton();
    }

    createUI() {
        this.ui = document.createElement('div');
        this.ui.className = 'shooter-ui';
        this.ui.innerHTML = `
            <div class="shooter-score">Score: <span id="shooter-score">0</span></div>
            <div class="shooter-targets">Targets Hit: <span id="shooter-targets-hit">0</span></div>
            <div class="shooter-instructions">
                ⚔️ Left-click: Lightsaber cut<br>
                🔫 Right-click: Blaster shot<br>
                🎮 Toggle game with button<br>
                💥 Hit targets for points!
            </div>
        `;
        this.gameContainer.appendChild(this.ui);
    }

    createToggleButton() {
        this.toggleButton = document.createElement('button');
        this.toggleButton.className = 'shooter-toggle';
        this.toggleButton.textContent = '🎯 Start Shooter';
        this.toggleButton.onclick = () => this.toggleGame();
        document.body.appendChild(this.toggleButton);
    }

    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Audio context not supported');
        }
    }

    toggleGame() {
        this.isActive = !this.isActive;
        
        if (this.isActive) {
            this.startGame();
        } else {
            this.stopGame();
        }
    }

    startGame() {
        this.gameContainer.classList.add('active');
        this.toggleButton.classList.add('active');
        this.toggleButton.textContent = '⏹️ Stop Shooter';
        
        // Start spawning targets
        this.startSpawning();
        
        console.log('Shooter game started!');
    }

    stopGame() {
        this.gameContainer.classList.remove('active');
        this.toggleButton.classList.remove('active');
        this.toggleButton.textContent = '🎯 Start Shooter';
        
        // Stop spawning and clear targets
        this.stopSpawning();
        this.clearAllTargets();
        
        console.log('Shooter game stopped!');
    }

    startSpawning() {
        // Clear any existing intervals
        this.stopSpawning();
        
        // Spawn TIE fighters
        this.spawnIntervals.push(setInterval(() => {
            this.spawnTarget('tie-fighter');
        }, 3000 + Math.random() * 2000));

        // Spawn Millennium Falcons
        this.spawnIntervals.push(setInterval(() => {
            this.spawnTarget('millennium-falcon');
        }, 5000 + Math.random() * 3000));

        // Spawn Droids
        this.spawnIntervals.push(setInterval(() => {
            this.spawnTarget('droid');
        }, 4000 + Math.random() * 2000));
    }

    stopSpawning() {
        this.spawnIntervals.forEach(interval => clearInterval(interval));
        this.spawnIntervals = [];
    }

    spawnTarget(type) {
        if (!this.isActive) return;

        const target = document.createElement('div');
        const id = `target-${Date.now()}-${Math.random()}`;
        target.id = id;
        target.className = `targetable-${type}`;
        
        // Randomize spawn position and timing
        const spawnSide = Math.random() > 0.5 ? 'left' : 'right';
        const startY = Math.random() * 80 + 10; // 10% to 90% of screen height
        
        if (spawnSide === 'left') {
            target.style.left = '-100px';
            target.style.top = startY + '%';
        } else {
            target.style.right = '-100px';
            target.style.left = 'auto';
            target.style.top = startY + '%';
            // Reverse animation for right-side spawns
            target.style.animationDirection = 'reverse';
        }

        // Add random animation delay
        target.style.animationDelay = Math.random() * 2 + 's';
        
        // Add click event (only for left clicks)
        target.addEventListener('click', (e) => {
            e.stopPropagation();
            // Only handle left clicks, ignore right clicks
            if (e.button === 0) {
                this.shootTarget(target, type);
            }
        });

        // Add hover effects
        target.addEventListener('mouseenter', () => {
            target.classList.add('targeted');
        });

        target.addEventListener('mouseleave', () => {
            target.classList.remove('targeted');
        });

        this.gameContainer.appendChild(target);
        this.activeTargets.push({ element: target, id: id, type: type });
        this.targetsSpawned++;

        // Remove target after animation completes
        const animationDuration = type === 'tie-fighter' ? 8000 : 
                                 type === 'millennium-falcon' ? 12000 : 4000;
        
        setTimeout(() => {
            this.removeTarget(id);
        }, animationDuration + 2000);
    }

    shootTarget(target, type) {
        if (!this.isActive) return;

        // Create blaster shot
        this.createBlasterShot(target);
        
        // Create explosion
        this.createExplosion(target);
        
        // Play blaster sound
        this.playBlasterSound();
        
        // Update score
        this.updateScore(type);
        
        // Remove target
        this.removeTarget(target.id);
        
        // Create hit marker
        this.createHitMarker(target);
    }

    createBlasterShot(target) {
        const rect = target.getBoundingClientRect();
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;
        
        // Create blaster bolt
        const shot = document.createElement('div');
        const colors = ['red', 'blue', 'green', 'purple'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        shot.className = `shooter-blaster-shot ${color}`;
        
        // Position at mouse cursor (we'll get this from the crosshair position)
        const crosshairRect = this.crosshair.getBoundingClientRect();
        const startX = crosshairRect.left + crosshairRect.width / 2;
        const startY = crosshairRect.top + crosshairRect.height / 2;
        
        shot.style.left = startX + 'px';
        shot.style.top = startY + 'px';
        
        // Calculate angle to target (adjust for the 90deg base rotation)
        const deltaX = targetX - startX;
        const deltaY = targetY - startY;
        const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI + 90;
        
        // Rotate the blaster bolt to point at target
        shot.style.transform = `rotate(${angle}deg)`;
        
        this.gameContainer.appendChild(shot);
        
        // Animate the bolt traveling to target with collision detection
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const duration = Math.min(distance / 2, 1000); // Speed based on distance, max 1 second
        
        shot.style.transition = `all ${duration}ms linear`;
        
        // After a brief delay, move the bolt to the target
        setTimeout(() => {
            shot.style.left = targetX + 'px';
            shot.style.top = targetY + 'px';
        }, 10);
        
        // Check for collision and hit target
        setTimeout(() => {
            this.checkBlasterCollision(shot, target);
        }, duration);
        
        // Remove bolt after animation
        setTimeout(() => {
            if (shot.parentNode) {
                shot.parentNode.removeChild(shot);
            }
        }, duration + 100);
    }

    createExplosion(target) {
        const rect = target.getBoundingClientRect();
        const explosion = document.createElement('div');
        explosion.className = 'explosion';
        explosion.style.left = (rect.left + rect.width / 2 - 30) + 'px';
        explosion.style.top = (rect.top + rect.height / 2 - 30) + 'px';
        
        this.gameContainer.appendChild(explosion);
        
        setTimeout(() => {
            if (explosion.parentNode) {
                explosion.parentNode.removeChild(explosion);
            }
        }, 600);
    }

    createHitMarker(target) {
        const rect = target.getBoundingClientRect();
        const marker = document.createElement('div');
        marker.className = 'hit-marker';
        marker.style.left = (rect.left + rect.width / 2 - 15) + 'px';
        marker.style.top = (rect.top + rect.height / 2 - 15) + 'px';
        
        this.gameContainer.appendChild(marker);
        
        setTimeout(() => {
            if (marker.parentNode) {
                marker.parentNode.removeChild(marker);
            }
        }, 300);
    }

    playBlasterSound() {
        try {
            const audio = new Audio('blaster.mp3');
            audio.volume = 0.5;
            audio.play().catch(e => console.log('Blaster audio play failed:', e));
        } catch (e) {
            console.log('Blaster audio not available');
        }
    }

    updateScore(type) {
        let points = 0;
        switch (type) {
            case 'tie-fighter':
                points = 10;
                break;
            case 'millennium-falcon':
                points = 25;
                break;
            case 'droid':
                points = 15;
                break;
        }
        
        this.score += points;
        this.targetsHit++;
        
        // Update UI
        document.getElementById('shooter-score').textContent = this.score;
        document.getElementById('shooter-targets-hit').textContent = this.targetsHit;
        
        // Show score popup
        this.showScorePopup(points, type);
    }

    showScorePopup(points, type) {
        const popup = document.createElement('div');
        popup.style.position = 'absolute';
        popup.style.color = '#ffd700';
        popup.style.fontSize = '24px';
        popup.style.fontWeight = 'bold';
        popup.style.fontFamily = 'Orbitron, monospace';
        popup.style.textShadow = '0 0 10px #ffd700';
        popup.style.pointerEvents = 'none';
        popup.style.zIndex = '1001';
        popup.textContent = `+${points}`;
        
        // Position popup at random location near center
        popup.style.left = (Math.random() * 200 + 100) + 'px';
        popup.style.top = (Math.random() * 200 + 100) + 'px';
        
        this.gameContainer.appendChild(popup);
        
        // Animate popup
        let opacity = 1;
        let y = 0;
        const animate = () => {
            opacity -= 0.02;
            y -= 2;
            popup.style.opacity = opacity;
            popup.style.transform = `translateY(${y}px)`;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                if (popup.parentNode) {
                    popup.parentNode.removeChild(popup);
                }
            }
        };
        animate();
    }

    removeTarget(id) {
        const targetIndex = this.activeTargets.findIndex(t => t.id === id);
        if (targetIndex !== -1) {
            const target = this.activeTargets[targetIndex];
            if (target.element.parentNode) {
                target.element.parentNode.removeChild(target.element);
            }
            this.activeTargets.splice(targetIndex, 1);
        }
    }

    clearAllTargets() {
        this.activeTargets.forEach(target => {
            if (target.element.parentNode) {
                target.element.parentNode.removeChild(target.element);
            }
        });
        this.activeTargets = [];
    }

    setupEventListeners() {
        // Update crosshair position
        this.gameContainer.addEventListener('mousemove', (e) => {
            if (this.isActive) {
                this.crosshair.style.left = (e.clientX - 10) + 'px';
                this.crosshair.style.top = (e.clientY - 10) + 'px';
            }
        });

        // Left-click for lightsaber cutting
        this.gameContainer.addEventListener('click', (e) => {
            if (this.isActive) {
                e.preventDefault();
                this.createLightsaberCut(e.clientX, e.clientY);
            }
        });

        // Right-click for blaster shots
        this.gameContainer.addEventListener('contextmenu', (e) => {
            if (this.isActive) {
                e.preventDefault();
                this.createRightClickBlasterShot(e.clientX, e.clientY);
            }
        });
    }

    createRightClickBlasterShot(x, y) {
        // Create blaster bolt
        const shot = document.createElement('div');
        const colors = ['red', 'blue', 'green', 'purple'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        shot.className = `shooter-blaster-shot ${color} right-click`;
        
        // Position at click location (adjust for bolt center)
        shot.style.left = (x - 2) + 'px';
        shot.style.top = (y - 10) + 'px';
        
        this.gameContainer.appendChild(shot);
        
        // Play blaster sound
        this.playBlasterSound();
        
        // Remove bolt after animation
        setTimeout(() => {
            if (shot.parentNode) {
                shot.parentNode.removeChild(shot);
            }
        }, 1000);
    }

    checkBlasterCollision(shot, target) {
        // Check if the target is still active and visible
        if (target && target.parentNode && this.activeTargets.find(t => t.element === target)) {
            // Hit the target
            this.shootTarget(target, target.className.replace('targetable-', ''));
        }
    }

    // Removed collision detection during flight to prevent multiple shots

    rectsIntersect(rect1, rect2) {
        return !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom);
    }

    createLightsaberCut(x, y) {
        // Create lightsaber effect
        const lightsaber = document.createElement('div');
        const colors = ['green', 'blue', 'red', 'purple'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        lightsaber.className = `lightsaber ${color}`;
        
        // Position at click location
        lightsaber.style.left = (x - 4) + 'px';
        lightsaber.style.top = (y - 100) + 'px';
        lightsaber.style.animation = 'lightsaberSwing 0.5s ease-in-out';
        
        this.gameContainer.appendChild(lightsaber);
        
        // Play lightsaber sound
        this.playLightsaberSound();
        
        // Check for targets in cutting range
        this.checkLightsaberCollision(lightsaber, x, y);
        
        // Remove lightsaber after animation
        setTimeout(() => {
            if (lightsaber.parentNode) {
                lightsaber.parentNode.removeChild(lightsaber);
            }
        }, 500);
    }

    checkLightsaberCollision(lightsaber, x, y) {
        // Check for targets within cutting range (larger area than blaster)
        const cuttingRange = 80; // pixels
        
        for (let i = this.activeTargets.length - 1; i >= 0; i--) {
            const target = this.activeTargets[i];
            if (target.element && target.element.parentNode) {
                const targetRect = target.element.getBoundingClientRect();
                const targetX = targetRect.left + targetRect.width / 2;
                const targetY = targetRect.top + targetRect.height / 2;
                
                // Calculate distance from lightsaber to target
                const distance = Math.sqrt(
                    Math.pow(x - targetX, 2) + Math.pow(y - targetY, 2)
                );
                
                // If target is within cutting range, destroy it
                if (distance <= cuttingRange) {
                    this.shootTarget(target.element, target.type);
                }
            }
        }
    }

    playLightsaberSound() {
        try {
            const audio = new Audio('lightsaber.mp3');
            audio.volume = 0.6;
            audio.play().catch(e => console.log('Lightsaber audio play failed:', e));
        } catch (e) {
            console.log('Lightsaber audio not available');
        }
    }

    // Public methods for external control
    getScore() {
        return this.score;
    }

    getTargetsHit() {
        return this.targetsHit;
    }

    resetGame() {
        this.score = 0;
        this.targetsHit = 0;
        this.targetsSpawned = 0;
        document.getElementById('shooter-score').textContent = '0';
        document.getElementById('shooter-targets-hit').textContent = '0';
    }
}

// Initialize shooter game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.starWarsShooter = new StarWarsShooter();
});

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StarWarsShooter;
} 