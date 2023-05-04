FROM gradle:7-jdk17 as builder

COPY --chown=gradle:gradle . /home/gradle/src

WORKDIR /home/gradle/src

RUN gradle bootJar --no-daemon

FROM eclipse-temurin:17-jre-jammy

EXPOSE 8080:8080

RUN mkdir /app

COPY --from=builder /home/gradle/src/build/libs/backend*.jar /app/backend.jar

ENTRYPOINT ["java","-jar","/app/backend.jar"]