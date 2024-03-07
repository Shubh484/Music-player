import React, { useState } from "react";
import "./AudioPlayer.css";

const AudioPlayer = () => {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);

  const handleAddTrack = () => {
    // Implement logic to add a track
    const newTrack = {
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
      title: "New Audio",
    };
    setTracks([...tracks, newTrack]);
  };

  const handleDeleteTrack = (index) => {
    const updatedTracks = [...tracks];
    updatedTracks.splice(index, 1);
    setTracks(updatedTracks);
  };

  const handlePlayTrack = (index) => {
    setCurrentTrack(index);
  };

  const handleTimelineChange = (newOrder) => {
    setTracks(newOrder);
  };

  return (
    <div className="audio-player">
      <div className="track-list">
        {tracks.map((track, index) => (
          <div
            key={index}
            className={`track ${index === currentTrack ? "playing" : ""}`}
          >
            <span>{track.title}</span>
            <button onClick={() => handlePlayTrack(index)}>Play</button>
            <button onClick={() => handleDeleteTrack(index)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="timeline">
        <Timeline tracks={tracks} onTimelineChange={handleTimelineChange} />
      </div>
      <button onClick={handleAddTrack}>Add Track</button>
    </div>
  );
};

const Timeline = ({ tracks, onTimelineChange }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedTrackIndex = e.dataTransfer.getData("text/plain");
    const newOrder = [...tracks];
    const [removedTrack] = newOrder.splice(draggedTrackIndex, 1);
    const dropIndex = getIndex(e.clientX, e.target);
    newOrder.splice(dropIndex, 0, removedTrack);
    onTimelineChange(newOrder);
  };

  const getIndex = (x, target) => {
    const rect = target.getBoundingClientRect();
    const index = Math.round((x - rect.left) / (rect.width / tracks.length));
    return Math.max(0, Math.min(index, tracks.length));
  };

  return (
    <div
      className="timeline-container"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {tracks.map((track, index) => (
        <div
          key={index}
          className="timeline-track"
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text/plain", index)}
        >
          {track.title}
        </div>
      ))}
    </div>
  );
};

export default AudioPlayer;
