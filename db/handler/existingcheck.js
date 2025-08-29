import { userObj } from "../../index.js";
import { HttpStatus } from "../../src/errors/response.js";
import { INTERNAL_ERROR_OBJ } from "../../src/utils/commonutils.js";
import { validatePass } from '../../src/utils/passencrytion.js';
export const doesClientExist  = async ({ email }) => {
    try {
        const user = await userObj.findOne({ email })
        return user ?? null;
    } catch (e) {}
    return HttpStatus.INTERNAL_ERROR;
}


export const checkLoginCrediential = async ({email, password}) => {
    const user = await doesClientExist({email});
    if(user == null) return { status: HttpStatus.NOT_FOUND };
    if(user == HttpStatus.INTERNAL_ERROR) return { status: HttpStatus.INTERNAL_ERROR};
    
    const isValidPass = await validatePass(password, user.password);
    return isValidPass ? {
        status: HttpStatus.OK,
        user
    } : {
        status: HttpStatus.BAD_REQUEST
    };
};

// const response = (status, props){
//     return {
//         status,
//     }
// }