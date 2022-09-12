import { createContext } from "react";
import { Speaker } from "../models/Speaker";

export const SpeakerContext = createContext<{
    currentSpeaker?: Speaker;
    setSpeaker?: (speaker?: Speaker) => void;
}>({})