import { IconPlus } from '@tabler/icons';
import { FormEvent, useContext, useState } from 'react';
import { SpeakerContext } from '../contexts/SpeakerContext';
import { ActionIcon, TextInput, useMantineTheme } from '@mantine/core';

export function AddMemberForm() {
  const theme = useMantineTheme();
  const [name, setName] = useState('');
  const { addSpeaker } = useContext(SpeakerContext);

  const handleAddName = (e: FormEvent) => {
    e.preventDefault();

    if (!name) {
      return;
    }
    addSpeaker?.({ name, time: 0 });
    setName('');
  };

  return (
    <form onSubmit={handleAddName}>
      <TextInput
        rightSection={
          <ActionIcon color={theme.primaryColor} variant="filled" radius="xl">
            <IconPlus size={18} stroke={1.5} />
          </ActionIcon>
        }
        label="Add a new member name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </form>
  );
}
