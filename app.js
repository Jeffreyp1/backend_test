const express = require('express');
const app = express();
const port = 3000;
const pool = require('./db')
app.use(express.json())
app.get('/posts', async (req, res) =>{
    // const {rows} = await pool.query('SELECT * FROM posts')
    // res.json(rows)
    try {
        const { rows } = await pool.query('SELECT * FROM posts');
        rows.forEach(row=>{
            console.log(`id: ${row.id}`);
            console.log(`Title: ${row.title}`);
            console.log(`Content: ${row.content}`);
            console.log(`Author: ${row.author}\n\n`);
        })
        res.json(rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

app.get('/posts/:id', async (req, res) =>{
    try{
        const {id} = req.params
        const {rows} = await pool.query(`SELECT * FROM posts WHERE id = ${id}`)
        rows.forEach(row=>{
            console.log(`id: ${row.id}`);
            console.log(`Title: ${row.title}`);
            console.log(`Content: ${row.content}`);
            console.log(`Author: ${row.author}\n\n`);
        })
        res.json(rows)
    }catch(err){
        console.error(err.message);
        res.status(500).send('server error')
    }
})


app.post('/posts', async (req, res) =>{
    try{
        const {title, content, author} = req.body
        if(!title || !content || !author){
            return res.status(400).send('Title, content, and author are all required')
        }
        const result = await pool.query(
            `INSERT INTO posts(title, content, author) VALUES ($1, $2, $3) RETURNING *`,
            [title, content, author]
        )
        const createdPost = result.rows[0];
        res.status(200).json(createdPost);
    }catch(err){
        console.log(err.message)
        res.status(500).send('server error')
    }
})

app.put('/posts/:id', async (req, res)=>{
    try{
        const {id} = req.params
        const { title, content, author} = req.body
        if(!title || !content || !author || !id){
            return res.status(400).send('Title, content, ID,and author are all required')
        }
        const result = await pool.query(
            'UPDATE posts SET title = $2, content = $3, author = $4 WHERE id = $1 RETURNING *',
            [id, title, content, author]
          );
        const createdPost = result.rows[0];
        res.status(200).json(createdPost);
    }catch(err){
        console.log(err.message)
        res.status(500).send('server error')
    }
})

app.delete('/posts/:id', async (req,res)=>{

    try{
        const {id} = req.params
        const result = await pool.query(
            'DELETE FROM posts WHERE id = $1',
            [id]
        );
        if(result.rowCount === 0){
            return res.status(404).send(`Post with id ${id} is not found`)
        }
        res.status(200).json({message: "Successful delete!", deletedPost: result.rows[0]});
    }catch(err){
        console.log(err.message)
        res.status(500).send('server error')
    }
})

app.get('/posts/:id/comments', (req, res)=>{

})

app.post('/posts/:id/comments', (req, res)=>{

})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});