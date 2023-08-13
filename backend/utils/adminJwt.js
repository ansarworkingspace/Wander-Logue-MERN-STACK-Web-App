import adminJwt from "jsonwebtoken";

const  generateAdminToken = (res,adminId)=>{
    const adminToken = adminJwt.sign({adminId},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })



    res.cookie('adminJwt',adminToken,{
         httpOnly:true,
         secure: process.env.NODE_ENV !== 'development',
         sameSite:'strict',
         maxAge:30 * 24 * 60 * 60 * 1000
    
        })
}

export default generateAdminToken;

