package nz.co.partplanner.backend

import org.springframework.boot.Banner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class PartPlannerBackendApplication

fun main(args: Array<String>) {
    runApplication<PartPlannerBackendApplication>(*args) {
        setBannerMode(Banner.Mode.OFF)
    }
}
