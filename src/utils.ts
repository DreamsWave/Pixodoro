import timerStartAudio from "./assets/audio/timer-start.wav";
import pomodoroEndAudio from "./assets/audio/pomodoro-end.wav";
import breakEndAudio from "./assets/audio/break-end.wav";
import { AUDIO_TYPES } from "./types";

export const playAudio = (audioType: AUDIO_TYPES, volume?: number) => {
  let audio = "";
  volume = volume ?? 0.5;
  switch (audioType) {
    case "timer-start":
      audio = timerStartAudio;
      break;
    case "pomodoro-end":
      audio = pomodoroEndAudio;
      break;
    case "break-end":
      audio = breakEndAudio;
      break;
  }
  const snd = new Audio(audio);
  snd.volume = volume;
  snd.play();
};
