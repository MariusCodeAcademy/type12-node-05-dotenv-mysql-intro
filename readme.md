# SQL so far

1. gauti duomenis ```SELECT * FROM posts```
2. Irasyti duomenis, 
```sql
INSERT INTO posts ( author, body, category)
VALUES ('Jill Crown', 'The last summer day', 'books')
```
3. gauti duomenis pagal parametra 
```sql
SELECT * FROM posts WHERE id = 5
```
4. Rikiuoti duomenis 
```sql
SELECT * FROM posts
ORDER BY created_at DESC
```