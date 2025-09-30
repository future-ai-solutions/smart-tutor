package com.future.smarttutorbackend.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Question {

    @EmbeddedId
    private QuestionId id;

    @Lob
    private String question;

    // Use ElementCollection for a simple list of values
    @ElementCollection
    private List<String> choices;

    private int answer;

    @Lob
    private String questionAudioUrl;

    @Lob
    private String correctFeedbackAudioUrl;

    @Lob
    private String wrongFeedbackAudioUrl;

    public Question() {
    }

    public Question(QuestionId questionId) {
        this.id = questionId;
    }

    public QuestionId getQuestionId() {
        return id;
    }

    public void setQuestionId(QuestionId questionId) {
        this.id = questionId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<String> getChoices() {
        return choices;
    }

    public void setChoices(List<String> choices) {
        this.choices = choices;
    }

    public int getAnswer() {
        return answer;
    }

    public void setAnswer(int answer) {
        this.answer = answer;
    }

    public String getQuestionAudioUrl() {
        return questionAudioUrl;
    }

    public void setQuestionAudioUrl(String questionAudioUrl) {
        this.questionAudioUrl = questionAudioUrl;
    }

    public String getCorrectFeedbackAudioUrl() {
        return correctFeedbackAudioUrl;
    }

    public void setCorrectFeedbackAudioUrl(String correctFeedbackAudioUrl) {
        this.correctFeedbackAudioUrl = correctFeedbackAudioUrl;
    }

    public String getWrongFeedbackAudioUrl() {
        return wrongFeedbackAudioUrl;
    }

    public void setWrongFeedbackAudioUrl(String wrongFeedbackAudioUrl) {
        this.wrongFeedbackAudioUrl = wrongFeedbackAudioUrl;
    }
}
