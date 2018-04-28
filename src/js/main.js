const PIXI = require('pixi.js');

// prevent resolution blur
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

import textures from './textures';
import keyboard from './keyboard';
import checkSpritesCollision from './collision';

import Aircraft from './Aircraft';
import Bullet from './Bullet';
import Raptor from './Raptor';


//------------

//Create a Pixi Application
//let app = new PIXI.Application({width: 1280, height: 800});
//let app = new PIXI.Application({ width: 320, height: 200, resolution: 2, backgroundColor: 0xffffbb });
//let app = new PIXI.Application({ width: 320, height: 200, resolution: 3 });

let app = new PIXI.Application({ width: 320, height: 200, resolution: 3, view: document.querySelector('#raptor-game') });

//let app = new PIXI.Application({ width: 320, height: 200, resolution: 4, transparent: true });

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);


PIXI.loader
  .add(textures)
  .load(setup);


//This `setup` function will run when the image has loaded
function setup() {

  const mapContainer = new PIXI.Container();
  app.stage.addChild(mapContainer);
  mapContainer.x = 16;

  const HUDcontainer = new PIXI.Container();
  app.stage.addChild(HUDcontainer);

  let map = new PIXI.Sprite(PIXI.loader.resources['src/images/map.png'].texture);


  //TODO
  //let pixels = app.extract.pixels(mapContainer);
  //console.log('pixels', pixels);


  //TODO object containers
  let aircrafts = [];
  let bullets = [];
  let tick = 0;


  // ----
  let globalScroll = 0;
  const scrollSpeed = 1;


  // ---- keyboard controls ----
  /*let leftKey = keyboard(37),
    upKey = keyboard(38),
    rightKey = keyboard(39),
    downKey = keyboard(40),
    cmdKey = keyboard(91);


  let mapScrollSpeed = 0.5;
  const scrollSpeed = 1;

  upKey.press = () => {
    mapScrollSpeed = scrollSpeed;
  };
  downKey.press = () => {
    mapScrollSpeed = -scrollSpeed;
  };

  upKey.release = () => {
    mapScrollSpeed = 0;
  };
  downKey.release = () => {
    mapScrollSpeed = 0;
  };

  cmdKey.release = () => {
    console.log('Fire!!!');
    console.log('count:', bullets.length);
  };*/
  //--------

  //
  let mapTextures = [
    ['ground_1', 'ground_1', 'ground_1', 'ground_1', 'ground_1', 'ground_1', 'ground_1', 'ground_1', 'ground_1'],
    ['hill_2_1', 'hill_2_2', 'hill_2_2', 'hill_2_3', 'ground_1', 'ground_1', 'ground_1', 'ground_1', 'ground_1'],
    ['hill_2_8', 'ground_2', 'ground_2', 'hill_2_4', 'ground_1', 'ground_1', 'ground_1', 'shore_1_1', 'island_1_6'],
    ['hill_2_8', 'ground_2', 'hole_2_1', 'hill_2_5', 'shore_1_1', 'island_1_6', 'island_1_6', 'island_1_5', 'water_1'],
    ['hill_2_7', 'hill_2_6', 'hill_2_5', 'ground_1', 'island_1_4', 'water_1', 'water_1', 'water_1', 'water_1'],

    ['ground_1', 'ground_1', 'ground_1', 'ground_1', 'ground_1', 'ground_1', 'ground_1', 'ground_1', 'ground_1'],
    ['hill_2_1', 'hill_2_2', 'hill_2_2', 'hill_2_3', 'ground_1', 'ground_1', 'ground_1', 'ground_1', 'ground_1'],
    ['hill_2_8', 'ground_2', 'ground_2', 'hill_2_4', 'ground_1', 'ground_1', 'ground_1', 'shore_1_1', 'island_1_6'],
    ['hill_2_8', 'ground_2', 'hole_2_1', 'hill_2_5', 'shore_1_1', 'island_1_6', 'island_1_6', 'island_1_5', 'water_1'],
    ['hill_2_7', 'hill_2_6', 'hill_2_5', 'ground_1', 'island_1_4', 'water_1', 'water_1', 'water_1', 'water_1'],
  ];

  //TODO fill map with dummy ground
  for (let i = 0; i < 100; i++) {
    mapTextures.push(['ground_1', 'ground_1', 'ground_1', 'ground_1', 'ground_1', 'ground_1', 'ground_1', 'ground_1', 'ground_1']);
  }


  /*let mapTextures = [
    ['water_1', 'water_1'],
    ['water_1', 'water_1'],
  ];*/

  //let mapTextures = [];


  /*for (let xIndex = 0; xIndex < 9; xIndex++) {
    for (let yIndex = 0; yIndex < 10; yIndex++) {
      const level = Math.floor(Math.random() * 3);
      const imagePath = `src/images/textures/ground_${level}.png`

      let tile = new PIXI.Sprite(PIXI.loader.resources[imagePath].texture);

      tile.x = 32 * xIndex;
      tile.y = 32 * yIndex;

      mapContainer.addChild(tile);
    }
  }*/

  for (let yIndex = 0; yIndex < mapTextures.length; yIndex++) {
    for (let xIndex = 0; xIndex < mapTextures[yIndex].length; xIndex++) {
      const imagePath = `src/images/textures/${mapTextures[yIndex][xIndex]}.png`;

      let tile;

      if (mapTextures[yIndex][xIndex] === 'water_1') {
        tile = new PIXI.extras.AnimatedSprite(
          [
            PIXI.loader.resources['src/images/textures/water_1_a.png'].texture,
            PIXI.loader.resources['src/images/textures/water_1_b.png'].texture,
            PIXI.loader.resources['src/images/textures/water_1_c.png'].texture,
          ]
        );

        tile.animationSpeed = 0.05;
        tile.play();

      } else {
        tile = new PIXI.Sprite(PIXI.loader.resources[imagePath].texture);
      }

      tile.x = 32 * xIndex;
      tile.y = 32 * yIndex - mapTextures.length * 32 + 200; //TODO ugly but correct computation

      mapContainer.addChild(tile);
    }
  }



  //TODO add bunch of enemies
  const enemy1 = new Aircraft('type1', 80, 80);
  mapContainer.addChild(enemy1.sprite);
  aircrafts.push(enemy1);

  const enemy2 = new Aircraft('type2', 160, 80);
  mapContainer.addChild(enemy2.sprite);
  aircrafts.push(enemy2);

  const enemy3 = new Aircraft('type3', 240, 80);
  mapContainer.addChild(enemy3.sprite);
  aircrafts.push(enemy3);
  //----



  // add Raptor
  const raptor = new Raptor();
  mapContainer.addChild(raptor.sprite);


  //TODO add into array of bullets
  for (let i = 0; i < 30; i++) {
    let bullet = new Bullet(Math.random() * 320, Math.random() * 200);
    mapContainer.addChild(bullet.sprite);
    bullets.push(bullet);
  }


  // FPS info text holder
  const FPStext = new PIXI.Text('FPS', { fontFamily: 'Arial', fontSize: 8, fill: 0xffff00, align: 'center' });
  HUDcontainer.addChild(FPStext);

  const Aircraftstext = new PIXI.Text('', { fontFamily: 'Arial', fontSize: 8, fill: 0xffffff, align: 'center' });
  HUDcontainer.addChild(Aircraftstext);
  Aircraftstext.y = 15;

  const Bulletstext = new PIXI.Text('', { fontFamily: 'Arial', fontSize: 8, fill: 0xffffff, align: 'center' });
  HUDcontainer.addChild(Bulletstext);
  Bulletstext.y = 30;

  // Health holder
  const Healthtext = new PIXI.Text('Health', { fontFamily: 'Arial', fontSize: 8, fill: 0xff0000, align: 'center' });
  Healthtext.x = 300;
  HUDcontainer.addChild(Healthtext);


  // Listen for animate update
  app.ticker.add(delta => {
    /* Main game loop */
    globalScroll += scrollSpeed;
    mapContainer.y = globalScroll;


    //TODO tick for animation
    tick += 1;
    if (tick > 100) {
      tick = 1;
    }
    //console.log('PIXI.ticker.shared', PIXI.ticker.shared);

    //TODO add random bullet
    if (tick % 10 === 0) {
      // TODO add new bullet
      let bullet = new Bullet(Math.random() * 320, -globalScroll);
      mapContainer.addChild(bullet.sprite);
      bullets.push(bullet);

      //TODO add new aircraft
      const aircraft = new Aircraft('type3', Math.random() * 320, -globalScroll - 50); //TODO use aircraft height
      mapContainer.addChild(aircraft.sprite);
      aircrafts.push(aircraft);
    }

    //TODO inputs, move and fire ???



    // update all
    aircrafts.forEach(aircraft => {
      aircraft.update(tick);
    });

    raptor.update();

    bullets.forEach(bullet => {
      bullet.update(tick);
    });
    //---


    //TODO check collisions
    bullets.forEach(bullet => {
      if (checkSpritesCollision(bullet.sprite, raptor.sprite)) {
        raptor.hitBullet(bullet);
      }
    });

    aircrafts.forEach(aircraft => {
      if (checkSpritesCollision(aircraft.sprite, raptor.sprite)) {
        raptor.hitAircraft(aircraft);
      }
    });
    //---


    //TODO cleanup
    bullets.forEach(bullet => {
      if (bullet.y > 200 - globalScroll) {
        bullet.destroy();
      }
    });
    bullets = bullets.filter(bullet => !bullet.destroyed);

    aircrafts.forEach(aircraft => {
      if (aircraft.y > 200 - globalScroll) {
        aircraft.destroy();
      }
    });
    aircrafts = aircrafts.filter(aircraft => !aircraft.destroyed);
    //---


    //TODO
    // console.log('---- Summary ----');
    //console.log('Aircrafts:', aircrafts.length);
    //console.log('Bullets:', bullets.length);
    //console.log('globalScroll', globalScroll);

    Aircraftstext.text = aircrafts.length;
    Bulletstext.text = bullets.length;



    /* Draw HUD */
    // FPS
    FPStext.text = `${parseInt(app.ticker.FPS)}`;

    //TODO Score

    //TODO Health bar

  });
}

