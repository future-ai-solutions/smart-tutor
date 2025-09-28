// src/mockData.js

export const mockLessonData = {
    sessionId: "mock-session-id-123",
    lesson: {
        title: "مغامرة الأهرامات الفرعونية!",
        text: "أهلاً بك يا أسامة في رحلة مثيرة إلى أرض الفراعنة العظيمة! سنتعلم اليوم عن الأهرامات المصرية الشاهقة، كيف بنيت ولماذا كانت مهمة جداً للمصريين القدماء. تخيل نفسك وأنت تقف أمام هذه التحف المعمارية المذهلة، وترى كيف كان الفراعنة يؤمنون بالحياة بعد الموت وبناء بيوتهم الأبدية.",
        imageUrl: "https://via.placeholder.com/600x400/2A62C6/FFFFFF?text=صورة+للأهرامات", // صورة وهمية
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // رابط صوت وهمي
    },
    quiz: [
        {
            questionId: "q1",
            text: "لماذا بنى الفراعنة الأهرامات؟",
            options: [
                "لتخزين الطعام فيها",
                "لتكون مقابر لهم بعد الموت",
                "لتكون أماكن للاحتفالات",
                "ليعيشوا فيها"
            ],
            correctAnswerIndex: 1, // الإجابة الصحيحة هي "لتكون مقابر لهم بعد الموت"
            feedbackCorrect: "إجابة صحيحة يا بطل! الأهرامات كانت مقابر ملكية.",
            feedbackIncorrect: "لا يا صديقي! فكر مرة أخرى في الغرض الأساسي للأهرامات."
        },
        {
            questionId: "q2",
            text: "ما هو اسم أشهر أبو الهول يحرس الأهرامات؟",
            options: [
                "أبو الهول الكبير",
                "أبو سمبل",
                "أبو الهول بالجيزة",
                "أبو الهول الحارس"
            ],
            correctAnswerIndex: 2, // "أبو الهول بالجيزة"
            feedbackCorrect: "أنت ذكي جداً! أبو الهول بالجيزة هو الأشهر.",
            feedbackIncorrect: "حاول تتذكر اسم أبو الهول اللي كلنا عارفينه!"
        },
        {
            questionId: "q3",
            text: "ماذا يرتدي الفرعون على رأسه؟",
            options: [
                "تاج ملون",
                "عمامة بيضاء",
                "غطاء رأس مميز (التاج المزدوج)",
                "قبعة من الفرو"
            ],
            correctAnswerIndex: 2, // "غطاء رأس مميز (التاج المزدوج)"
            feedbackCorrect: "صحيح! كان له تاج مميز يدل على حكمه.",
            feedbackIncorrect: "مش قبعة! حاجة ملكية أكتر."
        }
    ],
    formData: { // بيانات الفورم الأصلية عشان تستخدمها في LessonDisplay لو عايز
        childName: "أسامة",
        topic: "الفراعنة",
        numQuestions: 3,
        showImages: true,
        enableAssistant: true
    },
    currentScore: 0, // النقاط الحالية للطفل
    initialLevel: 1
};