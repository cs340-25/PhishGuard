// HomePage.js
import React from 'react';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;

const HomePage = () => {
  const startGoogleOAuth = () => {
    const oauthURL = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    oauthURL.searchParams.set('client_id', CLIENT_ID);
    oauthURL.searchParams.set('redirect_uri', REDIRECT_URI);
    oauthURL.searchParams.set('response_type', 'code');
    oauthURL.searchParams.set('scope', [
      'openid',
      'email',
      'profile',
      'https://www.googleapis.com/auth/gmail.readonly'
    ].join(' '));
    oauthURL.searchParams.set('access_type', 'offline');
    oauthURL.searchParams.set('prompt', 'consent');

    window.location.href = oauthURL.toString();
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>CS340 Project</h1>
        <p style={styles.subtitle}>PhishGuard</p>
      </header>
      <button onClick={startGoogleOAuth} style={styles.downloadButton}>
        Sign in with Google
      </button>
      <main style={styles.main}>
        <section style={styles.section}>
          <h2>Our Features</h2>
          <p>
            Our website will eventually boast a ML algorithm to detect malicious emails!
          </p>
        </section>
      </main>
      <footer style={styles.footer}></footer>
    </div>
  );
};

const styles = { container: {
    fontFamily: 'Arial, sans-serif',
    margin: '0 auto',
    maxWidth: '800px',
    overflowY: 'auto',
  },
  header: {
    backgroundColor: '#220055',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  title: {
    fontSize: '2.5rem',
    margin: '0',
  },
  subtitle: {
    fontSize: '1.2rem',
    margin: '10px 0 0',
  },
  main: {
    marginTop: '20px',
    padding: '10px',
  },
  section: {
    marginBottom: '20px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  footer: {
    marginTop: '20px',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderTop: '1px solid #ddd',
  },
  downloadButton: {
    padding: '15px 30px',
    fontSize: '18px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  downloadButtonHover: {
    backgroundColor: '#0056b3',
  },
  downloadLink: {
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
  },};

export default HomePage;
