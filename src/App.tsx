import { Container, MantineProvider } from '@mantine/core';
import SpeakersTime from './components/SpeakersTable';
import { SpeakerProvider } from './contexts/SpeakerContext';
import { AddMemberForm } from './components/AddMemberForm';
import { Header } from './components/Header';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <SpeakerProvider>
        <Container size="lg">
          <Header />
          <AddMemberForm />

          <SpeakersTime />
        </Container>
      </SpeakerProvider>
    </MantineProvider>
  );
}

export default App;
