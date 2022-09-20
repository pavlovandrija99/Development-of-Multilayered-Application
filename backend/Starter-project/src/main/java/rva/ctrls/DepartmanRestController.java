package rva.ctrls;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.jpa.Departman;
import rva.repository.DepartmanRepository;

/*
  @Autowired anotacija omogucava da se prilikom pokretanja springboot aplikacije,
  kreirani bean-ovi automatski injektuju u odgovarajuce property-je.
  To je moguce uraditi, jer spring i interfejse pretvara takodje u bean-ove.
*/

/*
  @CrossOrigin anotacija omogucava da sve metode u okviru klase mozemo da pozivamo
   sa razlicitih domena, na primer iz Angular web aplikacije.
*/

/*
   @Api anotacija opisuje kontroler.
*/

@CrossOrigin
@RestController
@Api(tags = {"Departman CRUD operacije"})
public class DepartmanRestController {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	
	@Autowired
	private DepartmanRepository departmanRepository;
	
	
	@GetMapping("departman")
	@ApiOperation(value = "Vraća kolekciju svih departmana iz baze podataka")
	public Collection<Departman> getDepartmani() {
		return departmanRepository.findAll();    
	}
	
	
	@GetMapping("departman/{id}")
	@ApiOperation(value = "Vraća departman iz baze podataka čiji je id vrednost prosleđena kao path varijabla")
 	public Departman getDepartman(@PathVariable("id") Integer id) {
		return departmanRepository.getOne(id);
	}
	
	@GetMapping("departmanNaziv/{naziv}")
	@ApiOperation(value = "Vraća kolekciju svih departmana iz baze podataka koji u nazivu sadrže string prosleđ kao path varijabla")
	public Collection<Departman> getDepartmanByNaziv(@PathVariable("naziv") String naziv) {
		return departmanRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	
	/*
	  @RequestBody je anotacija koja oznacava da ce body koji dobije u odredjenoj formi
	  smestiti za pocetak u neki parametar funkcije koji je naravno odgovarajuceg tipa.
	*/
	/*
	  @PostMapping anotacija - kada god stigne POST zahtev, odnosno pokusavaj dodavanja
	  necega na zadatoj putanji, metoda nad kojom se nalazi anotacija ce biti pozvana.
	*/
	
	@PostMapping("departman")
	@ApiOperation(value = "Upisuje departman u bazu podataka")
	public ResponseEntity<Departman> insertDepartman(@RequestBody Departman departman) {
		if(!departmanRepository.existsById(departman.getId())) {
			departmanRepository.save(departman);
			return new ResponseEntity<Departman>(HttpStatus.OK);
		}
		return new ResponseEntity<Departman>(HttpStatus.CONFLICT);
	}
	
	
	@PutMapping("departman")
	@ApiOperation(value = "Modifikuje postojeci departman u bazi podataka")
	public ResponseEntity<Departman> updateDepartman(@RequestBody Departman departman){
		if(!departmanRepository.existsById(departman.getId())) {
			return new ResponseEntity<Departman>(HttpStatus.NO_CONTENT);
		}
		departmanRepository.save(departman);
		return new ResponseEntity<Departman>(HttpStatus.OK);
	}
	
	
	//@Transactional anotacija govori da ce metoda izvrsiti sve SQL upite ili nijedan !
	
	@Transactional
	@DeleteMapping("departman/{id}")
	@ApiOperation(value = "Brise departman iz baze podataka cija je id vrednost prosledjena kao path varijabla")
	public ResponseEntity<Departman> deleteDepartman(@PathVariable("id") Integer id) {
			if(!departmanRepository.existsById(id)) {
				return new ResponseEntity<Departman>(HttpStatus.NO_CONTENT); 
			}
			jdbcTemplate.execute("DELETE FROM student WHERE departman = " + id + ";");
			departmanRepository.deleteById(id);
			departmanRepository.flush();
			if(id == -100) {
				jdbcTemplate.execute(
						"INSERT INTO \"departman\" (\"id\", \"naziv\", \"oznaka\", \"fakultet\") "
						+ "VALUES (-100, 'Test', 'Test', 1)"						 
				);
			}
			return new ResponseEntity<Departman>(HttpStatus.OK);
	}
	
	
	
}





