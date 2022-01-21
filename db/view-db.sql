\c nc_news_test

SELECT * FROM topics;
SELECT * FROM articles;
SELECT * FROM comments;
SELECT * FROM users;

--UPDATE articles SET votes = votes + 10 WHERE article_id=1;

--SELECT * FROM articles WHERE article_id=1;

--INSERT INTO comments (article_id, author, body) VALUES (9,'icellusedkars' , 'test mesage');

--SELECT * FROM articles ORDER BY created_at DESC;

--SELECT * FROM comments;

--SELECT count(*) FROM comments WHERE article_id=1;