// src/GamifiedQuiz.jsx
import React, { useState, useEffect } from 'react';
import './GamifiedQuiz.css'; 
//we need a success sound and a failure sound
//we need function to submit answer to backend API
const GamifiedQuiz = ({ lessonData, onSubmitAnswer, onQuizComplete }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [qState, setQState] = useState('unanswered'); // 'unanswered', 'correct', 'incorrect'
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [feedback, setFeedback] = useState('');

  const currentQuestion = lessonData.quiz[currentQIndex];
  const { childName } = lessonData.formData;
  

  useEffect(() => {
      setQState('unanswered');
      setSelectedIndex(null);
      setFeedback('');
  }, [currentQIndex]);

  const handleAnswerClick = (index) => {
    if (qState !== 'unanswered') return; 
    
    const isCorrect = index === currentQuestion.correctAnswerIndex;
    setSelectedIndex(index);
    setQState(isCorrect ? 'correct' : 'incorrect');
    
    // Set immediate feedback from LLM
    const msg = isCorrect ? currentQuestion.feedbackCorrect : currentQuestion.feedbackIncorrect;
    setFeedback(msg);

    // 1. Submit answer to backend API (to update score)
    onSubmitAnswer({
        sessionId: lessonData.sessionId,
        questionId: currentQuestion.questionId,
        selectedOptionIndex: index,
        isCorrect: isCorrect
    });
    
    // 2. Play audio feedback (using audioUrl from the response or predefined sound)
    //if (lessonData.formData.enableAssistant) new Audio(isCorrect ? successSound : failureSound).play();

    // 3. Move to next question after a delay (e.g., 2 seconds)
    setTimeout(() => {
        if (currentQIndex < lessonData.quiz.length - 1) {
            setCurrentQIndex(currentQIndex + 1);
        } else {
            onQuizComplete(); // Notify parent component quiz is over
        }
    }, 2500);
  };

  return (
    <div className="quiz-container" dir="rtl">
        {/* Background elements */}
        <div className="bg-star-top-right">⭐</div>
        <div className="bg-star-bottom-left">✨</div>
        
        <div className="quiz-content-area">
            
            <h2 className="quiz-question-text">{currentQuestion.text}</h2>
            
            <div className="quiz-details-row">
                
                {/* Options Grid */}
                <div className="options-grid-quiz">
                    {currentQuestion.options.map((option, index) => {
                        const isSelected = index === selectedIndex;
                        const isCorrectOption = index === currentQuestion.correctAnswerIndex;
                        
                        let buttonClass = 'option-button';
                        if (qState !== 'unanswered') {
                            if (isSelected) {
                                buttonClass += isCorrectOption ? ' correct' : ' incorrect';
                            } else if (isCorrectOption) {
                                buttonClass += ' correct-reveal'; 
                            }
                        }

                        return (
                            <button
                                key={index}
                                className={buttonClass}
                                onClick={() => handleAnswerClick(index)}
                                disabled={qState !== 'unanswered'}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>

                {/* Genie Assistant */}
                <div className="genie-quiz-assistant">
                    <img src="/genie.png" alt="المساعد الذكي" className="genie-image-small" />
                    {feedback && (
                        <div className={`feedback-bubble ${qState}`}>{feedback}</div>
                    )}
                    {!feedback && (
                         <div className="feedback-bubble default">يلا يا {childName}، اختر الإجابة الصحيحة!</div>
                    )}
                </div>

            </div>
        </div>

        {/* Quiz Footer - Gamification */}
        <div className="quiz-footer">
            <span className="star-points">🌟 {currentQIndex + 1} / {lessonData.quiz.length} سؤال</span>
            <span className="star-points">⭐ النقاط: {lessonData.currentScore || 0}</span>
            <button className="hint-button" disabled={qState !== 'unanswered'}>تلميح</button>
        </div>
    </div>
  );
};

export default GamifiedQuiz;