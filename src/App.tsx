import Routes from "./routes";

import { ModalProvider } from "./context/modal";
import Modal from "./component/Modal";

function App() {
  return (
    <main data-testid="application">
      <ModalProvider>
        <Modal />
        <Routes />
      </ModalProvider>
    </main>
  );
}

export default App;
