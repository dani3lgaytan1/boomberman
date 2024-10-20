import { Entity } from "../../engine/Entity.js";
import { animations, BombermanStateType, frames } from "../constants/bomberman.js";
import { Direction } from "../constants/entities.js";
import { drawFrameOrigin } from "../../engine/context.js";
import { TILE_SIZE, HALF_TILE_SIZE, FRAME_TIME } from "../constants/game.js";
import {isRight,isLeft,isDown,isUp } from "../../engine/inputHandler.js";
import { isZero } from "../../engine/utils/utils.js";

const WALK_SPEED = 40;

export class Bomberman extends Entity {
    id = 0;
    direction = Direction.DOWN;
    baseSpeedTime = 1.2;
    speed = 1;
    animation = animations.moveAnimations[this.direction];

    constructor(position, time) {
        super({ x: (position.x * TILE_SIZE) + HALF_TILE_SIZE, y: (position.y * TILE_SIZE) + HALF_TILE_SIZE });
        this.image = document.querySelector('img#Bomberman');
        this.states = {
            [BombermanStateType.IDLE]: {
                type: BombermanStateType.IDLE,
                init: this.handleTileInit,
                update: this.handleTileState,
            },
            [BombermanStateType.MOVING]: {
                type: BombermanStateType.MOVING,
                init: this.handleMovingInit,
                update: this.handleMovingState,
            },
        };
        this.changeState(BombermanStateType.IDLE, time);
    }

    changeState(newState, time) {
        this.currentState = this.states[newState];
        this.animationFrame = 0;
        this.animationTimer = time.previous + this.animation[this.animationFrame] * FRAME_TIME;
        this.currentState.init(time);
    }

    handleTileInit = () => {
        this.velocity = { x: 0, y: 0 };
    }

    handleGeneralStage = () => {
     
        const [direction, velocity] = this.getMovement();
        this.animation = animations.moveAnimations[direction];
        this.direction = direction;
        return velocity;
    }

    getMovement() {
        if (isLeft(this.id)) {
            return [Direction.LEFT, { x: -WALK_SPEED, y: 0 }];
        } else if (isRight(this.id)) {
            return [Direction.RIGHT, { x: WALK_SPEED, y: 0 }];
        } else if (isUp(this.id)) {
            return [Direction.UP, { x: 0, y: -WALK_SPEED }];
        } else if (isDown(this.id)) {
            return [Direction.DOWN, { x: 0, y: WALK_SPEED }];
        }
        return [this.direction, { x: 0, y: 0 }];
    }

    handleTileState = (time) => {
        const velocity = this.handleGeneralStage();
        if (isZero(velocity)) return;
        this.changeState(BombermanStateType.MOVING, time);
    }

    handleMovingInit = () => {
        this.animationFrame = 1;
    }

    handleMovingState = (time) => {
        this.velocity = this.handleGeneralStage();
        if (!isZero(this.velocity)) {
            return;
        }
        this.changeState(BombermanStateType.IDLE, time);
    }

    updatePosition(time) {
        this.position.x += (this.velocity.x * this.baseSpeedTime * this.speed) * time.secondsPassed;
        this.position.y += (this.velocity.y * this.baseSpeedTime * this.speed) * time.secondsPassed;
    }

    update(time) {
       
        this.updatePosition(time);
        this.currentState.update(time);
        this.updateAnimation(time);
    }

    updateAnimation(time) {
        if (time.previous < this.animationTimer || isZero(this.velocity)) {
            return;
        }
        this.animationFrame += 1;
        if (this.animationFrame >= this.animation.length) {
            this.animationFrame = 0;
        }
        this.animationTimer = time.previous + (this.animation[this.animationFrame][1] * FRAME_TIME);
    }

    draw(context, camera) {
        const [framekey] = this.animation[this.animationFrame];
        const frame = frames.get(framekey);
        drawFrameOrigin(
            context, this.image, frame,
            Math.floor(this.position.x - camera.position.x),
            Math.floor(this.position.y - camera.position.y),
            [this.direction === Direction.RIGHT ? -1 : 1, 1],
        );
    }
}