package rva.ctrls;

import java.util.Collection;


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
import rva.jpa.Status;
import rva.repository.StatusRepository;


@CrossOrigin
@RestController
@Api(tags = {"Status CRUD operacije"})
public class StatusRestController {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private StatusRepository statusRepository;
	
	
	@GetMapping("status")
	@ApiOperation(value = "Vraća kolekciju svih statusa iz baze podataka")
	public Collection<Status> getStatusi() {
		return statusRepository.findAll();
	}
	
	@GetMapping("status/{id}")
	@ApiOperation(value = "Vraća status iz baze podataka čiji je id vrednost prosleđena kao path varijabla")
	public Status getStatus(@PathVariable("id") Integer id) {
		return statusRepository.getOne(id);
	}
	
	@GetMapping("statusNaziv/{naziv}")
	@ApiOperation(value = "Vraća kolekciju svih statusa iz baze podataka koji u nazivu sadrže string prosleđ kao path varijabla")
	public Collection<Status> getStatusByNaziv(@PathVariable("naziv") String naziv) {
		return statusRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	
	
	@PostMapping("status") 
	@ApiOperation(value = "Upisuje status u bazu podataka")
	public ResponseEntity<Status> insertStatus(@RequestBody Status status) {
		if(!statusRepository.existsById(status.getId())) {
			statusRepository.save(status);
			return new ResponseEntity<Status>(HttpStatus.OK);
		}
		return new ResponseEntity<Status>(HttpStatus.CONFLICT);
	}
	
	
	
	@PutMapping("status")
	@ApiOperation(value = "Modifikuje postojeci status u bazi podataka")
	public ResponseEntity<Status> updateStatus(@RequestBody Status status) {
		if(!statusRepository.existsById(status.getId())) {
			return new ResponseEntity<Status>(HttpStatus.NO_CONTENT);
		}
		statusRepository.save(status);
		return new ResponseEntity<Status>(HttpStatus.OK);
	}
	
	
	
	@DeleteMapping("status/{id}")
	@ApiOperation(value = "Brise status iz baze podataka cija je id vrednost prosledjena kao path varijabla")
	public ResponseEntity<Status> deleteStatus(@PathVariable("id") Integer id) {
		if(!statusRepository.existsById(id)) {
			return new ResponseEntity<Status>(HttpStatus.NO_CONTENT);
		}
		jdbcTemplate.execute("DELETE FROM student WHERE status = " + id +";");
		statusRepository.deleteById(id);
		if(id == -100) {
			jdbcTemplate.execute(
					"INSERT INTO \"status\" (\"id\", \"naziv\", \"oznaka\") "
					+ "VALUES (-100, 'TestNazivStatus', 'TestOznSta')"
			);
		}
		return new ResponseEntity<Status>(HttpStatus.OK);
	}
	
	
	
}
