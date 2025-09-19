// Band Hero - Sound System
class SoundSystem {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.backgroundMusic = null;
        this.isMuted = false;
        
        this.initAudioContext();
        this.createSounds();
    }
    
    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }
    
    // プロシージャル音声生成
    createSounds() {
        if (!this.audioContext) return;
        
        // 楽器音を生成
        this.sounds = {
            guitar: this.createInstrumentSound(220, 'sawtooth', 0.3),
            bass: this.createInstrumentSound(110, 'square', 0.4),
            drum: this.createDrumSound(),
            vocal: this.createInstrumentSound(440, 'sine', 0.2),
            perfect: this.createHitSound(800, 0.1),
            good: this.createHitSound(600, 0.1),
            ok: this.createHitSound(400, 0.1),
            miss: this.createMissSound()
        };
    }
    
    createInstrumentSound(frequency, waveType, duration) {
        return () => {
            if (!this.audioContext || this.isMuted) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = waveType;
            
            // エンベロープ
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        };
    }
    
    createDrumSound() {
        return () => {
            if (!this.audioContext || this.isMuted) return;
            
            // キックドラム風の音
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(60, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(30, this.audioContext.currentTime + 0.1);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.5, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.2);
        };
    }
    
    createHitSound(frequency, duration) {
        return () => {
            if (!this.audioContext || this.isMuted) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(frequency * 2, this.audioContext.currentTime + duration);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        };
    }
    
    createMissSound() {
        return () => {
            if (!this.audioContext || this.isMuted) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(100, this.audioContext.currentTime + 0.3);
            oscillator.type = 'sawtooth';
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.3);
        };
    }
    
    playSound(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName]();
        }
    }
    
    playInstrument(instrument) {
        this.playSound(instrument);
    }
    
    playHit(rating) {
        const soundMap = {
            'PERFECT': 'perfect',
            'GOOD': 'good',
            'OK': 'ok'
        };
        
        if (soundMap[rating]) {
            this.playSound(soundMap[rating]);
        }
    }
    
    playMiss() {
        this.playSound('miss');
    }
    
    toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }
    
    // 背景音楽（シンプルなループ）
    startBackgroundMusic() {
        if (!this.audioContext || this.isMuted) return;
        
        this.stopBackgroundMusic();
        
        // シンプルなコード進行
        const chords = [
            [220, 277, 330], // Am
            [246, 311, 370], // Dm
            [196, 247, 294], // G
            [220, 277, 330]  // Am
        ];
        
        let chordIndex = 0;
        
        const playChord = () => {
            if (this.isMuted) return;
            
            const chord = chords[chordIndex];
            chord.forEach(frequency => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.02, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 1.5);
                
                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + 1.5);
            });
            
            chordIndex = (chordIndex + 1) % chords.length;
        };
        
        playChord();
        this.backgroundMusic = setInterval(playChord, 1500);
    }
    
    stopBackgroundMusic() {
        if (this.backgroundMusic) {
            clearInterval(this.backgroundMusic);
            this.backgroundMusic = null;
        }
    }
}