import { useState, useEffect } from "react";
import styled from "styled-components";
import { POMODORO_STATUS } from "../types";

const TimeBase = styled.span`
  display: inline-flex;
  position: absolute;
  font-size: 1.6rem;
`;

type TimeProps = {
  seconds?: number;
  status?: POMODORO_STATUS;
};
function Time({ seconds = 0, status = "pomodoro" }: TimeProps) {
  const [mins, setMins] = useState<string>("00");
  const [secs, setSecs] = useState<string>("00");

  useEffect(() => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    setMins(String(m < 10 ? "0" + m : m));
    setSecs(String(s < 10 ? "0" + s : s));
  }, [seconds]);

  return (
    <TimeBase>
      {mins}
      <span style={{ color: status === "pomodoro" ? "tomato" : "forestgreen" }}>
        :
      </span>
      {secs}
    </TimeBase>
  );
}

export default Time;
