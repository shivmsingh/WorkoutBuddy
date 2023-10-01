#
# Build stage
#
FROM maven:3.8.3-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

#
# Package stage
#
FROM eclipse-temurin:17-jdk
COPY --from=build /target/server-0.0.1-SNAPSHOT.jar server.jar
# ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["java","-jar","server.jar"]