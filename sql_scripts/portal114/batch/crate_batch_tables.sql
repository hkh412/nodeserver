CREATE TABLE _post_scrapped (
  _id INT NOT NULL AUTO_INCREMENT,
  post_id VARCHAR(45) NOT NULL,
  date VARCHAR(45) NOT NULL,
  PRIMARY KEY (_id, post_id, date))
COMMENT = '이미 조회된 Post를 저장하는 table, 중복입력 방지 용도';