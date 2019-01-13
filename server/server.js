const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));

//404 below is set up in react auth router;
/*app.get('*', (req,res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});*/

//start server
const port = 3000;
app.listen(port,()=>{
  console.log(`Server is up on ${port}`);
});