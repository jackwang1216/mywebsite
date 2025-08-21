'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalPopup from './TerminalPopup';
import BackgroundEffect from './BackgroundEffect';

interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  alt: string;
  description?: string;
  size?: string;
  thumbnail?: string;
}

const galleryItems: GalleryItem[] = [
  { 
    id: 1,
    type: "image", 
    src: "/professional.jpeg", 
    alt: "Professional picture",
    description: "Professional Jack lul",
    size: "2.3MB"
  },
  { 
    id: 2,
    type: "image", 
    src: "/mom_and_I.jpeg", 
    alt: "Mom and I",
    description: "my mom",
    size: "1.8MB"
  },
  { 
    id: 3,
    type: "image", 
    src: "/Aria_me.jpeg", 
    alt: "With Aria",
    description: "Casual photo with Aria",
    size: "2.1MB"
  },
  { 
    id: 4,
    type: "image", 
    src: "/governer.jpeg", 
    alt: "With Iowa Governor",
    description: "Meeting with Iowa Governor",
    size: "1.9MB"
  },
  { 
    id: 5,
    type: "image", 
    src: "/jerry_me.jpeg", 
    alt: "With friend Jerry",
    description: "Photo with my friend Jerry",
    size: "2.0MB"
  },
  {
    id: 6,
    type: "video",
    src: "https://res.cloudinary.com/dmbdb2f2p/video/upload/q_auto,f_auto/v1743284035/jackwang-gallery/drake_4x4.mp4",
    alt: "Drake 4x4 Relay",
    description: "Track and field relay race at Drake University",
    thumbnail: "https://res.cloudinary.com/dmbdb2f2p/video/upload/so_0/v1743284035/jackwang-gallery/drake_4x4.jpg",
    size: "12.5MB"
  },
  {
    id: 7,
    type: "video",
    src: "https://res.cloudinary.com/dmbdb2f2p/video/upload/q_auto,f_auto/v1743284043/jackwang-gallery/indoor_open_4.mp4",
    alt: "Indoor state Open 4",
    description: "Indoor track state championship race",
    thumbnail: "https://res.cloudinary.com/dmbdb2f2p/video/upload/so_0/v1743284043/jackwang-gallery/indoor_open_4.jpg",
    size: "15.2MB"
  }
];

interface GalleryPageProps {
  onBack: () => void;
  onNavigate?: (destination: string) => void;
}

export default function GalleryPage({ onBack, onNavigate }: GalleryPageProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [showTerminal, setShowTerminal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [filter, setFilter] = useState<'all' | 'images' | 'videos'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [slideshow, setSlideshow] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Handle terminal commands
  const handleTerminalCommand = (command: string) => {
    const [cmd, ...args] = command.toLowerCase().split(' ');
    
    if (cmd === 'view' || cmd === 'open') {
      const itemId = parseInt(args[0]);
      const item = galleryItems.find(i => i.id === itemId);
      if (item) {
        setSelectedItem(item);
      }
    } else if (cmd === 'slideshow') {
      setSlideshow(true);
      setCurrentSlideIndex(0);
    } else if (cmd === 'masonry') {
      setViewMode('masonry');
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setShowTerminal(!showTerminal);
      }
      if (e.key === 'Escape') {
        if (slideshow) {
          setSlideshow(false);
        } else if (selectedItem) {
          setSelectedItem(null);
        }
      }
      if (slideshow && selectedItem && filteredItems.length > 0) {
        if (e.key === 'ArrowRight') {
          const nextIndex = (currentSlideIndex + 1) % filteredItems.length;
          setCurrentSlideIndex(nextIndex);
          if (filteredItems[nextIndex]) {
            setSelectedItem(filteredItems[nextIndex]);
          }
        } else if (e.key === 'ArrowLeft') {
          const prevIndex = (currentSlideIndex - 1 + filteredItems.length) % filteredItems.length;
          setCurrentSlideIndex(prevIndex);
          if (filteredItems[prevIndex]) {
            setSelectedItem(filteredItems[prevIndex]);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showTerminal, selectedItem, slideshow, currentSlideIndex]);

  // Filter items based on current filter
  const filteredItems = filter === 'all' ? galleryItems : 
    galleryItems.filter(item => 
      filter === 'images' ? item.type === 'image' : item.type === 'video'
    );

  // Reset slide index when filtered items change
  useEffect(() => {
    if (currentSlideIndex >= filteredItems.length) {
      setCurrentSlideIndex(0);
    }
  }, [filteredItems, currentSlideIndex]);

  // Slideshow effect
  useEffect(() => {
    if (slideshow && filteredItems.length > 1) {
      const interval = setInterval(() => {
        const nextIndex = (currentSlideIndex + 1) % filteredItems.length;
        setCurrentSlideIndex(nextIndex);
        if (filteredItems[nextIndex]) {
          setSelectedItem(filteredItems[nextIndex]);
        }
      }, 4000); // Change slide every 4 seconds
      
      return () => clearInterval(interval);
    }
  }, [slideshow, currentSlideIndex, filteredItems]);

  // Full-screen media viewer
  if (selectedItem) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-50 flex flex-col overflow-y-auto"
      >
        {/* Animated Background */}
        <BackgroundEffect theme="gallery" />
        {/* Header */}
        <div className="flex items-center justify-between p-6 backdrop-blur-lg bg-black/40 sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">{selectedItem.alt}</h2>
            <div className="flex items-center space-x-4 text-gray-300 text-sm">
              <span className={`px-2 py-1 rounded text-xs ${
                selectedItem.type === 'image' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
              }`}>
                {selectedItem.type.toUpperCase()}
              </span>
              <span>{selectedItem.size}</span>
              {slideshow && (
                <span className="text-yellow-400">Slideshow Mode</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {slideshow && (
              <button
                onClick={() => setSlideshow(false)}
                className="px-3 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors"
              >
                Exit Slideshow
              </button>
            )}
            <button
              onClick={() => setSelectedItem(null)}
              className="p-2 bg-gray-800/50 hover:bg-gray-800/80 text-white rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Media Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          {selectedItem.type === 'image' ? (
            <img
              src={selectedItem.src}
              alt={selectedItem.alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          ) : (
            <video
              controls
              className="max-w-full max-h-full rounded-lg shadow-2xl"
              poster={selectedItem.thumbnail}
              onError={(e) => {
                console.error('Video loading error:', e);
              }}
            >
              <source src={selectedItem.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Navigation & Info */}
        <div className="p-6 backdrop-blur-lg bg-black/40 relative z-10">
          <div className="flex items-center justify-start">
            <div className="text-gray-300">
              <p className="mb-2">{selectedItem.description}</p>
              <p className="text-sm text-gray-400">Item {filteredItems.findIndex(item => item.id === selectedItem.id) + 1} of {filteredItems.length}</p>
            </div>
          </div>
        </div>
        
        {/* Terminal Popup */}
        <TerminalPopup
          isOpen={showTerminal}
          onClose={() => setShowTerminal(false)}
          context="gallery"
          onCommand={handleTerminalCommand}
          onNavigate={onNavigate}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative text-white"
    >
      {/* Animated Background */}
      <BackgroundEffect theme="gallery" />
      {/* Header */}
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div className="backdrop-blur-sm bg-gray-900/30 p-6 rounded-xl border border-gray-700/30">
            <h1 className="text-5xl font-bold text-white mb-4">Gallery</h1>
            <p className="text-xl text-gray-300">
              Personal moments, achievements, and memories
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowTerminal(!showTerminal)}
              className="p-3 bg-gray-800/50 hover:bg-gray-800/80 border border-green-400/30 hover:border-green-400/60 rounded-lg transition-colors"
              title="Toggle Terminal (`)"
            >
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-800/50 hover:bg-gray-800/80 text-gray-300 hover:text-white rounded-lg transition-colors"
            >
              Home
            </button>
          </div>
        </div>

        {/* Filters & View Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">Filter:</span>
            {(['all', 'images', 'videos'] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filter === filterType
                    ? 'bg-green-400/20 text-green-400 border border-green-400/40'
                    : 'bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-800/80'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                {filterType !== 'all' && (
                  <span className="ml-1 text-xs opacity-60">
                    ({galleryItems.filter(item => item.type === filterType.slice(0, -1)).length})
                  </span>
                )}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">View:</span>
            {(['grid', 'masonry'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  viewMode === mode
                    ? 'bg-blue-400/20 text-blue-400'
                    : 'bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-800/80'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6'
        }`}>
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer break-inside-avoid"
                onClick={() => {
                  setSelectedItem(item);
                  const foundIndex = filteredItems.findIndex(i => i.id === item.id);
                  setCurrentSlideIndex(foundIndex >= 0 ? foundIndex : 0);
                }}
              >
                <div className="bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/20">
                  {/* Media Preview */}
                  <div className="relative">
                    {item.type === 'image' ? (
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
                        style={{ aspectRatio: viewMode === 'grid' ? '16/12' : 'auto' }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.opacity = '0.5';
                        }}
                      />
                    ) : (
                      <div className="relative">
                        <img
                          src={item.thumbnail}
                          alt={item.alt}
                          className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
                          style={{ aspectRatio: viewMode === 'grid' ? '16/12' : 'auto' }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors opacity-0 group-hover:opacity-100 pointer-events-none">
                          <svg className="w-16 h-16 text-white/90" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 5v14l11-7-11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                    
                    {/* Type badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.type === 'image' 
                          ? 'bg-green-500/80 text-white' 
                          : 'bg-blue-500/80 text-white'
                      }`}>
                        {item.type.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white group-hover:text-pink-400 transition-colors mb-2">
                      {item.alt}
                    </h3>
                    
                    {item.description && (
                      <p className="text-gray-300 text-sm mb-3">
                        {item.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{item.size}</span>
                      <div className="flex items-center space-x-1 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>View</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Stats & Help */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>
            Showing {filteredItems.length} of {galleryItems.length} items •
            Click any item to view • Press <kbd className="px-2 py-1 bg-gray-800 rounded">`</kbd> for terminal commands
          </p>
        </div>
      </div>

      {/* Terminal Popup */}
      <TerminalPopup
        isOpen={showTerminal}
        onClose={() => setShowTerminal(false)}
        context="gallery"
        onCommand={handleTerminalCommand}
        onNavigate={onNavigate}
      />
    </motion.div>
  );
}