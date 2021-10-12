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
  image LONGBLOB,
  journal_entry TEXT,
  PRIMARY KEY(journallog_id),
  FOREIGN KEY(userlogin_id) REFERENCES user_login(userlogin_id)
);
