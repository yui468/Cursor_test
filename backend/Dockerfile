# ベースイメージ
FROM eclipse-temurin:17-jdk AS build

WORKDIR /app

# 依存関係のキャッシュ
COPY pom.xml mvnw .mvn /app/
RUN ./mvnw dependency:go-offline

# ソースコードコピー＆ビルド
COPY . /app
RUN ./mvnw package -DskipTests

# 実行用イメージ
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"] 