# Freedom Countdown - Star Wars Edition 🚀

A Star Wars themed countdown timer to your liberation from the corporate empire! 

## Features

### Core Countdown
- **Real-time countdown** to your freedom moment
- **Death Star progress bar** that fills as time progresses
- **Star Wars text crawl** with your epic journey story
- **Interactive controls** for the crawl (pause, speed, navigation)

### Star Wars Effects

#### Visual Effects
- **TIE Fighters** flying across the screen
- **Star Destroyer** floating in the background
- **Millennium Falcon** making periodic appearances
- **R2-D2 style droids** rolling across the screen
- **Lightsaber duel** in the background
- **Death Star progress indicator** replacing the boring progress bar

#### Interactive Effects
- **Lightsabers** appear when you click buttons (random colors)
- **Blaster shots** when you right-click anywhere
- **Force lightning** when you press the spacebar
- **Hologram messages** with Star Wars quotes
- **Music visualizer** at the bottom of the screen

#### Audio Effects
- **Synthesized blaster sounds** for right-clicks
- **Lightsaber humming** when lightsabers appear
- **Force lightning crackling** when activated
- **Background music** (your countdown.mp3 file)

### Controls

#### Mouse/Touch
- **Left-click buttons**: Creates lightsabers
- **Right-click anywhere**: Fires blaster shots
- **Drag the text crawl**: Manual navigation
- **Click Force Lightning button**: Creates lightning effects
- **Click Hologram button**: Shows random Star Wars messages

#### Keyboard
- **Spacebar**: Force lightning
- **Arrow keys**: Navigate text crawl
- **+/- keys**: Change crawl speed
- **Pause button**: Pause/play crawl

#### Crawl Navigation
- **⬆️/⬇️ buttons**: Move crawl up/down
- **⏸️ button**: Pause/play crawl
- **⚡/🐌 buttons**: Speed up/slow down
- **🔄 button**: Reset to beginning

### Files Structure
```
countdown/
├── index.html              # Main page with countdown
├── starwars-effects.css    # Star Wars visual effects
├── starwars-effects.js     # Star Wars interactive effects
├── countdown.mp3          # Your background music
└── README.md              # This file
```

### Customization

#### Adding Your Own Audio
Replace `countdown.mp3` with your preferred Star Wars music or sound effects.

#### Modifying Effects
- Edit `starwars-effects.css` to change visual styles
- Edit `starwars-effects.js` to modify behavior
- All effects are modular and can be easily customized

#### Changing the Countdown Target
Update the `targetTime` variable in `index.html`:
```javascript
const targetTime = new Date('2025-07-09T18:00:00+03:00');
```

### Browser Compatibility
- Modern browsers with Web Audio API support
- Mobile-friendly with touch controls
- Responsive design for all screen sizes

### Performance Notes
- Effects are optimized for smooth performance
- Audio effects use Web Audio API for low latency
- Visual effects are CSS-based for efficiency
- All effects can be toggled on/off

May the Force be with you on your journey to freedom! 🌟 