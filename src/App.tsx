import { Container, MantineProvider } from '@mantine/core';
import SpeakersTime from './components/SpeakersTable';
import { ElapsedTimeProvider } from './contexts/ElapsedTimeContext';
import { AddMemberForm } from './components/AddMemberForm';
import { Header } from './components/Header';
import { SpeakersProvider } from './contexts/SpeakersContext';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <SpeakersProvider>
        <ElapsedTimeProvider>
          <Container size="lg">
            <Header />
            <AddMemberForm />

            <SpeakersTime />
          </Container>
        </ElapsedTimeProvider>
      </SpeakersProvider>
    </MantineProvider>
  );
}

export default App;
