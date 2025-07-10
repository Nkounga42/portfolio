import React from 'react';

const S7AppNavigation: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2>Gimaev A. Folio 👀</h2>
        <p>Selected Product Works, vol. 2</p>
        <p>for 2020 — 2022</p>
        <div style={styles.buttons}>
          <button style={styles.button}>← Back</button>
          <button style={styles.button}>About</button>
          <button style={styles.button}>Contact</button>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.imageWrapper}>
          <img
            src="https://via.placeholder.com/200x400" // à remplacer par ton image
            alt="S7 App screen 1"
            style={styles.image}
          />
          <img
            src="https://via.placeholder.com/200x400" // à remplacer par ton image
            alt="S7 App screen 2"
            style={styles.image}
          />
        </div>

        <h1>S7 App Navigation</h1>

        <div style={styles.infoSection}>
          <div style={styles.description}>
            <h3>Description</h3>
            <p>
              S7 Airlines is the largest private airline in the country with an app of millions of
              monthly users. I led a team of 3 designers at the Techlab unit.
            </p>
          </div>

          <div style={styles.detailsBox}>
            <p><strong>Client:</strong> ✈ S7 Airlines</p>
            <p><strong>Year:</strong> 2022</p>
            <p><strong>Goal:</strong> Make chat and notifications easier to find</p>
            <p><strong>Results:</strong> Increased notifications & chat views by 3.5x</p>
          </div>
        </div>

        <div style={styles.views}>3.5× VIEWS</div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f8f8',
    minHeight: '100vh',
  },
  sidebar: {
    width: '20%',
    paddingRight: '20px',
  },
  buttons: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  button: {
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  mainContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  imageWrapper: {
    display: 'flex',
    gap: '20px',
    marginBottom: '30px',
  },
  image: {
    width: '200px',
    height: '400px',
    borderRadius: '15px',
    objectFit: 'cover',
    backgroundColor: '#d9e7fb',
  },
  infoSection: {
    display: 'flex',
    gap: '40px',
    marginTop: '20px',
  },
  description: {
    flex: 1,
  },
  detailsBox: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    padding: '20px',
    borderRadius: '10px',
  },
  views: {
    marginTop: '20px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#888',
  },
};

export default S7AppNavigation;