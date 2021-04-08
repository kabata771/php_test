var SCREEN_WIDTH = 2050;
var SCREEN_HEIGHT = 1450;

var playerSizeX = 619.2*2;
var playerSizeY = 437.1*2;

var backx = 0;
var backy = 0;

window.addEventListener('load', init);

var sceneNumber = 0;
var aniTime;
var canvas;
var ctx;
var Asset = {}
var mikanX = 0;
var lastTimestamp = null;
var speed = 0.5;
var itemSpeed = 5;

var textnumber = 0;

var playerx = 0;
var playery = 0;

var i = 0;
var j = 0;
var k = 0;
var l = 0;

var x = 0;
var y = 0;
var itemPos = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
for (i = 0; i < 3; i++) {
    itemPos[i][0] = 2000;
    itemPos[i][1] = Math.floor(Math.random() * 2000);
    itemPos[i][2] = 0;
}

var starttime=0;
var justtime=0;

var beforetime;
var aftertime;


// アセットの定義
Asset.assets = [
    { type: 'image', name: '1001', src: 'png/1001.png' },
    { type: 'image', name: '1002', src: 'png/1002.png' },
    { type: 'image', name: '1003', src: 'png/1003.png' },
    { type: 'image', name: '1004', src: 'png/1004.png' },
    { type: 'image', name: '1005', src: 'png/1005.png' },
    { type: 'image', name: '1', src: 'png/1.png' },
    { type: 'image', name: '2', src: 'png/2.png' },
    { type: 'image', name: '3', src: 'png/3.png' },
    { type: 'image', name: '4', src: 'png/4.png' },
    { type: 'image', name: '11', src: 'png/11.png' },
    { type: 'image', name: '12', src: 'png/12.png' },
    { type: 'image', name: '13', src: 'png/13.png' },
    { type: 'image', name: '14', src: 'png/14.png' },
    { type: 'image', name: '21', src: 'png/21.png' },
    { type: 'image', name: '22', src: 'png/22.png' },
    { type: 'image', name: '23', src: 'png/23.png' },
    { type: 'image', name: '24', src: 'png/24.png' },
    { type: 'image', name: '101', src: 'png/101.png' },
    { type: 'image', name: '102', src: 'png/102.png' },
    { type: 'image', name: '103', src: 'png/103.png' },
    { type: 'image', name: '104', src: 'png/104.png' },
    { type: 'image', name: '111', src: 'png/111.png' },
    { type: 'image', name: '112', src: 'png/112.png' },
    { type: 'image', name: '113', src: 'png/113.png' },
    { type: 'image', name: '114', src: 'png/114.png' },
    { type: 'image', name: '121', src: 'png/121.png' },
    { type: 'image', name: '122', src: 'png/122.png' },
    { type: 'image', name: '123', src: 'png/123.png' },
    { type: 'image', name: '124', src: 'png/124.png' },
    { type: 'image', name: '131', src: 'png/131.png' },
    { type: 'image', name: 'item1', src: 'png/1001.png' },
    { type: 'image', name: 'item2', src: 'png/1001.png' },
    { type: 'image', name: 'ball1', src: 'png/1001.png' },
    { type: 'image', name: 'ball2', src: 'png/1001.png' },
    { type: 'image', name: 'ball3', src: 'png/1001.png' },
    { type: 'image', name: 'ball4', src: 'png/1001.png' }

];

// 読み込んだ画像
Asset.images = {};

// アセットの読み込み
Asset.loadAssets = function (onComplete) {
    var total = Asset.assets.length; // アセットの合計数
    var loadCount = 0; // 読み込み完了したアセット数

    // アセットが読み込み終わった時に呼ばれるコールバック関数
    var onLoad = function () {
        loadCount++; // 読み込み完了数を1つ足す
        if (loadCount >= total) {
            // すべてのアセットの読み込みが終わった
            onComplete();
        }
    };

    // すべてのアセットを読み込む
    Asset.assets.forEach(function (asset) {
        switch (asset.type) {
            case 'image':
                Asset._loadImage(asset, onLoad);
                break;
        }
    });
};

// 画像の読み込み
Asset._loadImage = function (asset, onLoad) {
    var image = new Image();
    image.src = asset.src;
    image.onload = onLoad;
    Asset.images[asset.name] = image;
};

//setInterval(render, 500);
maincanvas.addEventListener('mousemove', moveMouse);
maincanvas.addEventListener('mousedown', clickDown);

function init() {                   //初期
    canvas = document.getElementById('maincanvas');
    ctx = canvas.getContext('2d');

    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    beforetime = new Date();

    Asset.loadAssets(function () {
        // アセットがすべて読み込み終わったら、
        // ゲームの更新処理を始めるようにする
        requestAnimationFrame(update);
    });

}


function update(timestamp) {            //更新処理
    var delta = 0; // 前回フレーム時間からの経過時間(単位:秒)
    if (lastTimestamp != null) {
        delta = (timestamp - lastTimestamp) / 1000;  // ミリ秒を1000で割ると秒になる(1000ミリ秒÷1000は1秒)
    }
    lastTimestamp = timestamp;

    for (i = 0; i < 3; i++) {
        if ((itemPos[i][0] < playerSizeX + playerx) && (itemPos[i][0] > playerx)) {
            if ((itemPos[i][1] < playerSizeY + playery) && (itemPos[i][1] > -playerSizeY + playery)) {
                if (itemPos[i][2] == 0) {
                    itemSpeed = itemSpeed + 1;
                    itemPos[i][0] = 3000;
                    itemPos[i][1] = Math.random() * 1400;
                    itemPos[i][2] = Math.floor(Math.random() * 5);
                }
            }
        }
    }

    move();
    requestAnimationFrame(update);
    resetItem();
    render();
    attack();
    jump();}

function resetItem() {          //アイテム座標リセット
    for (i = 0; i < 3; i++) {
        if (itemPos[i][0] > -playerSizeX * 2) {
            itemPos[i][0] = itemPos[i][0] - 1 * itemSpeed * 0;
        } else {
            itemPos[i][0] = 3000;
            itemPos[i][1] = Math.floor(Math.random() * (SCREEN_HEIGHT - playerSizeY));
            itemPos[i][2] = Math.floor(Math.random() * 5);
            console.log(itemPos[0][1]);
        }
    }
}
function render() {             //画像表示
    // 画面全体をクリア
    var today = new Date();
    var milliseconds = today.getMilliseconds();
    if (milliseconds < 250) {
        aniTime = 0;
    } else if (milliseconds < 500) {
        aniTime = 1;
    } else if (milliseconds < 750) {
        aniTime = 2;
    } else {
        aniTime = 3;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (sceneNumber) {
        case 0:
            ctx.drawImage(Asset.images['1003'], 0, 0, 2064, 1457);
            switch (textnumber) {
                case 0:
                    inputtext('Hello...');
                    break;
                case 1:
                    inputtext('Wake Up...');
                    break;
                case 2:
                    inputtext('Where is here ... ? In a cave ?');
                    break;
                case 3:
                    inputtext('No... in your dream.');
                    break;
                case 4:
                    inputtext('Ah, you are ...');
                    break;

    }
            break;
        case 1:
            ctx.drawImage(Asset.images['1001'], 0, 0, 2064, 1457);
            break;
        case 2:
            if (y < playery + playerSizeY / 2) {
                playery = playery - speed * 0;
            } else if (y > playery + playerSizeY / 2) {
                playery = playery + speed * 0;
            }
            backRender(backx, backy);

            for (i = 0; i < 3; i++) {
                if (itemPos[i][2] == 0) {
                    if (aniTime == 1) {
                        ctx.drawImage(Asset.images['item1'], itemPos[i][0], itemPos[i][1], playerSizeX, playerSizeY);
                    }
                    if (aniTime == 0) {
                        ctx.drawImage(Asset.images['item2'], itemPos[i][0], itemPos[i][1], playerSizeX, playerSizeY);
                    }
                } else {
                    ctx.drawImage(Asset.images['ball' + String(itemPos[i][2])], itemPos[i][0], itemPos[i][1], playerSizeX, playerSizeY);
                }
            }
            if (j == 3) {
                ctx.drawImage(Asset.images['131'], playerx, playery, playerSizeX, playerSizeY);
            }
            if (j == 2) {

                if (atkTime == 3) {
                    //
                    ctx.drawImage(Asset.images['124'], playerx, playery, playerSizeX, playerSizeY);
                }
                if (atkTime == 2) {
                    // みかん箱を表示
                    ctx.drawImage(Asset.images['123'], playerx, playery, playerSizeX, playerSizeY);
                }
                if (atkTime == 1) {
                    //
                    ctx.drawImage(Asset.images['122'], playerx, playery, playerSizeX, playerSizeY);
                }
                if (atkTime == 0) {
                    // みかん箱を表示
                    ctx.drawImage(Asset.images['121'], playerx, playery, playerSizeX, playerSizeY);
                }

            }

            if (j == 1) {

                if (aniTime == 3) {
                    //
                    ctx.drawImage(Asset.images['114'], playerx, playery, playerSizeX, playerSizeY);
                }
                if (aniTime == 2) {
                    // みかん箱を表示
                    ctx.drawImage(Asset.images['113'], playerx, playery, playerSizeX, playerSizeY);
                }
                if (aniTime == 1) {
                    //
                    ctx.drawImage(Asset.images['112'], playerx, playery, playerSizeX, playerSizeY);
                }
                if (aniTime == 0) {
                    // みかん箱を表示
                    ctx.drawImage(Asset.images['111'], playerx, playery, playerSizeX, playerSizeY);
                }

            }
            if (j == 0) {
                if (aniTime == 3) {
                    //
                    ctx.drawImage(Asset.images['104'], playerx, playery, playerSizeX, playerSizeY);
                }
                if (aniTime == 2) {
                    // みかん箱を表示
                    ctx.drawImage(Asset.images['103'], playerx, playery, playerSizeX, playerSizeY);
                }
                if (aniTime == 1) {
                    //
                    ctx.drawImage(Asset.images['102'], playerx, playery, playerSizeX, playerSizeY);
                }
                if (aniTime == 0) {
                    // みかん箱を表示
                    ctx.drawImage(Asset.images['101'], playerx, playery, playerSizeX, playerSizeY);
                }
            }
            break;
    }

}

function moveMouse(e) {         //マウス移動時
    //  console.log(j);
    x = e.clientX - canvas.offsetLeft;
    y = e.clientY - canvas.offsetTop;
}
function clickDown(e) {         //クリック時
    switch (sceneNumber) {
        case 0:
            if (textnumber == 5) {
                if (y < 1000) {
                    changeScene(2);
                } else {
                    changeScene(1);
                }
            } else {
                secondscenepush();
            }
            break;
        case 1:
            changeScene(0);
            break;
        case 2:
            for (i = 0; i < 3; i++) {
                if ((itemPos[i][0] < playerSizeX + playerx) && (itemPos[i][0] > playerx)) {
                    if ((itemPos[i][1] < playerSizeY + playery) && (itemPos[i][1] > -playerSizeY + playery)) {
                        if (itemPos[i][2] != 0) {
                            speed = speed + 1;
                            itemPos[i][0] = 3000;
                            itemPos[i][1] = Math.random() * 1400;
                            itemPos[i][2] = Math.floor(Math.random() * 5);
                        }
                    } console.log(i);
                }
            }
            break;
    }
}
function hyoji1(num) {
    if (num == 0) {
        document.getElementById("disp").style.display = "block";
    }
    else {
        document.getElementById("disp").style.display = "none";
    }
}

function PrintPosition(canvas, message) {       //座標表示
    var context = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '12pt "MSゴシック"';
    ctx.fillStyle = 'black';
    ctx.fillText(message, 32, 48);
}

function getMousePosition(canvas, evt) {        //マウス座標取得
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function draw() {               //マウス移動
    maincanvas.addEventListener('mousemove', function (evt) {
        var mousePos = getMousePosition(canvas, evt);
        var message = 'Mouse position X:' + mousePos.x + ', Y:' + mousePos.y;
        PrintPosition(canvas, message);
    }, false);
}
function changeScene(SN) {        //シーン変更
    initialize();
    sceneNumber = SN;
}
function initialize() {          //変数を初期化したい
    aniTime = 0;
    mikanX = 0;
    lastTimestamp = null;
    speed = 0.5;
    itemSpeed = 5;

    playerx = 300;
    playery = 400;

    i = 0;
    j = 0;

    itemPos = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    for (i = 0; i < 3; i++) {
        itemPos[i][0] = 2000;
        itemPos[i][1] = Math.floor(Math.random() * 2000);
        itemPos[i][2] = 0;
    }
}
function inputtext(string) {
    ctx.drawImage(Asset.images['1004'], 300, 800, 1304, 322);
        str = string.substr(0, l);
    ctx.font = '80pt "Hiragino Kaku Gothic ProN"';
        ctx.fillStyle = '#6080A0';
    ctx.fillText(str, 400, 1000);
    var savetime = new Date();
    time = savetime.getMilliseconds();
    var speed = 15;
    for (i = 1; i <= speed; i++) {
        if (time < 1000-(1000*i / speed) + 15 && time > 1000-(1000*i / speed)) {
            l = l + 1;
        }
    }
}
function secondscenepush() {
    l = 0;
    textnumber = textnumber + 1;
}  


///何秒間か処理を続ける的な処理(多分もう使わない)
/// var addoperate = new function () { };

function plussecond(second) {       ///呼ぶとき
    if (justtime <= 0) {
        justtime = second;
        starttime = Date.now();
    }
}
function secondlater(callback) {            ///常に
    if (justtime > 0) {
        var delay = Date.now();
        if (justtime < delay - starttime) { 
            justtime = 0;
        }
        callback();
    }
}


///移動時
var moveable = 1;
function move() {
    if (moveable == 1) {
        if (k == 1) {
            if (backx < 500) {
                backx = backx + 5;
                if (j < 2) { j = 1; }
            }
        } else if (k == -1) {
            if (backx > -2560 + playerSizeX) {
                backx = backx - 5;
                if (j < 2) { j = 1; }
            }
        }
    }
    if (backx < -650 && backx > -800 && block1 == 1) {
        if (playery > 200) {backx = -650; }
    } else if (backx < -800 && backx > -950 && block1 == 1) {
        if (playery > 200) {backx = -950; }
    }
    groundOption();
}
function groundOption() {
    if (backx < -650 && backx > -950 && block1==1) {
        groundy = 100;
    } else {
        groundy = 400;
    }
}
function moveRight() {
    if (j < 1) { j = 1; }
    k = 1;
    if (backx < -650 && backx > -950 && block1 == 1) {
        if (playery > 200) { moveable = 0; backx = -950;}
    }
}
function moveLeft() {
    if (j < 1) { j = 1; }
    k = -1;
    if (backx < -650 && backx > -950&& block1 == 1) {
        if (playery > 200) { moveable = 0; backx = -650;}
    }
}

///跳躍時
var groundy=400;
function jump() {
    aftertime = new Date();
    if (playery < groundy) {
        playery = playery - 250 * (aftertime.getTime() - beforetime.getTime()) / 1000 + 500 * ((aftertime.getTime() - beforetime.getTime())/1000)**2;
        j = 3;
    }
    if (playery>=groundy && j==3) {
        j = 0;
        playery = groundy;
    }
}



///障害物破壊
var block1 = 1;
function backRender(rx, ry) {
    ctx.drawImage(Asset.images['1002'], rx, ry, 2560, 1440);
    if (block1 == 1) {
        ctx.drawImage(Asset.images['1005'], rx+500, ry, 2064, 1457);
    }
}



///攻撃時
var atkbefore = new Date();
var atkafter = new Date();
var atkTime = 0;
function attack() {
    atkafter = new Date();
    if (atkafter.getTime() - atkbefore.getTime() < 100) {
        j = 2;
        atkTime = 0;
    } else if (atkafter.getTime() - atkbefore.getTime() < 200) {
        j = 2;
        atkTime = 1;
    } else if (atkafter.getTime() - atkbefore.getTime() < 300) {
        j = 2;
        atkTime = 2;
    } else if (atkafter.getTime() - atkbefore.getTime() < 400) {
        j = 2;
        atkTime = 3;
    }else  if(j==2){
        j=0
    }
}
function startAttack() {
    atkbefore = new Date();
    if (backx < -400 && backx > -700) {
        block1 = 0;
        console.log(backx);
    }
}

//コマンド
document.body.addEventListener('keydown',
    event => {
        if (event.key === 'q') {
            init();
            changeScene(0);
            console.log(sceneNumber);
        }
        if (event.key === 'w') {
            console.log(playery,moveable,groundy);
            if (playery == groundy) {
                beforetime = new Date();
                playery = groundy - 5;
            }
        }
        if (event.key === 'e') {
            startAttack();
        }
    });
document.body.addEventListener('keydown',
    event => {
        if (event.key === 'a') {
            moveRight();
        }
        if (event.key === 'd') {
            moveLeft();
        }
    });
document.body.addEventListener('keyup',
    event => {
        if (event.key === 'a') {
            if (j < 2) { j = 0; }
            k = 0;
            moveable = 1;
        }
        if (event.key === 'd') {
            if (j < 2) { j = 0; }
            k = 0;
            moveable = 1;
        }
    });