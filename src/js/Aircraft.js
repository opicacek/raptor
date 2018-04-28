const PIXI = require('pixi.js');
import { DropShadowFilter } from 'pixi-filters';

const aircrafts = {
  type1: {
    health: 100,
    texture: 'src/images/aircrafts/enemy_ship_1.png',
    //TODO
    height: 100,
    width: 100,
    movementPattern: [], //TODO
    shootingPattern: [], //TODO
    cannons: [],
  },
  type2: {
    texture: [
      'src/images/aircrafts/enemy_ship_2_a.png',
      'src/images/aircrafts/enemy_ship_2_b.png',
      'src/images/aircrafts/enemy_ship_2_c.png',
      'src/images/aircrafts/enemy_ship_2_d.png',
    ],
    cannons: [],
  },
  type3: {
    texture: 'src/images/aircrafts/enemy_ship_3.png',
    //TODO
    cannons: [
      {
        x: -10,
        y: 15,
        type: 'bullet',
        tick: 10,
        guided: false,
      },
      {
        x: 10,
        y: 15,
        type: 'bullet',
        tick: 10,
        guided: false,
      }
    ]
  },
};

class Aircraft {
  constructor(type, x, y) {
    this.destroyed = false;

    this.type = type;
    this.x = x;
    this.y = y;

    if (aircrafts[type].texture instanceof Array) {
      this.sprite = new PIXI.extras.AnimatedSprite(
        aircrafts[type].texture.map(texture => PIXI.loader.resources[texture].texture)
      );

      this.sprite.animationSpeed = 0.15;
      this.sprite.play();
    } else {
      this.sprite = new PIXI.Sprite(PIXI.loader.resources[aircrafts[type].texture].texture);
    }

    this.sprite.x = this.x;
    this.sprite.y = this.y;

    const shadowFilter = new DropShadowFilter();
    shadowFilter.color = 0x000000;
    shadowFilter.alpha = 0.5;
    shadowFilter.blur = 0.5;
    shadowFilter.distance = 20;

    this.sprite.filters = [shadowFilter];


    //TODO
    this.health = 100;
    this.velocityX = 0;
    this.velocityY = Math.random(); //TODO
  }

  move() {
    //TODO apply move pattern based on tick

    this.x += this.velocityX;
    this.y += this.velocityY;

    /*if (this.y < -30) {
      this.y = 200;
    }*/

    this.sprite.y = this.y;
  }

  update(tick) {
    //TODO
    /* update based on tick*/
    this.move();
  }

  destroy() {
    this.destroyed = true;
    this.sprite.destroy();
  }
}

export default Aircraft;
