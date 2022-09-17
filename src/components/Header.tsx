import { Text, Title } from '@mantine/core';
import { useContext } from 'react';
import { ElapsedTimeContext } from '../contexts/ElapsedTimeContext';
import { SpeakersContext } from '../contexts/SpeakersContext';
import { formatTime } from '../helpers/time';

export function Header() {
  const { elapsedTime } = useContext(ElapsedTimeContext);
  const { currentSpeaker } = useContext(SpeakersContext);

  return (
    <>
      <Text>
        {currentSpeaker
          ? `${currentSpeaker.name} is speaking for`
          : 'Nobody is speaking'}
      </Text>
      <Title order={1}>{formatTime(elapsedTime)}</Title>
    </>
  );
}
