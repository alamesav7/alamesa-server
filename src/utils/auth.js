const jwt = require('jsonwebtoken');

exports.auth = ( req, res, next ) =>{
  try{
    const { authorization } = req.headers;
    if(!authorization){
      throw new Error( 'Su sesion expiró' );
    }

    const [ _, token] = authorization.split(' ');
    if(!token){
      throw new Error('Su sesion expiró');
    }
    const { id, userType, email } = jwt.verify(token, process.env.SECRET);
    if( userType === 'clients' ) {
      req.client = id
    }
    else { req.restaurant = id }
    if(email)req.body['email'] = email
    if(userType)req.body['userType'] = userType
    
    next();
  }
  catch(err){
    res.status(401).json({message: err.message});
  }
}
