let bossHealth = 1000;
let bossStrength = 40;
let tame = 0;
let playerHealth = 100;
let potions = 1;
let potionStrength = 40;
let playerStrength = 100;
let instructions = document.getElementById("instruction");
let details = document.getElementById("instructionDetails");
let player = document.getElementById("player");
let boss = document.getElementById("boss");
let cycle;
let dodged = false;
let end = false;
async function heal() {
    if (playerHealth == 100) {
        player.innerHTML = "You have max health!";
    }
    else if (potions > 0) {
        await wait(500);
        potions--;
        playerHealth = Math.min(100, playerHealth + potionStrength);
        player.innerHTML = "You healed";
    }
    else {
        details.innerHTML = "NO POTIONS LEFT";
    }
    updatePlayerHealth();
}
function updatePlayerHealth() {
    document.getElementById('hp').innerHTML = `HP: ${playerHealth}`;
}
async function attack() {
    if (end)
        return;
    document.getElementById('attackbtn').disabled = true;
    await wait(1000);
    document.getElementById('attackbtn').disabled = false;
    bossHealth = Math.max(0, bossHealth - playerStrength);
    tame = Math.max(0, tame - 10);
    if (bossHealth == 0) {
        instructions.innerHTML = "You slayed the fish";
        endFight();
    }
    else
        player.innerHTML = "You attacked the fish";
    updateTame();
    updateBossHealth();
}
function updateBossHealth() {
    document.getElementById('bossHp').innerHTML = `BOSS HP: ${bossHealth}`;
}
async function tameBoss() {
    player.innerText = "Trying to tame";
    document.getElementById('tamebtn').disabled = true;
    await wait(2000);
    document.getElementById('tamebtn').disabled = false;
    tame = Math.min(100, tame + 34);
    if (tame != 100)
        player.innerHTML = "You tried to tame the boss";
    else {
        instructions.innerHTML = "You tamed the boss";
        endFight();
    }
    updateTame();
}
function updateTame() {
    document.getElementById('tame').innerHTML = `TAME METER: ${tame} %`;
}
function dodge() {
    dodged = true;
}
function wait(delayInMilliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, delayInMilliseconds);
    });
}
async function dodgeWindow() {
    if (end)
        return;
    console.log("DODGE WINDOW")
    player.innerHTML = "You have a few seconds to dodge";
    await wait(3000);
    boss.innerText = " ";
    if (dodged == false) {

        playerHealth = Math.max(0, playerHealth - bossStrength);
        if (playerHealth == 0) {

            instructions.innerHTML = "You have died";
            endFight();
        }
        else {
            player.innerHTML = "You have taken damage";
        }
        updatePlayerHealth();
    }
    else
        player.innerText = "You dodged";
    dodged = false;
}
async function bossAttack() {
    while (!end) {
        await wait(7000);
        console.log("ATTACK")
        boss.innerHTML = "The fish is fighting back!";
        dodgeWindow();
    }
}
function Fight() {
    let start = false;
    instructions.innerText = "You have started a FISH FIGHT";
    details.innerText = "Press space to engage";
    document.onkeydown = function (e) {
        if (e.key == " " && !start) {
            document.getElementById("bossfight").style.display = "block";
            start = true
            details.innerText = "";
            bossAttack();
        }
    }
}
function Game() {
    let start = false;
    instructions.innerText = "Welcome to Remains of the Settled";
    details.innerText = "Press space to start";
    document.onkeydown = function (e) {
        if (e.key == " " && !start) {
            start = true;
            Fight();
        }

    }
}
function endFight() {
    end = true;
    let continued = false;
    details.innerText = "Press space to continue";
    document.getElementById("bossfight").style.display = "none";
    document.onkeydown = function (e) {
        if (e.key == " " && !continued) {
            continued = true;
            if (playerHealth != 0)
                Claim();
            else {
                Death()
            }
        }
    }
}
function Claim() {
    instructions.innerText = "You have completed the fight";
    if (tame == 100) {
        details.innerText = "The fish has given you a magical item in return for taming it";
    }
    else {
        details.innerHTML = "The fish has dropped a magical scale after turning into dust";
    }
}
function Death() {
    instructions.innerText = "Refresh to start over";
    details.innerText = " ";
}
window.onload = Game();
