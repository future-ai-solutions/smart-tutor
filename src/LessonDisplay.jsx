// src/LessonDisplay.jsx
import React from 'react';
import './LessonDisplay.css'; 

const LessonDisplay = ({ lessonData, onStartQuiz }) => {
  const { title, text, imageUrl, audioUrl, initialScore, initialLevel } = lessonData.lesson;
  const childName = lessonData.formData.childName || 'صديقنا';

  return (
    <div className="lesson-container" dir="rtl">
      {/* Background Thematic Elements */}
      <div className="bg-pyramid-bottom"></div>
      <div className="bg-star-top-right">⭐</div>
      <div className="bg-star-bottom-left">✨</div>

      <h1 className="screen-title">{title || 'درس جديد جاهز!'}</h1>

      <div className="content-box">
        {/* Genie Assistant Area */}
        <div className="genie-assistant-lesson">
          <img src="/genie.png" alt="المساعد الذكي" className="genie-image" />
          <span className="greeting-bubble">مرحباً يا {childName}!</span>
        </div>

        <div className="lesson-content">
            {imageUrl && (
                <div className="lesson-image-container">
                    <img src={imageUrl} alt="صورة الدرس" className="lesson-image" />
                </div>
            )}
            
            {/* The main text, which Amazon Polly reads */}
            <p className="lesson-text">{text}</p>
            
            {/* Audio Control (Play/Pause) */}
            <div className="audio-controls">
                <button 
                  onClick={() => new Audio(audioUrl).play()} 
                  className="audio-play-button"
                  title="استمع للشرح"
                >
                  🎧 استمع للشرح مرة أخرى
                </button>
            </div>
        </div>
      </div>
      
      {/* Navigation and Gamification Footer */}
      <div className="footer-controls">
        <div className="score-display">
            <span>النقاط: {initialScore}</span> | <span>المستوى: {initialLevel}</span>
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