create database PosSystemDataBase;
    use PosSystemDataBase;
        create table Customer(
          id varchar(200)primary key ,
          name varchar(200),
          address varchar(200),
          number varchar(200)
        );
create table Item(
          id varchar(200)primary key ,
          type varchar(200),
          title varchar(200),
          quantity varchar(200),
          amount varchar(200)
        );