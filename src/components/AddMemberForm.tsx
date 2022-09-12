import { ActionIcon, TextInput, useMantineTheme } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useContext, useState } from "react";
import { SpeakerContext } from "../contexts/SpeakerContext";

export function AddMemberForm() {
  const theme = useMantineTheme();
  const [name, setName] = useState("");
  const { addSpeaker } = useContext(SpeakerContext);

  const handleAddName = () => {
    if (!name) {
      return;
    }
    addSpeaker?.({ name, time: 0 });
    setName("");
  };

  return (
    <TextInput
      rightSection={
        <ActionIcon
          onClick={handleAddName}
          color={theme.primaryColor}
          variant="filled"
          radius="xl"
        >
          <IconPlus size={18} stroke={1.5} />
        </ActionIcon>
      }
      label="Add a new member name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
