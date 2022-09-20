-- FAKULTET PODACI

INSERT INTO "fakultet"("id", "naziv", "sediste")
VALUES (nextval('fakultet_seq'), 'Fakultet tehnickih nauka', 'Novi Sad');
INSERT INTO "fakultet"("id", "naziv", "sediste")
VALUES (nextval('fakultet_seq'), 'Prirodno-matematicki fakultet', 'Novi Sad');
INSERT INTO "fakultet"("id", "naziv", "sediste")
VALUES (nextval('fakultet_seq'), 'Pravni fakultet', 'Novi Sad');
INSERT INTO "fakultet"("id", "naziv", "sediste")
VALUES (nextval('fakultet_seq'), 'Poljoprivredni fakultet', 'Novi Sad');
INSERT INTO "fakultet"("id", "naziv", "sediste")
VALUES (nextval('fakultet_seq'), 'Filozofski fakultet', 'Novi Sad');
INSERT INTO "fakultet"("id", "naziv", "sediste")
VALUES (nextval('fakultet_seq'), 'Ekonomski fakultet', 'Novi Sad');

INSERT INTO "fakultet"("id", "naziv", "sediste")
VALUES (-100, 'TestNazivFak', 'TestSedisteFak');

-- DEPARTMAN PODACI

INSERT INTO "departman"("id", "naziv", "oznaka", "fakultet")
VALUES (nextval('departman_seq'), 'Departman za energetiku elektroniku i telekomunikacije', 'DEET', 1);
INSERT INTO "departman"("id", "naziv", "oznaka", "fakultet")
VALUES (nextval('departman_seq'), 'Departman za matematiku i informatiku', 'DMII', 2);
INSERT INTO "departman"("id", "naziv", "oznaka", "fakultet")
VALUES (nextval('departman_seq'), 'Departman za opste discipline u tehnici', 'DODT', 3);
INSERT INTO "departman"("id", "naziv", "oznaka", "fakultet")
VALUES (nextval('departman_seq'), 'Departman za fitomedicinu i zastitu zivotne sredine', 'DFIZSS', 4);
INSERT INTO "departman"("id", "naziv", "oznaka", "fakultet")
VALUES (nextval('departman_seq'), 'Departman za arhitekturu i urbanizam', 'DAIU', 5);
INSERT INTO "departman"("id", "naziv", "oznaka", "fakultet")
VALUES (nextval('departman_seq'), 'Departman za finansije i racunovodstvo', 'DFIR', 6);

INSERT INTO "departman"("id", "naziv", "oznaka", "fakultet")
VALUES (-100, 'TestNazivDep', 'TestOznDep', 1);

-- STATUS PODACI

INSERT INTO "status"("id", "naziv", "oznaka")
VALUES(nextval('status_seq'), 'budzetski', 'budzet');
INSERT INTO "status"("id", "naziv", "oznaka")
VALUES(nextval('status_seq'), 'samofinansirajuci' , 'samofin');

INSERT INTO "status"("id", "naziv", "oznaka")
VALUES(-100, 'TestNazivStat', 'TestOznSta');

-- STUDENT PODACI

INSERT INTO "student"("id", "ime", "prezime", "broj_indeksa", "status", "departman")
VALUES (nextval('student_seq'), 'Andrija', 'Milosevic', 'Ra83/2018', 1, 1);
INSERT INTO "student"("id", "ime", "prezime", "broj_indeksa", "status", "departman")
VALUES (nextval('student_seq'), 'Nikola', 'Jokic', 'II20/2018', 2, 2);
INSERT INTO "student"("id", "ime", "prezime", "broj_indeksa", "status", "departman")
VALUES (nextval('student_seq'), 'Bogdan', 'Bogdanovic', 'AU27/2018', 1 , 3);
INSERT INTO "student"("id", "ime", "prezime", "broj_indeksa", "status", "departman")
VALUES (nextval('student_seq'), 'Milan', 'Vasic', 'EE49/2018', 1, 4);
INSERT INTO "student"("id", "ime", "prezime", "broj_indeksa", "status", "departman")
VALUES (nextval('student_seq'), 'Aleksa', 'Avramovic', 'MRB10/2018', 2, 5);
INSERT INTO "student"("id", "ime", "prezime", "broj_indeksa", "status", "departman")
VALUES (nextval('student_seq'), 'Marko', 'Nikolic', 'SAUE66/2018', 1, 6);

INSERT INTO "student"("id", "ime", "prezime", "broj_indeksa", "status", "departman")
VALUES (-100, 'TestImeStud', 'TestPrezimeStud', 'TestBrIndeksaStud', 1, 1);



