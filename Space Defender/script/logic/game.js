import { Config } from '../config.js';
import Player from '../models/player.js';
import Projectile from '../models/projectile.js';
import Enemy from '../models/enemy.js';
import Sound from '../models/sound.js';

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.player = new Player(Config.canvasWidth / 2, Config.canvasHeight - 100);
        this.proiettili = [];
        this.nemici = [];
        this.nemiciSpawnTimer = 0;
        this.punteggio = 0;
        this.gameOver = false;
        this.backgroundMusic = new Sound(Config.SOUND_GAME);
    }

    start() {
        this.backgroundMusic.play();
        this.canvas.addEventListener('mousemove', this.movimentoMouse.bind(this));
        this.canvas.addEventListener('click', this.clickMouse.bind(this));
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    movimentoMouse(event) {
        const rettangoloCanvas = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rettangoloCanvas.left;
        this.player.x = mouseX - this.player.width / 2;
    }

    clickMouse() {
        this.proiettili.push(new Projectile(this.player.x + this.player.width / 2 - 8, this.player.y - 16));
    }

    spawnNemici() {
        const colonneWidth = Config.canvasWidth / 5; // Divide la larghezza del canvas in 5 colonne
        const righeHeight = 100; // Altezza delle righe in cui i nemici possono apparire
        const randomColonne = Math.floor(Math.random() * 5); // Genera un numero casuale tra 0 e 4 per selezionare una colonna
        const x = randomColonne * colonneWidth + Math.random() * colonneWidth; // Coordinata x casuale all'interno della colonna selezionata
        const y = -64 - Math.random() * righeHeight; // Coordinata y sopra il canvas
    
        this.nemici.push(new Enemy(x, y));
    }
    
    update() {
        if (this.gameOver) {
            return; // Se il gioco è finito, non eseguire alcun aggiornamento
        }

        this.proiettili.forEach(projectile => {
            projectile.move();
        });
        this.proiettili = this.proiettili.filter(projectile => projectile.y > 0);

        this.nemici.forEach(enemy => {
            enemy.move();
        });
        this.nemici = this.nemici.filter(enemy => enemy.y < Config.canvasHeight);

        this.nemiciSpawnTimer += 1;
        if (this.nemiciSpawnTimer === Config.enemySpawnInterval) {
            const enemyCount = Math.floor(Math.random() * (Config.nemiciMaxCount - Config.nemiciMinCount + 1)) + Config.nemiciMinCount;
            for (let i = 0; i < enemyCount; i++) {
                this.spawnNemici();
            }
            this.nemiciSpawnTimer = 0;
        }

        // Conteggio dei nemici colpiti
        this.proiettili.forEach(projectile => {
            this.nemici.forEach(enemy => {
                if (this.collisioni(projectile, enemy)) {
                    this.punteggio += 10;
                    this.proiettili = this.proiettili.filter(p => p !== projectile);
                    this.nemici = this.nemici.filter(e => e !== enemy);
                }
            });
        });

        // Gestione della sconfitta
        this.nemici.forEach(enemy => {
            if (this.collisioni(enemy, this.player)) {
                this.gameOver = true;
                this.gestisciGameOver();
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, Config.canvasWidth, Config.canvasHeight);
        this.player.draw(this.ctx);
        this.proiettili.forEach(projectile => {
            projectile.draw(this.ctx);
        });
        this.nemici.forEach(enemy => {
            enemy.draw(this.ctx);
        });
    
        const scoreDisplay = document.getElementById('scoreDisplay');
        scoreDisplay.textContent = 'Punteggio: ' + this.punteggio;
    }

    collisioni(obj1, obj2) {
        return obj1.x < obj2.x + obj2.width &&
               obj1.x + obj1.width > obj2.x &&
               obj1.y < obj2.y + obj2.height &&
               obj1.y + obj1.height > obj2.y;
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    
    gestisciGameOver() {
        this.gameOver = true;

        clearInterval(this.enemySpawnIntervalId); // Interrompe la generazione di nemici
        this.backgroundMusic.stop(); // Ferma la musica di sfondo
    
        const gameOverScritta = document.getElementById('gameOverScreen');
        gameOverScritta.style.display = 'block' // Mostra il messaggio di "Game Over"
    
        const restartButton = document.getElementById('restartButton');
        restartButton.onclick = () => {
            location.reload(); // Ricarica la pagina per riprendere il gioco
        };
    }    
}

export default Game;
