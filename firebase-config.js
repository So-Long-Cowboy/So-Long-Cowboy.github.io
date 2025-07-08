// Firebase Configuration
// This file can be easily updated without touching the main HTML

const firebaseConfig = {
  apiKey: "AIzaSyBP7qurHWriSXWsFov3PMnV62UYgjgX9QY",
  authDomain: "countdown-page-80bca.firebaseapp.com",
  projectId: "countdown-page-80bca",
  storageBucket: "countdown-page-80bca.firebasestorage.app",
  messagingSenderId: "314955692260",
  appId: "1:314955692260:web:39f2896943461a0f22d4f1",
  measurementId: "G-GK8YEDD1QK"
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = firebaseConfig;
} else {
  // Make available globally for browser
  window.firebaseConfig = firebaseConfig;
} 