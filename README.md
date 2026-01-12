# Spring Boot Application

Spring Boot test

## 프로젝트 구조

```
src/
├── main/
│   ├── java/com/example/
│   │   ├── Application.java (메인 진입점)
│   │   └── controller/
│   │       └── HelloController.java (REST 컨트롤러)
│   └── resources/
│       └── application.properties (설정 파일)
└── test/
```

## 빌드 및 실행

### Maven으로 빌드
```bash
mvn clean package
```

### 애플리케이션 실행
```bash
mvn spring-boot:run
```

또는 빌드된 JAR 파일로 실행:
```bash
java -jar target/spring-boot-app-1.0.0.jar
```

## API 엔드포인트

- `GET /` - 기본 인사말 반환
- `GET /hello?name=<이름>` - 파라미터로 받은 이름에 대한 인사말 반환

## 요구사항

- Java 17 이상
- Maven 3.6 이상

## 설정

`src/main/resources/application.properties`에서 설정할 수 있습니다:
- `server.port` - 서버 포트 (기본값: 8080)
