import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getDatabase,
ref,
push,
onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const firebaseConfig = {

apiKey: "TU_API_KEY",
authDomain: "TU_DOMINIO.firebaseapp.com",
databaseURL: "TU_DATABASE_URL",
projectId: "TU_PROJECT_ID",
storageBucket: "TU_BUCKET",
messagingSenderId: "TU_ID",
appId: "TU_APP_ID"

};


const app = initializeApp(firebaseConfig);

const db = getDatabase(app);



const player = document.getElementById("player");
const btn = document.getElementById("btn");



if(btn){

btn.onclick = () => {

let url = document.getElementById("url").value;

push(ref(db,"ads"),{
url:url
});

};

}



onValue(ref(db,"ads"),(snapshot)=>{

let data = snapshot.val();

if(!data) return;

if(player){

let ads = Object.values(data);

let i=0;

function loop(){

let ad = ads[i];

if(ad.url.includes("mp4")){

player.innerHTML = `<video src="${ad.url}" autoplay muted loop style="width:100%"></video>`;

}else{

player.innerHTML = `<img src="${ad.url}" style="width:100%">`;

}

i++;

if(i>=ads.length) i=0;

setTimeout(loop,8000);

}

loop();

}

});


