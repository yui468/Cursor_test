// Band Hero Game - JavaScript Implementation
class BandHeroGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.soundSystem = new SoundSystem();
        this.isPlaying = false;
        this.score = 0;
        this.combo = 0;
        this.money = 0;
        this.hp = 100;
        this.gameSpeed = 2;
        
        // ゲーム要素
        this.notes = [];
        this.particles = [];
        this.lastNoteTime = 0;
        this.noteSpawnInterval = 1000; // ミリ秒
        
        // キー設定
        this.keyMap = {
            'a': { lane: 0, instrument: 'ギター', color: '#ff4757' },
            's': { lane: 1, instrument: 'ベース', color: '#2ed573' },
            'd': { lane: 2, instrument: 'ドラム', color: '#ffa502' },
            'f': { lane: 3, instrument: 'ボーカル', color: '#3742fa' }
        };
        
        // レーン設定
        this.laneWidth = 150;
        this.laneHeight = this.canvas.height;
        this.hitZone = this.canvas.height - 100;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.gameLoop();
    }
    
    setupEventListeners() {
        // スタートボタン
        document.getElementById('startButton').addEventListener('click', () => {
            this.startGame();
        });
        
        // ミュートボタン
        document.getElementById('muteButton').addEventListener('click', () => {
            const isMuted = this.soundSystem.toggleMute();
            document.getElementById('muteButton').textContent = isMuted ? '🔇' : '🔊';
        });
        
        // キーボード入力
        document.addEventListener('keydown', (e) => {
            if (this.isPlaying) {
                this.handleKeyPress(e.key.toLowerCase());
            }
        });
        
        // キーボード離し（視覚効果用）
        document.addEventListener('keyup', (e) => {
            if (this.isPlaying) {
                this.handleKeyRelease(e.key.toLowerCase());
            }
        });
    }
    
    startGame() {
        document.getElementById('startScreen').style.display = 'none';
        this.isPlaying = true;
        this.score = 0;
        this.combo = 0;
        this.money = 0;
        this.hp = 100;
        this.notes = [];
        this.particles = [];
        this.lastNoteTime = Date.now();
        this.soundSystem.startBackgroundMusic();
        this.updateUI();
    }
    
    handleKeyPress(key) {
        if (this.keyMap[key]) {
            const lane = this.keyMap[key].lane;
            const instrument = this.keyMap[key].instrument;
            
            // ヒット判定
            let hit = false;
            for (let i = this.notes.length - 1; i >= 0; i--) {
                const note = this.notes[i];
                if (note.lane === lane) {
                    const distance = Math.abs(note.y - this.hitZone);
                    
                    if (distance < 50) { // パーフェクト
                        this.hitNote(note, i, 'PERFECT', 100);
                        hit = true;
                        break;
                    } else if (distance < 80) { // グッド
                        this.hitNote(note, i, 'GOOD', 50);
                        hit = true;
                        break;
                    } else if (distance < 120) { // オーケー
                        this.hitNote(note, i, 'OK', 25);
                        hit = true;
                        break;
                    }
                }
            }
            
            if (!hit) {
                this.missNote();
            }
            
            // キー押下エフェクト
            this.createKeyPressEffect(lane);
            
            // 楽器音を再生
            const instrumentName = Object.keys(this.keyMap)[lane];
            this.soundSystem.playInstrument(instrumentName);
        }
    }
    
    handleKeyRelease(key) {
        // キーリリース時の処理（必要に応じて）
    }
    
    hitNote(note, index, rating, points) {
        this.notes.splice(index, 1);
        this.score += points * (this.combo + 1);
        this.combo++;
        this.money += Math.floor(points / 10) * (this.combo + 1);
        
        // ヒットエフェクト
        this.createHitEffect(note.x + this.laneWidth / 2, this.hitZone, rating, this.keyMap[Object.keys(this.keyMap)[note.lane]].color);
        
        // ヒット音を再生
        this.soundSystem.playHit(rating);
        
        this.updateUI();
    }
    
    missNote() {
        this.combo = 0;
        this.hp -= 10;
        
        // ミス音を再生
        this.soundSystem.playMiss();
        
        if (this.hp <= 0) {
            this.gameOver();
        }
        
        this.updateUI();
    }
    
    createNote() {
        const lane = Math.floor(Math.random() * 4);
        const x = lane * this.laneWidth + (this.canvas.width - this.laneWidth * 4) / 2;
        
        this.notes.push({
            x: x,
            y: -50,
            lane: lane,
            color: this.keyMap[Object.keys(this.keyMap)[lane]].color,
            instrument: this.keyMap[Object.keys(this.keyMap)[lane]].instrument
        });
    }
    
    createHitEffect(x, y, rating, color) {
        // パーティクルエフェクト
        for (let i = 0; i < 10; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 30,
                maxLife: 30,
                color: color,
                size: Math.random() * 5 + 2
            });
        }
        
        // 評価テキスト
        this.particles.push({
            x: x,
            y: y,
            vx: 0,
            vy: -2,
            life: 60,
            maxLife: 60,
            text: rating,
            color: color,
            size: 20
        });
    }
    
    createKeyPressEffect(lane) {
        const x = lane * this.laneWidth + (this.canvas.width - this.laneWidth * 4) / 2 + this.laneWidth / 2;
        const y = this.hitZone;
        
        // リング エフェクト
        this.particles.push({
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            life: 20,
            maxLife: 20,
            ring: true,
            color: this.keyMap[Object.keys(this.keyMap)[lane]].color,
            size: 0,
            maxSize: 60
        });
    }
    
    updateNotes() {
        // 新しいノートを生成
        const now = Date.now();
        if (now - this.lastNoteTime > this.noteSpawnInterval) {
            this.createNote();
            this.lastNoteTime = now;
            
            // 難易度調整
            if (this.noteSpawnInterval > 300) {
                this.noteSpawnInterval -= 2;
            }
        }
        
        // ノートを更新
        for (let i = this.notes.length - 1; i >= 0; i--) {
            const note = this.notes[i];
            note.y += this.gameSpeed;
            
            // 画面外に出たノートを削除
            if (note.y > this.canvas.height + 50) {
                this.notes.splice(i, 1);
                this.missNote();
            }
        }
    }
    
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.life--;
            
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.ring) {
                particle.size = (1 - particle.life / particle.maxLife) * particle.maxSize;
            }
        }
    }
    
    draw() {
        // 背景をクリア
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // レーンを描画
        this.drawLanes();
        
        // ノートを描画
        this.drawNotes();
        
        // ヒットゾーンを描画
        this.drawHitZone();
        
        // パーティクルを描画
        this.drawParticles();
        
        // 楽器名を描画
        this.drawInstrumentLabels();
    }
    
    drawLanes() {
        const startX = (this.canvas.width - this.laneWidth * 4) / 2;
        
        for (let i = 0; i < 4; i++) {
            const x = startX + i * this.laneWidth;
            
            // レーンの背景
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            this.ctx.fillRect(x, 0, this.laneWidth, this.canvas.height);
            
            // レーンの境界線
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
    }
    
    drawNotes() {
        this.notes.forEach(note => {
            this.ctx.fillStyle = note.color;
            this.ctx.shadowColor = note.color;
            this.ctx.shadowBlur = 10;
            
            // ノートの形状（楽器に応じて）
            this.ctx.fillRect(note.x + 10, note.y, this.laneWidth - 20, 30);
            
            // ノートの楽器名
            this.ctx.fillStyle = 'white';
            this.ctx.font = '12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(note.instrument, note.x + this.laneWidth / 2, note.y + 20);
            
            this.ctx.shadowBlur = 0;
        });
    }
    
    drawHitZone() {
        const startX = (this.canvas.width - this.laneWidth * 4) / 2;
        
        // ヒットゾーンライン
        this.ctx.strokeStyle = '#e94560';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.moveTo(startX, this.hitZone);
        this.ctx.lineTo(startX + this.laneWidth * 4, this.hitZone);
        this.ctx.stroke();
        
        // ヒットゾーンの光る効果
        this.ctx.strokeStyle = 'rgba(233, 69, 96, 0.3)';
        this.ctx.lineWidth = 8;
        this.ctx.stroke();
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            const alpha = particle.life / particle.maxLife;
            
            if (particle.text) {
                // テキスト パーティクル
                this.ctx.fillStyle = particle.color;
                this.ctx.font = `${particle.size}px Arial`;
                this.ctx.textAlign = 'center';
                this.ctx.globalAlpha = alpha;
                this.ctx.fillText(particle.text, particle.x, particle.y);
                this.ctx.globalAlpha = 1;
            } else if (particle.ring) {
                // リング エフェクト
                this.ctx.strokeStyle = particle.color;
                this.ctx.lineWidth = 3;
                this.ctx.globalAlpha = alpha;
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.globalAlpha = 1;
            } else {
                // 通常のパーティクル
                this.ctx.fillStyle = particle.color;
                this.ctx.globalAlpha = alpha;
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.globalAlpha = 1;
            }
        });
    }
    
    drawInstrumentLabels() {
        const startX = (this.canvas.width - this.laneWidth * 4) / 2;
        const keys = Object.keys(this.keyMap);
        
        keys.forEach((key, i) => {
            const x = startX + i * this.laneWidth + this.laneWidth / 2;
            const instrument = this.keyMap[key];
            
            // キー表示
            this.ctx.fillStyle = instrument.color;
            this.ctx.font = 'bold 16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(key.toUpperCase(), x, 30);
            
            // 楽器名表示
            this.ctx.fillStyle = 'white';
            this.ctx.font = '14px Arial';
            this.ctx.fillText(instrument.instrument, x, 50);
        });
    }
    
    updateUI() {
        document.getElementById('score').textContent = this.score.toLocaleString();
        document.getElementById('combo').textContent = this.combo;
        document.getElementById('money').textContent = `¥${this.money.toLocaleString()}`;
        document.getElementById('hp').textContent = this.hp;
        
        // HPバーの色を変更
        const hpElement = document.getElementById('hp');
        if (this.hp > 60) {
            hpElement.style.color = '#2ed573';
        } else if (this.hp > 30) {
            hpElement.style.color = '#ffa502';
        } else {
            hpElement.style.color = '#ff4757';
        }
    }
    
    gameOver() {
        this.isPlaying = false;
        this.soundSystem.stopBackgroundMusic();
        alert(`ゲームオーバー！\n最終スコア: ${this.score.toLocaleString()}\n獲得金額: ¥${this.money.toLocaleString()}`);
        document.getElementById('startScreen').style.display = 'flex';
    }
    
    gameLoop() {
        if (this.isPlaying) {
            this.updateNotes();
            this.updateParticles();
        }
        
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// ゲーム開始
window.addEventListener('load', () => {
    new BandHeroGame();
});