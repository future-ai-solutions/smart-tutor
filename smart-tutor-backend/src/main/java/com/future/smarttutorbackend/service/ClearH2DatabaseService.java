package com.future.smarttutorbackend.service;

import com.future.smarttutorbackend.repositry.LessonRepository;
import com.future.smarttutorbackend.repositry.QuestionRepository;
import org.springframework.stereotype.Service;

@Service
public class ClearH2DatabaseService {

    private final LessonRepository lessonRepository;
    private final QuestionRepository questionRepository;

    public ClearH2DatabaseService(LessonRepository lessonRepository, QuestionRepository questionRepository) {
        this.lessonRepository = lessonRepository;
        this.questionRepository = questionRepository;
    }

    public void clearH2Database() {
        questionRepository.deleteAll();
        lessonRepository.deleteAll();
    }
}
