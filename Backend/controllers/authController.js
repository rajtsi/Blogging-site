//register

//login 
import User from "../models/user";


export const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json(
                {
                    Success: false,
                    Message: "You have to provide all 3 Details to Register"
                }
            )
        }

        const userFromDb = await User.findOne({ email: });

        if (userFromDb) {
            return res.json(
                {
                    Success: false,
                    Message: "Email is already Used"
                }
            )
        }

        //    password:hassedPasword
        // 
        // rajat Singh is a teacher and is from up
        // -> a-> &
        // -> space-> _
        // -> aa-> '/'

        // r&j&t_Singh-> 
        // '/'->











    }
    catch (error) {
        return res.json({
            Success: false,
            Message: error.Message,
        });
    }
}