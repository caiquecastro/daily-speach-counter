import { Text, Title } from '@mantine/core';
import { useContext } from 'react';
import { CurrentSpeakerContext } from '../contexts/CurrentSpeakerContext';
import { formatTime } from '../helpers/time';

export function Header() {
  const { currentSpeaker, elapsedTime } = useContext(CurrentSpeakerContext);

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
