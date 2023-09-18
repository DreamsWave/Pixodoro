import songAudio from "../../assets/audio/song.mp3";
import useMusic from "./useMusic";

function Music() {
  const { audio } = useMusic(songAudio);
  return <>{audio}</>;
}

export default Music;
