import { MantineProvider } from "@mantine/core";
import "./App.css";
import SpeakersTime from "./components/SpeakersTable";
import { SpeakerProvider } from "./contexts/SpeakerContext";
import { AddMemberForm } from "./components/AddMemberForm";
import { Header } from "./components/Header";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <SpeakerProvider>
        <div className="App">
          <Header />
          <AddMemberForm />

          <SpeakersTime />
        </div>
      </SpeakerProvider>
    </MantineProvider>
  );
}

export default App;
