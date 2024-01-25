import React, { useState, useEffect } from 'react';
import LightGallery from 'lightgallery/react';
import linkedin from './Icon/linkedin.png';
import arrow_down from './Icon/arrow-down.svg';
import totoro from './Icon/totoro.gif';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-autoplay.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-share.css';
import 'lightgallery/css/lg-rotate.css';

// import plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgShare from 'lightgallery/plugins/share';
import lgRotate from 'lightgallery/plugins/rotate';

export function Gallery() {
    const [images, setImages] = useState([]);
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        fetch('/imagesList.json')
            .then(res => res.json())
            .then(data => setImages(data))
            .catch(error => console.log('Error fetching image list:', error));
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 0) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    const onInit = () => {
        console.log('lightGallery has been initialized');
    };

    return (
        <div>
            <header style={{ paddingBottom: '50px'}}>
                <div className='header-content'>
                <h1>Image Gallery</h1>
                </div>
            </header>
            <div >
                <img src={totoro} alt='Walking Totoro' className='totoro'/>
            </div>
                    <div className="App">
            <LightGallery
                onInit={onInit}
                speed={500}
                plugins={[lgThumbnail, lgZoom, lgAutoplay, lgFullscreen, lgShare, lgRotate]}

            >
                {images.map((image, index) => {
                    return (
                        <a href={image.src} key={index}>
                            <img alt={image.alt} src={image.src} />
                        </a>
                    );
                })}
            </LightGallery>
        </div>
        {/* <footer>
                <div className="footer-content">
                    Copy Right @2024 by Perry Ong
                    <a href="https://www.linkedin.com/in/wen-qing-ong/" target="_blank" rel="noopener noreferrer">
                        <img src={linkedin} className='linkedin-image' alt="LinkedIn" />
                        <span>Perry Ong</span>
                    </a>
                </div>
            </footer> */}

            {scrolling && (
                <button
                    className='fixed right-8 bottom-8 w-12 h-12' // Adjust styling as needed
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <img src={arrow_down} alt="Scroll to top" />
                </button>
            )}

    </div>

    );
}
