import { useLocalStorage } from '@mantine/hooks';
import { createContext, PropsWithChildren, useCallback, useState } from 'react';
import { Speaker } from '../models/Speaker';

export const SpeakersContext = createContext<{
  currentSpeaker?: Speaker;
  speakers: Speaker[];
  addSpeaker: (speaker: Speaker) => void;
  removeSpeaker: (speaker: Speaker) => void;
  resetSpeakerTime: (speaker: Speaker) => void;
  startSpeach: (speaker: Speaker) => void;
  stopSpeach: () => void;
  startedSpeachAt?: number;
}>({
  speakers: [],
  addSpeaker: () => {},
  removeSpeaker: () => {},
  resetSpeakerTime: () => {},
  startSpeach: () => {},
  stopSpeach: () => {},
});

export function SpeakersProvider({ children }: PropsWithChildren) {
  const [currentSpeaker, setSpeaker] = useState<Speaker>();
  const [startedAt, setStartedAt] = useState<number>();
  const [speakers, setSpeakers] = useLocalStorage<Speaker[]>({
    key: 'speakers',
    defaultValue: [],
  });

  const addSpeaker = useCallback((speaker: Speaker) => {
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
  }, []);

  const updateSpeakerTime = useCallback(
    (speaker: Speaker, startTime: number) => {
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
    },
    []
  );

  const startSpeach = useCallback(
    (speaker: Speaker) => {
      if (currentSpeaker && startedAt) {
        updateSpeakerTime(currentSpeaker, startedAt);
      }

      setStartedAt(Date.now());
      setSpeaker?.(speaker);
    },
    [currentSpeaker, startedAt, updateSpeakerTime]
  );

  const stopSpeach = useCallback(() => {
    if (currentSpeaker && startedAt) {
      updateSpeakerTime(currentSpeaker, startedAt);
    }

    setStartedAt(undefined);
    setSpeaker?.(undefined);
  }, [currentSpeaker, startedAt, updateSpeakerTime]);

  const removeSpeaker = useCallback(
    (speakerToRemove: Speaker) => {
      if (currentSpeaker?.name === speakerToRemove.name) {
        return;
      }

      setSpeakers((speakers) =>
        speakers.filter((speaker) => speaker.name !== speakerToRemove.name)
      );
    },
    [currentSpeaker]
  );

  const resetSpeakerTime = useCallback((speaker: Speaker) => {
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
  }, []);

  return (
    <SpeakersContext.Provider
      value={{
        currentSpeaker,
        speakers,
        addSpeaker,
        removeSpeaker,
        startSpeach,
        stopSpeach,
        resetSpeakerTime,
        startedSpeachAt: startedAt,
      }}
    >
      {children}
    </SpeakersContext.Provider>
  );
}
