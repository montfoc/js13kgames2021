const canvas = document.getElementById("viewport");
const context = canvas.getContext("2d");

const FPS_RATE = 60;
const LOOP_TIME = 1 / FPS_RATE;
const SCREEN_WIDTH = canvas.width;
const SCREEN_HEIGHT = canvas.height;
const DEFAULT_GRAVITY = 9.81;
const PLATFORM_HEIGHT = 15;
const DEFAULT_PLAYER_HEIGHT = 50;
const COIN_WIDTH = 5;
const COLLISION_SPACER = 0.001;
const NUM_SCENES = 2;

let currentScene = 1; // 0;
let player;
let scenes = [];
let rightKeyPressed = false;
let leftKeyPressed = false;
let isPlayerJumping = false;
let jumpKeyPressed = false;
let actionKeyPressed = false;
let circle;
let isPaused = true;
let isGameOver = false;
let coinCounter = 0;
let frame = 0;
