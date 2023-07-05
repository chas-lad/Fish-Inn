-- NOTE -  nearly all of the data used here is fictional and a large majority of it has been generated with AI.

--CREATE DATABASE fish_shop;

-- Presuming we are using 'public' as our schema name
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE admin_accounts(
    user_name         VARCHAR(20) PRIMARY KEY,
    first_name        VARCHAR(50),
    surname           VARCHAR(50),
    dob               DATE,
    email             VARCHAR(50),
    password          VARCHAR(50)
);

CREATE TABLE customers(
    customer_id SERIAL PRIMARY KEY,  -- SERIAL automatically increases column value to ensure uniqueness
    first_name  VARCHAR(50),
    surname     VARCHAR(50),
    email       VARCHAR(50),
    dob         DATE,
    join_date   DATE,
    phone_no    VARCHAR(11),
    postcode    VARCHAR(8)
);

CREATE TABLE orders(
    order_id           SERIAL PRIMARY KEY,
    order_timestamp    TIMESTAMP,
    customer_id        INT REFERENCES customers (customer_id),
    delivery_fee       DOUBLE PRECISION,
    review_star_rating SMALLINT,
    review_comment     VARCHAR(200)
);

CREATE TABLE suppliers(
    supplier_id SERIAL PRIMARY KEY,
    supplier_name VARCHAR(50),
    postcode VARCHAR(8),
    phone_no VARCHAR(11)
);

CREATE TABLE items(
    item_id       SERIAL PRIMARY KEY,
    item_name     VARCHAR(50),
    unit_price    DOUBLE PRECISION,
    selling_price DOUBLE PRECISION,
    quantity      INT,
    supplier_id   INT REFERENCES suppliers (supplier_id),
    on_menu       BOOLEAN
);

CREATE TABLE order_items(
    order_id INT REFERENCES orders (order_id),
    item_id  INT REFERENCES items (item_id),
    quantity INT,
    PRIMARY KEY (order_id, item_id)
);


CREATE TABLE promotions(
    promotion_id SERIAL PRIMARY KEY,
    active_from  TIMESTAMP,
    active_until TIMESTAMP,
    offer_description VARCHAR(200),
    item_id INT REFERENCES items (item_id)
);

CREATE TABLE employees(
    emp_id             SERIAL PRIMARY KEY,
    first_name         VARCHAR(50),
    surname            VARCHAR(50),
    email              VARCHAR(50),
    dob                DATE,
    join_date          DATE,
    holidays_remaining DOUBLE PRECISION,
    phone_no           VARCHAR(11),
    postcode           VARCHAR(8)
);

CREATE TABLE schedule(
    emp_id          INT REFERENCES employees (emp_id),
    weekday         VARCHAR(10),
    start_time TIME,
    end_time   TIME,
    PRIMARY KEY (emp_id, weekday)
);

-- Test Data insertion
INSERT INTO admin_accounts
(
    user_name, 
    first_name,        
    surname,           
    dob,               
    email,             
    password          
)
VALUES
(
    'chas_lad',
    'Chas',
    'Ladhar',
    '2002-01-08',
    'ladharchas@gmail.com',
    'password101'
),
(
    'jov_lad',
    'Jovan',
    'Ladhar',
    '2000-04-04',
    'ladharjovan@gmail.com',
    'password123'
);

INSERT INTO customers
(
    customer_id,
    first_name,
    surname,
    email,
    dob,
    join_date,
    phone_no,
    postcode
)
VALUES
(
    1,
    'Mellie',
    'Bogeys',
    'mbogeys0@instagram.com',
    '2014-10-10',
    '2020-07-31',
    '05395319486',
    'NE13 7BH'
),
(
    2,
    'Norbie',
    'Rupert',
    'nrupert1@wired.com',
    '1960-12-20',
    '2020-03-06',
    '03684250820',
    'NE6 2QL'
),
(
    3,
    'Sig',
    'Jagger',
    'sjagger2@1688.com',
    '1989-12-30',
    '2020-02-12',
    '04566352943',
    'NE34 0PP'
),
(
    4,
    'Cornie',
    'Bernardes',
    'cbernardes3@mapy.cz',
    '1985-12-01',
    '2021-11-05',
    '07211084382',
    'NE66 2TA'
),
(
    5,
    'Cloe',
    'Pyke',
    'cpyke4@canalblog.com',
    '1999-08-19',
    '2017-11-11',
    '02017095041',
    'NE32 5AN'
),
(
    6,
    'Jackson',
    'Joberne',
    'jjoberne5@chicagotribune.com',
    '1952-01-06',
    '2015-04-24',
    '08375845884',
    'NE65 7QD'
),
(
    7,
    'Domenico',
    'Pine',
    'dpine6@boston.com',
    '1974-04-25',
    '2022-10-26',
    '04558325712',
    'NE9 6EG'
),
(
    8,
    'Tiertza',
    'Themann',
    'tthemann7@wordpress.org',
    '1977-05-14',
    '2018-01-07',
    '05385073674',
    'NE7 7YA'
),
(
    9,
    'Talbert',
    'Moreing',
    'tmoreing8@cmu.edu',
    '1992-04-27',
    '2015-01-08',
    '04235926727',
    'NE37 1HY'
),
(
    10,
    'Verna',
    'Florence',
    'vflorence9@qq.com',
    '1967-04-16',
    '2018-01-14',
    '09522355259',
    'NE38 9EL'
),
(
    11,
    'Georas',
    'Keyzor',
    'gkeyzora@dagondesign.com',
    '2021-09-22',
    '2018-12-20',
    '05651284449',
    'NE28 8RQ'
),
(
    12,
    'Emmalee',
    'Roskam',
    'eroskamb@alexa.com',
    '1984-10-14',
    '2021-06-10',
    '09114516725',
    'NE16 6BW'
),
(
    13,
    'Erica',
    'Durrell',
    'edurrellc@imageshack.us',
    '2007-12-27',
    '2018-03-07',
    '05116647550',
    'NE40 3EF'
),
(
    14,
    'Denny',
    'Emptage',
    'demptaged@wikispaces.com',
    '1983-04-20',
    '2017-11-25',
    '02026463409',
    'NE64 6HY'
),
(
    15,
    'Sarena',
    'Budgey',
    'sbudgeye@paypal.com',
    '2006-05-28',
    '2018-05-30',
    '05981708415',
    'NE24 2QH'
),
(
    16,
    'Fidole',
    'Gentreau',
    'fgentreauf@exblog.jp',
    '2000-06-23',
    '2019-08-11',
    '03817535737',
    'NE6 5RP'
),
(
    17,
    'Malissa',
    'Bartolozzi',
    'mbartolozzig@tripadvisor.com',
    '2003-03-19',
    '2019-05-04',
    '02493169575',
    'NE23 3HX'
),
(
    18,
    'Osborn',
    'Headey',
    'oheadeyh@slideshare.net',
    '1951-04-01',
    '2020-02-27',
    '06467315373',
    'NE31 1YR'
),
(
    19,
    'Redford',
    'Douch',
    'rdouchi@nydailynews.com',
    '1955-09-22',
    '2023-02-05',
    '07272624566',
    'NE15 ADH'
),
(
    20,
    'Brynne',
    'Grose',
    'bgrosej@nih.gov',
    '2004-10-07',
    '2015-01-12',
    '04617101264',
    'NE29 7NP'
);

INSERT INTO orders
(
    order_id,           
    order_timestamp,
    customer_id,
    delivery_fee,
    review_star_rating,
    review_comment    
)
VALUES
(
    1,
    '2022-09-20 18:06:46',
    13,
    2.00,
    5,
    'The fish was fresh and delicious.'
),
(
    2,
    '2023-01-15 10:17:34',
    10,
    1.50,
    4,
    'Best Fish shop in town!'
),
(
    3,
    '2022-12-15 02:10:58',
    5,
    2.50,
    3,
    'The fish tasted a bit off'
),
(
    4,
    '2023-07-02 14:41:37',
    10,
    3.00,
    4,
    'Highly recommend the fish and chips.'
),
(
    5,
    '2022-10-04 03:29:18',
    10,
    3.00,
    1,
    'won''t be coming back.'
),
(
    6,
    '2022-09-20 18:06:46',
    13,
    3.00,
    4,
    'The prices were reasonable and the portions were generous.'
),
(
    7,
    '2022-10-27 16:22:12',
    3,
    2.00,
    3,
    'The fish and chips were overcooked and greasy.'
),
(
    8,
    '2022-12-14 18:52:35',
    4,
    1.50,
    5,
    'The service was excellent.'
),
(
    9,
    '2022-11-27 02:58:34',
    15,
    3.00,
    4,
    'The fish tasted a bit off.'
),
(
    10,
    '2022-08-06 08:03:25',
    16,
    2.00,
    2,
    'Highly recommend the fish and chips.'
),
(
    11,
    '2022-07-29 08:04:33',
    18,
    2.50,
    2,
    'won''t be coming back.'
),
(
    12,
    '2023-04-10 15:19:11',
    20,
    2.00,
    4,
    'The service was excellent.'
),
(
    13,
    '2023-06-12 04:26:12',
    12,
    3.50,
    1,
    'Disappointing experience'
),
(
    14,
    '2023-06-05 11:25:55',
    20,
    1.50,
    3,
    'The fish and chips were overcooked and greasy.'
),
(
    15,
    '2022-10-24 00:18:44',
    14,
    3.50,
    2,
    'The staff was rude and unhelpful.'
),
(
    16,
    '2023-01-31 22:05:11',
    2,
    3.00,
    3,
    'The fish and chips were overcooked and greasy.'
),
(
    17,
    '2023-02-18 19:17:17',
    10,
    2.00,
    4,
    'Highly recommend the fish and chips.'
),
(
    18,
    '2022-10-12 17:27:21',
    11,
    2.50,
    1,
    'The fish tasted a bit off.'
),
(
    19,
    '2022-10-06 20:33:25',
    14,
    3.00,
    1,
    'The food was prepared poorly'
),
(
    20,
    '2023-05-17 00:37:33',
    9,
    3.00,
    2,
    'The fish was fresh and delicious.'
);


INSERT INTO suppliers
(
    supplier_id,
    supplier_name,
    postcode, 
    phone_no
)
VALUES
(
    1,
    'Colbecks',
    'NE11 0HG',
    '01914824242'
),
(
    2,
    'JJs',
    'NE4 7LA',
    '01992701701'
),
(
    3,
    'Peter''s Bakery',
    'NE5 4BR',
    '01912861331'
);


INSERT INTO items
(
    item_id,       
    item_name,     
    unit_price,    
    selling_price,
    quantity,      
    supplier_id,   
    on_menu       
)
VALUES
(
    1,
    'Fish',
    5.00,
    8.50,
    200,
    1,
    'true'
),
(
    2,
    'Chips',
    1.00,
    3.00,
    200,
    1,
    'true'
),
(
    3,
    'Smokey Sausage',
    1.00,
    2.30,
    200,
    1,
    'true'
),
(
    4,
    'Mince Pie',
    1.30,
    3.00,
    200,
    3,
    'true'
),
(
    5,
    'Steak Pie',
    1.35,
    3.05,
    200,
    3,
    'true'
),
(
    6,
    'Curry Sauce',
    0.20,
    1.20,
    200,
    1,
    'true'
),
(
    7,
    'Gravy Sauce',
    0.15,
    1.20,
    200,
    1,
    'true'
),
(
    8,
    'Battered Sausage',
    2.00,
    4.00,
    200,
    1,
    'true'
),
(
    9,
    'Chicken Nuggets',
    1.50,
    3.00,
    200,
    2,
    'true'
),
(
    10,
    'Can of pop',
    0.30,
    1.00,
    200,
    2,
    'true'
);

INSERT INTO order_items
(
    order_id,
    item_id,
    quantity
)
VALUES
(
    1,
    7,
    3
),
(
    1,
    4,
    2
),
(
    1,
    6,
    1
),
(
    2,
    5,
    3
),
(
    3,
    6,
    2
),
(
    3,
    3,
    1
),
(
    4,
    8,
    3
),
(
    5,
    6,
    2
),
(
    5,
    3,
    1
),
(
    5,
    7,
    3
),
(
    6,
    2,
    2
),
(
    7,
    8,
    1
),
(
    8,
    2,
    3
),
(
    9,
    3,
    2
),
(
    9,
    9,
    1
),
(
    10,
    7,
    3
),
(
    11,
    6,
    2
),
(
    11,
    3,
    1
),
(
    12,
    10,
    3
),
(
    13,
    9,
    2
),
(
    14,
    4,
    1
),
(
    15,
    10,
    3
),
(
    15,
    6,
    2
),
(
    16,
    2,
    1
),
(
    17,
    4,
    3
),
(
    18,
    5,
    2
),
(
    19,
    6,
    1
),
(
    20,
    10,
    3
);

INSERT INTO promotions
(
    promotion_id,
    active_from, 
    active_until,
    offer_description,
    item_id 
)
VALUES
(
    1,
    '2023-02-20 00:30:00',
    '2023-12-20 00:30:00',
    'Limited time only - chicken nuggets - buy one portion, get one half price!',
    9
),
(
    2,
    '2023-03-30 00:30:00',
    '2023-07-01 00:30:00',
    'Limited time only - curry sauce - now half price!',
    6
);

INSERT INTO employees
(
    emp_id,           
    first_name,         
    surname,           
    email,              
    dob,                
    join_date,          
    holidays_remaining, 
    phone_no,           
    postcode           
)
VALUES
(
    1,
    'Minette',
    'Fosten',
    'mfosten0@hatena.ne.jp',
    '1986-03-27',
    '2017-06-10',
    13,
    '09294443841',
    'NE22 6NR'
),
(
    2,
    'Jody',
    'Laxen',
    'jlaxen1@independent.co.uk',
    '1981-12-05',
    '2020-05-06',
    8,
    '07168691603',
    'NE33 2AE'
),
(
    3,
    'Ingemar',
    'Piatkow',
    'ipiatkow2@paypal.com',
    '1994-06-14',
    '2010-09-19',
    2,
    '08646182667',
    'NE40 4SA'
);

INSERT INTO schedule
(
    emp_id,
    weekday,          
    start_time,
    end_time  
)
VALUES
(
    1,
    'Monday',
    '10:00:00',
    '18:00:00'
),
(
    1,
    'Tuesday',
    '10:00:00',
    '18:00:00'
),
(
    1,
    'Wednesday',
    '12:00:00',
    '20:00:00'
),
(
    1,
    'Thursday',
    '17:00:00',
    '22:00:00'
),
(
    1,
    'Friday',
    '10:00:00',
    '20:00:00'
),
(
    2,
    'Monday',
    '11:00:00',
    '17:00:00'
),
(
    2,
    'Tuesday',
    '13:00:00',
    '22:00:00'
),
(
    2,
    'Wednesday',
    '12:00:00',
    '22:00:00'
),
(
    2,
    'Thursday',
    '16:30:00',
    '21:45:00'
),
(
    2,
    'Friday',
    '17:30:00',
    '22:15:00'
),
(
    3,
    'Thursday',
    '09:30:00',
    '16:45:00'
),
(
    3,
    'Friday',
    '15:00:00',
    '22:00:00'
);
