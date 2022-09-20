package rva.ctrls;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
 @RestController anotacije oznacava da ce cela klasa nad kojom je definisana anotacija, 
 sluziti kao rest controller i imati za cilj da hendluje sve http zahteve koji su upuceni ovom kontroleru.
 Takodje rezultat izvrsavanja zahteva ce biti neki reponse body, tj. rezultat u nekom odredjenom formatu,
 odnosno u JSON formatu, jer radimo sa REST servisima.
*/

@RestController 
public class HelloWorldRestController {
	
	@RequestMapping("/")
	public String helloWorld() {
		return "Hello World";
	}
	
	@RequestMapping("/zbir")
	public String zbir() {
		long x = Math.round(Math.random() * 10);
		long y = Math.round(Math.random() * 10);
		return x +" + "+ y + " = " + (x+y);
	}
	
}
