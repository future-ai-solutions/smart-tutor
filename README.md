# Smart Tutor Platform
#Presentation: https://gamma.app/docs/Smart-Tutor-Platform-zjb0ezf8dxlkcua?mode=present#card-6bec29vaayqfs9e
#Demo: https://drive.google.com/file/d/1xnKJD_shQSxkY5ucTlhb9HNDBCa6TlVW/view?usp=sharing
<img width="1024" height="1024" alt="image" src="https://github.com/user-attachments/assets/bbac222c-8975-48e7-b21d-41d2dc299d9b" />


## Overview
The **Smart Tutor** is an innovative educational platform designed for children in the Arab world, leveraging Generative AI to create personalized, gamified learning experiences. Parents and educators input a topic via a text prompt, and the platform generates a tailored lesson, quiz, and feedback sequence, accompanied by an AI-powered cartoon companion that provides voice-based interaction in Arabic and its dialects.

## Features
- **Customized Content**: Generates age-appropriate lessons, quizzes, and feedback based on user prompts.
- **Visual Support**: Creates culturally relevant images to enhance learning.
- **Gamification**: Includes engaging quizzes and motivational reward messages.
- **Voice Interaction**: Features a cartoon tutor using Amazon Polly for natural Arabic text-to-speech.
- **Arabic Language Support**: Supports Modern Standard Arabic (MSA) and local dialects.

## Target Audience
- **Primary Users**: Children aged 4–12 years.
- **Content Creators**: Parents and educators in Egypt and the Arab region.

## Technical Stack
- **AWS Services**:
  - Amazon Bedrock/SageMaker: Hosts LLMs and image generation models.
  - Amazon Polly: Enables high-quality Arabic text-to-speech.
  - AWS Lambda: Manages serverless backend logic and prompt processing.
  - Amazon S3: Stores images and audio files.
  - Amazon DynamoDB: Tracks user progress and gamification data.
- **Frontend**: RTL-friendly interface for web/mobile.
- **Generative AI**: Powers dynamic content creation (lessons, quizzes, images).

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/smart-tutor.git
   ```
2. Install dependencies (update with specific requirements):
   ```bash
   npm install
   ```
3. Configure AWS credentials and environment variables.
4. Run the application:
   ```bash
   npm start
   ```

## Usage
1. Input a learning topic via the platform's prompt interface.
2. Receive a generated lesson, quiz, and feedback sequence.
3. Interact with the AI-powered cartoon tutor for a personalized experience.

## Future Roadmap
- **Scalability**: Integrate with schools and NGOs for broader educational impact.
- **Customization**: Allow uploads of curriculum documents for tailored content.
- **Expansion**: Support additional languages and regional curricula.

## Contributing
Contributions are welcome! Please submit pull requests or open issues for bugs, features, or improvements.

## License
This project is licensed under the MIT License.

