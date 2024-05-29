import React from 'react';
import ReactPlayer from 'react-player';

const YouTubePlayer = ({ url }) => {
  return (
    <div className="w-full h-[315px]">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls={true}
      />
    </div>
  );
}

export default YouTubePlayer;
