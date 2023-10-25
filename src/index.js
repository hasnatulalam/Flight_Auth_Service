const express =require('express');
const bodyParser =require('body-parser')
const { PORT }=require('./config/serverConfig');
const apiRoutes =require('./routes/index');
const db=require('./models/index')
const app = express();
const {User,Role}=require('./models/index')


const prepareAndStartServer =()=>{
app.listen(PORT,async()=>{
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended:true}));
     app.use('/api',apiRoutes);
     console.log(`server started at ${PORT}`);
     if(process.env.SYNC_DB){
      db.sequelize.sync({ alter: true });
    }
    const u1=await User.findByPk(2);
    const r1 =await Role.findByPk(1);
   // u1.addRole(r1);
   const response = await u1.hasRoles(r1);
   console.log(response)

})
}
prepareAndStartServer()