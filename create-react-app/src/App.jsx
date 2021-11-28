import { useText, useLanguage, i18n } from '@particular.cloud/i18n-react';
import react from './assets/react.svg';
import logo from './assets/logo.svg';
import './App.css';

function App() {
    const { langCodeOrLocale } = useLanguage();
    return (
        <div className="App">
            <header className="App-header">
                <img src={react} className="App-react-logo" alt="react logo" />
                <p className="App-react-title">
                    {useText({ key: 'headerReactTitle' })}
                </p>
                <p>{useText({ key: 'headerParticularTitle' })}</p>
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <main className="App-main">
                <h1 className="App-content">{useText({ key: 'lpTitle' })}</h1>
                <h2 className="App-content">
                    {useText({ key: 'lpTitleTwo' })}
                </h2>
                <p>{useText({ key: 'lpIntro' })}</p>
                <a
                    href="https://particular.cloud"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="App-link App-content"
                >
                    {useText({ key: 'lpStartNowLink' })}
                </a>
                <div>
                    <button
                        className="App-button"
                        type="button"
                        onClick={() =>
                            langCodeOrLocale === 'en-US'
                                ? i18n.setDefaultLanguage('de-DE')
                                : i18n.setDefaultLanguage('en-US')
                        }
                    >
                        {useText({ key: 'lpChangeLanguageBtn' })}
                    </button>
                </div>
            </main>
        </div>
    );
}

export default App;
