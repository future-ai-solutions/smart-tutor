package com.future.smarttutorbackend.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;

import java.util.List;

@Entity
public class Question {

    @EmbeddedId
    private QuestionID id;
    private String statement;
    private List<String> choices;
    private String answer;
    private String questionAudioUrl;

    public Question() {
    }

    public Question(String statement, List<String> choices, String answer, String questionAudioUrl, QuestionID id) {
        this.statement = statement;
        this.choices = choices;
        this.answer = answer;
        this.questionAudioUrl = questionAudioUrl;
        this.id = id;
    }

    public QuestionID getId() {
        return id;
    }

    public void setId(QuestionID id) {
        this.id = id;
    }

    public String getStatement() {
        return statement;
    }

    public void setStatement(String statement) {
        this.statement = statement;
    }

    public List<String> getChoices() {
        return choices;
    }

    public void setChoices(List<String> choices) {
        this.choices = choices;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getQuestionAudioUrl() {
        return questionAudioUrl;
    }

    public void setQuestionAudioUrl(String questionAudioUrl) {
        this.questionAudioUrl = questionAudioUrl;
    }

    @Override
    public String toString() {
        return "Question{" +
                "statement='" + statement + '\'' +
                ", choices=" + choices +
                ", answer='" + answer + '\'' +
                ", questionAudioUrl='" + questionAudioUrl + '\'' +
                '}';
    }
}