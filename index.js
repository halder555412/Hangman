let words = ["HOTEL", "HAPPY", "SCHOOL", "HEIGHT", "BLAST", "NEWTON"];
let ran = parseInt(Math.random() * 5);
let len = words[ran].length;
let chance = 5;
let correctwords = 0;
let gameOver = false;
let difficulty = 5;
document.getElementById("turnleft").innerHTML = "Turn Left : " + chance;

const row = () => {
  let str = "QWERTYUIOPASDFGHJKLZXCVBNM";
  for (let i = 0; i < str.length; i++) {
    let letter = document.createElement("div");
    letter.classList.add("box");
    letter.setAttribute("id", str[i]);
    letter.addEventListener("click", (event) => action(letter));
    letter.innerHTML = str[i];
    if (i < 10) document.getElementById("row1").appendChild(letter);
    else if (i >= 10 && i < 19)
      document.getElementById("row2").appendChild(letter);
    else document.getElementById("row3").appendChild(letter);
  }
};

const answer = () => {
  for (let i = 0; i < len; i++) {
    let guessword = document.createElement("div");
    guessword.classList.add("box");
    guessword.setAttribute("id", "l" + (i + 1));
    document.getElementById("answer").appendChild(guessword);
  }
};
row();

answer();

const action = (input) => {
  if (gameOver) {
    swal("Game Over!", "Hanged", "error");
    return;
  } else if (correctwords === len) {
    return;
  }
  let flag = false;

  let ans = words[ran];

  for (let i = 0; i < len; i++) {
    let d = document.getElementById("l" + (i + 1));
    d.setAttribute("value", ans[i]);
  }

  if (ans.includes(input.id, 0)) {
    for (let i = 0; i < len; i++) {
      let d = document.getElementById("l" + (i + 1));
      if (d.getAttribute("value") === input.id && d.innerHTML === "") {
        d.innerHTML = input.id;
        const audio = document.getElementById("caudio");
        audio.play();
        input.classList.add("keygreen");
        correctwords++;
        if (correctwords === len) {
          let restart = document.getElementById("restart");
          restart.classList.remove("hide");
          restart.addEventListener("click", () => {
            window.location.href = "index.html";
          });
        }
        flag = true;
      }
    }
  } else {
    input.classList.add("keyred");
    const audio = document.getElementById("waudio");
    audio.play();
  }

  if (!flag) chance--;
  document.getElementById("turnleft").innerHTML = "Turn Left : " + chance;
  if (chance === 4) {
    document.getElementById("h1").classList.remove("hide");
  } else if (chance === 3) {
    document.getElementById("h2").classList.remove("hide");
    document.getElementById("h1").classList.add("hide");
  } else if (chance === 2) {
    document.getElementById("h3").classList.remove("hide");
    document.getElementById("h2").classList.add("hide");
  } else if (chance === 1) {
    document.getElementById("h4").classList.remove("hide");
    document.getElementById("h3").classList.add("hide");
  }

  if (chance === 0) {
    document.getElementById("h5").classList.remove("hide");
    document.getElementById("h4").classList.add("hide");
    gameOver = true;
    swal("Game Over!", "You Lose", "error").then(() => {
      window.location.href = "index.html";
    });
  }
};
