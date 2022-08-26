-- Create table posts
CREATE TABLE posts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
-- Insert posts
INSERT INTO `posts` (`id`, `author`, `body`, `createdAt`) VALUES 
(NULL, 'James Bond', 'Post of James bond about 007', current_timestamp()), 
(NULL, 'Jill Crown', 'post of Jill about Hill', current_timestamp()), 
(NULL, 'Serbentautas Bordiuras', 'All about serbentai', current_timestamp());