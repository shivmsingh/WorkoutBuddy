#
# Build stage
#
FROM maven:3.9.4-eclipse-temurin-17-alpine AS build
COPY . .
RUN mvn clean package -DskipTests

#
# Package stage
#
FROM openjdk:17
COPY --from=build /target/server-0.0.1-SNAPSHOT server.jar
# ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["java","-jar","server.jar"]