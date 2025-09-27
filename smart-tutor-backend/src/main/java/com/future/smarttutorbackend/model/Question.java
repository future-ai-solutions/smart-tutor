package com.future.smarttutorbackend.model;

import java.util.List;

public record Question(String statement, List<String> choices, String answer, String questionAudioUrl) {
}
