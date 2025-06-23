
import React, { useState } from 'react';
import { YoutubeTab } from './YoutubeTab';
import { InstagramTab } from './InstagramTab';
import { Download, Youtube } from 'lucide-react';

export const VideoDownloader = () => {
  const [activeTab, setActiveTab] = useState<'youtube' | 'instagram'>('youtube');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Download className="w-10 h-10 text-white" />
            <h1 className="text-5xl font-bold text-white">YouDown</h1>
          </div>
          <p className="text-blue-100 text-lg">Download YouTube videos and Instagram content with ease</p>
          <div className="mt-4 px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg inline-block">
            <p className="text-yellow-100 text-sm">⚠️ For personal use only - Respect copyright regulations</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
          <div className="flex bg-white/10 rounded-xl p-1 mb-6">
            <button
              onClick={() => setActiveTab('youtube')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'youtube'
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Youtube className="w-5 h-5" />
              YouTube
            </button>
            <button
              onClick={() => setActiveTab('instagram')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'instagram'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md"></div>
              Instagram
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'youtube' && <YoutubeTab />}
            {activeTab === 'instagram' && <InstagramTab />}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-blue-200 text-sm">
            Built with ❤️ for easy video downloading
          </p>
        </div>
      </div>
    </div>
  );
};
