import React from 'react';
import { projets } from '../libs/data';
 

const ProjectView: React.FC = () => {
  // Get the first project (ColorVerse) for now
  const project = projets[0];
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
          {project.imagesIllustration.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${project.nom} screen ${index + 1}`}
              style={styles.image}
            />
          ))}
        </div>

        <h1>{project.nom}</h1>

        <div style={styles.infoSection}>
          <div style={styles.description}>
          {/* <ReactMarkdown>{project.description}</ReactMarkdown> */}
          </div>

          <div style={styles.detailsBox}>
            <p><strong>Client:</strong> {project.Client}</p>
            <p><strong>Année:</strong> {new Date(project.dateCreation).getFullYear()}</p>
            <p><strong>Rôle:</strong> {project.Roles}</p>
            <p><strong>Catégorie:</strong> {project.cathegorie}</p>
            <p><strong>Technologies:</strong> {project.technologies.join(', ')}</p>
            {project.links && (
              <div>
                <p><strong>Liens:</strong></p>
                <p><a href={project.links.repository} target="_blank" rel="noopener noreferrer">Repository</a></p>
                <p><a href={project.links.page} target="_blank" rel="noopener noreferrer">Live Demo</a></p>
              </div>
            )}
          </div>
        </div>
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
  markdownContent: {
    lineHeight: '1.6',
  },
};

export default ProjectView;