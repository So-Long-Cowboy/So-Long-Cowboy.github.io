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
        // Visualizer will be created when Play Tune button is pressed
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
        // Remove existing visualizer if it exists
        const existingVisualizer = document.querySelector('.music-visualizer');
        if (existingVisualizer) {
            existingVisualizer.remove();
        }
        
        const visualizer = document.createElement('div');
        visualizer.className = 'music-visualizer';
        visualizer.id = 'music-visualizer';
        
        // Create more bars for better audio visualization
        for (let i = 0; i < 32; i++) {
            const bar = document.createElement('div');
            bar.className = 'visualizer-bar';
            bar.dataset.index = i;
            visualizer.appendChild(bar);
        }
        
        document.body.appendChild(visualizer);
        return visualizer;
    }

    // Start visualizer animation with real audio analysis
    startVisualizer() {
        const visualizer = document.getElementById('music-visualizer') || this.createMusicVisualizer();
        const bars = visualizer.querySelectorAll('.visualizer-bar');
        
        visualizer.classList.add('active');
        
        // Try to get the audio element
        const audioElement = document.getElementById('countdown-sound');
        if (!audioElement) {
            console.log('Audio element not found, using fallback animation');
            this.startFallbackVisualizer(bars);
            return;
        }
        
        // Check if audio is actually playing
        if (audioElement.paused || audioElement.ended) {
            console.log('Audio not playing, using fallback animation');
            this.startFallbackVisualizer(bars);
            return;
        }
        
        // Initialize Web Audio API for real-time analysis
        console.log('Starting real-time audio visualizer...');
        this.initAudioVisualizer(audioElement, bars);
    }

    // Initialize real-time audio visualizer
    initAudioVisualizer(audioElement, bars) {
        let audioContext, analyser;
        
        try {
            console.log('Creating audio context...');
            // Create audio context
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('Audio context state:', audioContext.state);
            
            // Resume audio context if suspended (required for Firefox)
            if (audioContext.state === 'suspended') {
                console.log('Resuming suspended audio context...');
                audioContext.resume();
            }
            
            // Create audio source from the audio element
            console.log('Creating media element source...');
            const source = audioContext.createMediaElementSource(audioElement);
            
            // Check if the source will output silence due to cross-origin
            if (audioElement.crossOrigin) {
                console.log('Cross-origin audio detected, using fallback visualizer');
                this.startFallbackVisualizer(bars);
                return;
            }
            
            // Create analyser node
            console.log('Creating analyser node...');
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 64; // Use 64 frequency bins
            analyser.smoothingTimeConstant = 0.8;
            
            // Connect the audio nodes
            console.log('Connecting audio nodes...');
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            
            // Get frequency data
            const frequencyData = new Uint8Array(analyser.frequencyBinCount);
            
            // Animation function
            const animate = () => {
                if (!audioElement.paused && !audioElement.ended && audioContext.state === 'running') {
                    analyser.getByteFrequencyData(frequencyData);
                    
                    // Debug: Log first few frequency values
                    if (Math.random() < 0.01) { // Log only 1% of the time to avoid spam
                        console.log('Frequency data sample:', frequencyData.slice(0, 5));
                    }
                    
                    // Update each bar based on frequency data
                    bars.forEach((bar, index) => {
                        const dataIndex = Math.floor(index * frequencyData.length / bars.length);
                        const value = frequencyData[dataIndex] || 0;
                        
                        // Map frequency value to height (0-255 to 10-50px)
                        const height = 10 + (value / 255) * 40;
                        bar.style.height = height + 'px';
                        
                        // Add some glow effect based on intensity
                        const intensity = value / 255;
                        bar.style.boxShadow = `0 0 ${8 + intensity * 12}px #ffd700`;
                    });
                    
                    requestAnimationFrame(animate);
                } else {
                    // Audio stopped, reset bars
                    console.log('Audio stopped or context not running, resetting bars');
                    bars.forEach(bar => {
                        bar.style.height = '10px';
                        bar.style.boxShadow = '0 0 8px #ffd700';
                    });
                }
            };
            
            // Start animation
            console.log('Starting real-time animation...');
            animate();
            
            // Add a timeout to check if we're getting silence (cross-origin issue)
            setTimeout(() => {
                if (audioContext && audioContext.state === 'running' && analyser) {
                    // Test if we're getting any frequency data
                    const testData = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(testData);
                    const hasData = testData.some(value => value > 0);
                    
                    if (!hasData) {
                        console.log('No frequency data detected (likely cross-origin issue), switching to fallback');
                        this.startFallbackVisualizer(bars);
                    }
                }
            }, 1000);
            
        } catch (error) {
            console.log('Web Audio API error, using fallback:', error);
            this.startFallbackVisualizer(bars);
        }
    }

    // Fallback visualizer for when Web Audio API is not available
    startFallbackVisualizer(bars) {
        console.log('Using fallback visualizer animation');
        bars.forEach((bar, index) => {
            bar.classList.add('animate');
            bar.style.animationDelay = (index * 0.05) + 's';
        });
        
        // Ensure the visualizer stays active
        const visualizer = document.getElementById('music-visualizer');
        if (visualizer) {
            visualizer.classList.add('active');
        }
    }

    // Stop visualizer animation
    stopVisualizer() {
        const visualizer = document.getElementById('music-visualizer');
        if (visualizer) {
            const bars = visualizer.querySelectorAll('.visualizer-bar');
            
            // Reset all bars to minimum height
            bars.forEach(bar => {
                bar.classList.remove('animate');
                bar.style.height = '10px';
                bar.style.boxShadow = '0 0 8px #ffd700';
            });
            
            visualizer.classList.remove('active');
        }
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
        const elements = document.querySelectorAll('.star-destroyer, .tie-fighter, .droid, .millennium-falcon');
        
        elements.forEach(el => {
            el.style.display = this.effectsEnabled ? 'block' : 'none';
        });
        
        // Handle visualizer separately - only hide if it's not currently active
        const visualizer = document.querySelector('.music-visualizer');
        if (visualizer && !visualizer.classList.contains('active')) {
            visualizer.style.display = this.effectsEnabled ? 'block' : 'none';
        }
        
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