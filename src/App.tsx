import { ChakraProvider, extendTheme, Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'

const colors = {
  brand: {
    50: '#f0e4ff',
    100: '#cbb2ff',
    200: '#a480ff',
    300: '#7c4dff',
    400: '#541aff',
    500: '#3b00e6',
    600: '#2d00b4',
    700: '#1f0082',
    800: '#110050',
    900: '#060020',
  },
}

const theme = extendTheme({ colors })

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
  )
}

export default App
