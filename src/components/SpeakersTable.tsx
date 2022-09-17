import { ActionIcon, Button, Table } from '@mantine/core';
import {
  IconTrash,
  IconPlayerPause,
  IconPlayerPlay,
  IconPlayerStop,
} from '@tabler/icons';
import { useContext } from 'react';
import { CurrentSpeakerContext } from '../contexts/CurrentSpeakerContext';
import { formatTime } from '../helpers/time';

function SpeakersTime() {
  const {
    currentSpeaker,
    speakers,
    startSpeach,
    stopSpeach,
    removeSpeaker,
    resetSpeakerTime,
  } = useContext(CurrentSpeakerContext);

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Total Time</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {speakers.map((row) => (
          <tr key={row.name}>
            <td>{row.name}</td>
            <td>{formatTime(row.time)}</td>
            <td>
              <Button.Group>
                {currentSpeaker?.name !== row.name ? (
                  <ActionIcon onClick={() => startSpeach?.(row)}>
                    <IconPlayerPlay />
                  </ActionIcon>
                ) : (
                  <ActionIcon onClick={() => stopSpeach?.()}>
                    <IconPlayerPause />
                  </ActionIcon>
                )}
                <ActionIcon
                  onClick={() => removeSpeaker?.(row)}
                  disabled={currentSpeaker?.name === row.name}
                >
                  <IconTrash />
                </ActionIcon>
                <ActionIcon
                  onClick={() => resetSpeakerTime?.(row)}
                  disabled={currentSpeaker?.name === row.name}
                >
                  <IconPlayerStop />
                </ActionIcon>
              </Button.Group>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default SpeakersTime;
