import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { SpeakersContext } from './SpeakersContext';

export const ElapsedTimeContext = createContext<{
  elapsedTime: number;
}>({
  elapsedTime: 0,
});

export function ElapsedTimeProvider({ children }: PropsWithChildren) {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const { startedSpeachAt } = useContext(SpeakersContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newElapsedTime = startedSpeachAt ? Date.now() - startedSpeachAt : 0;
      setElapsedTime(newElapsedTime);
    }, 1);

    return () => {
      clearTimeout(timer);
    };
  }, [startedSpeachAt, elapsedTime]);

  return (
    <ElapsedTimeContext.Provider
      value={{
        elapsedTime,
      }}
    >
      {children}
    </ElapsedTimeContext.Provider>
  );
}
