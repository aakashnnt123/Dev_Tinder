 const adminauth = (req,res,next)=>{
   const token ="xyz";
   const isAdminAuthorised = token ==="xyz";

   if(!isAdminAuthorised)
   {
    res.status(401).send("unauthorised request ");
   }
   else
    next();
}

const userauth = (req,res,next)=>{
  const token ="xyz";
  const isAdminAuthorised = token ==="xyz";

  if(!isAdminAuthorised)
  {
   res.status(401).send("unauthorised request ");
  }
  else
   next();
}

module.exports ={
  adminauth,
  userauth,
};