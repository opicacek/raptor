const PIXI = require('pixi.js');


class Bullet {
  constructor(x, y) {
    this.destroyed = false;

    this.x = x;
    this.y = y;

    this.sprite = new PIXI.extras.AnimatedSprite(
      [
        PIXI.loader.resources['src/images/misc/bullet_a.png'].texture,
        PIXI.loader.resources['src/images/misc/bullet_b.png'].texture,
      ]
    );
    //this.sprite = new PIXI.Sprite(PIXI.loader.resources['src/images/misc/bullet_a.png'].texture);
    this.sprite.x = this.x;
    this.sprite.y = this.y;

    //TODO sprite animation
    this.sprite.anchor.set(0.5);
    //this.sprite.loop = true;
    this.sprite.animationSpeed = 0.05;

    this.sprite.play();

    //TODO
    this.damage = 5;
    this.isGuided = false;
    this.velocity = 0;
  }

  move() {
    this.y += 1;
    this.sprite.y = this.y;
  }

  update(tick) {
    //TODO
    /* update based on tick
    1) move
    2) animate */
    this.move();

    //2) animate
    //if (tick % 10 === 0) {
      //this.sprite = new PIXI.Sprite(PIXI.loader.resources['src/images/misc/bullet_a.png'].texture);
      //this.sprite.x = this.x;
      //this.sprite.y = this.y;
    //}
  }

  destroy() {
    this.destroyed = true;
    this.sprite.destroy();
  }
}

export default Bullet;
