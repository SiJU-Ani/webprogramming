import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const styles = {
  homeContainer: {
    minHeight: '100vh',
    backgroundColor: '#004D40',
    position: 'relative',
    overflow: 'hidden',
    width: '100%'
  },
  homeHeader: {
    width: '100%',
    height: '100vh',
    position: 'relative',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 5%'
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    position: 'relative'
  },
  textContent: {
    flex: '0 0 50%',
    maxWidth: '600px',
    zIndex: 10,
    paddingRight: '2rem'
  },
  heading: {
    fontSize: '4.5rem',
    fontWeight: 600,
    marginBottom: '1.5rem',
    lineHeight: 1.2,
    color: 'white',
    position: 'relative'
  },
  underline: {
    content: '""',
    position: 'absolute',
    bottom: '-10px',
    left: 0,
    width: '100px',
    height: '4px',
    backgroundColor: '#FFD700'
  },
  description: {
    fontSize: '1.25rem',
    lineHeight: 1.6,
    marginBottom: '2.5rem',
    color: 'rgba(255, 255, 255, 0.9)',
    maxWidth: '600px'
  },
  ctaButtons: {
    display: 'flex',
    gap: '1rem'
  },
  btn: {
    display: 'inline-block',
    padding: '0.875rem 2rem',
    textDecoration: 'none',
    color: 'white',
    border: '2px solid white',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    backgroundColor: 'transparent',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  btnHover: {
    backgroundColor: 'white',
    color: '#004D40',
    transform: 'translateY(-2px)'
  },
  imageContainer: {
    flex: '0 0 45%',
    position: 'relative',
    height: '400px',
    marginLeft: 'auto'
  },
  mainImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
    backgroundColor: '#003329'
  },
  foodThumbnails: {
    display: 'flex',
    position: 'absolute',
    right: 0,
    bottom: '-80px',
    gap: '1rem',
    zIndex: 10
  },
  thumbnailWrapper: {
    width: '80px',
    height: '80px',
    borderRadius: '4px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '2px solid transparent',
    backgroundColor: '#003329'
  },
  thumbnailWrapperActive: {
    borderColor: '#FFD700'
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  decorativeLeaf: {
    position: 'absolute',
    width: '300px',
    height: 'auto',
    opacity: 0.15,
    pointerEvents: 'none',
    zIndex: 1,
    filter: 'brightness(2)'
  },
  decorativeLeafLeft: {
    left: '-100px',
    top: '10%',
    transform: 'rotate(-90deg)'
  },
  decorativeLeafRight: {
    right: '-100px',
    bottom: '10%',
    transform: 'rotate(90deg)'
  },
  '@media (max-width: 1200px)': {
    contentWrapper: {
      maxWidth: '100%'
    },
    heading: {
      fontSize: '3.5rem'
    }
  },
  '@media (max-width: 992px)': {
    contentWrapper: {
      flexDirection: 'column',
      textAlign: 'center'
    },
    textContent: {
      flex: '0 0 100%',
      paddingRight: 0,
      marginBottom: '3rem'
    },
    imageContainer: {
      flex: '0 0 100%',
      maxWidth: '600px',
      margin: '0 auto'
    },
    underline: {
      left: '50%',
      transform: 'translateX(-50%)'
    },
    ctaButtons: {
      justifyContent: 'center'
    },
    foodThumbnails: {
      position: 'relative',
      bottom: 0,
      right: 'auto',
      justifyContent: 'center',
      marginTop: '1rem'
    }
  },
  '@media (max-width: 768px)': {
    heading: {
      fontSize: '2.5rem'
    },
    description: {
      fontSize: '1.1rem'
    },
    ctaButtons: {
      flexDirection: 'column'
    },
    btn: {
      width: '100%',
      textAlign: 'center'
    },
    imageContainer: {
      height: '300px'
    }
  }
};

const Home = () => {
  const [currentImage, setCurrentImage] = useState('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop');
  const [activeThumb, setActiveThumb] = useState(0);
  const [isHovered, setIsHovered] = useState(null);

  const foodImages = [
    { 
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop', 
      alt: 'Signature Dish - Gourmet Steak'
    },
    { 
      src: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?q=80&w=1200&auto=format&fit=crop', 
      alt: 'French Appetizer - Escargot'
    },
    { 
      src: 'https://images.unsplash.com/photo-1469533778471-92a68acc3633?q=80&w=1200&auto=format&fit=crop', 
      alt: 'Dessert - Creme Brulee'
    },
    { 
      src: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1200&auto=format&fit=crop', 
      alt: 'French Wine Selection'
    }
  ];

  const changeImage = (imageSrc, index) => {
    setCurrentImage(imageSrc);
    setActiveThumb(index);
  };

  return (
    <motion.div 
      style={styles.homeContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div style={styles.homeHeader}>
        <div style={styles.contentWrapper}>
          <motion.div 
            style={styles.textContent}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 style={styles.heading}>
              Welcome to<br />FoodiGoodi
              <div style={styles.underline}></div>
            </h1>
            <p style={styles.description}>
              course: web programming second year - 23BDS1003 aleena yogindar,23BAI1442 Shreyansh Srivastava, 23BDS1010 Suryansh behal, 23BDS1149 Aakrisht yadav
            </p>
            <div style={styles.ctaButtons}>
              <Link 
                to="/menu" 
                style={{
                  ...styles.btn,
                  ...(isHovered === 'menu' ? styles.btnHover : {})
                }}
                onMouseEnter={() => setIsHovered('menu')}
                onMouseLeave={() => setIsHovered(null)}
              >
                View Menu
              </Link>
              <Link 
                to="/reservations" 
                style={{
                  ...styles.btn,
                  ...(isHovered === 'book' ? styles.btnHover : {})
                }}
                onMouseEnter={() => setIsHovered('book')}
                onMouseLeave={() => setIsHovered(null)}
              >
                Book a Table
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            style={styles.imageContainer}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img src={currentImage} alt="Featured Dish" style={styles.mainImage} />
            <div style={styles.foodThumbnails}>
              {foodImages.map((image, index) => (
                <div 
                  key={index}
                  style={{
                    ...styles.thumbnailWrapper,
                    ...(index === activeThumb ? styles.thumbnailWrapperActive : {})
                  }}
                  onClick={() => changeImage(image.src, index)}
                >
                  <img src={image.src} alt={image.alt} style={styles.thumbnailImage} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <img 
          src="/images/decorative-leaf.png" 
          alt="" 
          style={{...styles.decorativeLeaf, ...styles.decorativeLeafLeft}} 
        />
        <img 
          src="/images/decorative-leaf.png" 
          alt="" 
          style={{...styles.decorativeLeaf, ...styles.decorativeLeafRight}} 
        />
      </div>
    </motion.div>
  );
};

export default Home; 
