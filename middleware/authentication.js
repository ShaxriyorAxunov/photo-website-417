const jwt =  require("jsonwebtoken");

exports.authentication = async(req, res, next) => {
    try {
    const token = req.header("Authorization")?.split(" ")[1];
    console.log(token);
    
    if(!token) {
      return res.status(401).json({message: "Token yo'q"});
    }

    jwt.verify(token, "MEN SENGA BIR GAP AYTAMAN, HECH KIM BILMASIN")
    next();

    } catch (error) {
        console.log(error.message);
        return res.status(403).json({
      message: "Rasm o'chirishga ruxsat yo'q",
    })
    }
}