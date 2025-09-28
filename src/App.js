// // src/App.js
// import React, { useState } from 'react';
// import LessonGeneratorForm from './LessonGeneratorForm'; // Import your new component

// function App() {
//   const [loading, setLoading] = useState(false);
//   const [lessonData, setLessonData] = useState(null); // To store data from backend

//   const handleGenerateLesson = async (formData) => {
//     console.log('Form Data Received in App component:', formData);
//     setLoading(true);
//     setLessonData(null); // Clear previous data

//     try {
//       // Replace with your actual API Gateway endpoint
//       const apiUrl = 'YOUR_API_GATEWAY_URL/generate-lesson'; 

//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         const errorText = await response.text(); // Get raw error response
//         throw new Error(`HTTP error! Status: ${response.status}. Details: ${errorText}`);
//       }

//       const data = await response.json();
//       setLessonData(data); // Store the generated lesson data
//       console.log('Lesson Generated Successfully:', data);
//       // Here, you would typically navigate to the next screen to display the lesson
//       alert('تم توليد الدرس بنجاح! يمكنك الآن رؤية المحتوى.');

//     } catch (error) {
//       console.error("Error generating lesson:", error);
//       alert('حدث خطأ أثناء توليد الدرس. يرجى التحقق من وحدة التحكم.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="App" dir="rtl"> {/* Set main app direction to RTL */}
//       <header className="App-header">
//         {/* You can put a title here or remove the header */}
//         <h1>مُعلّمي الذكي - منصة توليد الدروس</h1>
//       </header>
//       <main>
//         {loading && <p className="loading-message">جاري توليد المحتوى بواسطة الذكاء الاصطناعي... 🪄</p>}
//         {lessonData && !loading && (
//           <div className="lesson-preview">
//             <h2>{lessonData.lesson.title}</h2>
//             {/* Here you would render your LessonDisplay component */}
//             <p>{lessonData.lesson.text}</p>
//             {lessonData.lesson.imageUrl && <img src={lessonData.lesson.imageUrl} alt="Lesson Visual" style={{maxWidth: '100%', height: 'auto'}} />}
//             {/* You'd have a button to proceed to the quiz here */}
//             <button onClick={() => alert('الدرس جاهز، لننتقل للاختبار!')}>ابدأ الاختبار</button>
//           </div>
//         )}
//         {!loading && !lessonData && (
//           // Render your LessonGeneratorForm component
//           <LessonGeneratorForm onGenerate={handleGenerateLesson} />
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;

// src/App.js
import React, { useState } from 'react';
import './App.css';
import LessonGeneratorForm from './LessonGeneratorForm';
import LessonDisplay from './LessonDisplay';
import GamifiedQuiz from './GamifiedQuiz';
import { mockLessonData } from '/mockData'; // تأكد إن ده لسه موجود كـ fallback

function App() {
  const [currentScreen, setCurrentScreen] = useState('form');
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. استيراد الـ API Base URL من Environment Variables
  const API_BASE_URL = 'https://4m28j5x4d8.execute-api.us-west-2.amazonaws.com/dev'


  const handleGenerateLesson = async (formData) => {
      setLoading(true);
      setError(null);

      if (!API_BASE_URL) {
          console.warn("Backend API URL is not set. Using mock data for generateLesson.");
          await new Promise(resolve => setTimeout(resolve, 1500)); // محاكاة تأخير
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
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  childName: formData.childName,
                  topic: formData.topic,
                  numQuestions: formData.numQuestions,
                  showImages: formData.showImages,
                  enableAssistant: formData.enableAssistant
              }),
          });

          if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
          }

          const data = await response.json();
          //expecting data to be in the format of mockLessonData but might need transformation
          const transformedQuiz = data.quiz.questions.map(q => ({
              questionId: q.questionId,
              text: q.questionId, 
              options: q.options,
              ///transform correctAnswer to correctAnswerIndex
              correctAnswerIndex: q.options.indexOf(q.correctAnswer), 
              feedbackCorrect: q.feedbackCorrect,
              feedbackIncorrect: "حاول مرة أخرى." 
          }));

          const formattedLessonData = {
              sessionId: data.sessionId || "mock-session-id", 
              lesson: {
                  title: data.title || `درس عن ${formData.topic}`,
                  text: data.text,
                  imageUrl: data.imageUrl,
                  audioUrl: data.audioUrl
              },
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

//mock function to simulate submitting answer to backend API
  const handleSubmitAnswer = async (answerPayload) => {
    if (!API_BASE_URL) {
        console.warn("Backend API URL is not set. Simulating answer submission.");
        await new Promise(resolve => setTimeout(resolve, 500));
        let newScore = (lessonData?.currentScore || 0) + (answerPayload.isCorrect ? 10 : 0);
        setLessonData(prevData => ({ ...prevData, currentScore: newScore }));
        return { message: "Answer submitted (mock)", newScore: newScore };
    }

    console.warn("Submit Answer API not yet implemented. Using mock logic.");
    let newScore = (lessonData?.currentScore || 0) + (answerPayload.isCorrect ? 10 : 0);
    setLessonData(prevData => ({ ...prevData, currentScore: newScore }));
    return { message: "Answer submitted (mock) as Backend endpoint is not ready", newScore: newScore };

    
    /*
    try {
        const response = await fetch(`${API_BASE_URL}/api/tutor/submit-answer`, { // مثال لـ path
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(answerPayload),
        });
        if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
        const data = await response.json(); // افترض بيرجع { newScore: 20 }
        setLessonData(prevData => ({ ...prevData, currentScore: data.newScore }));
        return data;
    } catch (e) {
        console.error("Error submitting answer to API:", e);
        setError(`Failed to submit answer to API: ${e.message}`);
        return null;
    }
    */
  };

  const handleQuizComplete = () => {
    alert('انتهى الاختبار! يمكنك الآن بدء مغامرة جديدة. 🎉');
    setCurrentScreen('form');
    setLessonData(null);
  };

  return (
    <div className="App" dir="rtl">
      {loading && <p className="loading-message">يتم تجهيز المغامرة...</p>}
      {error && <p className="error-message">حدث خطأ: {error}</p>}

      {!loading && !error && (
        <>
          {currentScreen === 'form' && (
            <LessonGeneratorForm onGenerate={handleGenerateLesson} />
          )}
          {currentScreen === 'lesson' && lessonData && (
            <LessonDisplay
              lessonData={lessonData}
              onStartQuiz={() => setCurrentScreen('quiz')}
            />
          )}
          {currentScreen === 'quiz' && lessonData && (
            <GamifiedQuiz
              lessonData={lessonData}
              onSubmitAnswer={handleSubmitAnswer}
              onQuizComplete={handleQuizComplete}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;