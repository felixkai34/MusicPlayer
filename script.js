const playlistcontainer = document.getElementsByClassName("playlistContainer")[0];
const currentAndTotaltime = document.getElementsByClassName("currentAndTotaltime")[0];
const audioTag = document.getElementsByClassName("audioTag")[0];
const currentprogresstag = document.getElementById("currentprogress");
const playbutton = document.getElementsByClassName("playButton")[0];
const pausebutton = document.getElementsByClassName("pauseButton")[0];
const previousButton = document.getElementsByClassName("previousButton")[0];
const nextButton = document.getElementsByClassName("nextButton")[0];

const track = [
{trackid:"music/pyithutattaw.mp3",title:"Pyi thu tat taw"},

{trackid:"music/lastbattle.mp3",title:"Last Battle"},

{trackid:"music/naymawineainpyanchain.mp3",title:"Nay Ma Win Eain Pyan Chain"},

{trackid:"music/MyanmarMilitaryCoupRevolutionsong.mp3",title:"MyanmarMilitaryCoupRevolutionsong"},
]

for (let i=0;i<track.length;i++) {

const trackTags = document.createElement("div")

trackTags.addEventListener("click",() => {
const trackid = track[i].trackid;
audioTag.src= trackid;
audioTag.play();
isplaying=true;
updateplayandpausebutton();
currentplayingindex=i;
});

trackTags.classList.add ("trackitem");
const titles = (i+1).toString() + ". " +track[i].title;
trackTags.textContent=titles;  
playlistcontainer.append(trackTags);

}
//Duration
let durationtext ="00:00";
let duration=0;
audioTag.addEventListener("loadeddata",() => {
duration = Math.floor(audioTag.duration);
durationtext= minuteandsecond(duration);

})
//Current time
audioTag.addEventListener("timeupdate",()=>{
const currenttime = Math.floor (audioTag.currentTime);
const currenttimetext=minuteandsecond(currenttime);
const CandDText = currenttimetext+ " / " + durationtext;
currentAndTotaltime.textContent = CandDText;
updatecurrentprogress(currenttime);
});

//progressbar 
const updatecurrentprogress = (currentTime) => {
    const currentprogresswidth= (500/duration)*currentTime;
    currentprogresstag.style.width =currentprogresswidth.toString() + "px";
}

const minuteandsecond= (totalsecond)=> {
    const minutes = Math.floor(totalsecond/60);
    const seconds = Math.floor(totalsecond%60);

    const minutetext=minutes < 10 ? "0" + minutes.toString() : minutes
    const secondtext=seconds < 10 ? "0" + seconds.toString() : seconds
    return minutetext + ":" + secondtext;
};

//playbutton
let currentplayingindex=0;
let isplaying=false;
playbutton.addEventListener("click",()=>{
    const currenttime=Math.floor(audioTag.currentTime)
    isplaying = true;
    if(currenttime===0){
    const songidtoplay = track[currentplayingindex].trackid;
    audioTag.src= songidtoplay;
    audioTag.play();
    updateplayandpausebutton()
    }else {
        audioTag.play();
        updateplayandpausebutton();
    }
});

//pausebutton
pausebutton.addEventListener("click",()=>{
    isplaying=false;
    audioTag.pause();
    updateplayandpausebutton();
})

previousButton.addEventListener("click",()=>{
   if (currentplayingindex===0){
   currentplayingindex=3;
   const songidtoplay=track[currentplayingindex].trackid;
   audioTag.src=songidtoplay;
   audioTag.play();
   }else{
    currentplayingindex-=1;
    const songidtoplay=track[currentplayingindex].trackid;
    audioTag.src=songidtoplay;
    audioTag.play();
   
   }
});

nextButton.addEventListener("click",()=>{
    if (currentplayingindex===track.length-1){
        currentplayingindex=0;
        const songidtoplay=track[currentplayingindex].trackid;
        audioTag.src=songidtoplay;
        audioTag.play();
        }else{
         currentplayingindex+=1;
         const songidtoplay=track[currentplayingindex].trackid;
         audioTag.src=songidtoplay;
         audioTag.play();
        }
});


//changeplayandpausebutton
const updateplayandpausebutton= ()=>{
if(isplaying){
    playbutton.style.display="none";
    pausebutton.style.display="inline";
}else{
    playbutton.style.display="inline";
    pausebutton.style.display="none";
}};

