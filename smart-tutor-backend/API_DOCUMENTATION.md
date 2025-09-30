## Smart Tutor API

### POST /api/tutor/generate-lesson
Returns lesson content.
**Request Body:**
```json
{
  "prompt": "الاهرامات",
  "childName": "احمد",
  "numberOfQuestions": 3,
  "showImages": true,
  "enableAssistant": true
}
```
**Response:**
```json
{
  "id": 1,
  "title": "عجائب مصر القديمة: الأهرامات المذهلة",
  "content": "الأهرامات هي بنايات ضخمة وعجيبة بناها المصريون القدماء منذ آلاف السنين. تشبه الأهرامات الجبال الكبيرة، لكنها من صنع الإنسان! كانت هذه البنايات العملاقة مقابر للفراعنة، وهم ملوك مصر القديمة.\n\nبُنيت الأهرامات من آلاف الأحجار الثقيلة التي وضعت فوق بعضها البعض بدقة كبيرة. تخيل كيف استطاع الناس قديمًا بناء هذه الصروح العظيمة دون استخدام الآلات الحديثة التي نعرفها اليوم!\n\nأشهر الأهرامات هي أهرامات الجيزة الثلاثة، وأكبرها هو هرم خوفو الذي يُعتبر من عجائب الدنيا السبع القديمة. يبلغ ارتفاعه حوالي 146 مترًا، وهو بارتفاع مبنى من 40 طابقًا تقريبًا!\n\nداخل الأهرامات، كان المصريون القدماء يضعون كنوزًا ثمينة مع الفرعون المتوفى، لأنهم اعتقدوا أنه سيحتاجها في حياته الأخرى. وقد وجد علماء الآثار الكثير من هذه الكنوز الرائعة في الأهرامات.\n\nاليوم، تُعتبر الأهرامات من أهم المعالم السياحية في مصر، ويأتي الناس من كل أنحاء العالم لرؤيتها والإعجاب بعظمتها وجمالها. إنها حقًا شاهد على عبقرية وإبداع الحضارة المصرية القديمة!",
  "imageUrl": "https://smart-tutor-bedrock-images.s3.us-west-2.amazonaws.com/images/da848895-19c3-43a5-8bf7-5462ede3b7dc.png?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLWVhc3QtMSJIMEYCIQDzwK6YJcXOiGZ55%2FRUoOnMEnkGSgjwoJP0Ws%2BsUuBNPgIhAIOxush3mg%2FH3OYKoUaN%2FGUcXX2hPBkqljyf2TkZTcC3KqICCOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAhoMOTMxNTQ1NDY5NTgzIgyXCQSCP45snXN94VMq9gF25c%2FwRVxd581Ov37VCvdFWuJB%2FKUjdUJH1OfjOMjCw%2BLYvqfO3HmoOa2MdfypboPvrx04vCJCQgaUHqP2grJPve6uNAwGxc1KAW8YlXBz53JYn3sIrO2Fq74My%2BXqKLnRThps8bxfXAee5cRzqtxVicZM9j1eoW%2F1i93DNbjiS2nrJI%2FX3%2FUqqwfDu5PjIAIdzwsxF4%2F20UYpkxScOwaSXc952doaLVLcyjQH5knle2zliFB9SkMVLQEKrxuSjz1GYnISqpjAko47TyFxHjqLH44A%2BVqyKqzOfsBJwiiJvHbuquL1LVbIp9BMYNbBeyOGwbOJ%2Blsw0dTsxgY6nAGlFdTz5bnGg4yY7%2FwRpxP2KSsqptb9qdCD%2B8suNKP7kVmUXx%2BVG45GUhYqbF%2F3WEs5Ri2SNDuuWAtbarbNPTzUIXE99u6A%2FqGM4l51hZPjLks4lhK3%2B7r7XZYvaw3UMiyrbpnTUHmW1f8qX8BvnoaeUqdrCR3zUlS7eXfQLaXfKuZECXKAvD01r9UGa27ro5L0%2FKg6kRd5xsnEMHk%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250930T024102Z&X-Amz-SignedHeaders=host&X-Amz-Credential=ASIA5RZDP2KH2JAZP3H7%2F20250930%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Expires=86400&X-Amz-Signature=29ca6bff0242acdaf742b6221eb88659c5bcd7e2742e7ffe6a5ada46a90ce721",
  "audioUrl": "https://smart-tutor-polly-audios.s3.us-west-2.amazonaws.com/4aa152c5-e21f-4f75-998c-44fe159765d0.mp3?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLWVhc3QtMSJIMEYCIQDzwK6YJcXOiGZ55%2FRUoOnMEnkGSgjwoJP0Ws%2BsUuBNPgIhAIOxush3mg%2FH3OYKoUaN%2FGUcXX2hPBkqljyf2TkZTcC3KqICCOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAhoMOTMxNTQ1NDY5NTgzIgyXCQSCP45snXN94VMq9gF25c%2FwRVxd581Ov37VCvdFWuJB%2FKUjdUJH1OfjOMjCw%2BLYvqfO3HmoOa2MdfypboPvrx04vCJCQgaUHqP2grJPve6uNAwGxc1KAW8YlXBz53JYn3sIrO2Fq74My%2BXqKLnRThps8bxfXAee5cRzqtxVicZM9j1eoW%2F1i93DNbjiS2nrJI%2FX3%2FUqqwfDu5PjIAIdzwsxF4%2F20UYpkxScOwaSXc952doaLVLcyjQH5knle2zliFB9SkMVLQEKrxuSjz1GYnISqpjAko47TyFxHjqLH44A%2BVqyKqzOfsBJwiiJvHbuquL1LVbIp9BMYNbBeyOGwbOJ%2Blsw0dTsxgY6nAGlFdTz5bnGg4yY7%2FwRpxP2KSsqptb9qdCD%2B8suNKP7kVmUXx%2BVG45GUhYqbF%2F3WEs5Ri2SNDuuWAtbarbNPTzUIXE99u6A%2FqGM4l51hZPjLks4lhK3%2B7r7XZYvaw3UMiyrbpnTUHmW1f8qX8BvnoaeUqdrCR3zUlS7eXfQLaXfKuZECXKAvD01r9UGa27ro5L0%2FKg6kRd5xsnEMHk%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250930T024117Z&X-Amz-SignedHeaders=host&X-Amz-Credential=ASIA5RZDP2KH2JAZP3H7%2F20250930%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Expires=86400&X-Amz-Signature=cf7728c08aa2c9c096939ac478eb726149d726ce64c776db32de7afb5d6e8b89"
}
```

### GET /api/tutor/generate-question/{lessonId}/{questionIndex}
Returns the specified question (questionIndex 0 based)

**Response:**
```json
{
  "question": "ما هو الغرض الرئيسي من بناء الأهرامات في مصر القديمة؟",
  "choices": [
    "لتكون مساكن للفراعنة",
    "لتكون مقابر للفراعنة",
    "لتكون مراكز تجارية",
    "لتكون معابد للآلهة"
  ],
  "answer": 1,
  "questionAudioUrl": "https://smart-tutor-polly-audios.s3.us-west-2.amazonaws.com/86eacd7a-a514-43d4-b84a-51ba433ea7b7.mp3?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLWVhc3QtMSJIMEYCIQDzwK6YJcXOiGZ55%2FRUoOnMEnkGSgjwoJP0Ws%2BsUuBNPgIhAIOxush3mg%2FH3OYKoUaN%2FGUcXX2hPBkqljyf2TkZTcC3KqICCOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAhoMOTMxNTQ1NDY5NTgzIgyXCQSCP45snXN94VMq9gF25c%2FwRVxd581Ov37VCvdFWuJB%2FKUjdUJH1OfjOMjCw%2BLYvqfO3HmoOa2MdfypboPvrx04vCJCQgaUHqP2grJPve6uNAwGxc1KAW8YlXBz53JYn3sIrO2Fq74My%2BXqKLnRThps8bxfXAee5cRzqtxVicZM9j1eoW%2F1i93DNbjiS2nrJI%2FX3%2FUqqwfDu5PjIAIdzwsxF4%2F20UYpkxScOwaSXc952doaLVLcyjQH5knle2zliFB9SkMVLQEKrxuSjz1GYnISqpjAko47TyFxHjqLH44A%2BVqyKqzOfsBJwiiJvHbuquL1LVbIp9BMYNbBeyOGwbOJ%2Blsw0dTsxgY6nAGlFdTz5bnGg4yY7%2FwRpxP2KSsqptb9qdCD%2B8suNKP7kVmUXx%2BVG45GUhYqbF%2F3WEs5Ri2SNDuuWAtbarbNPTzUIXE99u6A%2FqGM4l51hZPjLks4lhK3%2B7r7XZYvaw3UMiyrbpnTUHmW1f8qX8BvnoaeUqdrCR3zUlS7eXfQLaXfKuZECXKAvD01r9UGa27ro5L0%2FKg6kRd5xsnEMHk%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250930T024128Z&X-Amz-SignedHeaders=host&X-Amz-Credential=ASIA5RZDP2KH2JAZP3H7%2F20250930%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Expires=86400&X-Amz-Signature=e7cf01f6063908ca7dc70ecdd0e171036c3d0f29617d8d757862de2e43c417be",
  "correctFeedbackAudioUrl": "https://smart-tutor-polly-audios.s3.us-west-2.amazonaws.com/c4f06ae7-ca0c-4568-92ff-e2ba3136a57d.mp3?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLWVhc3QtMSJIMEYCIQDzwK6YJcXOiGZ55%2FRUoOnMEnkGSgjwoJP0Ws%2BsUuBNPgIhAIOxush3mg%2FH3OYKoUaN%2FGUcXX2hPBkqljyf2TkZTcC3KqICCOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAhoMOTMxNTQ1NDY5NTgzIgyXCQSCP45snXN94VMq9gF25c%2FwRVxd581Ov37VCvdFWuJB%2FKUjdUJH1OfjOMjCw%2BLYvqfO3HmoOa2MdfypboPvrx04vCJCQgaUHqP2grJPve6uNAwGxc1KAW8YlXBz53JYn3sIrO2Fq74My%2BXqKLnRThps8bxfXAee5cRzqtxVicZM9j1eoW%2F1i93DNbjiS2nrJI%2FX3%2FUqqwfDu5PjIAIdzwsxF4%2F20UYpkxScOwaSXc952doaLVLcyjQH5knle2zliFB9SkMVLQEKrxuSjz1GYnISqpjAko47TyFxHjqLH44A%2BVqyKqzOfsBJwiiJvHbuquL1LVbIp9BMYNbBeyOGwbOJ%2Blsw0dTsxgY6nAGlFdTz5bnGg4yY7%2FwRpxP2KSsqptb9qdCD%2B8suNKP7kVmUXx%2BVG45GUhYqbF%2F3WEs5Ri2SNDuuWAtbarbNPTzUIXE99u6A%2FqGM4l51hZPjLks4lhK3%2B7r7XZYvaw3UMiyrbpnTUHmW1f8qX8BvnoaeUqdrCR3zUlS7eXfQLaXfKuZECXKAvD01r9UGa27ro5L0%2FKg6kRd5xsnEMHk%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250930T024129Z&X-Amz-SignedHeaders=host&X-Amz-Credential=ASIA5RZDP2KH2JAZP3H7%2F20250930%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Expires=86400&X-Amz-Signature=70c6448297592e09f121b69e1288861f7b2ba342dc4e124ed3ffe765297245a9",
  "wrongFeedbackAudioUrl": "https://smart-tutor-polly-audios.s3.us-west-2.amazonaws.com/18b168d4-53c9-416f-8ccc-bae4864cfbee.mp3?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFkaCXVzLWVhc3QtMSJIMEYCIQDzwK6YJcXOiGZ55%2FRUoOnMEnkGSgjwoJP0Ws%2BsUuBNPgIhAIOxush3mg%2FH3OYKoUaN%2FGUcXX2hPBkqljyf2TkZTcC3KqICCOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAhoMOTMxNTQ1NDY5NTgzIgyXCQSCP45snXN94VMq9gF25c%2FwRVxd581Ov37VCvdFWuJB%2FKUjdUJH1OfjOMjCw%2BLYvqfO3HmoOa2MdfypboPvrx04vCJCQgaUHqP2grJPve6uNAwGxc1KAW8YlXBz53JYn3sIrO2Fq74My%2BXqKLnRThps8bxfXAee5cRzqtxVicZM9j1eoW%2F1i93DNbjiS2nrJI%2FX3%2FUqqwfDu5PjIAIdzwsxF4%2F20UYpkxScOwaSXc952doaLVLcyjQH5knle2zliFB9SkMVLQEKrxuSjz1GYnISqpjAko47TyFxHjqLH44A%2BVqyKqzOfsBJwiiJvHbuquL1LVbIp9BMYNbBeyOGwbOJ%2Blsw0dTsxgY6nAGlFdTz5bnGg4yY7%2FwRpxP2KSsqptb9qdCD%2B8suNKP7kVmUXx%2BVG45GUhYqbF%2F3WEs5Ri2SNDuuWAtbarbNPTzUIXE99u6A%2FqGM4l51hZPjLks4lhK3%2B7r7XZYvaw3UMiyrbpnTUHmW1f8qX8BvnoaeUqdrCR3zUlS7eXfQLaXfKuZECXKAvD01r9UGa27ro5L0%2FKg6kRd5xsnEMHk%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250930T024128Z&X-Amz-SignedHeaders=host&X-Amz-Credential=ASIA5RZDP2KH2JAZP3H7%2F20250930%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Expires=86400&X-Amz-Signature=f6caae0959dc6ad74e20966eae533758b5f147aa267c7b2a2ec661647e15be03",
  "questionId": {
    "lessonId": 1,
    "questionIndex": 0
  }
}
```