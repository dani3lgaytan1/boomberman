import {Entity} from '../../engine/Entity.js';
import {tileMap} from '../constants/levelData.js';
import {drawTile} from '../../engine/context.js';



const TILE_SIZE = 16;
export class LevelMap extends Entity {


    constructor() {
        super({ x: 0, y: 0 });
        this.tileMap = [...tileMap];
       
		this.image = document.querySelector('img#stage')
   
       // this.image.src = '../../../assets/Battle_Stage.png'
        this.stageImage = new OffscreenCanvas(1024, 1024);
        this.buildStageImage();
    }

    updateTile(columnIndex, rowIndex, tileIndex) {
      
        const context = this.stageImage.getContext('2d');
    
        drawTile(context, this.image, tileIndex, columnIndex * TILE_SIZE,rowIndex*TILE_SIZE, TILE_SIZE);
        
        
    }

    buildStageImage() {
        //console.log('building stage image');
        //console.log('tileMap', this.tileMap.length);
        for (let rowIndex= 0; rowIndex < this.tileMap.length; rowIndex++){
            for (let columnIndex = 0; columnIndex < this.tileMap[rowIndex].length; columnIndex++){
                //console.log('building tile', columnIndex, rowIndex);
                const tileIndex = this.tileMap[rowIndex][columnIndex];
                this.updateTile(columnIndex, rowIndex, tileIndex);
            }
        }




    }

    update = () => undefined; 

    draw(context) {

    
        // Dibujar el escenario centrado en el canvas
        context.drawImage(this.stageImage,0, 0);
    }
    
}
