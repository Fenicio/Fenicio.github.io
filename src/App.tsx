import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box width="100%" display="flex" flexDirection="column" alignItems="center">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <Box width="100%" display="flex" flexDirection="column" alignItems="center">
                <About />
                <Projects />
                <Contact />
              </Box>
            } />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
