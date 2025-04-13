import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Link } from "@aws-amplify/ui-react";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  const styles = {
    header: {
      position: 'fixed',       // Fixes the header at the top of the page
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: '#fff',  // White background for the header
      padding: '40px 20px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      zIndex: 1000,            // Ensures the header stays above other content
    },
    navContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px', // spacing between elements
      //flexWrap: 'wrap' // ensures responsiveness on smaller screens 
    },
    logo: {
      width: '50px',
      height: '50px',
      objectFit: 'cover'
    },
    siteName: {
      fontSize: '2.0rem',
      fontWeight: 'bold',
      color: '#333'
    },
    navLink: {
      color: '#333',
      textDecoration: 'none',
      fontSize: '1rem'
    },
    button: {
      padding: '8px 20px',
      backgroundColor: '#e0e0e0',
      border: '1px solid #ccc',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
      color: '#333'
    },
    signupButton: {
      backgroundColor: '#0070f3',
      border: '1px solid #0070f3',
      color: '#fff'
    },
    mainContent: {
      marginTop: '100px',
      /* textAlign: 'center' */
    },
    mainImage: {
      width: '100%',  // landscape image spans across the full width
      height: 'auto',
      /* display: 'block' */
    }
  };

  return (
    <div>
      {/* Header with White Navigation Bar */}
      <header style={styles.header}>
        <div style={styles.navContainer}>
          {/* Logo and Website Name 
          <img src="/logo.png" alt="Logo" style={styles.logo} />
          */}
          <span style={styles.siteName}>Study76</span>

          {/* Navigation Links */}
          <Link href="/search-teachers">
            <a style={styles.navLink}>Search for Teachers</a>
          </Link>
          <Link href="/learner-hub">
            <a style={styles.navLink}>Learner Hub</a>
          </Link>
          <Link href="/products">
            <a style={styles.navLink}>Products</a>
          </Link>
          <Link href="/contact">
            <a style={styles.navLink}>Contact</a>
          </Link>
          <Link href="">
            <a style={styles.navLink}>           </a>
          </Link>
          {/* Log In and Sign Up Buttons */}
          <button style={styles.button}>Log In</button>
          <button style={{ ...styles.button, ...styles.signupButton }}>Sign Up</button>
        </div>
      </header>

      {/* Main Content with Landscape Image */}
      <main style={styles.mainContent}>
        <img src="/src/assets/IMG_4527.JPG" alt="Office" style={styles.mainImage} />
        
      </main>
    </div>
  );
}

export default App;
