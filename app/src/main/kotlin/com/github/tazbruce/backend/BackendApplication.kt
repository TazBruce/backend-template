package com.github.tazbruce.backend // CHANGE THIS

import org.springframework.boot.Banner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class BackendApplication

fun main(args: Array<String>) {
    runApplication<BackendApplication>(*args) {
        setBannerMode(Banner.Mode.OFF)
    }
}
