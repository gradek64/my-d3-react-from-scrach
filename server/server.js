const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));

//404;
app.get('*', (req,res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

//heroku will assign dynamic port from process.env.PORT and it 
//will run from npm start and build code from npm heroku-postbuild after deploying
//therefore you need to ignore webpack generated files in .gitignore since they will be generated by heroku again;
const port = process.env.PORT || 3000;
app.listen(port,()=>{
  console.log(`Server is up on ${port}`);
});