import { ActionIcon, Button, Table } from "@mantine/core";
import { IconPlayerPlay, IconPlayerStop, IconTrash } from "@tabler/icons";
import { useContext } from "react";
import { SpeakerContext } from "../contexts/SpeakerContext";
import { formatTime } from "../helpers/time";

function SpeakersTime() {
  const { currentSpeaker, speakers, startSpeach, stopSpeach, removeSpeaker } =
    useContext(SpeakerContext);

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
                    <IconPlayerStop />
                  </ActionIcon>
                )}
                <ActionIcon
                  onClick={() => removeSpeaker?.(row)}
                  disabled={currentSpeaker?.name === row.name}
                >
                  <IconTrash />
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
