package com.future.smarttutorbackend.model;

import java.util.List;

public class Quiz {

    private Long quizId;
    private List<Question> questions;

    public Quiz() {
    }

    public Quiz(Long quizId, List<Question> questions) {
        this.quizId = quizId;
        this.questions = questions;
    }

    public Long getQuizId() {
        return quizId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    @Override
    public String toString() {
        return "Quiz{" +
                "quizId=" + quizId +
                ", questions=" + questions +
                '}';
    }
}