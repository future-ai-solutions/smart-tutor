package com.future.smarttutorbackend.repositry;

import com.future.smarttutorbackend.model.Question;
import com.future.smarttutorbackend.model.QuestionId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, QuestionId> {
    Optional<Question> findByIdLessonIdAndIdQuestionIndex(Long lessonId, Long questionIndex);
}