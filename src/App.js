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
import './index.css'; // استيراد الأنماط العامة
import LessonGeneratorForm from './LessonGeneratorForm';
import LessonDisplay from './LessonDisplay';
import GamifiedQuiz from './GamifiedQuiz';
import { mockLessonData } from './MockData'; 

function App() {
  const [currentScreen, setCurrentScreen] = useState('form'); 
  const [lessonData, setLessonData] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateLesson = async (formData) => {
    setLoading(true);
    setError(null);
    try {
     
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay (2 seconds)
      
     
      const data = { 
          ...mockLessonData, 
          formData: formData, 
          lesson: { 
              ...mockLessonData.lesson,
              title: formData.topic || mockLessonData.lesson.title,
              text: `أهلاً بك يا ${formData.childName || 'صديقنا'} في رحلة شيقة حول موضوع ${formData.topic || 'معلومات جديدة'}! ${mockLessonData.lesson.text}` 
          }
      };

      setLessonData(data); 
      setCurrentScreen('lesson'); 

    } catch (e) {
      setError(`Failed to simulate lesson generation: ${e.message}`);
      console.error("Error simulating lesson:", e);
    } finally {
      setLoading(false);
    }
  };

  
  const handleSubmitAnswer = async (answerPayload) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

      let newScore = lessonData.currentScore || 0;
      if (answerPayload.isCorrect) {
          newScore += 10; 
      }

      setLessonData(prevData => ({
          ...prevData,
          currentScore: newScore 
      }));
      
      return { message: "Answer submitted (mock)", newScore: newScore };
    } catch (e) {
      console.error("Error simulating answer submission:", e);
      setError(`Failed to simulate submit answer: ${e.message}`);
      return null;
    }
  };

  const handleQuizComplete = () => {
    alert('انتهى الاختبار! يمكنك الآن بدء مغامرة جديدة. 🎉');
    setCurrentScreen('form'); 
    setLessonData(null); 
  };

  return (
    <div className="App" dir="rtl">
      {loading && <p className="loading-message">يتم تجهيز المغامرة...</p>}
      {error && <p className="error-message">حدث خطأ في عرض البيانات الوهمية: {error}</p>}

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