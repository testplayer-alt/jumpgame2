var canvas, g;
var score;
var jump = true;
var gameover_sound = true;
var gameovercoment2 = false;
var restart = false;
var aimode = false;
var winsounds = true;
var wincount = false;
var randomspeed;
var scoreLabelWidth;
var player,enemy,kzn;
var scene;
var frameCount;
var particles;
var bgms = true,bgm1 = false;
var bgm_stop = false;
var nmode, hmode;
var tree,tree1;
var taiyou;
var angle;
var img,titleb;
var taiyouimage,taiyouposx,taiyouposy,taiyouposz,taiyouspeed;
const Scenes = {
  gametitle: "GameTitle",
  gamemain: "GameMain",
  gamemain_h: "GameMain_h",
  gameover: "GameOver",
  gameover_h: "GameOver_h",
  win: "Win",
  win_h: "Win_h",
};
function reload() {
  window.location.reload();
}


//音量調節機能作成中


////サイト接続時のパスワード入力
//let master = "2525";
//let word = "";
//let number ="0123456789";
//for (let o = 0; o < 4; o++) {
//    word += number[Math.floor(Math.random() * number.length)];
//}
//console.log(word);
//
//let i = 0;
//do{
//    let pas = prompt('パスワードを入力してください');
//    if(pas == word || pas == master) {
//        i = i+1;
//    } else {
//        alert("パスワードが違います");
//    }
//}while(i == 0)
//
onload = function () {
  // 描画コンテキストの取得
  canvas = document.getElementById("gamecanvas");
  g = canvas.getContext("2d");

  // 初期化
  init();
  // 入力処理の指定
  document.onkeydown = keydown();
  // ゲームループの設定 60FPS
  setInterval("gameloop()", 16);
};

function audio() {
  var jumpsound = document.getElementById("btn_audio");
  jumpsound.currentTime = 0; //連続クリックに対応
  jumpsound.play(); //クリックしたら音を再生
}
function gameoveraudio() {
  document.getElementById('gameover').play();
  setTimeout('document.getElementById("gameover2").play();', 3000);
  setTimeout('gameovercoment2 = true;', 3000);
  setTimeout('restart = true;', 3000);
}
function winsound() {
  document.getElementById('Winsound').play();
  setTimeout('restart = true;', 5000);
  setTimeout('wincount = true;', 5000);
}




function init() {

  //ゲーム管理データ初期化
  score = 0;
  scene = Scenes.gametitle;
  particles = [];
  randomspeed = true;
  nmode = false;
  hmode = false;


  //背景描画

  titlePosX = 0;
  titlePosY = 0;
  titleimage = new Image();
  titleimage.src = "./title1.png";

  backgroundPosX = 250;
  backgroundPosY = 100;
  backgroundimage = new Image();
  backgroundimage.src = "./nohara0.png";

  heardbackPosX = 250;
  heardbackPosY = 100;
  heardbackimage = new Image();
  heardbackimage.src = "./haikei.png";

  kzn = new Sprite();
  kzn.posx = 250;
  kzn.posy = 270;
  kzn.r = 0;
  kzn.image = new Image();
  kzn.image.src = "./kzn.png";
  kzn.speed = 1;
  kzn.speedy = 0;
  kzn.acceleration = 0;

  inseki = new Sprite();
  inseki.posx = 200;
  inseki.posy = -200;
  inseki.r = 0;
  inseki.image = new Image();
  inseki.image.src = "./inseki1.png";
  inseki.speedx = 3;
  inseki.speedy = 3;
  inseki.acceleration = 0;

  inseki2 = new Sprite();
  inseki2.posx = 300;
  inseki2.posy = -200;
  inseki2.r = 0;
  inseki2.image = new Image();
  inseki2.image.src = "./inseki1.png";
  inseki2.speedx = 3;
  inseki2.speedy = 3;
  inseki2.acceleration = 0;

  inseki3 = new Sprite();
  inseki3.posx = 400;
  inseki3.posy = -200;
  inseki3.r = 0;
  inseki3.image = new Image();
  inseki3.image.src = "./inseki1.png";
  inseki3.speedx = 3;
  inseki3.speedy = 3;
  inseki3.acceleration = 0;

  inseki4 = new Sprite();
  inseki4.posx = 500;
  inseki4.posy = -200;
  inseki4.r = 0;
  inseki4.image = new Image();
  inseki4.image.src = "./inseki1.png";
  inseki4.speedx = 3;
  inseki4.speedy = 3;
  inseki4.acceleration = 0;

  //キャラ初期化
  player = new Sprite();
  player.posx = 100;
  player.posy = 400;
  player.r = 25;
  player.image = new Image();
  player.image.src = "./chara0.png";
  player.speed = 0;
  player.speedy = 0;
  player.acceleration = 0;

  enemy = new Sprite();
  enemy.posx = 600;
  enemy.posy = 400;
  enemy.r = 25;
  enemy.image = new Image();
  enemy.image.src = "./enemyimage0.png";
  enemy.speed = 0;
  enemy.speedy = 0;
  enemy.acceleration = 0;

  //木
  tree = new Sprite();
  tree.posx = 350;
  tree.posy = 300;
  tree.r = 0;
  tree.image = new Image();
  tree.image.src = "./tree.png";
  tree.speed = 0;
  tree.speedy = 0;
  tree.acceleration = 0;

  tree1 = new Sprite();
  tree1.posx = 100;
  tree1.posy = 300;
  tree1.r = 0;
  tree1.image = new Image();
  tree1.image.src = "./tree.png";
  tree1.speed = 0;
  tree1.speedy = 0;
  tree1.acceleration = 0;
  

  kumo = new Sprite();
  kumo.posx = 50;
  kumo.posy = 100;
  kumo.r = 0;
  kumo.image = new Image();
  kumo.image.src = "./kumo.png";
  kumo.speedx = 1;
  kumo.speedy = 0;
  kumo.acceleration = 0;

  kumo1 = new Sprite();
  kumo1.posx = 180;
  kumo1.posy = 50;
  kumo1.r = 0;
  kumo1.image = new Image();
  kumo1.image.src = "./kumo.png";
  kumo1.speed = 1;
  kumo1.speedy = 0;
  kumo1.acceleration = 0;

  kumo2 = new Sprite();
  kumo2.posx = 320;
  kumo2.posy = 100;
  kumo2.r = 0;
  kumo2.image = new Image();
  kumo2.image.src = "./kumo.png";
  kumo2.speed = 1;
  kumo2.speedy = 0;
  kumo2.acceleration = 0;

  kumo3 = new Sprite();
  kumo3.posx = 440;
  kumo3.posy = 50;
  kumo3.r = 0;
  kumo3.image = new Image();
  kumo3.image.src = "./kumo.png";
  kumo3.speed = 1;
  kumo3.speedy = 0;
  kumo3.acceleration = 0;

  img = new Image();
  img.src = "./taiyou.png";
  angle = 0;
}
//AImode
function AImodeon(){
  aimode = true;
}
//ノーマルモード
function nomalmode(){
  nmode = true;
  if(hmode) {
    hmode = false;
  }
}
//ハードモード
function heardmode(){
  hmode = true;
  if(nmode) {
    nmode = false;
  }
}


function keydown() {
  if(scene == Scenes.gamemain || scene == Scenes.gamemain_h){
    if(jump) {
    var jump2 = false;
    player.speed = -20; 
    player.acceleration = 1.5;
    audio();
    jump = false;
    jump2 = true;
    } else if(jump2){//二段ジャンプ
    player.speed = -20;
    player.acceleration = 1.5;
    audio();
    jump2 = false;
    }
  }
}

function restarto() {
  if(scene == Scenes.gameover || scene == Scenes.gameover_h || scene == Scenes.win || scene == Scenes.win_h){
    if(restart){
      reload();
    }
    }
}
addEventListener("touchstart", restarto);
addEventListener("touchstart", keydown);
addEventListener("touchstart", title);
addEventListener("keydown", restarto);
addEventListener("keydown", keydown);
addEventListener("keydown", title);
  function title(e) {
    if(scene == Scenes.gametitle){
      if(nmode){
        scene = Scenes.gamemain;
        bgm1 = true;
      }if(hmode){
        scene = Scenes.gamemain_h;
      }
    }
  }

function gameloop() {
  update();
  draw();
}

function update() {
  if(scene == Scenes.gametitle) {
    return;
  } else if(scene == Scenes.gamemain || scene == Scenes.gamemain_h){
    angle += 0.01; // 回転するスピード
    player.speed = player.speed + player.acceleration;
    player.posy = player.posy + player.speed;
    enemy.posx -= enemy.speed;
    tree.posx -= tree.speed;
    tree1.posx -= tree1.speed;
    kumo.posx -= kumo.speed;
    kumo1.posx -= kumo1.speed;
    kumo2.posx -= kumo2.speed;
    kumo3.posx -= kumo3.speed;
    kzn.posx -= kzn.speed;
    inseki.posx -= inseki.speedx;
    inseki.posy += inseki.speedy;
    inseki2.posx -= inseki.speedx;
    inseki2.posy += inseki.speedy;
    inseki3.posx -= inseki.speedx;
    inseki3.posy += inseki.speedy;
    inseki4.posx -= inseki.speedx;
    inseki4.posy += inseki.speedy;

    if(inseki.posx < -30){
      var insekix = Math.floor(Math.random() * 350) + 250;
      inseki.posx = insekix;
      inseki.posy = -100;
    }
    if(inseki2.posx < -30){
      var insekix2 = Math.floor(Math.random() * 350) + 250;
      inseki2.posx = insekix2;
      inseki2.posy = -100;
    }
    if(inseki3.posx < -30){
      var insekix3 = Math.floor(Math.random() * 350) + 250;
      inseki3.posx = insekix3;
      inseki3.posy = -100;
    }
    if(inseki4.posx < -30){
      var insekix4 = Math.floor(Math.random() * 350) + 250;
      inseki4.posx = insekix4;
      inseki4.posy = -100;
    }
    if(kzn.posx < -55) {
      kzn.posx = 550;
    }
    if(enemy.posx < -15) {
      enemy.posx = 500;
      score = score + 10;
      randomspeed = true;
    }
    if (player.posy > 400) {
      player.posy = 400;
      player.speed = 0;
      player.acceleration = 0;
      jump = true;
    }
    tree.speed = 3;
    tree1.speed = 3;
    if(tree.posx < -20) {
      tree.posx = 500;
    }
    if(tree1.posx < -20) {
      tree1.posx = 500;
    }
    if(kumo.posx < -33) {
      kumo.posx = 520;
    }
    if(kumo1.posx < -33) {
      kumo1.posx = 520;
    }
    if(kumo2.posx < -33) {
      kumo2.posx = 520;
    }
    if(kumo3.posx < -33) {
      kumo3.posx = 520;
    }

    //ノーマルモード
    if(scene == Scenes.gamemain){
      if(score >= 0 && score < 300 && scene == Scenes.gamemain) {
        enemy.speed = 12;
      }if(score > 300 && score < 600 && scene == Scenes.gamemain){
        enemy.speed = 15;
      }if(score >= 600 && scene == Scenes.gamemain){
        enemy.speed = 17;
      }
    }
    

    //ハードモード
    if(scene == Scenes.gamemain_h){
      for(var i = 0; i < 5; i ++) {
        particles.push(new Particle(kzn.posx, kzn.posy - 50));
      }
    }
    if(score >= 0 && score < 300 && scene == Scenes.gamemain_h) {
      if(randomspeed){
        var random_easy = Math.floor(Math.random() * 6) + 8;
        enemy.speed = random_easy;
        randomspeed = false;
      }
    }if(score > 300 && score < 600 && scene == Scenes.gamemain_h) {
      if(randomspeed){
        var random_nomal = Math.floor(Math.random() * 7) + 8;
        enemy.speed = random_nomal;
        randomspeed = false;
      }
    }if(score >= 600 && scene == Scenes.gamemain_h) {
      if(randomspeed){
        var random_heard = Math.floor(Math.random() * 8) + 8;
        enemy.speed = random_heard;
        randomspeed = false;     
      }
    }

    if(score == 1000 && scene == Scenes.gamemain_h) {
      scene = Scenes.win_h;
    }
    if(score == 1000 && scene == Scenes.gamemain) {
      scene = Scenes.win;
    }




    
    //当たり判定
    var diffX = player.posx - enemy.posx;
    var diffY = player.posy - enemy.posy;
    var distance = Math.sqrt(diffX * diffX + diffY * diffY);
    if(aimode && distance < 100){
      keydown();
    }else if(distance < player.r + enemy.r && scene == Scenes.gamemain) {
      scene = Scenes.gameover;
      player.speed = -12;
      player.acceleration = 0.2;
      frameCount = 0;
      for(var i = 0; i < 100; i ++) {
        particles.push(new Particle(player.posx, player.posy));
      }
    } else if(distance < player.r + enemy.r && scene == Scenes.gamemain_h){
      scene = Scenes.gameover_h;
      player.speed = -12;
      player.acceleration = 0.2;
      frameCount = 0;
      for(var i = 0; i < 100; i ++) {
        particles.push(new Particle(player.posx, player.posy));
      }
    }
  }else if(scene == Scenes.gameover) {
    //gameover
    jump = false;
    player.speed = player.speed + player.acceleration;
    player.posy = player.posy + player.speed;
    enemy.posx -= enemy.speed;
    if(gameover_sound){
      gameoveraudio();
      gameover_sound = false;
    }
    particles.forEach((p) => {
      p.update();
    });
  }else if(scene == Scenes.gameover_h){
    //gameover
    jump = false;
    player.speed = player.speed + player.acceleration;
    player.posy = player.posy + player.speed;
    enemy.posx -= enemy.speed;
    if(gameover_sound){
      gameoveraudio();
      gameover_sound = false;
    }
    particles.forEach((p) => {
      p.update();
    });
  }else if(scene == Scenes.win || scene == Scenes.win_h){
    jump = false;
    player.speed = -1;
    player.speed = player.speed;
    player.posy = player.posy + player.speed;
    enemy.posx -= enemy.speed;
    if(winsounds){
      winsound();
      winsounds = false;
    }
  }
}


function draw() {


  g.drawImage(backgroundimage, -1, -3, 484, 483);
  //タイトル
    if(scene == Scenes.gamemain_h){
    g.drawImage(heardbackimage, -1, -3, 484, 483);
    kzn.draw(g);
    inseki.draw(g);
    inseki2.draw(g);
    inseki3.draw(g);
    inseki4.draw(g);
    g.fillStyle = "rgb(255,255,255)";
    g.font = "25pt Arial";
    var scoreLabel = "SCORE :  " + score;
    scoreLabelWidth = g.measureText(scoreLabel).width;
    g.fillText(scoreLabel, 450 - scoreLabelWidth, 50);
    var gameovercoment = "Hard Mode";
    var gameovercomentWidth = g.measureText(gameovercoment).width;
    g.fillText(gameovercoment, 190 - gameovercomentWidth, 50);
    //ハード over
  } else if(scene == Scenes.gameover_h) {
    g.drawImage(heardbackimage, -1, -3, 484, 483);
    kzn.draw(g);
    inseki.draw(g);
    inseki2.draw(g);
    inseki3.draw(g);
    inseki4.draw(g);
        g.fillStyle = 'rgba(128, 128, 128, 0.5)';
    g.fillRect(0, 0, canvas.width, canvas.height);
    g.fillStyle = "rgb(255,255,255)";
    g.font = "70px Arial";
    var gameovercoment = "GAME OVER";
    var gameovercomentWidth = g.measureText(gameovercoment).width;
    g.fillText(gameovercoment, 450 - gameovercomentWidth, 200);
    particles.forEach((p) => {
      p.draw(g);
    });
    if(gameovercoment2){
      g.fillStyle = "rgb(255,255,255)";
      g.font = "25px Arial";
      var gameovercoment = "やられてしまった!";
      var gameovercomentWidth = g.measureText(gameovercoment).width;
      g.fillText(gameovercoment, 345 - gameovercomentWidth, 250);
      //最終スコア
      g.fillStyle = "rgb(255,255,255)";
      g.font = "25px Arial";
      var gameovercoment = "FINALSCORE : " + score;
      var gameovercomentWidth = g.measureText(gameovercoment).width;
      g.fillText(gameovercoment, 340 - gameovercomentWidth, 300);
      //restart
      g.fillStyle = "rgb(255,255,255)";
      g.font = "15px Arial";
      var gameovercoment = "次のゲームを始めるには何かキーを押してください";
      var gameovercomentWidth = g.measureText(gameovercoment).width;
      g.fillText(gameovercoment, 400 - gameovercomentWidth, 350);
    }
  }if(scene == Scenes.win_h) {
    g.drawImage(heardbackimage, -1, -3, 484, 483);
    kzn.draw(g);
    inseki.draw(g);
    inseki2.draw(g);
    inseki3.draw(g);
    inseki4.draw(g);
    g.fillStyle = "rgb(255,255,255)";
    g.font = "60px Arial";
    var gameovercoment = "Congratulation!!";
    var gameovercomentWidth = g.measureText(gameovercoment).width;
    g.fillText(gameovercoment, 450 - gameovercomentWidth, 200);
    g.fillStyle = "rgb(255,255,255)";
      g.font = "25px Arial";
      var gameovercoment = "ゲームをクリアした!";
      var gameovercomentWidth = g.measureText(gameovercoment).width;
      g.fillText(gameovercoment, 345 - gameovercomentWidth, 250);
    //最終スコア
    g.fillStyle = "rgb(255,255,255)";
    g.font = "25px Arial";
    var gameovercoment = "FINALSCORE : " + score;
    var gameovercomentWidth = g.measureText(gameovercoment).width;
    g.fillText(gameovercoment, 340 - gameovercomentWidth, 300);
    if(wincount){
      g.fillStyle = "rgb(255,255,255)";
      g.font = "15px Arial";
      var gameovercoment = "次のゲームを始めるには何かキーを押してください";
      var gameovercomentWidth = g.measureText(gameovercoment).width;
      g.fillText(gameovercoment, 400 - gameovercomentWidth, 350);
    }
  }if(scene == Scenes.gamemain){
    tree.draw(g);
    tree1.draw(g);
    g.save();
    g.translate(canvas.width / 8, canvas.height / 7);
    g.rotate(angle);
    g.drawImage(img, -img.width / 2, -img.height / 2);
    g.restore();
    kumo.draw(g);
    kumo1.draw(g);
    kumo2.draw(g);
    kumo3.draw(g);
    g.fillStyle = "rgb(0,0,0)";
    g.font = "25pt Arial";
    var scoreLabel = "SCORE :  " + score;
    scoreLabelWidth = g.measureText(scoreLabel).width;
    g.fillText(scoreLabel, 450 - scoreLabelWidth, 50);
    g.fillStyle = "rgb(0,0,0)";
    g.font = "30px Arial";
    var gameovercoment = "Nomal Mode";
    var gameovercomentWidth = g.measureText(gameovercoment).width;
    g.fillText(gameovercoment, 190 - gameovercomentWidth, 50);
    //ノーマル over
  }if(scene == Scenes.gameover){
    tree.draw(g);
    tree1.draw(g);
    g.save();
    g.translate(canvas.width / 8, canvas.height / 7);
    g.rotate(angle);
    g.drawImage(img, -img.width / 2, -img.height / 2);
    g.restore();
    kumo.draw(g);
    kumo1.draw(g);
    kumo2.draw(g);
    kumo3.draw(g);
    g.fillStyle = 'rgba(128, 128, 128, 0.5)';
    g.fillRect(0, 0, canvas.width, canvas.height);
    g.fillStyle = "rgb(0,0,0)";
    g.font = "70px Arial";
    var gameovercoment = "GAME OVER";
    var gameovercomentWidth = g.measureText(gameovercoment).width;
    g.fillText(gameovercoment, 450 - gameovercomentWidth, 200);
    particles.forEach((p) => {
      p.draw(g);
    });
    if(gameovercoment2){
      g.fillStyle = "rgb(0,0,0)";
      g.font = "25px Arial";
      var gameovercoment = "やられてしまった!";
      var gameovercomentWidth = g.measureText(gameovercoment).width;
      g.fillText(gameovercoment, 345 - gameovercomentWidth, 250);
      //最終スコア
      g.fillStyle = "rgb(0,0,0)";
      g.font = "25px Arial";
      var gameovercoment = "FINALSCORE : " + score;
      var gameovercomentWidth = g.measureText(gameovercoment).width;
      g.fillText(gameovercoment, 340 - gameovercomentWidth, 300);
      //restart
      g.fillStyle = "rgb(0,0,0)";
      g.font = "15px Arial";
      var gameovercoment = "次のゲームを始めるには何かキーを押してください";
      var gameovercomentWidth = g.measureText(gameovercoment).width;
      g.fillText(gameovercoment, 400 - gameovercomentWidth, 350);
    }
  }else if(scene == Scenes.win){
    tree.draw(g);
    tree1.draw(g);
    g.save();
    g.translate(canvas.width / 8, canvas.height / 7);
    g.rotate(angle);
    g.drawImage(img, -img.width / 2, -img.height / 2);
    g.restore();
    kumo.draw(g);
    kumo1.draw(g);
    kumo2.draw(g);
    kumo3.draw(g);
    g.fillStyle = "rgb(0,0,0)";
    g.font = "60px Arial";
    var gameovercoment = "Congratulation!!";
    var gameovercomentWidth = g.measureText(gameovercoment).width;
    g.fillText(gameovercoment, 450 - gameovercomentWidth, 200);
    g.fillStyle = "rgb(0,0,0)";
      g.font = "25px Arial";
      var gameovercoment = "ゲームをクリアした!";
      var gameovercomentWidth = g.measureText(gameovercoment).width;
      g.fillText(gameovercoment, 345 - gameovercomentWidth, 250);
    //最終スコア
    g.fillStyle = "rgb(0,0,0)";
    g.font = "25px Arial";
    var gameovercoment = "FINALSCORE : " + score;
    var gameovercomentWidth = g.measureText(gameovercoment).width;
    g.fillText(gameovercoment, 340 - gameovercomentWidth, 300);
    if(wincount){
      g.fillStyle = "rgb(0,0,0)";
      g.font = "15px Arial";
      var gameovercoment = "次のゲームを始めるには何かキーを押してください";
      var gameovercomentWidth = g.measureText(gameovercoment).width;
      g.fillText(gameovercoment, 400 - gameovercomentWidth, 350);
    }
  }
  enemy.draw(g);
  player.draw(g);
  if(scene == Scenes.gametitle){
    g.drawImage(titleimage, 0, 0, 480, 480);
    g.fillStyle = "rgb(0,0,0)";
    g.font = "30px Arial";
    var gameovercoment = "難易度を選択した後";
    var gameovercomentWidth = g.measureText(gameovercoment).width;
    g.fillText(gameovercoment, 380 - gameovercomentWidth, 200);

    g.fillStyle = "rgb(0,0,0)";
    g.font = "30px Arial";
    var gameovercoment = "キーを押すとゲームが始まります";
    var gameovercomentWidth = g.measureText(gameovercoment).width;
    g.fillText(gameovercoment, 465 - gameovercomentWidth, 235);
  }

}

class Sprite {
  image = null;
  posy = 0;
  posy = 0;
  speedx = 0;
  speedy = 0;
  acceleration = 0;
  r = 0;

  //キャラ描画
  draw(g) {
    g.drawImage(
      this.image,
      this.posx - this.image.width / 2,
      this.posy - this.image.height / 2
    );
  }
}


//パーティクル
class Particle extends Sprite {
  baseLine = 0;
  acceleration = 0;
  speedy = 0;
  speedx = 0;

  constructor(x, y) {
    super();
    this.posx = x,
    this.posy = y,
    this.baseLine = 420;
    this.acceleration = 0.5;
    var angle1 = (Math.PI * 3) / 4 + (Math.PI / 2) * Math.random();
    this.speed = 5 + Math.random() * 20;
    this.speedx = this.speed * Math.cos(angle1);
    this.speedx = this.speed * Math.sin(angle1);
    this.r = 2;
  }
  update() {
    this.speedx *= 0.97;
    this.speedy += this.acceleration;
    this.posx += this.speedx;
    this.posy += this.speedy;
    if (this.posy > this.baseLine) {
      this.posy = this.baseLine;
      this.speedy = 100 * -1 * (Math.random() * 0.5 + 0.3);
    }
  }
  
  draw(g) {
    g.fillStyle = "rgb(255,50,50)";
    g.fillRect(this.posx - this.r, this.posy - this.r, this.r * 2, this.r * 2);
  }
}

