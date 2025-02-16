import './App.css'

import CustomCalendar from "./components/calendar";
import { ChakraProvider, defaultSystem} from "@chakra-ui/react";


function App() {
  return (
    <>
      <ChakraProvider value={defaultSystem}>
        <CustomCalendar/>
      </ChakraProvider>
    </>
  );
}

export default App;
