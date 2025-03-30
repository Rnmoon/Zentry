import {useEffect, useRef,useState} from 'react'
import { TiLocationArrow } from 'react-icons/ti'
import Button from './Button';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';

const navItems = ['Nexus','Vault','Prologue','About','Contact'];
const Navbar = () => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setisIndicatorActive] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setisNavVisible] = useState(true);

    const navContainerRef = useRef(null);
    const audioElementRef = useRef(null);

    const {y: currentScrollY} = useWindowScroll();
    useEffect(()=>{
        if(currentScrollY === 0){
            setisNavVisible(true);
            navContainerRef.current.classList.remove('floating-nav');
        }else if(currentScrollY > lastScrollY){
            setisNavVisible(false);
            navContainerRef.current.classList.add('floating-nav');
        }else if(currentScrollY < lastScrollY){
            setisNavVisible(true);
            navContainerRef.current.classList.add('floating-nav');
        }
        setLastScrollY(currentScrollY);
    },[currentScrollY,lastScrollY]); 

    useEffect(()=>{
        gsap.to(navContainerRef.current,{
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2,
        })
    },[isNavVisible]);

    const toggleAudioIndicator = () => {
        setIsAudioPlaying(!isAudioPlaying);
        setisIndicatorActive(!isAudioPlaying); // Sync indicator active state with audio playing state
    }
    
    useEffect(() => {
        const audioElement = audioElementRef.current;
        if (!audioElement) return;
        
        if (isAudioPlaying) {
            // Try to play and handle any errors
            audioElement.play().catch(error => {
                console.error("Audio playback failed:", error);
                setIsAudioPlaying(false);
                setisIndicatorActive(false);
            });
        } else {
            audioElement.pause();
        }
    }, [isAudioPlaying]);
    
  return (
    <div ref={navContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
        <header className='absolute top-1/2 w-full -translate-y-1/2'>
            <nav className='flex size-full items-center justify-between p-4'>
                <div className='flex items-center gap-7'>
                    <img src="/img/logo.png" alt="logo" className='w-10'/>
                    <Button
                        id="product-button"
                        title="Products"
                        rightIcon={<TiLocationArrow/>}
                        containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                    />
                </div>
                <div className='flex h-full items-center'>
                    <div className='hidden md:block'>
                        {navItems.map((item) =>(
                            <a key={item} href={`#${item.toLowerCase()}`} className='nav-hover-btn'>
                               {item} 
                            </a>
                        ))}
                    </div>
                    <button 
                        className='ml-10 flex items-center space-x-0.5' 
                        onClick={toggleAudioIndicator}
                        aria-label={isAudioPlaying ? "Pause music" : "Play music"}
                    >
                        <audio ref={audioElementRef} src="/audio/loop.mp3" loop preload="auto" />
                        {[1,2,3,4].map((bar)=>(
                            <div 
                                key={bar} 
                                className={`indicator-line ${isIndicatorActive ? 'active' : ''}`} 
                                style={{'--animation-order': bar}}
                            />
                        ))}
                    </button>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default Navbar