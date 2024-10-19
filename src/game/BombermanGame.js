
import { GameScene } from './scenes/GameScene.js';
import { Game } from '../engine/Game.js';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from './constants/game.js';

export class BombermanGame extends Game {
	scene = new GameScene(this.frameTime,this.camera);
	constructor() {
		super('body', SCREEN_WIDTH, SCREEN_HEIGHT);
	}
}