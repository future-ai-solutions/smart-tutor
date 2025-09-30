import React, { useState, useEffect } from 'react';
import LessonGeneratorForm from './LessonGeneratorForm';
import LessonDisplay from './LessonDisplay';
import GamifiedQuiz from './GamifiedQuiz';
import PointsTab from './PointsTab'; 
import './App.css'; 
import { mockLessonData } from './MockData'; 

const API_BASE_URL = process.env.REACT_APP_BACKEND_API_BASE_URL || null; 

function App() {
  const [currentScreen, setCurrentScreen] = useState('form');
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [childName, setChildName] = useState('');
  
  // Gamification 
  const [totalPoints, setTotalPoints] = useState(0); 
  const [unlockedItems, setUnlockedItems] = useState([]); 


  useEffect(() => {
    const savedPoints = localStorage.getItem('totalPoints');
    if (savedPoints) {
      setTotalPoints(parseInt(savedPoints));
    }
    const savedUnlockedItems = localStorage.getItem('unlockedItems');
    if (savedUnlockedItems) {
      setUnlockedItems(JSON.parse(savedUnlockedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('totalPoints', totalPoints.toString());
  }, [totalPoints]);

  useEffect(() => {
    localStorage.setItem('unlockedItems', JSON.stringify(unlockedItems));
  }, [unlockedItems]);

  const updatePoints = (amount) => {
    setTotalPoints(prevPoints => prevPoints + amount);
    console.log(`Updated points by ${amount}. Total points: ${totalPoints + amount}`);
  };

  const handlePurchaseItem = (itemCost, itemId) => {
    if (totalPoints >= itemCost) {
      setTotalPoints(prevPoints => prevPoints - itemCost);
      setUnlockedItems(prevItems => [...prevItems, itemId]);
      alert(`تهانينا! تم فتح ${itemId} بـ ${itemCost} نقطة.`);
      return true; 
    } else {
      alert('نقاطك غير كافية لفتح هذا العنصر. العب أكثر لتجمع المزيد!');
      return false; 
    }
  };

  
  const handleGenerateLesson = async (formData) => {
    setLoading(true);
    setError(null);
    setLessonData(null);
    setChildName(formData.childName);

    // --- Fallback to Mock Data ---
    if (!API_BASE_URL) {
      console.warn("Backend API URL is not set. Using mock data.");
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      const mockDataWithFormData = {
        ...mockLessonData,
        formData: formData,
        lesson: {
            ...mockLessonData.lesson,
            title: `درس عن ${formData.topic}`,
            text: `مرحباً يا ${formData.childName}! ${mockLessonData.lesson.text}`
        },
      };
      setLessonData(mockDataWithFormData);
      setCurrentScreen('lesson');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/tutor/generate`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      
      // dealing with API response structure differences
      const transformedQuiz = data.quiz.questions.map(q => ({
          questionId: q.questionId,
          text: q.questionId, 
          options: q.options,
          correctAnswerIndex: q.options.indexOf(q.correctAnswer), 
          feedbackCorrect: q.feedbackCorrect,
          feedbackIncorrect: "حاول مرة أخرى." 
      }));

      const formattedLessonData = {
          sessionId: data.sessionId || "api-session-id", 
          lesson: data.lesson,
          quiz: transformedQuiz,
          formData: formData, 
          currentScore: 0,
          initialLevel: 1
      };

      setLessonData(formattedLessonData);
      setCurrentScreen('lesson');
    } catch (e) {
      setError(`Failed to generate lesson from API: ${e.message}`);
      console.error("Error generating lesson:", e);
    } finally {
      setLoading(false);
    }
  };

  
  const handleSubmitAnswer = async (answerPayload) => {
    let newScore = lessonData?.currentScore || 0;
    
    if (answerPayload.isCorrect) {
      updatePoints(5); 
      newScore += 10; 
    }
    
    if (API_BASE_URL) {
      console.log('Sending answer to backend...', answerPayload);
      // // (Add actual fetch call here for submit-answer API)
    }

    setLessonData(prevData => ({ ...prevData, currentScore: newScore }));
    
    return { message: "Answer submitted successfully", newScore: newScore };
  };

  const handleQuizComplete = () => {
    updatePoints(20); // 🌟🌟 20 نقطة مكافأة إنهاء الاختبار 🌟🌟
    alert('انتهى الاختبار! حصلت على 20 نقطة إضافية. 🎉');
    setCurrentScreen('form');
    setLessonData(null);
  };
  
  return (
    <div className="App" dir="rtl">
        <nav className="top-navbar">
            <button onClick={() => setCurrentScreen('form')} className={`nav-btn ${currentScreen === 'form' ? 'active' : ''}`}>
                <span role="img" aria-label="magic">✨</span> ابدأ درس جديد
            </button>
            
           {/*point system*/}
            <button onClick={() => setCurrentScreen('points')} className={`nav-btn ${currentScreen === 'points' ? 'active' : ''}`}>
                <span role="img" aria-label="gem">💎</span> مغارة الجني
            </button>
            
            <div className="current-points">
                <span role="img" aria-label="star">⭐</span> النقاط: {totalPoints}
            </div>
        </nav>

        <main>
          {loading && <p className="loading-message">يتم تجهيز المغامرة... 🪄</p>}
          {error && <p className="error-message">حدث خطأ: {error}</p>}

          {!loading && !error && (
            <>
              {currentScreen === 'form' && <LessonGeneratorForm onGenerate={handleGenerateLesson} />}
              
              {currentScreen === 'lesson' && lessonData && (
                <LessonDisplay
                  lessonData={lessonData}
                  childName={childName}
                  onStartQuiz={() => setCurrentScreen('quiz')} 
                />
              )}
              
              {currentScreen === 'quiz' && lessonData && (
                <GamifiedQuiz
                  lessonData={lessonData}
                  onSubmitAnswer={handleSubmitAnswer} // نمرر الدالة التي تسجل الإجابة وتزيد النقاط
                  onQuizComplete={handleQuizComplete}
                />
              )}

              {currentScreen === 'points' && (
                <PointsTab
                  totalPoints={totalPoints}
                  unlockedItems={unlockedItems}
                  onPurchaseItem={handlePurchaseItem}
                  onBackToForm={() => setCurrentScreen('form')}
                />
              )}
            </>
          )}
        </main>
    </div>
  );
};

export default App;
