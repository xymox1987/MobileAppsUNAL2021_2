import { Component, Renderer2 } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from "rxjs";
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AboutPage } from "../about/about.page";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data: [string[], string[], string[]];
  mode: string;
  human: boolean;
  gameOver: boolean;
  scores: { X: number, O: number, T: number };
  scoreX: number;
  scoreO: number;
  scoreT: number;
  theme: string;
  isBrowser: boolean;
  subscription: Subscription;
  level: string;
  public subscriptionBack: any;
  
  constructor(
      private platform: Platform,
      public alertController: AlertController,
      private renderer: Renderer2,
      private storage: Storage,
      private menu: MenuController,
      private modalController: ModalController,
      
  ) {
    this.data = [['', '', ''],
                 ['', '', ''],
                 ['', '', '']];
    this.mode = '1P';
    this.human = true;
    this.gameOver = false;
    this.scores = {X: -1, O: 1, T: 0};
    this.scoreX = 0;
    this.scoreO = 0;
    this.scoreT = 0;
    this.theme = 'dark';
    this.setTheme(true);
    this.isBrowser = this.platform.is('desktop') || this.platform.is('mobileweb');
    this.subscription = this.platform.backButton.subscribeWithPriority(10000,async () => {
      await this.alertExit() });
  }

  menuOpened() {
    this.subscription.unsubscribe();
    this.subscription = this.platform.backButton.subscribe(async () => {
      await this.menu.close();
    });
  }

  menuClosed() {
    this.subscription.unsubscribe();
    this.subscription = this.platform.backButton.subscribe(async () => {
      await this.alertExit();
    });
  }

  goTo(page: string) {
    if (page === "about") {
      this.subscription.unsubscribe();
      // noinspection JSIgnoredPromiseFromCall
      this.aboutPageModal();
    }
  }

  move(id: string) {
    if (document.getElementById('start-game').innerHTML === 'Start') {
      document.getElementById('start-game').innerHTML = 'Restart Game';
    }
    if (this.gameOver) {
      return;
    }
    if (this.human) {
      if (document.getElementById(id).innerHTML === '') {
        document.getElementById(id).innerHTML = 'X';
        if (this.mode === '2P') {
          document.getElementById('next-label').innerHTML = 'O';
        }
        this.data[Number(id.substr(0, 1))][Number(id.substr(1, 2))] = 'X';
        this.human = false;
        this.winner('check');
        if (this.gameOver) {
          return;
        }
      }
    }
    else if (!this.human) {
        if (this.mode === '2P') {
            if (document.getElementById(id).innerHTML === '') {
                document.getElementById(id).innerHTML = 'O';
              document.getElementById('next-label').innerHTML = 'X';
                this.data[Number(id.substr(0, 1))][Number(id.substr(1, 2))] = 'O';
                this.human = true;
            }
        }
    }
    if (this.mode==='1P') {
        if (!this.human) {
            this.aiTurn();
            this.human = true;
        }
    }
      this.winner('check')
      if (this.gameOver) {
        return;
      }
  }

  startGame() {
    if (document.getElementById('start-game').innerHTML === 'Start') {
      document.getElementById('start-game').innerHTML = 'Restart Game';
      this.aiTurn();
    }
    else if (document.getElementById('start-game').innerHTML === 'Restart Game') {
      this.restartGame();
    }
  }

  aiTurn() {
    let bestScore = -Infinity;
    let bestMove;
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (this.data[x][y] === '') {
          this.data[x][y] = 'O';
          let score = this.minimax(false);
          this.data[x][y] = '';
          if (score > bestScore) {
            bestScore = score;
            bestMove = {x, y};
          }
        }
      }
    }
    this.data[bestMove.x][bestMove.y] = 'O';
    document.getElementById(String(bestMove.x) + String(bestMove.y)).innerHTML = 'O';
  }

  minimax(isMaximizing: boolean, alpha: number = -Infinity, beta: number = Infinity): number {
    let result = this.winner('minimax')
    if (result !== null) {
      return this.scores[result];
    }
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          if (this.data[x][y] === '') {
            this.data[x][y] = 'O';
            let score = this.minimax(false, alpha, beta);
            this.data[x][y] = '';
            bestScore = Math.max(score, bestScore);
            alpha = Math.max(alpha, score);
            if (beta <= alpha) {
              break;
            }
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          if (this.data[x][y] === '') {
            this.data[x][y] = 'X';
            let score = this.minimax(true, alpha, beta);
            this.data[x][y] = '';
            bestScore = Math.min(score, bestScore);
            beta = Math.min(beta,score);
            if (beta <= alpha) {
              break;
            }
          }
        }
      }
      return bestScore;
    }
  }


  winner(mode: string) {
    let player;
    let availableSpots = 0;
    if (mode === 'minimax') {
      player = 'X';
      if (this.data[0][0] === this.data[0][1] && this.data[0][1] === this.data[0][2] && this.data[0][2] === player ||
          this.data[1][0] === this.data[1][1] && this.data[1][1] === this.data[1][2] && this.data[1][2] === player ||
          this.data[2][0] === this.data[2][1] && this.data[2][1] === this.data[2][2] && this.data[2][2] === player ||
          this.data[0][0] === this.data[1][0] && this.data[1][0] === this.data[2][0] && this.data[2][0] === player ||
          this.data[0][1] === this.data[1][1] && this.data[1][1] === this.data[2][1] && this.data[2][1] === player ||
          this.data[0][2] === this.data[1][2] && this.data[1][2] === this.data[2][2] && this.data[2][2] === player ||
          this.data[0][0] === this.data[1][1] && this.data[1][1] === this.data[2][2] && this.data[2][2] === player ||
          this.data[2][0] === this.data[1][1] && this.data[1][1] === this.data[0][2] && this.data[0][2] === player) {
        return 'X';
      }
      player = 'O';
      if (this.data[0][0] === this.data[0][1] && this.data[0][1] === this.data[0][2] && this.data[0][2] === player ||
          this.data[1][0] === this.data[1][1] && this.data[1][1] === this.data[1][2] && this.data[1][2] === player ||
          this.data[2][0] === this.data[2][1] && this.data[2][1] === this.data[2][2] && this.data[2][2] === player ||
          this.data[0][0] === this.data[1][0] && this.data[1][0] === this.data[2][0] && this.data[2][0] === player ||
          this.data[0][1] === this.data[1][1] && this.data[1][1] === this.data[2][1] && this.data[2][1] === player ||
          this.data[0][2] === this.data[1][2] && this.data[1][2] === this.data[2][2] && this.data[2][2] === player ||
          this.data[0][0] === this.data[1][1] && this.data[1][1] === this.data[2][2] && this.data[2][2] === player ||
          this.data[2][0] === this.data[1][1] && this.data[1][1] === this.data[0][2] && this.data[0][2] === player) {
        return 'O';
      }
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          if (this.data[x][y] === '') {
            availableSpots++;
          }
        }
      }
      if (availableSpots === 0) {
        return 'T';
      }
      return null;
    } else if (mode === 'check') {
      player = 'X';
      if (this.data[0][0] === this.data[0][1] && this.data[0][1] === this.data[0][2] && this.data[0][2] === player ||
          this.data[1][0] === this.data[1][1] && this.data[1][1] === this.data[1][2] && this.data[1][2] === player ||
          this.data[2][0] === this.data[2][1] && this.data[2][1] === this.data[2][2] && this.data[2][2] === player ||
          this.data[0][0] === this.data[1][0] && this.data[1][0] === this.data[2][0] && this.data[2][0] === player ||
          this.data[0][1] === this.data[1][1] && this.data[1][1] === this.data[2][1] && this.data[2][1] === player ||
          this.data[0][2] === this.data[1][2] && this.data[1][2] === this.data[2][2] && this.data[2][2] === player ||
          this.data[0][0] === this.data[1][1] && this.data[1][1] === this.data[2][2] && this.data[2][2] === player ||
          this.data[2][0] === this.data[1][1] && this.data[1][1] === this.data[0][2] && this.data[0][2] === player) {
        // noinspection JSIgnoredPromiseFromCall
        this.alertX();
        this.scoreX+=1;
        document.getElementById('score-x-label').innerHTML = String(this.scoreX);
        document.getElementById('next-label').innerHTML = '-';
        this.gameOver = true;
        return;
      }
      player = 'O';
      if (this.data[0][0] === this.data[0][1] && this.data[0][1] === this.data[0][2] && this.data[0][2] === player ||
          this.data[1][0] === this.data[1][1] && this.data[1][1] === this.data[1][2] && this.data[1][2] === player ||
          this.data[2][0] === this.data[2][1] && this.data[2][1] === this.data[2][2] && this.data[2][2] === player ||
          this.data[0][0] === this.data[1][0] && this.data[1][0] === this.data[2][0] && this.data[2][0] === player ||
          this.data[0][1] === this.data[1][1] && this.data[1][1] === this.data[2][1] && this.data[2][1] === player ||
          this.data[0][2] === this.data[1][2] && this.data[1][2] === this.data[2][2] && this.data[2][2] === player ||
          this.data[0][0] === this.data[1][1] && this.data[1][1] === this.data[2][2] && this.data[2][2] === player ||
          this.data[2][0] === this.data[1][1] && this.data[1][1] === this.data[0][2] && this.data[0][2] === player) {
        // noinspection JSIgnoredPromiseFromCall
        this.alertO();
        this.scoreO+=1;
        document.getElementById('score-o-label').innerHTML = String(this.scoreO);
        document.getElementById('next-label').innerHTML = '-';
        this.gameOver = true;
        return;
      }
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          if (this.data[x][y] === '') {
            availableSpots++;
          }
        }
      }
      if (availableSpots === 0) {
        // noinspection JSIgnoredPromiseFromCall
        this.alertT();
        this.scoreT+=1;
        document.getElementById('score-t-label').innerHTML = String(this.scoreT);
        document.getElementById('next-label').innerHTML = '-';
        this.gameOver = true;
        return;
      }
    }
  }

  restartGame(event: any = null) {
    this.data = [['', '', ''],
                 ['', '', ''],
                 ['', '', '']];
    this.human = true;
    this.gameOver = false;
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        document.getElementById(String(x) + String(y)).innerHTML = '';
      }
    }
    if (this.mode==='1P') {
        document.getElementById('start-game').innerHTML = 'Start';
        document.getElementById('next-label').innerHTML = '-';
    }
    else {
        document.getElementById('start-game').innerHTML = 'Restart Game';
        document.getElementById('next-label').innerHTML = 'X';
    }
    if (event!==null) {
      this.resetScores();
      setTimeout(() => {
          event.target.complete();
      }, 250);
    }
  }
  
  resetScores() {
    this.scoreX = 0;
    this.scoreO = 0;
    this.scoreT = 0;
    document.getElementById('score-x-label').innerHTML = String(this.scoreX);
    document.getElementById('score-o-label').innerHTML = String(this.scoreO);
    document.getElementById('score-t-label').innerHTML = String(this.scoreT);
  }

  changeMode() {
        if (document.getElementById('mode-label').innerHTML === '1P') {
            this.mode = '2P';
            document.getElementById('mode-label').innerHTML = '2P';
            document.getElementById('next-label').innerHTML = 'X';
        }
        else {
            this.mode = '1P';
            document.getElementById('mode-label').innerHTML = '1P';
            document.getElementById('next-label').innerHTML = '-';
        }
        this.restartGame();
        this.resetScores();
    }

    changeLevel() {
      if (document.getElementById('level-label').innerHTML === 'F') {
          this.level = 'F';
          document.getElementById('level-label').innerHTML = 'D';
          
      }
      else {
          this.mode = 'D';
          document.getElementById('level-label').innerHTML = 'F';
      }
      document.getElementById('next-label').innerHTML = '-';
      this.restartGame();
      this.resetScores();
  }



  


  async alertT() {
    const alert = await this.alertController.create({
      cssClass: 'alert-game-over',
      header: 'Game Over',
      message: 'Empate',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async alertO() {
    let message: string;
    if (this.mode==='1P') {
      message = 'Perdiste';
    }
    else {
      message = 'O Won';
    }
    const alert = await this.alertController.create({
      cssClass : 'alert-game-over',
      header : 'Game Over',
      message: message,
      buttons : ['OK']
  });
    await alert.present();
  }

  async alertX() {
    let message: string;
    if (this.mode==='1P') {
      message = 'Ganaste!!';
    }
    else {
      message = 'X Won';
    }
    const alert = await this.alertController.create({
    cssClass : 'alert-game-over',
    header : 'Game Over',
    message: message,
    buttons : ['OK']
    });
    await alert.present();
  }

  setTheme(init:boolean, set: string = null) {
    if (init) {
      this.storage.get('theme').then((result) => {
        if (result!=null) {
          this.theme = result;
          this.setTheme(false, result);
        }
        else {
          this.setTheme( false, 'dark');
        }
      });
    }
    else if (set==='dark'){
      this.renderer.setAttribute(document.body,'color-theme','dark');
      this.theme = 'dark';
      // noinspection JSIgnoredPromiseFromCall
      this.storage.set('theme', 'dark');
    }
    else if (set==='light'){
      this.renderer.setAttribute(document.body,'color-theme','light');
      this.theme = 'light';
      // noinspection JSIgnoredPromiseFromCall
      this.storage.set('theme', 'light');
    }
    else if (this.theme==='light'){
      this.renderer.setAttribute(document.body,'color-theme','dark');
      this.theme = 'dark';
      // noinspection JSIgnoredPromiseFromCall
      this.storage.set('theme', 'dark');
    }
    else if (this.theme==='dark') {
      this.renderer.setAttribute(document.body,'color-theme','light');
      this.theme = 'light';
      // noinspection JSIgnoredPromiseFromCall
      this.storage.set('theme', 'light');
    }
  }

  async aboutPageModal() {
    const modal = await this.modalController.create({
      component: AboutPage,
      cssClass: 'about-page'
    });
    modal.onDidDismiss().then(() => {
      this.subscription.unsubscribe();
      this.subscription = this.platform.backButton.subscribe(async () => {
        await this.menu.close();
      });
    });
    return await modal.present();
  }

  async alertExit() {
      const alert = await this.alertController.create({
        cssClass: 'alert-exit',
        header: 'Salir del Juego',
        message: 'Esta seguro que quiere salir del juego ?',
        buttons: [
          {
            text: 'YES',
            handler: () => {
              navigator['app'].exitApp();
            }
          }, {
            text: 'NO',
            role: 'Cancelar'
          }
        ]
      });
      await alert.present();
  }
}
