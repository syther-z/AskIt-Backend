import { HttpStatus } from "../errors/response.js";

export const validateCredientials = ({signin = undefined}) => {
    return (req, res, next) => {
        const data = req.body;
        const usernameValidation = signin ?? (data.username && /[a-zA-Z_]+[a-zA-Z0-9_]/g.test(data.username.trim()));
        const emailValidation = data.email && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email.trim());
        const passwordValidation = signin ?? (data.password && /^.{8,}$/.test(data.password));
        const finalValidation = usernameValidation && emailValidation && passwordValidation;
        if (!finalValidation) return res.status(HttpStatus.BAD_REQUEST)
            .json({
                status: HttpStatus.BAD_REQUEST,
                message: 'Details are not Valid'
            })
        next();
    };
}