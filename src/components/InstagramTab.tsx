
import React, { useState } from 'react';
import { Search, Download, Heart, MessageCircle } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface InstagramInfo {
  caption: string;
  thumbnail: string;
  likes: string;
  comments: string;
  username: string;
}

export const InstagramTab = () => {
  const [url, setUrl] = useState('');
  const [contentInfo, setContentInfo] = useState<InstagramInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const fetchContentInfo = async () => {
    if (!url.trim()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setContentInfo({
        caption: "Amazing sunset vibes 🌅 #sunset #nature #photography",
        thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
        likes: "1,234",
        comments: "89",
        username: "@sample_user"
      });
      setLoading(false);
    }, 1500);
  };

  const downloadContent = async () => {
    setDownloading(true);
    setDownloadProgress(0);
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloading(false);
          // Simulate download completion
          const link = document.createElement('a');
          link.href = '#';
          link.download = 'instagram_content.mp4';
          link.click();
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 250);
  };

  return (
    <div className="space-y-6">
      {/* URL Input */}
      <div className="space-y-4">
        <label className="block text-white font-medium">Instagram Post/Reel URL</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g., https://www.instagram.com/p/xyz123 or https://www.instagram.com/reel/xyz123"
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
          />
          <button
            onClick={fetchContentInfo}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            {loading ? 'Fetching...' : 'Fetch Info'}
          </button>
        </div>
      </div>

      {/* Content Info */}
      {contentInfo && (
        <div className="bg-white/10 rounded-xl p-6 space-y-4">
          <div className="flex gap-4">
            <img
              src={contentInfo.thumbnail}
              alt="Instagram content"
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div className="flex-1 space-y-3">
              <div className="text-white/80 font-medium">{contentInfo.username}</div>
              <p className="text-white/90">{contentInfo.caption}</p>
              <div className="flex items-center gap-6 text-white/60 text-sm">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {contentInfo.likes} likes
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {contentInfo.comments} comments
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download Info */}
      {contentInfo && (
        <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4">
          <p className="text-blue-100 text-sm">
            ℹ️ Instagram content will be downloaded in the highest available quality automatically.
          </p>
        </div>
      )}

      {/* Download Button */}
      {contentInfo && (
        <button
          onClick={downloadContent}
          disabled={downloading}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 text-white rounded-lg font-medium transition-all duration-200"
        >
          <Download className="w-5 h-5" />
          Download Content
        </button>
      )}

      {/* Progress Bar */}
      {downloading && (
        <ProgressBar 
          progress={downloadProgress} 
          status={downloadProgress < 100 ? 'Downloading...' : 'Download Complete!'} 
        />
      )}
    </div>
  );
};
