import { Container, MantineProvider } from '@mantine/core';
import SpeakersTime from './components/SpeakersTable';
import { CurrentSpeakerProvider } from './contexts/CurrentSpeakerContext';
import { AddMemberForm } from './components/AddMemberForm';
import { Header } from './components/Header';
import { SpeakersProvider } from './contexts/SpeakersContext';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <SpeakersProvider>
        <CurrentSpeakerProvider>
          <Container size="lg">
            <Header />
            <AddMemberForm />

            <SpeakersTime />
          </Container>
        </CurrentSpeakerProvider>
      </SpeakersProvider>
    </MantineProvider>
  );
}

export default App;
