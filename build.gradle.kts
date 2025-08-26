plugins {
    application
    java
}

repositories { mavenCentral() }

dependencies {
    implementation("org.apache.commons:commons-csv:1.10.0")
    testImplementation(platform("org.junit:junit-bom:5.10.2"))
    testImplementation("org.junit.jupiter:junit-jupiter")
}

java {
    toolchain { languageVersion.set(JavaLanguageVersion.of(17)) }
}

application {
    // If your main class is 'QuizApp' in src/, leave this; else adjust package/name
    mainClass.set("QuizApp")
}

tasks.test { useJUnitPlatform() }

// Use the existing 'src' folder as the Java source dir
sourceSets {
    named("main") { java.setSrcDirs(listOf("src")) }
    named("test") { java.setSrcDirs(listOf("test")) }
}
