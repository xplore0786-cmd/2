import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { I18nProvider } from './lib/i18n';
import { AuthProvider } from './context/AuthContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import { GA4_MEASUREMENT_ID } from './config';

// Load Google Analytics 4 if Measurement ID is provided in config
const gaId = (GA4_MEASUREMENT_ID as string) || '';
if (typeof window !== 'undefined' && gaId.trim().length > 0) {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  const win = window as any;
  win.dataLayer = win.dataLayer || [];
  function gtag(...args: any[]) {
    win.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', gaId);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <AuthProvider>
        <SubscriptionProvider>
          <App />
        </SubscriptionProvider>
      </AuthProvider>
    </I18nProvider>
  </StrictMode>,
);
