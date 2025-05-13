const logOutController = {};

logOutController.logout = async(req,res)=>{

    res.clearCookie("authToken");

    return res.json({ message: "Sesión cerrada" });
}

export default logOutController;