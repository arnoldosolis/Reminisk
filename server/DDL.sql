CREATE TABLE user_info (
  userinfo_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  PRIMARY KEY(userinfo_id)
);

CREATE TABLE user_login (
  userlogin_id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY(userlogin_id),
  FOREIGN KEY(userlogin_id) REFERENCES user_info(userinfo_id) 
);

CREATE TABLE journal_log (
  journallog_id INT NOT NULL AUTO_INCREMENT,
  userlogin_id INT,
  journal_date DATE,
  image TEXT,
  journal_entry TEXT,
  PRIMARY KEY(journallog_id),
  FOREIGN KEY(userlogin_id) REFERENCES user_login(userlogin_id)
);

CREATE TABLE facility_info(
  userlogin_id INT, 
  facility_id INT AUTO_INCREMENT, 
  facility_name TEXT,
  facility_address TEXT,
  facility_phone TEXT, 
  facility_times TEXT, 
  PRIMARY KEY(facility_id), 
  FOREIGN KEY(userlogin_id) REFERENCES user_login(userlogin_id
  );