package com.future.smarttutorbackend.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class QuestionId implements Serializable {

    private Long lessonId;
    private Long questionIndex;

    public QuestionId() {}

    public QuestionId(Long lessonId, Long questionIndex) {
        this.lessonId = lessonId;
        this.questionIndex = questionIndex;
    }

    public Long getLessonId() {
        return lessonId;
    }

    public void setLessonId(Long lessonId) {
        this.lessonId = lessonId;
    }

    public Long getQuestionIndex() {
        return questionIndex;
    }

    public void setQuestionIndex(Long questionIndex) {
        this.questionIndex = questionIndex;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof QuestionId)) return false;
        QuestionId that = (QuestionId) o;
        return Objects.equals(lessonId, that.lessonId) &&
                Objects.equals(questionIndex, that.questionIndex);
    }

    @Override
    public int hashCode() {
        return Objects.hash(lessonId, questionIndex);
    }
}