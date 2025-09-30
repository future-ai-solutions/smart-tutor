// src/LessonGeneratorForm.jsx
import React, { useState } from 'react';
import './LessonGeneratorForm.css'; 

const LessonGeneratorForm = ({ onGenerate }) => {
  const [prompt, setTopic] = useState('');
  const [numberOfQuestions, setNumQuestions] = useState(5);
  const [showImages, setShowImages] = useState(true);
  const [enableAssistant, setEnableAssistant] = useState(true);
  const [childName, setChildName] = useState('');
  const [isTopicFocused, setIsTopicFocused] = useState(false);
  const [isChildNameFocused, setIsChildNameFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() === '') {
      alert('الرجاء إدخال الموضوع التعليمي أولاً.');
      return;
    }
    
    onGenerate({
      prompt,
      childName,
      numberOfQuestions,
      showImages,
      enableAssistant,
    });
  };

  return (
    <div className="form-container" dir="rtl">
      {/* Background Thematic Elements */}
      <div className="bg-pyramid-bottom"></div>
      <div className="bg-star-top-right">⭐</div>
      <div className="bg-star-bottom-left">✨</div>
      <div className="bg-star-mid-right">🌟</div>

      <div className="genie-assistant">
        <img src="/genie.png" alt="المساعد الذكي" className="genie-image" />
        <span className="greeting-bubble">أهلاً!</span>
      </div>

      <h1 className="form-title">إنشاء مغامرة الجني التعليمية!</h1>

      <form onSubmit={handleSubmit} className="lesson-form">
        {/* Child Name Input */}
        <div className="input-group">
          <label htmlFor="childName" className="input-label">اسم الطفل:</label>
          <input
            id="childName"
            type="text"
            placeholder="لنداء طفلك بالاسم"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className={`text-input ${isChildNameFocused ? 'focused' : ''}`}
            onFocus={() => setIsChildNameFocused(true)}
            onBlur={() => setIsChildNameFocused(false)}
          />
        </div>

        {/* Topic Input (Prompt) */}
        <div className="input-group">
          <label htmlFor="topic" className="input-label">أدخل الموضوع التعليمي:</label>
          <input
            id="topic"
            type="text"
            placeholder="مثل: الحروف الأبجدية العربية أو الفراعنة"
            value={prompt}
            onChange={(e) => setTopic(e.target.value)}
            className={`text-input large-input ${isTopicFocused ? 'focused' : ''}`}
            onFocus={() => setIsTopicFocused(true)}
            onBlur={() => setIsTopicFocused(false)}
            required
          />
        </div>

        {/* Customization Options */}
        <div className="options-grid">
          {/* Show Images Checkbox */}
          <div className="option-item">
            <label className="custom-checkbox-label">
              <input
                id="showImages"
                type="checkbox"
                checked={showImages}
                onChange={(e) => setShowImages(e.target.checked)}
                className="custom-checkbox-input"
              />
              <span className={`custom-checkbox-indicator ${showImages ? 'checked' : ''}`}>
                 <span className={`custom-checkbox-icon ${showImages ? 'checked-icon' : ''}`}>✔</span>
              </span>
              <span className="checkbox-icon">📸</span> إظهار صور توضيحية
            </label>
          </div>

          {/* Enable Assistant Checkbox */}
          <div className="option-item">
            <label className="custom-checkbox-label">
              <input
                id="enableAssistant"
                type="checkbox"
                checked={enableAssistant}
                onChange={(e) => setEnableAssistant(e.target.checked)}
                className="custom-checkbox-input"
              />
              <span className={`custom-checkbox-indicator ${enableAssistant ? 'checked' : ''}`}>
                <span className={`custom-checkbox-icon ${enableAssistant ? 'checked-icon' : ''}`}>✔</span>
              </span>
              <span className="checkbox-icon">✨</span> تفعيل المساعد الصوتي
            </label>
          </div>

          {/* Number of Questions Spinner */}
          <div className="option-item spinner-group">
            <label htmlFor="numQuestions" className="spinner-label">عدد الأسئلة:</label>
            <select
              id="numQuestions"
              value={numberOfQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              className="num-questions-select"
            >
              {[3, 5, 8, 10, 15].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          className="generate-button"
        >
          ابدأ المغامرة السحرية!
        </button>
      </form>
    </div>
  );
};

export default LessonGeneratorForm;