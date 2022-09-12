import { ActionIcon, Table } from '@mantine/core';
import { IconPlayerPlay, IconPlayerStop, IconTrash } from '@tabler/icons';
import { useContext } from 'react';
import { SpeakerContext } from '../contexts/SpeakerContext';
import { formatTime } from '../helpers/time';
import { Speaker } from '../models/Speaker';

interface Props {
    rows: Speaker[];
    onStartSpeach: (speaker: Speaker) => void;
    onStopSpeach: () => void
    onRemoveSpeaker: (speaker: Speaker) => void;
}

function SpeakersTime({ rows, onStartSpeach, onStopSpeach, onRemoveSpeaker }: Props) {
    const {
        currentSpeaker,
    } = useContext(SpeakerContext)

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
            {rows.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{formatTime(row.time)}</td> 
                <td>
                  {
                    currentSpeaker?.name !== row.name ? (
                      <ActionIcon onClick={() => onStartSpeach(row)}>
                        <IconPlayerPlay />
                      </ActionIcon>
                    ) : (
                      <ActionIcon onClick={() => onStopSpeach()}>
                        <IconPlayerStop />
                      </ActionIcon>
                    )
                  }
                  <ActionIcon
                    onClick={() => onRemoveSpeaker(row)}
                    disabled={currentSpeaker?.name === row.name}
                  >
                    <IconTrash />
                  </ActionIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    )
}

export default SpeakersTime;