
import React, { useState } from 'react';
import { VideoDownloader } from '../components/VideoDownloader';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600">
      <VideoDownloader />
    </div>
  );
};

export default Index;
