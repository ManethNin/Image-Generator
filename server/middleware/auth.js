import jwt from "jsonwebtoken";

const secret = "key"

const auth = async (req,res,next) => {
    try {
        if(!req.headers.authorization){
            return res.status(401).json({message:"Unauthorized"})
        }

        const token = req.headers.authorization.split(" ")[1]
        // console.log("Received token:", token);
        const decodedData = jwt.verify(token, secret)
        
        req.userId = decodedData?.id
        req.auth = decodedData
        
        console.log(decodedData)

        next()
    } catch (error) {
        res.status(401).json({message:"Unauthorized"})
        console.log(error)
    }
}

export default auth