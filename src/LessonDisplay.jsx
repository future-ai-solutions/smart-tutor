// src/LessonDisplay.jsx
import React from 'react';
import { useRef, useState } from 'react';
import './LessonDisplay.css'; 

const LessonDisplay = ({ lessonData, onStartQuiz }) => {
  const { sessionId, title, content, formData, initialScore, initialLevel, imageUrl, audioUrl } = lessonData;
  // const { title, text, imageUrl,audioUrl, initialScore, initialLevel } = lessonData.lesson;
  const childName = lessonData.formData.childName || 'صديقنا';
 
  // 1. Use useRef to access the DOM <audio> element directly
  const audioRef = useRef(null);

  // Optional: State to track if the audio is currently playing,
  // which can be useful for dynamically changing the 'Play' button text/icon.
  const [isPlaying, setIsPlaying] = useState(false);

  // --- Control Handlers ---

  /**
   * Plays the audio.
   */
  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => console.error("Error playing audio:", error));
    }
  };

  /**
   * Pauses the audio.
   */
  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  /**
   * Resets the audio playback to the beginning (time 0) and pauses it.
   */
  const handleReset = () => {
    if (audioRef.current) {
      // 1. Set the current time back to 0
      audioRef.current.currentTime = 0;
      // 2. Pause the audio
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Optional: Event listeners for better state management (e.g., when audio finishes)
  const handleAudioEnd = () => {
    setIsPlaying(false);
  };


  return (
    <div className="lesson-container" dir="rtl">
      {/* Background Thematic Elements */}
      <div className="bg-pyramid-bottom"></div>
      <div className="bg-star-top-right">⭐</div>
      <div className="bg-star-bottom-left">✨</div>

      <h1 className="screen-title">{title || "درس جديد جاهز!"}</h1>

      <div className="content-box">
        <div className="genie-image-row">
          <div className="genie-container">
            <video
              src="/genie-video.mp4"
              alt="المساعد الذكي المتحرك"
              className="genie-video"
              autoPlay
              loop
              muted
              playsInline
              poster="/genie.png"
            />
          </div>
          {imageUrl && (
            <div className="lesson-image-container">
              <img src={imageUrl} alt="صورة الدرس" className="lesson-image" />
            </div>
          )}
        </div>
        <div className="lesson-content">
          {/* The main text, which Amazon Polly reads */}
          <p className="lesson-text">{content}</p>
          <div className="audio-controls">
            <audio
              ref={audioRef} // Attach the ref to the <audio> element
              src={audioUrl} // Set the source URL
              onEnded={handleAudioEnd} // Listen for when the audio naturally ends
            >
              {/* Fallback content for browsers that don't support the audio tag */}
              Your browser does not support the audio element.
            </audio>
            {/* Dynamic button text based on isPlaying state (optional enhancement) */}
            <button
              style={{ margin: "0 20px" }}
              className="audio-play-button"
              onClick={isPlaying ? handlePause : handlePlay}
            >
              {isPlaying ? "⏸ إيقاف مؤقت" : "▶ تشغيل"}
            </button>
            <button
              style={{ margin: "0 20px" }}
              className="audio-play-button"
              onClick={handleReset}
            >
              🔄 إعادة
            </button>
          </div>
        </div>
      </div>

      {/* Navigation and Gamification Footer */}
      <div className="footer-controls">
        <div className="score-display">
          <span>النقاط: {initialScore}</span> |{" "}
          <span>المستوى: {initialLevel}</span>
        </div>

        <button
          onClick={onStartQuiz}
          className="generate-button start-quiz-button"
        >
          ابدأ الاختبار الآن!
        </button>
      </div>
    </div>
  );
};

export default LessonDisplay;