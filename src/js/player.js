(function () {
  const playerStart = document.querySelector(".player__start");
  const playerWrapper = document.querySelector(".player__wrapper");
  const player = document.querySelector(".player");
  const playIcon = document.querySelector(".player__play");
  const soundIcon = document.querySelector(".player__sound-icon");
  const soundLine = document.querySelector(".player__sound-line");
  const soundRedLine = document.querySelector(".player__sound-redline");
  const circleButton = document.querySelector(".player__playback-button");
  const playbackLine = document.querySelector(".player__playback-line");
  const playbackRedLine = document.querySelector(".player__playback-redline");
  let startVolume = 0;
  let currentVolume;
  soundRedLine.style.width = "100%";

  const handleStart = () => {
    player.paused ? player.play() : player.pause(); //check if paused -> play
  };
  const togglePlay = (action = "start") => {
    if (action === "start") {
      playIcon.classList.add("player__play--active");
      playerStart.classList.add("player__start--paused");
    } else {
      playIcon.classList.remove("player__play--active");
      playerStart.classList.remove("player__start--paused");
    }
  };

  const changeVolume = (e) => {
    const currentTarget = e.currentTarget;
    const left = currentTarget.getBoundingClientRect().left;
    const soundBarWidth = parseInt(getComputedStyle(currentTarget).width);
    const newPosition = e.pageX - left;
    const percentValue = (newPosition / soundBarWidth) * 100;

    if (percentValue > 0 && percentValue < 100) {
      soundRedLine.style.width = `${percentValue}%`;
      player.volume = percentValue / 100;
    }
  };

  const toggleSound = () => {
    soundIcon.classList.toggle("player__sound-icon--mute");

    if (player.volume === 0) {
      player.volume = currentVolume;
      soundRedLine.style.width = `${currentVolume * 100}%`;
    } else {
      currentVolume = player.volume;
      player.volume = startVolume;
      soundRedLine.style.width = `${startVolume}%`;
    }
  };

  const handleDuration = (e) => {
    const barSize = parseInt(getComputedStyle(playbackLine).width);
    const circleWidth = parseInt(getComputedStyle(circleButton).width);
    const offsetX = e.offsetX;
    const newSize = offsetX + circleWidth / 2;
    const newTime = (newSize * player.duration) / barSize;
    player.currentTime = newTime;
  };

  const updateTime = () => {
    let orangeBar = player.currentTime / player.duration;
    playbackRedLine.style.width = `${orangeBar * 100}%`;
    if (player.ended) {
      player.currentTime = 0;
    }
  };

  playbackLine.addEventListener("click", handleDuration);
  player.addEventListener("timeupdate", updateTime);

  soundIcon.addEventListener("click", toggleSound);
  soundLine.addEventListener("click", changeVolume);

  playerStart.addEventListener("click", handleStart);
  playerWrapper.addEventListener("click", handleStart);

  player.onplay = () => {
    togglePlay();
  };
  player.onpause = () => {
    togglePlay("pause");
  };
})();
