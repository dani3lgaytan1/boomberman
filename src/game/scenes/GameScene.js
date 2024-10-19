import { Scene } from '../../engine/Scene.js';
import { Bomberman } from '../entities/bomberman.js';

import { LevelMap } from '../entities/levelMap.js';



export class GameScene extends Scene {


	constructor(time,camera) {
		super();

		this.stage = new LevelMap();
		this.bomberman = new Bomberman({x:2,y:1},time);
	}

	update(time) {
		this.bomberman.update(time);
		//console.log('update')

	}

	draw(context,camera) {
		
		this.stage.draw(context);
	   this.bomberman.draw(context,camera);
	
		//console.log('draw')


	}
}