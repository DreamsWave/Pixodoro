import { useEffect, useState } from "react";
import styled from "styled-components";

const TimeBase = styled.span`
  display: inline-flex;
  position: absolute;
  font-size: 1.6rem;
`;

type TimeProps = {
  seconds?: number;
};
function Time({ seconds = 0 }: TimeProps) {
  const [mins, setMins] = useState<string>("00");
  const [secs, setSecs] = useState<string>("00");

  useEffect(() => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    setMins(String(m < 10 ? "0" + m : m));
    setSecs(String(s < 10 ? "0" + s : s));
  }, [seconds]);

  return <TimeBase>{`${mins}:${secs}`}</TimeBase>;
}

export default Time;
