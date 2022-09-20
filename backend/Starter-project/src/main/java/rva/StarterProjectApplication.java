package rva;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

/* @SpringBootApplication anotacija sadrzi u sebi 3 anotacije, 
   
   @SpringBootConfiguration anotacija označava klasu koja će definisati spring bean-ove.
   
   @EnableAutoConfiguration anotacija označava klasu koja će kreirati spring bean-ove i inicajlizovati
   različita druga na nivou kompletne springboot aplikacije.
   
   @ComponentScan anotacija označava gde će se tražiti sve klase, metode, varijable, insance nekih
   propety-ja, koji imaju nad sobom definisane anotacije 
*/

/*
 Spring bean je jedan java objekat, koji kreira, a potom inicijalizuje Spring Inversion of Control Container.
 To je container ugradjen u springboot framework koji omogućava upotrebu koncpeta "Dependency injection".
 Takodje ovaj container kreira i bean-ove svih klasa. 
 To je omoguceno dodavanjem pomenutih anotacija nad samim klasama.
*/

@SpringBootApplication	
public class StarterProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(StarterProjectApplication.class, args); 
	}
	
	
	@Bean
	public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
		return args -> {
			System.out.println("Beans provided by Spring Boot:");
			String[] beanNames = ctx.getBeanDefinitionNames();
			Arrays.sort(beanNames);
			for(String beanName: beanNames) {
				System.out.println(beanName);
			}
		};
	}

}





