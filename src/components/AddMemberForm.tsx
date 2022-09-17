import { IconPlus } from '@tabler/icons';
import { FormEvent, useContext, useState } from 'react';
import { ActionIcon, TextInput, useMantineTheme } from '@mantine/core';
import { SpeakersContext } from '../contexts/SpeakersContext';

export function AddMemberForm() {
  const theme = useMantineTheme();
  const [name, setName] = useState('');
  const { addSpeaker } = useContext(SpeakersContext);

  const handleAddName = (e: FormEvent) => {
    e.preventDefault();

    if (!name) {
      return;
    }
    addSpeaker({ name, time: 0 });
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
