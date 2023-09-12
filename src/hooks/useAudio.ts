import { selectAppSettings } from "../features/appSettings/appSettingsSlice";
import { useAppSelector } from "../hooks";
import timerStartAudio from "../assets/audio/timer-start.wav";
import pomodoroEndAudio from "../assets/audio/pomodoro-end.wav";
import breakEndAudio from "../assets/audio/break-end.wav";

export const useAudio = () => {
  const { audioVolume } = useAppSelector(selectAppSettings);

  function play(audioType: "pomodoro-end" | "break-end" | "timer-start") {
    const audio = new Audio();
    audio.volume = audioVolume;
    switch (audioType) {
      case "timer-start":
        audio.src = timerStartAudio;
        break;
      case "pomodoro-end":
        audio.src = pomodoroEndAudio;
        break;
      case "break-end":
        audio.src = breakEndAudio;
        break;
      default:
        console.log("No audio found");
        return;
    }
    audio.play();
  }

  return { play };
};
