import { useEffect } from "react";
import { useAudio } from "react-use";

import { useAppSelector } from "../../hooks";
import { selectMusic } from "./musicSlice";

export default function useMusic(songAudio: string) {
  const { volume } = useAppSelector(selectMusic);
  const { playing } = useAppSelector(selectMusic);
  const [audio, state, controls, ref] = useAudio({
    src: songAudio,
    autoPlay: false,
    loop: true,
  });

  useEffect(() => {
    controls.volume(volume);
  }, [volume]);

  useEffect(() => {
    if (playing) {
      controls.play();
    } else {
      controls.pause();
    }
  }, [playing]);

  return { audio, state, controls, ref };
}
