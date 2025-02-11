console.log('Js is working');

let currentSong = new Audio();

var songs;

// Change Sec into Min:Sec

function secTominsec(second) {
    if (isNaN(second) || second < 0) {
        return "00:00";
    }
    const minute = Math.floor(second / 60);
    const remaining_second = Math.floor(second % 60);
    if (minute < 10) {
        min = '0' + minute
    } else {
        min = minute
    }
    if (remaining_second < 10) {
        sec = '0' + remaining_second
    } else {
        sec = remaining_second
    }
    return `${min}:${sec}`;
}

// Changing Songs duration using seek bar

function seekup(mouseX) {
    let a = mouseX - 450;
    let b = a / 983 * currentSong.duration;
    return b;
}

// Get song from folder 

async function getSongs() {
    let a = await fetch("https://samarth9192.github.io/My-Music/Songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href);
        }
    }
    return songs;
}
function playMusic(title, pause = false) {
    currentSong.src = "/Songs/" + title;
    document.querySelector(".song-name").innerHTML = decodeURI(title);
    document.querySelector(".song-time").innerHTML = "00:00/00:00";
    if (!pause) {
        currentSong.play()
        pl.src = "assets/pause.png";
    }
}
async function main() {

    // Get all the Song List

    let songs = await getSongs()
    playMusic(songs[0].split("/Songs/")[1], true);
    songs.forEach(e => {
        let p = e.split("/Songs/")[1];
        var s = p.replaceAll("%20", " ")
        document.querySelector(".songList").firstElementChild.innerHTML = document.querySelector(".songList").firstElementChild.innerHTML + `<ul><li class="c"><img class="wid invert" src="love-song.png" alt=""><div class="info">${s}</div></li>
                        <li>Play now<img class="wid invert" src="assets/play.png" alt=""></li></ul>`;
    });

    // Event listner when any song was clicked

    Array.from(document.querySelector(".songList").getElementsByTagName("ul")).forEach(e => {
        e.addEventListener("click", (() => {
            let title = e.querySelector(".info").innerHTML;
            currentSong.src = "/Songs/" + title;
            document.querySelector(".song-name").innerHTML = title;
            currentSong.play();
            pl.src = "assets/pause.png";
        }))
    });

    // Live Song Update

    currentSong.addEventListener("timeupdate", (() => {
        document.querySelector(".song-time").innerHTML = `${secTominsec(currentSong.currentTime)} / ${secTominsec(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    }))
    document.querySelector(".seek").addEventListener("click", (() => {
        const mouseX = event.clientX;
        console.log(mouseX);
        currentSong.currentTime = seekup(mouseX);
    }))
    function nextSong() {
        let i = songs.indexOf(currentSong.src);
        currentSong.src = songs[i + 1]
        currentSong.play();
        pl.src = "assets/pause.png";
        document.querySelector(".song-name").innerHTML = currentSong.src.split("/Songs/")[1].replaceAll("%20"," ");
    }
    currentSong.addEventListener("ended",()=> {
    nextSong();
    });
    prev.addEventListener("click", (() => {
        let i = songs.indexOf(currentSong.src)
        if (i > 0) {
            currentSong.src = songs[i - 1]
            currentSong.play();
            pl.src = "assets/pause.png";
            document.querySelector(".song-name").innerHTML = currentSong.src.split("/Songs/")[1].replaceAll("%20"," ");
        }
        else {
            currentSong.pause();
            pl.src = "assets/play.png";
            setTimeout(() => {                
                alert('Error , there is no previous song');
            }, 10 );
        }
    }))
    next.addEventListener("click", ()=> {
        nextSong();
        });
}
main()

// Play Pause button

pl.addEventListener(`click`, function () {
    if (currentSong.paused) {
        currentSong.play();
        pl.src = "assets/pause.png";
    } else {
        currentSong.pause();
        pl.src = "assets/play.png"
    }
});

document.querySelector(".hamburger").addEventListener("click", (() => {
    document.querySelector(".left").classList.toggle("hide")
    document.querySelector("#hamburger").classList.toggle("hidden")
    document.querySelector("#cross").classList.toggle("hidden")
}))

document.querySelector("#cross").addEventListener("click", (() => {
    document.querySelector(".left").classList.toggle("hide")
    document.querySelector("#hamburger").classList.toggle("hidden")
    document.querySelector("#cross").classList.toggle("hidden")
}))
document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=> {
   currentSong.volume = (e.target.value)/100
})


