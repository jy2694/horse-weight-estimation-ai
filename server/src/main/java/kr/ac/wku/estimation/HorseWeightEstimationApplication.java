package kr.ac.wku.estimation;

import kr.ac.wku.estimation.properties.StorageProperties;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

import java.nio.file.Files;
import java.nio.file.Paths;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class HorseWeightEstimationApplication {

	public static void main(String[] args) {
		SpringApplication.run(HorseWeightEstimationApplication.class, args);
	}
	@Bean
	CommandLineRunner init(StorageProperties properties) {
		return (args) -> Files.createDirectories(Paths.get(properties.getPath()));
	}
}
