let audio, playbtn, title, poster, artists, mutebtn, seekslider, volumeslider, seeking=false, seekto, curtimetext, durtimetext, playlist_index, playlist_status, dir, playlist, ext, agent, playlist_artist, repeat, randomSong;

//Creacion del arreglo con toda la informacion de: musica, titulo, poster, imagen, artista
dir="soundtrack/";
playlist = ["YuseiTheme",
            "GalaxianWars",
            "ItAllComesDownToThis", 
            "KissInTheDark",
            "Esaka-KOF98", 
            "BurninRubber", 
            "HeavenShakingEvent", 
            "KatakuriTheme", 
            "NeonNightRiders", 
            "YouSayRun", 
            "Retrowave", 
            "PassionateDuelist", 
            "TheFinalBell", 
            "MotorSpecies", 
            "TheFinisher", 
            "YourVibe", 
            "UnleashForce", 
            "VegaTheme", 
            "WilyStage-remix", 
            "UrbanFragments"];

title =["Yusei Theme", 
        "Galaxian Wars", 
        "It All Comes Down to This", 
        "Kiss In The Dark",
        "Esaka", 
        "Burnin Rubber", 
        "Heaven Shaking Event", 
        "Katakuri Theme", 
        "Neon Night Riders", 
        "You Say Run", 
        "Retrowave", 
        "Passionate Duelist", 
        "The Final Bell", 
        "Motor Species", 
        "The Finisher", 
        "Your Vibe", 
        "Unleash Force", 
        "Vega Theme", 
        "Wily Stage Remix", 
        "UrbanFragments"];
        
artists = ["Yu Gi Oh 5D OST",
           "OST Saint Seiya", 
           "OST Ranma 1/2", 
           "OST Metal Slug 3", 
           "OST KOF 98", 
           "RRT4 OST", 
           "OST Naruto", 
           "OST One Piece", 
           "TMNT IV OST", 
           "My Hero Academia OST", 
           "CONTROL OST", 
           "Yu Gi Oh OST", 
           "Bill Conti", 
           "RRT4 OST", 
           "Hajime No Ippo OST", 
           "RRT4 OST", 
           "Yu Gi Oh 5D OST", 
           "Street FigtherII OST", 
           "Megaman OST", 
           "RRT4 OST"];

poster = ["img/ncs01.jpg", 
          "img/ncs01.jpg", 
          "img/ncs01.jpg", 
          "img/ncs01.jpg", 
          "img/ncs01.jpg",
          "img/ncs01.jpg",
          "img/ncs01.jpg",
          "img/ncs01.jpg",
          "img/ncs01.jpg",
          "img/ncs01.jpg",
          "img/ncs01.jpg",
          "img/ncs01.jpg",
          "img/ncs01.jpg",
          "img/ncs01.jpg",
          "img/ncs01.jpg",
          "img/ncs01.jpg",
          "img/ncs01.jpg",
          "img/ncs01.jpg",
          "img/ncs01.jpg",
          "img/ncs01.jpg"];

//Para poder reproducir en cualquier navegador
ext=".mp3";
agent = navigator.userAgent.toLowerCase();
if(agent.indexOf('firefox') != -1 || agent.indexOf('opera')!=-1){
     ext=".ogg";
}

 //poner los objetos de referencia
playbtn = document.getElementById("playpausebtn");
nextbtn = document.getElementById("nextbtn");
prevbtn = document.getElementById("prevbtn");
mutebtn = document.getElementById("mutebtn");
seekslider = document.getElementById("seekslider");
volumeslider = document.getElementById("volumeslider");
curtimetext = document.getElementById("curtimetext");
durtimetext = document.getElementById("durtimetext");
playlist_status = document.getElementById("playlist_status");
playlist_artist = document.getElementById("playlist_artist");
repeat = document.getElementById("repeat");
randomSong = document.getElementById("random");
playlist_index = 0;

//objetos de audio
audio = new Audio();
audio.src = dir + playlist[0] + ext;
audio.loop = false;

//titulo y artista de la primera cancion
playlist_status.innerHTML = title[playlist_index];
playlist_artist.innerHTML = artists[playlist_index];

//agregar eventos
playbtn.addEventListener("click",playPause);
nextbtn.addEventListener("click",nextSong);
prevbtn.addEventListener("click",prevSong);
mutebtn.addEventListener("click",mute);
seekslider.addEventListener("mousedown", function(e){ seeking=true; seek(e); });
seekslider.addEventListener("mousemove", function(e){ seek(e); });
seekslider.addEventListener("mouseup", function(){ seeking=false; });
volumeslider.addEventListener("mousemove", setvolume);
audio.addEventListener("timeupdate", function(){ seektimeupdate(); });
audio.addEventListener("ended", function(){ switchTrack();  });
repeat.addEventListener("click", loop);
randomSong.addEventListener("click", random);

//funciones
function fetchMusicDetails(){
    //imagen de caratula pausey play
    $("#playpausebtn img").attr("src", "img/pause-red.png");
    $("#bgImage").attr("src", poster[playlist_index]);
    $("#image").attr("src", "img/disk.jpg");//poster[playlist_index]);
    //titulo y artista
    playlist_status.innerHTML = title[playlist_index];
    playlist_artist.innerHTML = artists[playlist_index];
    //audio
    audio.src = dir+playlist[playlist_index]+ext;
    audio.play();
}
function playPause(){
    if(audio.paused){
        audio.play();
        $("#playpausebtn img").attr("src", "img/pause-red.png");
    }
    else{
        audio.pause();
        $("#playpausebtn img").attr("src", "img/play-red.png");
    }
}
function nextSong(){
    playlist_index++;
    if(playlist_index > playlist.length -1){
        playlist_index = 0;
    }
    fetchMusicDetails();
}
function prevSong(){
    playlist_index--;
    if(playlist_index < 0){
        play_index = playlist.length -1;
    }
    fetchMusicDetails();
}
function mute(){
    if(audio.muted){
        audio.muted=false;
        $("#mutebtn img").attr("src", "img/speaker.png");
    }
    else{
        audio.muted=true;
        $("#mutebtn img").attr("src", "img/mute.png");
    }
}
function seek(e){
    if(audio.duration == 0){
        null
    }
    else{
        if(seeking){
            seekslider.value = e.clientX - seekslider.offsetLeft;
            seekto = audio.duration * (seekslider.value/100);
            audio.currentTime = seekto;
        }
    }
}
function setvolume(){
    audio.volume = volumeslider.value/100;  
}
function seektimeupdate(){
    if(audio.duration){
        let nt = audio.currentTime * (100 / audio.duration);
        seekslider.value = nt;
        var curmins = Math.floor(audio.currentTime / 60);
        var cursecs = Math.floor(audio.currentTime - curmins *60);
        var durmins = Math.floor(audio.duration / 60);
        var dursecs = Math.floor(audio.duration - durmins *60);
        if(cursecs < 10){ cursecs = "0" + cursecs }
        if(dursecs < 10){ dursecs = "0" + dursecs }
        if(curmins < 10){ curmins = "0" + curmins }
        if(dursecs < 10){ dursecs = "0" + dursecs }
        curtimetext.innerHTML = curmins + ":" + cursecs;
        durtimetext.innerHTML = durmins + ":" + dursecs;
    }
    else{
        curitimetext.innerHTML = "00"+":"+"00";
        duritimetext.innerHTML = "00"+":"+"00";
    }
}
function switchTrack(){
    if(playlist_index == (playlist.length -1)){
        playlist_index = 0;
    }
    else{
        playlist_index++;
    }
    fetchMusicDetails();
}
function loop(){
    if(audio.loop){
        audio.loop= false;
        $("#repeat img").attr("src", "img/rep.png");
    }
    else{
        audio.loop=true;
        $("#repeat img").attr("src", "img/rep1.png");
    }
}
function getRandomNumber(min,max){
    let step1 = max-min+1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return result;
}
function random(){
    let randomIndex = getRandomNumber(0, playlist.length-1);
    playlist_index = randomIndex;
    fetchMusicDetails();
}