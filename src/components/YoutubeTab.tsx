
import React, { useState } from 'react';
import { Search, Download, Play, Clock, Eye } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploader: string;
}

export const YoutubeTab = () => {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState('720p');
  const [audioQuality, setAudioQuality] = useState('128kbps');
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const fetchVideoInfo = async () => {
    if (!url.trim()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setVideoInfo({
        title: "Amazing Video Title - Sample Content",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        duration: "3:42",
        views: "1.2M views",
        uploader: "Sample Channel"
      });
      setLoading(false);
    }, 1500);
  };

  const downloadVideo = async (format: 'video' | 'audio') => {
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
          link.download = `video.${format === 'video' ? 'mp4' : 'mp3'}`;
          link.click();
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* URL Input */}
      <div className="space-y-4">
        <label className="block text-white font-medium">YouTube Video URL</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
          <button
            onClick={fetchVideoInfo}
            disabled={loading}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            {loading ? 'Fetching...' : 'Fetch Info'}
          </button>
        </div>
      </div>

      {/* Video Info */}
      {videoInfo && (
        <div className="bg-white/10 rounded-xl p-6 space-y-4">
          <div className="flex gap-4">
            <img
              src={videoInfo.thumbnail}
              alt={videoInfo.title}
              className="w-32 h-24 object-cover rounded-lg"
            />
            <div className="flex-1 space-y-2">
              <h3 className="text-white font-semibold text-lg">{videoInfo.title}</h3>
              <p className="text-white/70">{videoInfo.uploader}</p>
              <div className="flex items-center gap-4 text-white/60 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {videoInfo.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {videoInfo.views}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quality Selection */}
      {videoInfo && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-white font-medium">Video Quality</label>
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="1080p">1080p (Full HD)</option>
              <option value="720p">720p (HD)</option>
              <option value="480p">480p (SD)</option>
              <option value="360p">360p</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="block text-white font-medium">Audio Quality</label>
            <select
              value={audioQuality}
              onChange={(e) => setAudioQuality(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="320kbps">320kbps (High)</option>
              <option value="192kbps">192kbps (Medium)</option>
              <option value="128kbps">128kbps (Standard)</option>
            </select>
          </div>
        </div>
      )}

      {/* Download Buttons */}
      {videoInfo && (
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => downloadVideo('video')}
            disabled={downloading}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white rounded-lg font-medium transition-colors duration-200"
          >
            <Play className="w-5 h-5" />
            Download Video ({quality})
          </button>
          <button
            onClick={() => downloadVideo('audio')}
            disabled={downloading}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white rounded-lg font-medium transition-colors duration-200"
          >
            <Download className="w-5 h-5" />
            Download Audio ({audioQuality})
          </button>
        </div>
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
