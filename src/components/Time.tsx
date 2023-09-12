import { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { useAppSelector } from "../hooks";
import { selectTimer } from "../features/timer/timerSlice";

const TimeBase = styled.span`
  display: inline-flex;
  position: absolute;
  font-size: 1.6rem;
`;

function Time() {
  const [mins, setMins] = useState<string>("00");
  const [secs, setSecs] = useState<string>("00");
  const { secondsLeft, status } = useAppSelector(selectTimer);
  const theme = useTheme();

  useEffect(() => {
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    setMins(String(m < 10 ? "0" + m : m));
    setSecs(String(s < 10 ? "0" + s : s));
  }, [secondsLeft]);

  return (
    <TimeBase>
      {mins}
      <span
        style={{
          color:
            status === "pomodoro"
              ? theme.color?.primary
              : theme.color?.secondary,
        }}
      >
        :
      </span>
      {secs}
    </TimeBase>
  );
}

export default Time;
