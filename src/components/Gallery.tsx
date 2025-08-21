"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [playingVideos, setPlayingVideos] = useState<{[key: number]: boolean}>({});
  const [muted, setMuted] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.5); // Default volume at 50%
  const videoRefs = useRef<{[key: number]: HTMLVideoElement}>({});

  // Gallery items with your media files
  const galleryItems = [
    { type: "image", src: "/professional.jpeg", alt: "Professional Me lol" },
    { type: "image", src: "/mom_and_I.jpeg", alt: "Mom and I" },
    { type: "image", src: "/Aria_me.jpeg", alt: "With Aria" },
    { type: "image", src: "/governer.jpeg", alt: "With Iowa Governor" },
    { type: "image", src: "/jerry_me.jpeg", alt: "Friend" },
    // {
    //   type: "video",
    //   // Add quality and format parameters to the Cloudinary URL
    //   src: "https://res.cloudinary.com/dmbdb2f2p/video/upload/q_auto,f_auto/v1743284030/jackwang-gallery/60m.mp4",
    //   alt: "60m Race @ MIT",
    //   thumbnail:
    //     "https://res.cloudinary.com/dmbdb2f2p/video/upload/so_0/v1743284030/jackwang-gallery/60m.jpg",
    // },
    // { type: "image", src: "/mit_fresh.jpeg", alt: "MIT Freshies" },
    // { type: "image", src: "/mit_start.jpeg", alt: "MIT indoor 200 start" },
    {
      type: "video",
      // Add quality and format parameters to the Cloudinary URL
      src: "https://res.cloudinary.com/dmbdb2f2p/video/upload/q_auto,f_auto/v1743284035/jackwang-gallery/drake_4x4.mp4",
      alt: "Drake 4x4 Relay",
      thumbnail:
        "https://res.cloudinary.com/dmbdb2f2p/video/upload/so_0/v1743284035/jackwang-gallery/drake_4x4.jpg",
    },
    {
      type: "video",
      // Add quality and format parameters to the Cloudinary URL
      src: "https://res.cloudinary.com/dmbdb2f2p/video/upload/q_auto,f_auto/v1743284043/jackwang-gallery/indoor_open_4.mp4",
      alt: "Indoor state Open 4",
      thumbnail:
        "https://res.cloudinary.com/dmbdb2f2p/video/upload/so_0/v1743284043/jackwang-gallery/indoor_open_4.jpg",
    },
    // {
    //   type: "video",
    //   // Add quality and format parameters to the Cloudinary URL
    //   src: "https://res.cloudinary.com/dmbdb2f2p/video/upload/q_auto,f_auto/v1743284053/jackwang-gallery/state_4x4_prelim.mp4",
    //   alt: "State 4x4 Preliminary",
    //   thumbnail:
    //     "https://res.cloudinary.com/dmbdb2f2p/video/upload/so_0/v1743284053/jackwang-gallery/state_4x4_prelim.jpg",
    // },
    { type: "image", src: "/state_200.jpeg", alt: "State 200" },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Wait a bit for everything to render correctly
    const initScrolling = () => {
      // Create a horizontal scrolling effect
      if (galleryRef.current && sectionRef.current) {
        // Get the width of the gallery container
        const galleryWidth = galleryRef.current.scrollWidth;

        // Create a timeline for horizontal scrolling with much smoother scrolling
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${galleryWidth - window.innerWidth + 100}`,
            scrub: 2, // Higher value for even smoother scrolling (less responsive but smoother)
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            preventOverlaps: true, // Prevents overlapping animations
            fastScrollEnd: true, // Better performance
            // Note: removed 'smooth' property as it's not supported in this version
            onUpdate: (self) => {
              // Prevent any jumping to the start
              if (self.progress > 0) {
                self.scroll(self.scroll()); // Lock current scroll position
              }
            },
          },
        });

        // Animate the gallery to scroll horizontally with improved smoothness
        tl.to(galleryRef.current, {
          x: () => -(galleryWidth - window.innerWidth + 100),
          ease: "power1.out", // Use a gentle ease instead of "none" for smoother movement
          immediateRender: false, // Prevents initial flash
          overwrite: "auto", // Prevents conflicting animations
        });

        // Add a special effect for when items come into view
        galleryItems.forEach((_, index) => {
          const itemEl = document.getElementById(`gallery-item-${index}`);
          if (itemEl) {
            ScrollTrigger.create({
              trigger: itemEl,
              start: "left 80%",
              end: "right 20%",
              containerAnimation: tl,
              onEnter: () => {
                gsap.to(itemEl, {
                  scale: 1.05,
                  duration: 0.5,
                  opacity: 1,
                  ease: "power2.out"
                });
              },
              onLeave: () => {
                gsap.to(itemEl, {
                  scale: 0.95,
                  duration: 0.5,
                  opacity: 0.7,
                  ease: "power2.in"
                });
              },
              onEnterBack: () => {
                gsap.to(itemEl, {
                  scale: 1.05,
                  duration: 0.5,
                  opacity: 1,
                  ease: "power2.out"
                });
              },
              onLeaveBack: () => {
                gsap.to(itemEl, {
                  scale: 0.95,
                  duration: 0.5,
                  opacity: 0.7,
                  ease: "power2.in"
                });
              }
            });
          }
        });
      }
    };

    // Initialize after a slightly longer delay to ensure all elements are properly rendered
    const timer = setTimeout(() => {
      initScrolling();
    }, 300);

    return () => {
      // Clean up timeout and scroll triggers when component unmounts
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ScrollTrigger.clearMatchMedia();
    };
  }, [galleryItems]);

  // Function to handle hover for videos
  const handleMouseEnter = (index: number) => {
    setActiveItem(index);

    // Get the video for this index
    const videoElement = videoRefs.current[index];
    if (videoElement && videoElement.src) {
      try {
        // Reset and configure video
        videoElement.currentTime = 0;
        videoElement.volume = volume;
        videoElement.muted = true;
        setMuted(true);

        // Play directly - simpler approach
        videoElement.play()
          .then(() => {
            setPlayingVideos(prev => ({...prev, [index]: true}));
          })
          .catch(error => {
            if (error.name !== 'AbortError') {
              console.error(`Failed to play video ${index}:`, error);
            }
          });
      } catch (e) {
        console.error(`Error in handleMouseEnter for video ${index}:`, e);
      }
    }
  };

  // Function to handle mouse leave
  const handleMouseLeave = (index: number) => {
    setActiveItem(null);

    // Get video from refs
    const videoElement = videoRefs.current[index];
    if (videoElement) {
      try {
        // Update state first
        setPlayingVideos(prev => ({...prev, [index]: false}));
        // Then pause
        videoElement.pause();
      } catch (error) {
        console.error(`Error pausing video ${index}:`, error);
      }
    }
  };

  // Handle unmuting the active video
  const handleUnmute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (activeItem !== null) {
      const videoElement = videoRefs.current[activeItem];
      if (videoElement) {
        videoElement.muted = false;
        videoElement.volume = volume;
        setMuted(false);
      }
    }
  };

  // Handle muting the active video
  const handleMute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (activeItem !== null) {
      const videoElement = videoRefs.current[activeItem];
      if (videoElement) {
        videoElement.muted = true;
        setMuted(true);
      }
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    // Update volume for active video
    if (activeItem !== null) {
      const videoElement = videoRefs.current[activeItem];
      if (videoElement && !videoElement.muted) {
        videoElement.volume = newVolume;
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <div className="absolute top-0 left-0 p-8 z-10">
        <h2 className="text-4xl md:text-6xl text-cream font-fancy">Gallery</h2>
        <p className="text-xl text-cream/70 font-fancy mt-2">Enjoy :D</p>
      </div>

      {/* Volume control */}
      <div className="absolute top-8 right-8 flex items-center gap-2 z-20 bg-dark/80 p-2 rounded-lg backdrop-blur-sm">
        <svg className="w-5 h-5 text-cream" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.889 16H2a1 1 0 01-1-1V9a1 1 0 011-1h3.889l5.294-4.332a.5.5 0 01.817.387v15.89a.5.5 0 01-.817.387L5.89 16z" fill="currentColor"/>
        </svg>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 accent-gold"
        />
      </div>

      <div
        ref={galleryRef}
        className="flex items-center h-full absolute left-0 top-0 pt-24 pb-8 px-8"
      >
        {galleryItems.map((item, index) => (
          <div
            key={index}
            id={`gallery-item-${index}`}
            className={`relative mx-4 h-[75vh] rounded-lg overflow-hidden transition-all duration-500 flex-shrink-0 border border-gold/10 ${
              activeItem === index ? 'w-[650px] shadow-2xl shadow-gold/20 z-10 border-gold/30' : 'w-[400px] brightness-90'
            }`}
            onClick={() => {
              // Handle click to play videos directly for better mobile compatibility
              if (item.type === "video") {
                const videoElement = document.getElementById(`gallery-video-${index}`) as HTMLVideoElement;
                if (videoElement) {
                  if (videoElement.paused) {
                    videoElement.play()
                      .then(() => {
                        setPlayingVideos(prev => ({...prev, [index]: true}));
                      })
                      .catch(err => console.error(`Click play error on ${index}:`, err));
                  } else {
                    videoElement.pause();
                    setPlayingVideos(prev => ({...prev, [index]: false}));
                  }
                }
              }
              // Also trigger mouse enter for consistent behavior
              handleMouseEnter(index);
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {item.type === "image" ? (
              <div className="relative w-full h-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ) : (
              <div className="relative w-full h-full">
                <div className="relative w-full h-full">
                  {/* Thumbnail image shown initially */}
                  {!playingVideos[index] && (
                    <Image
                      src={item.thumbnail || ""}
                      alt={`${item.alt} thumbnail`}
                      width={650}
                      height={800}
                      style={{ objectFit: "cover" }}
                      className="rounded-lg w-full h-full"
                    />
                  )}

                  {/* Video element with optimized loading */}
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[index] = el;
                    }}
                    src={item.src}
                    poster={item.thumbnail}
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className={`w-full h-full object-cover rounded-lg ${playingVideos[index] ? 'opacity-100' : 'opacity-0'}`}
                    onCanPlay={() => {
                      // Video is ready to play
                      const video = videoRefs.current[index];
                      if (video && activeItem === index && !playingVideos[index]) {
                        video.play()
                          .then(() => setPlayingVideos(prev => ({...prev, [index]: true})))
                          .catch(err => console.error(`Play error for ${item.alt}:`, err));
                      }
                    }}
                  />

                  {/* Play button overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      const video = videoRefs.current[index];
                      if (video) {
                        if (video.paused) {
                          video.play()
                            .then(() => setPlayingVideos(prev => ({...prev, [index]: true})))
                            .catch(err => console.error(`Play error for ${item.alt}:`, err));
                        } else {
                          video.pause();
                          setPlayingVideos(prev => ({...prev, [index]: false}));
                        }
                      }
                    }}
                  >
                    {!playingVideos[index] && (
                      <div className="bg-black/40 rounded-full p-4">
                        <svg className="w-12 h-12 text-cream" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                {/* Removed duplicate play button overlay */}

                {/* Audio controls visible only when video is playing and is the active item */}
                {playingVideos[index] && activeItem === index && (
                  <div className="absolute bottom-16 right-4 flex gap-2 z-20">
                    {muted ? (
                      <button
                        onClick={handleUnmute}
                        className="p-3 rounded-full bg-black/70 backdrop-blur-sm transition-all hover:bg-gold/40"
                        aria-label="Unmute video"
                      >
                        {/* Muted icon */}
                        <svg className="w-6 h-6 text-cream" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.016 3.234C13.635 3.087 13.211 3.262 13.066 3.641L9.802 12H5.5C4.672 12 4 12.672 4 13.5v1c0 .828.672 1.5 1.5 1.5h4.302l3.264 8.359C13.178 24.738 13.578 25 14 25c.094 0 .188-.016.258-.047C14.635 24.807 15 24.39 15 23.906V4.094c0-.484-.365-.901-.984-1.047v.187zM3.281 2.281L21.78 20.78c.375.375.375.985 0 1.36-.188.187-.453.281-.688.281-.234 0-.5-.094-.687-.281L1.906 3.641c-.375-.375-.375-.985 0-1.36.374-.375.984-.375 1.375 0z"></path>
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={handleMute}
                        className="p-3 rounded-full bg-black/70 backdrop-blur-sm transition-all hover:bg-gold/40"
                        aria-label="Mute video"
                      >
                        {/* Unmuted icon */}
                        <svg className="w-6 h-6 text-cream" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.016 3.234C13.635 3.087 13.211 3.262 13.066 3.641L9.802 12H5.5C4.672 12 4 12.672 4 13.5v1c0 .828.672 1.5 1.5 1.5h4.302l3.264 8.359C13.178 24.738 13.578 25 14 25c.094 0 .188-.016.258-.047C14.635 24.807 15 24.39 15 23.906V4.094c0-.484-.365-.901-.984-1.047v.187zm1.453 2.766c.188.156.375.313.625.563C17.562 8.031 19 10.516 19 13.5s-1.438 5.469-2.906 6.938a7.64 7.64 0 01-.625.562.997.997 0 00-.156 1.406c.313.422.906.5 1.344.188.25-.188.484-.391.734-.594C19.375 20.266 21 17.156 21 13.5s-1.625-6.766-3.609-8.5c-.25-.203-.484-.406-.734-.594-.438-.312-1.031-.25-1.344.188a.997.997 0 00.156 1.406z"></path>
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-cream font-fancy text-lg">
                {item.alt || (item.type === "video" ? "Video Performance" : "Gallery Image")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation hint */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-cream opacity-60">
        <p className="text-center text-lg mb-2 font-fancy">Scroll to explore</p>
        <div className="flex justify-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
