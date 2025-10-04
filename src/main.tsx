import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { I18nProvider } from './i18n/I18nProvider';
import { MotionProvider } from './motion/MotionProvider';
import { CookieConsentProvider } from './contexts/CookieConsentContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider>
      <CookieConsentProvider>
        <MotionProvider>
          <App />
        </MotionProvider>
      </CookieConsentProvider>
    </I18nProvider>
  </React.StrictMode>
);
