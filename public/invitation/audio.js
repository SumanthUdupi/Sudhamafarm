/* ════════════════════════════════════════════════════════════
   Multi-sensory Feedback: Real Audio Files + Haptics + Ambience
   ════════════════════════════════════════════════════════════ */

let prefersReducedMotion = false;
let soundEnabled = true;
let flipAudio = null;
let openAudio = null;
let ambienceAudio = null;
let ambienceStarted = false;

export function initAudio(reducedMotion) {
  prefersReducedMotion = reducedMotion;
  soundEnabled = localStorage.getItem('invitation-sound') !== 'off';
  if (prefersReducedMotion) soundEnabled = false;

  // Preload audio files
  if (!prefersReducedMotion) {
    loadAudioFile('audio/page-flip.mp3', (audio) => {
      flipAudio = audio;
      flipAudio.volume = 0.6;
    });
    loadAudioFile('audio/page-open.mp3', (audio) => { openAudio = audio; });
    loadAudioFile('audio/ambient.mp3', (audio) => {
      ambienceAudio = audio;
      ambienceAudio.loop = true;
      ambienceAudio.volume = 0.35;
      // START AMBIENT IMMEDIATELY WHEN LOADED
      startAmbience();
      ambienceStarted = true;
    });
  }
}

function loadAudioFile(src, callback) {
  const audio = new Audio();
  audio.preload = 'auto';
  audio.crossOrigin = 'anonymous';
  let callbackFired = false;
  audio.oncanplaythrough = () => {
    if (!callbackFired) {
      callbackFired = true;
      callback(audio);
    }
  };
  audio.onloadeddata = () => {
    if (!callbackFired) {
      callbackFired = true;
      callback(audio);
    }
  };
  audio.onerror = (e) => console.debug(`Failed to load audio: ${src}`, e);
  audio.src = src;
}

function createAudioContext() {
  if (audioCtx) return audioCtx;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function haptic(pattern) {
  if (prefersReducedMotion || !soundEnabled) return;
  if (navigator.vibrate) navigator.vibrate(pattern);
}

// Play page flip sound
export function playFlip(direction) {
  if (prefersReducedMotion || !soundEnabled) return;
  haptic(40);

  try {
    if (flipAudio) {
      flipAudio.currentTime = 0;
      flipAudio.play().catch((e) => console.debug('Flip audio play failed:', e.message));
    }
  } catch (e) {
    console.debug('Audio playback failed:', e.message);
  }
}

// Play book opening sound and start ambience
export function playOpen() {
  if (prefersReducedMotion || !soundEnabled) return;
  haptic([30, 20, 50]);

  try {
    if (openAudio) {
      openAudio.currentTime = 0;
      openAudio.play().catch((e) => console.debug('Open audio play failed:', e.message));
    }
    startAmbience();
  } catch (e) {
    console.debug('Audio playback failed:', e.message);
  }
}

function startAmbience() {
  if (prefersReducedMotion || !soundEnabled || !ambienceAudio) return;
  if (ambienceAudio.paused) {
    ambienceAudio.play().catch((e) => console.debug('Ambience play failed:', e.message));
  }
}

function stopAmbience() {
  if (ambienceAudio && !ambienceAudio.paused) {
    ambienceAudio.pause();
  }
}

export function toggleAmbience() {
  soundEnabled = !soundEnabled;
  localStorage.setItem('invitation-sound', soundEnabled ? 'on' : 'off');

  if (soundEnabled) {
    startAmbience();
  } else {
    stopAmbience();
  }

  return soundEnabled;
}

export function isSoundEnabled() {
  return soundEnabled;
}
