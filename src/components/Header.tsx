import { Text, Title } from "@mantine/core";
import { useContext } from "react";
import { SpeakerContext } from "../contexts/SpeakerContext";
import { formatTime } from "../helpers/time";

export function Header() {
  const { currentSpeaker, elapsedTime } = useContext(SpeakerContext);
  return (
    <>
      <Text>
        {currentSpeaker
          ? `${currentSpeaker.name} is speaking for`
          : "Nobody is speaking"}
      </Text>
      <Title order={1}>{formatTime(elapsedTime)}</Title>
    </>
  );
}
