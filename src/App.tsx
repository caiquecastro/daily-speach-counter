import { ActionIcon, MantineProvider, Text, TextInput, Title, useMantineTheme } from '@mantine/core'
import { useEffect, useState } from 'react'
import './App.css'
import { IconPlus } from '@tabler/icons'
import { Speaker } from './models/Speaker'
import SpeakersTime from './components/SpeakersTable'
import { formatTime } from './helpers/time'
import { SpeakerContext } from './contexts/SpeakerContext'

function App() {
  const theme = useMantineTheme()
  const [name, setName] = useState('')
  const [rows, setRows] = useState<Speaker[]>([])
  const [startedAt, setStartedAt] = useState<number>()
  const [elapsedTime, setElapsedTime] = useState<number>()
  const [currentSpeaker, setSpeaker] = useState<Speaker>()

  const handleAddName = () => {
    if (!name) {
      return
    }
    setRows((currentRows) => currentRows.concat({ name, time: 0 }))
    setName('')
  }

  const updateSpeakersTime = (speaker: Speaker, startTime: number) => {
    setRows((rows) => rows.map((row) => {
      if (row.name === speaker.name) {
        return {
          ...row,
          time: row.time + (Date.now() - startTime)
        }
      }
      return row;
    }))
  }

  const handleStartSpeach = (speaker: Speaker) => {
    if (currentSpeaker && startedAt) {
      updateSpeakersTime(currentSpeaker, startedAt)
    }

    setStartedAt(Date.now())
    setSpeaker?.(speaker)
  }

  const handleStopSpeach = () => {
    if (currentSpeaker && startedAt) {
      updateSpeakersTime(currentSpeaker, startedAt)
    }

    setStartedAt(undefined)
    setSpeaker?.(undefined)
  }

  const handleRemoveSpeaker = (speakerToRemove: Speaker) => {
    if (currentSpeaker?.name === speakerToRemove.name) {
      return;
    }

    setRows(speakers => speakers.filter(speaker => speaker.name !== speakerToRemove.name))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const newElapsedTime = startedAt ? Date.now() - startedAt : 0
      setElapsedTime(newElapsedTime)
    }, 1)

    return () => {
      clearTimeout(timer)
    }
  }, [startedAt, elapsedTime])

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <SpeakerContext.Provider value={{ currentSpeaker, setSpeaker }}>
        <div className="App">
          <Text>
            {currentSpeaker ? `${currentSpeaker.name} is speaking for` : 'Nobody is speaking'}
          </Text>
          <Title order={1}>{formatTime(elapsedTime)}</Title>
          <TextInput
            rightSection={
              <ActionIcon onClick={handleAddName} color={theme.primaryColor} variant="filled" radius="xl">
                <IconPlus size={18} stroke={1.5} />
              </ActionIcon>
            }
            label="Add a new member name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <SpeakersTime
            rows={rows}
            onStartSpeach={handleStartSpeach}
            onStopSpeach={handleStopSpeach}
            onRemoveSpeaker={handleRemoveSpeaker} />
        </div>
      </SpeakerContext.Provider>
    </MantineProvider>
  )
}

export default App
