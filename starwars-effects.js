// Star Wars Effects JavaScript

class StarWarsEffects {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.effectsEnabled = true;
        this.init();
    }

    init() {
        this.createStarDestroyer();
        this.createTieFighters();
        this.createDroids();
        this.createMillenniumFalcon();
        // Removed lightsaber duel to prevent overlap with feedback panel
        this.createMusicVisualizer();
        this.setupEventListeners();
        this.initAudio();
    }

    // Audio initialization
    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.createBlasterSound();
            this.createLightsaberSound();
            this.createForceLightningSound();
        } catch (e) {
            console.log('Audio context not supported');
        }
    }

    // Create blaster sound using audio file
    createBlasterSound() {
        try {
            const audio = new Audio('blaster.mp3');
            audio.volume = 0.6;
            audio.play().catch(e => console.log('Blaster audio play failed:', e));
        } catch (e) {
            console.log('Blaster audio not available, falling back to synthesized sound');
            this.createSynthesizedBlasterSound();
        }
    }
    
    // Fallback synthesized blaster sound
    createSynthesizedBlasterSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    // Create synthesized lightsaber sound
    createLightsaberSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(150, this.audioContext.currentTime);
        oscillator.frequency.setValueAtTime(160, this.audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(155, this.audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime + 0.3);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }

    // Create force lightning sound using audio file
    createForceLightningSound() {
        try {
            const audio = new Audio('lightning.mp3');
            audio.volume = 0.7;
            audio.play().catch(e => console.log('Lightning audio play failed:', e));
        } catch (e) {
            this.createSynthesizedLightningSound();
        }
    }
    
    // Fallback synthesized force lightning sound
    createSynthesizedLightningSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(300, this.audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime + 0.05);
        oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.2);
    }

    // Create Star Destroyer
    createStarDestroyer() {
        const starDestroyer = document.createElement('div');
        starDestroyer.className = 'star-destroyer';
        document.body.appendChild(starDestroyer);
    }

    // Create TIE Fighters
    createTieFighters() {
        const createTieFighter = () => {
            const tieFighter = document.createElement('div');
            tieFighter.className = 'tie-fighter';
            tieFighter.style.animationDelay = Math.random() * 8 + 's';
            document.body.appendChild(tieFighter);
            
            setTimeout(() => {
                if (tieFighter.parentNode) {
                    tieFighter.parentNode.removeChild(tieFighter);
                }
            }, 8000);
        };

        // Create TIE fighters periodically
        setInterval(createTieFighter, 10000);
        createTieFighter(); // Create first one immediately
    }

    // Create Droids
    createDroids() {
        const createDroid = () => {
            const droid = document.createElement('div');
            droid.className = 'droid';
            droid.style.animationDelay = Math.random() * 4 + 's';
            document.body.appendChild(droid);
            
            setTimeout(() => {
                if (droid.parentNode) {
                    droid.parentNode.removeChild(droid);
                }
            }, 4000);
        };

        // Create droids periodically
        setInterval(createDroid, 15000);
        createDroid(); // Create first one immediately
    }

    // Create Millennium Falcon
    createMillenniumFalcon() {
        const createFalcon = () => {
            const falcon = document.createElement('div');
            falcon.className = 'millennium-falcon';
            falcon.style.animationDelay = Math.random() * 12 + 's';
            document.body.appendChild(falcon);
            
            setTimeout(() => {
                if (falcon.parentNode) {
                    falcon.parentNode.removeChild(falcon);
                }
            }, 12000);
        };

        // Create Millennium Falcon periodically
        setInterval(createFalcon, 30000);
        createFalcon(); // Create first one immediately
    }

    // Create Lightsaber Duel
    createLightsaberDuel() {
        const duelContainer = document.createElement('div');
        duelContainer.className = 'lightsaber-duel';
        
        const lightsaber1 = document.createElement('div');
        lightsaber1.className = 'duel-lightsaber';
        lightsaber1.style.left = '20%';
        lightsaber1.style.bottom = '20%';
        lightsaber1.style.animationDuration = '3.5s';
        lightsaber1.style.animationTimingFunction = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        const lightsaber2 = document.createElement('div');
        lightsaber2.className = 'duel-lightsaber red';
        lightsaber2.style.right = '20%';
        lightsaber2.style.bottom = '20%';
        lightsaber2.style.animationDuration = '4.2s';
        lightsaber2.style.animationTimingFunction = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        lightsaber2.style.animationDelay = '1.8s';
        
        duelContainer.appendChild(lightsaber1);
        duelContainer.appendChild(lightsaber2);
        document.body.appendChild(duelContainer);
    }

    // Create Music Visualizer
    createMusicVisualizer() {
        const visualizer = document.createElement('div');
        visualizer.className = 'music-visualizer';
        
        for (let i = 0; i < 20; i++) {
            const bar = document.createElement('div');
            bar.className = 'visualizer-bar';
            bar.style.animationDelay = (i * 0.1) + 's';
            visualizer.appendChild(bar);
        }
        
        document.body.appendChild(visualizer);
    }

    // Create Death Star Progress Bar
    createDeathStarProgress(progress) {
        const container = document.querySelector('.death-star-container') || this.createDeathStarContainer();
        const progressElement = container.querySelector('.death-star-progress') || this.createDeathStarProgressElement(container);
        
        const degrees = (progress / 100) * 360;
        progressElement.style.setProperty('--progress', degrees + 'deg');
    }

    createDeathStarContainer() {
        const container = document.createElement('div');
        container.className = 'death-star-container';
        
        const deathStar = document.createElement('div');
        deathStar.className = 'death-star';
        
        container.appendChild(deathStar);
        document.querySelector('.main-content').appendChild(container);
        
        return container;
    }

    createDeathStarProgressElement(container) {
        const progressElement = document.createElement('div');
        progressElement.className = 'death-star-progress';
        container.appendChild(progressElement);
        return progressElement;
    }

    // Create Lightsaber Effect
    createLightsaber(x, y, color = 'green') {
        const lightsaber = document.createElement('div');
        lightsaber.className = `lightsaber ${color}`;
        lightsaber.style.left = (x - 4) + 'px';
        lightsaber.style.top = (y - 200) + 'px';
        
        // Choose a random animation type for variety
        const animations = ['attack', 'defend', 'spin'];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        lightsaber.classList.add(randomAnimation);
        
        // Add some randomization to the position for more natural feel
        const randomOffsetX = (Math.random() - 0.5) * 20;
        const randomOffsetY = (Math.random() - 0.5) * 10;
        lightsaber.style.left = (x - 4 + randomOffsetX) + 'px';
        lightsaber.style.top = (y - 200 + randomOffsetY) + 'px';
        
        document.body.appendChild(lightsaber);
        
        // Play lightsaber sound
        this.createLightsaberSound();
        
        // Remove after animation completes
        const animationDuration = randomAnimation === 'attack' ? 800 : 
                                 randomAnimation === 'defend' ? 600 : 1200;
        
        setTimeout(() => {
            if (lightsaber.parentNode) {
                lightsaber.parentNode.removeChild(lightsaber);
            }
        }, animationDuration);
    }

    // Create Blaster Shot
    createBlasterShot(x, y) {
        const blaster = document.createElement('div');
        blaster.className = 'blaster-shot';
        blaster.style.left = x + 'px';
        blaster.style.top = y + 'px';
        
        document.body.appendChild(blaster);
        
        // Play blaster sound
        this.createBlasterSound();
        
        setTimeout(() => {
            if (blaster.parentNode) {
                blaster.parentNode.removeChild(blaster);
            }
        }, 1000);
    }

    // Create Force Lightning
    createForceLightning() {
        const lightningContainer = document.createElement('div');
        lightningContainer.className = 'force-lightning';
        
        for (let i = 0; i < 5; i++) {
            const lightning = document.createElement('div');
            lightning.className = 'lightning-bolt';
            lightning.style.left = Math.random() * 100 + '%';
            lightning.style.top = Math.random() * 100 + '%';
            lightning.style.width = (Math.random() * 4 + 2) + 'px';
            lightning.style.height = (Math.random() * 100 + 50) + 'px';
            lightning.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            lightningContainer.appendChild(lightning);
        }
        
        document.body.appendChild(lightningContainer);
        
        // Play force lightning sound
        this.createForceLightningSound();
        
        setTimeout(() => {
            if (lightningContainer.parentNode) {
                lightningContainer.parentNode.removeChild(lightningContainer);
            }
        }, 300);
    }

    // Create Hologram Text Effect
    createHologramText(text, x, y) {
        const hologram = document.createElement('div');
        hologram.className = 'hologram-text';
        hologram.textContent = text;
        hologram.style.position = 'absolute';
        hologram.style.left = x + 'px';
        hologram.style.top = y + 'px';
        hologram.style.fontSize = '24px';
        hologram.style.fontWeight = 'bold';
        hologram.style.pointerEvents = 'none';
        hologram.style.zIndex = '1000';
        
        document.body.appendChild(hologram);
        
        setTimeout(() => {
            if (hologram.parentNode) {
                hologram.parentNode.removeChild(hologram);
            }
        }, 3000);
    }

    // Setup Event Listeners
    setupEventListeners() {
        // Space bar for force lightning
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.createForceLightning();
            }
        });

        // Add Star Wars effects to existing buttons
        this.addStarWarsToButtons();
        
        // Add advanced lightsaber effects
        this.addAdvancedLightsaberEffects();
    }

    // Add Star Wars effects to existing buttons
    addStarWarsToButtons() {
        // Removed lightsaber effects on button clicks to reduce distraction
        // Buttons will still work normally without the lightsaber animations
    }
    
    // Add advanced lightsaber effects
    addAdvancedLightsaberEffects() {
        // Removed lightsaber effects on clicks to reduce distraction
        // Users can still use other Star Wars effects like force lightning and blasters
    }

    // Toggle effects on/off
    toggleEffects() {
        this.effectsEnabled = !this.effectsEnabled;
        const elements = document.querySelectorAll('.star-destroyer, .tie-fighter, .droid, .millennium-falcon, .music-visualizer');
        
        elements.forEach(el => {
            el.style.display = this.effectsEnabled ? 'block' : 'none';
        });
        
        return this.effectsEnabled;
    }

    // Update Death Star progress based on countdown
    updateDeathStarProgress(targetTime) {
        const now = new Date();
        const startTime = new Date('2025-07-08T13:00:00+03:00');
        const totalTime = targetTime - startTime;
        const timeLeft = targetTime - now;
        const progress = ((totalTime - timeLeft) / totalTime) * 100;
        
        this.createDeathStarProgress(progress);
    }
}

// Initialize Star Wars effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.starWarsEffects = new StarWarsEffects();
    
    // Update Death Star progress with countdown
    const targetTime = new Date('2025-07-09T18:00:00+03:00');
    setInterval(() => {
        window.starWarsEffects.updateDeathStarProgress(targetTime);
    }, 1000);
});

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StarWarsEffects;
} 