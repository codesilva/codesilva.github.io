const soundBoardContainer = document.querySelector('.soundboard');
const audio = document.querySelector('audio');
const audioSourceElem = document.querySelector('#audio-source');
const audioShortCutMap = {
  'a': 'file:///Users/edysilva/Downloads/canal/abertura-let-love-flow.mp3',
  'b': 'file:///Users/edysilva/Downloads/canal/suspense-mayor-efecto-de-sonido-online-audio-converter.mp3',
  'c': 'file:///Users/edysilva/Downloads/canal/we-donot-care.mp3'
};

const increaseVolume = () => {
  const newVolume = audio.volume + .1;
  if (newVolume > 1) {
    audio.volume = 1;

    return;
  }

  audio.volume = newVolume;
};

const decreaseVolume = () => {
  const newVolume = audio.volume - .1;
  if (newVolume < 0) {
    audio.volume = 0;

    return;
  }

  audio.volume = newVolume;
};

document.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'm':
      audio.volume = audio.volume === 0 ? .5 : 0;
      break;
    case 'ArrowUp':
      increaseVolume()
      break;

    case 'ArrowDown':
      decreaseVolume()
      break;
  }
});

const makeAudioLoader = (letter) => {
  return function buttonEventListener(e) {
    const audioLocation = audioShortCutMap[letter];

    if (!audioLocation) return;

    console.log(audioLocation);
    audioSourceElem.src = audioLocation;

    audio.load();
    audio.play();
  }
};

'abcdef'.split('').forEach(letter => {
  const button = document.createElement('button');
  button.innerText = letter.toUpperCase();

  button.addEventListener('click', makeAudioLoader(letter));

  soundBoardContainer.appendChild(button);
});
