const firebaseConfig = {
  apiKey: "AQUI_TU_APIKEY",
  authDomain: "AQUI",
  databaseURL: "AQUI",
  projectId: "AQUI",
  storageBucket: "AQUI",
  messagingSenderId: "AQUI",
  appId: "AQUI"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

function agregar() {

let url = document.getElementById("url").value;

db.ref("ads").push({
url:url
});

}

db.ref("ads").on("value", snapshot => {

let data = snapshot.val();

let player = document.getElementById("player");

if(player){

player.innerHTML="";

let ads = Object.values(data);

let i = 0;

function loop(){

let ad = ads[i];

if(ad.url.includes("mp4")){

player.innerHTML = `<video src="${ad.url}" autoplay muted></video>`;

}else{

player.innerHTML = `<img src="${ad.url}">`;

}

i++;

if(i >= ads.length) i = 0;

setTimeout(loop,8000);

}

loop();

}

});

