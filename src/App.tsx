import { Container, MantineProvider } from '@mantine/core';
import SpeakersTime from './components/SpeakersTable';
import { CurrentSpeakerProvider } from './contexts/CurrentSpeakerContext';
import { AddMemberForm } from './components/AddMemberForm';
import { Header } from './components/Header';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <CurrentSpeakerProvider>
        <Container size="lg">
          <Header />
          <AddMemberForm />

          <SpeakersTime />
        </Container>
      </CurrentSpeakerProvider>
    </MantineProvider>
  );
}

export default App;
