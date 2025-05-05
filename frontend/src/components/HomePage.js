// HomePage.js
import React from 'react';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

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
        <h1 style={styles.title}>PhishGuard</h1>
        <p style={styles.subtitle}>Machine Learning Enhanced Scam Detection</p>
      </header>
      <button onClick={startGoogleOAuth} style={styles.googleButton}>
        <img
          src = "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
          alt = "Google"
          style = {styles.googleIcon}
        />
        <span style={styles.buttonText}>Sign in with Google</span>
      </button>
      <main style={styles.main}>
        <section style={styles.section}>
          <h2>Preventing Phishing</h2>
          <p>
            Have a suspicious email? Enter it here and get a second opinion!    
          </p>
          <ol style = {{paddingLeft: '20px'}}>
            <li>Sign in with your Google account.</li>
            <li>View your inbox and select an email.</li>
            <li>Click "Scan Email" and get feedback on it's nature.</li>
            <li>Review the result and take appropriate action!</li>
          </ol>
          <p>
            If you don't want to connect your Google account, you can also create an account here and use our manual form!
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
  },
  googleButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    color: '#555',
    padding: '10px 15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginTop: '20px',
  },
  googleIcon: {
    width: '20px',
    height: '20px',
    marginRight: '10px',
  },
  buttonText: {
    fontWeight: '500',
  }
};

export default HomePage;
