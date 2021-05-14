import { useT } from '@particular.cloud/i18n-react';
import react from './assets/react.svg';
import logo from './assets/logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header-react">
          <img src={react} className="App-react-logo" alt="react logo" />
          <p>{useT({ key: 'headerReactTitle', language: 'en-US' })}</p>
        </div>
        <div className="App-header-particular">
          <p>{useT({ key: 'headerParticularTitle', language: 'en-US' })}</p>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </header>
      <main className="App-main">
        <h1 className="App-content">
          {useT({ key: 'lpTitle', language: 'en-US' })}
        </h1>
        <h2 className="App-content">
          {useT({ key: 'lpTitleTwo', language: 'en-US' })}
        </h2>
        <a
          href="https://particular.cloud"
          target="_blank"
          rel="noopener noreferrer"
          className="App-link App-content"
        >
          {useT({ key: 'lpStartNowLink', language: 'en-US' })}
        </a>
      </main>
    </div>
  );
}

export default App;
