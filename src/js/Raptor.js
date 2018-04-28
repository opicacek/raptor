const PIXI = require('pixi.js');
import { DropShadowFilter } from 'pixi-filters';


class Raptor {
  constructor() {
    this.x = 160;
    this.y = 160;

    //TODO
    this.sprite = new PIXI.Sprite(PIXI.loader.resources['src/images/aircrafts/raptor.png'].texture);

    this.sprite.x = this.x;
    this.sprite.y = this.y;

    //TODO filter doesn't show up
    const shadowFilter = new DropShadowFilter();
    //TODO original shadow
    /*
    shadowFilter.color = 0x000020;
    shadowFilter.alpha = 0.2;
    shadowFilter.blur = 6;
    shadowFilter.distance = 20;
    */
    shadowFilter.color = 0x000000;
    shadowFilter.alpha = 0.5;
    shadowFilter.blur = 0.5;
    shadowFilter.distance = 20;

    this.sprite.filters = [shadowFilter];


    //TODO
    this.health = 100;

    this.accX = -0.1;
    this.accY = -0.1;

    this.velocityX = 0;
    this.velocityY = 0;
  }

  move() {
    if (Math.abs(this.velocityX) < 1) {
      this.velocityX += this.accX;
    }
    if (Math.abs(this.velocityY) < 1) {
      this.velocityY += this.accY;
    }

    this.x += this.velocityX;
    this.y += this.velocityY;

    //TODO
    if (this.velocityX > 1) {
      this.sprite.texture = PIXI.loader.resources['src/images/aircrafts/raptor_right.png'].texture;
    } else if (this.velocityX < -1) {
      this.sprite.texture = PIXI.loader.resources['src/images/aircrafts/raptor_left.png'].texture;
    } else {
      this.sprite.texture = PIXI.loader.resources['src/images/aircrafts/raptor.png'].texture;
    }
    //---


    //TODO dummy demo logic
    /*if (this.y < -30) {
      this.y = 200;
    }*/
    if (this.x < 0) {
      this.x = 0;
      this.velocityX = 0;
      this.accX = 0.1;
    }
    if (this.x > 288) {
      this.x = 288;
      this.velocityX = 0;
      this.accX = -0.1;
    }
    //---


    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }

  update(tick) {
    //TODO
    /* update based on tick*/
    this.move();
  }

  hitBullet(bullet) {
    //TODO
    this.health -= 1;
    console.log('Hit bullet');

    bullet.destroy();
  }

  hitAircraft(aircraft) {
    //TODO
    this.health -= 1;
    console.log('Hit aircraft', aircraft.type);

    //TODO check health of enemy aircraft at first
    //aircraft.destroy();
  }
}

export default Raptor;
