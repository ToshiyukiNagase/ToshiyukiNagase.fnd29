'use strict';
{
  function setup() {
    const board = document.getElementById('board');
    for (let i = 0; i < 16; i++) {
      li = document.createElement('li');
      board.appendChild(li);
    }
  }

  function activete() {
    li = document.getElementById
    liButons = document.querySelectorAll('li');
    liButons.forEach((li, index) => {
    });
    // 乱数の生成 
    const randomNumber = [];
    for (let i = 1; i <= 16; i++) {
      randomNumber.push(i);
    }
    // ボタン初期化(ボタンに数字表示&pressed削除)
    for (let i = 0; i < 16; i++) {
      liButons[i].textContent = randomNumber.splice(Math.floor(Math.random() * randomNumber.length), 1)[0];
    }
    for (let i = 0; i < 16; i++) {
      liButons[i].classList.remove('pressed');
    }
  }

  function runTimer() {
    const timer = document.getElementById('timer');
    timer.textContent = ((Date.now() - startTime) / 1000).toFixed(2);

    timeOutId = setTimeout(() => {//指定された時間になると実行する
      runTimer();
    }, 10)
  }

  function game() {
    for (let i = 0; i < liButons.length; i++) {
      let pressedBtn;
      liButons[i].addEventListener('click', () => {
        // console.log("textContent= " + liButons[i].textContent);
        // console.log("i= " + i);
        // console.log("pressedBtn=" + pressedBtn);
        pressedBtn = document.querySelectorAll('li')[i];

        if (currentNum === parseInt(pressedBtn.textContent, 10)) {
          pressedBtn.classList.add("pressed");
          collect.currentTime = 0;
          collect.play();
          currentNum++;

          if (currentNum > 16) { //16
            clearTimeout(timeOutId);
            cleard.currentTime = 0;
            cleard.play();
            //Game crear表示 
            crearModal();
          }
        }
      });
    }
  }
  function crearModal() {
    modalRemove();
    let dispClearTime = document.getElementById("timer").textContent;
    let clearMessase = document.getElementById("score");

    clearMessase.innerHTML = "Your clear Time is <strong><font size='20'>" +dispClearTime+"</font> </strong>seconds🕐";
  }

  // ------↑Functions------------

  //  グローバル変数
  let liButons = {};
  let li = {};
  let startTime;
  let timeOutId;
  let currentNum;
  const start = new Audio("audio/coin.mp3");
  start.volume = 0.3;
  const collect = new Audio("audio/collect.mp3");
  collect.volume = 0.3;
  const cleard = new Audio("audio/cleard.mp3");
  cleard.volume = 0.3;

  //ゲーム処理
  setup();  //初期化処理
  const btn = document.getElementById('btn');  //スタートボタン クリック イベント
  btn.addEventListener('click', () => {

    start.currentTime = 0;
    start.play();

    if (typeof timeOutId !== "undefined") {//タイマー処理 開始
      clearTimeout(timeOutId);
    }
    currentNum = 1;
    startTime = Date.now();
    runTimer();
    activete();  //ボタン初期化
    game(); //ゲーム制御
  });

  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const modal = document.getElementById('modal');
  const mask = document.getElementById('mask');

  function modalRemove() {
    modal.classList.remove('hidden');
    mask.classList.remove('hidden');
  };

  close.addEventListener('click', () => {
    modal.classList.add('hidden');
    mask.classList.add('hidden');
  });

  mask.addEventListener('click', () => {
    close.click();
  });
}