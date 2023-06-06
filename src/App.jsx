import ToastPlayground from './components/ToastPlayground';
import Footer from './components/Footer';
import {ToastProvider} from './lib/toast-context';

import './App.css';

function App() {
  return (
    <ToastProvider>
      <ToastPlayground />
      <Footer />
    </ToastProvider>
  );
}

export default App;
