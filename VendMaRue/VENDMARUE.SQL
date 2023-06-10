DROP DATABASE IF EXISTS VendMaRue;

CREATE DATABASE IF NOT EXISTS VendMaRue;
USE VendMaRue;
# -----------------------------------------------------------------------------
#       TABLE : T_USER
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS T_USER
 (
   USER_ID INTEGER(2) NOT NULL  ,
   USER_PP VARCHAR(128) NULL  ,
   USER_NAME VARCHAR(128) NOT NULL  ,
   USER_SURNAME VARCHAR(128) NOT NULL  ,
   USER_EMAIL VARCHAR(128) NOT NULL  ,
   USER_PHONE VARCHAR(16) NULL  ,
   USER_ACC_DATE DATE NOT NULL  ,
   USER_DESC VARCHAR(256) NULL  ,
   LOC_ID INTEGER(2) NOT NULL  
   , PRIMARY KEY (USER_ID) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       INDEX DE LA TABLE T_USER
# -----------------------------------------------------------------------------


CREATE  INDEX I_FK_T_USER_T_LOCATION
     ON T_USER (LOC_ID ASC);

# -----------------------------------------------------------------------------
#       TABLE : T_CARD
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS T_CARD
 (
   CARD_ID INTEGER(2) NOT NULL  ,
   CARD_TITLE VARCHAR(128) NOT NULL  ,
   CARD_PHOTO VARCHAR(128) NOT NULL  ,
   CARD_BRAND VARCHAR(128) NOT NULL  ,
   CARD_PRICE DECIMAL(10,2) NOT NULL  ,
   CARD_ONSALE SMALLINT(1) NOT NULL  ,
   CARD_QUANTITY INTEGER(2) NOT NULL  ,
   CARD_DATE DATE NOT NULL  ,
   CARD_TEXT VARCHAR(256) NULL  ,
   USER_ID INTEGER(2) NOT NULL  
   , PRIMARY KEY (USER_ID,CARD_ID) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       INDEX DE LA TABLE T_CARD
# -----------------------------------------------------------------------------


CREATE  INDEX I_FK_T_CARD_T_USER
     ON T_CARD (USER_ID ASC);

# -----------------------------------------------------------------------------
#       TABLE : T_LOCATION
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS T_LOCATION
 (
   LOC_ID INTEGER(2) NOT NULL  ,
   PAYS VARCHAR(128) NOT NULL  ,
   REGION VARCHAR(128) NOT NULL  ,
   VILLE VARCHAR(128) NOT NULL  
   , PRIMARY KEY (LOC_ID) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       TABLE : T_LIKE
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS T_LIKE
 (
   LIKE_ID INTEGER(2) NULL  ,
   USER_ID INTEGER(2) NOT NULL  ,
   USER_ID_1 INTEGER(2) NOT NULL  ,
   CARD_ID INTEGER(2) NOT NULL  
   , PRIMARY KEY (USER_ID_1,CARD_ID,USER_ID) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       INDEX DE LA TABLE T_LIKE
# -----------------------------------------------------------------------------


CREATE  INDEX I_FK_T_LIKE_T_USER
     ON T_LIKE (USER_ID ASC);

CREATE  INDEX I_FK_T_LIKE_T_CARD
     ON T_LIKE (USER_ID_1 ASC,CARD_ID ASC);

# -----------------------------------------------------------------------------
#       TABLE : T_COMMENT
# -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS T_COMMENT
 (
   COM_ID INTEGER(2) NOT NULL  ,
   COM_TEXT VARCHAR(128) NULL  ,
   COM_TITLE VARCHAR(128) NULL  ,
   COM_DATE DATE NULL  ,
   USER_ID INTEGER(2) NOT NULL  ,
   CARD_ID INTEGER(2) NOT NULL  
   , PRIMARY KEY (CARD_ID,USER_ID,COM_ID) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       INDEX DE LA TABLE T_COMMENT
# -----------------------------------------------------------------------------


CREATE  INDEX I_FK_T_COMMENT_T_USER
     ON T_COMMENT (USER_ID ASC);

CREATE  INDEX I_FK_T_COMMENT_T_CARD
     ON T_COMMENT (CARD_ID ASC);


# -----------------------------------------------------------------------------
#       CREATION DES REFERENCES DE TABLE
# -----------------------------------------------------------------------------


ALTER TABLE T_USER 
  ADD FOREIGN KEY FK_T_USER_T_LOCATION (LOC_ID)
      REFERENCES T_LOCATION (LOC_ID) ;


ALTER TABLE T_CARD 
  ADD FOREIGN KEY FK_T_CARD_T_USER (USER_ID)
      REFERENCES T_USER (USER_ID) ;


ALTER TABLE T_LIKE 
  ADD FOREIGN KEY FK_T_LIKE_T_USER (USER_ID)
      REFERENCES T_USER (USER_ID) ;


ALTER TABLE T_LIKE 
  ADD FOREIGN KEY FK_T_LIKE_T_CARD (USER_ID_1,CARD_ID)
      REFERENCES T_CARD (USER_ID,CARD_ID) ;


ALTER TABLE T_COMMENT 
  ADD FOREIGN KEY FK_T_COMMENT_T_USER (USER_ID)
      REFERENCES T_USER (USER_ID) ;


ALTER TABLE T_COMMENT 
  ADD FOREIGN KEY FK_T_COMMENT_T_CARD (USER_ID,CARD_ID)
      REFERENCES T_CARD (USER_ID,CARD_ID) ;

