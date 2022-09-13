import { useLocalStorage } from '@mantine/hooks';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { Speaker } from '../models/Speaker';

export const SpeakerContext = createContext<{
  currentSpeaker?: Speaker;
  elapsedTime?: number;
  speakers: Speaker[];
  addSpeaker?: (speaker: Speaker) => void;
  removeSpeaker?: (speaker: Speaker) => void;
  startSpeach?: (speaker: Speaker) => void;
  stopSpeach?: () => void;
  resetSpeakerTime?: (speaker: Speaker) => void;
}>({
  speakers: [],
});

export function SpeakerProvider({ children }: PropsWithChildren) {
  const [currentSpeaker, setSpeaker] = useState<Speaker>();
  const [startedAt, setStartedAt] = useState<number>();
  const [elapsedTime, setElapsedTime] = useState<number>();
  const [speakers, setSpeakers] = useLocalStorage<Speaker[]>({
    key: 'speakers',
    defaultValue: [],
  });

  const addSpeaker = (speaker: Speaker) => {
    setSpeakers((currentSpeakers) => {
      const hasSpeakerWithSameName = currentSpeakers.find(
        (row) => row.name === speaker.name
      );

      if (hasSpeakerWithSameName) {
        return currentSpeakers;
      }

      const allSpeakers = currentSpeakers.concat({ ...speaker });

      return allSpeakers.sort((a, b) => a.name.localeCompare(b.name));
    });
  };

  const updateSpeakersTime = (speaker: Speaker, startTime: number) => {
    setSpeakers((rows) =>
      rows.map((row) => {
        if (row.name === speaker.name) {
          return {
            ...row,
            time: row.time + (Date.now() - startTime),
          };
        }
        return row;
      })
    );
  };

  const startSpeach = (speaker: Speaker) => {
    if (currentSpeaker && startedAt) {
      updateSpeakersTime(currentSpeaker, startedAt);
    }

    setStartedAt(Date.now());
    setSpeaker?.(speaker);
  };

  const stopSpeach = () => {
    if (currentSpeaker && startedAt) {
      updateSpeakersTime(currentSpeaker, startedAt);
    }

    setStartedAt(undefined);
    setSpeaker?.(undefined);
  };

  const removeSpeaker = (speakerToRemove: Speaker) => {
    if (currentSpeaker?.name === speakerToRemove.name) {
      return;
    }

    setSpeakers((speakers) =>
      speakers.filter((speaker) => speaker.name !== speakerToRemove.name)
    );
  };

  const resetSpeakerTime = (speaker: Speaker) => {
    setSpeakers((rows) =>
      rows.map((row) => {
        if (row.name === speaker.name) {
          return {
            ...row,
            time: 0,
          };
        }
        return row;
      })
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const newElapsedTime = startedAt ? Date.now() - startedAt : 0;
      setElapsedTime(newElapsedTime);
    }, 1);

    return () => {
      clearTimeout(timer);
    };
  }, [startedAt, elapsedTime]);

  return (
    <SpeakerContext.Provider
      value={{
        currentSpeaker,
        speakers,
        addSpeaker,
        removeSpeaker,
        startSpeach,
        stopSpeach,
        resetSpeakerTime,
        elapsedTime,
      }}
    >
      {children}
    </SpeakerContext.Provider>
  );
}
