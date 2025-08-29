import { userObj } from "../../index.js";
import { HttpStatus } from "../../src/errors/response.js";
import { getEncryptedPass } from '../../src/utils/passencrytion.js';
import { doesClientExist } from "./existingcheck.js";
export const registerClient = async ({ username, email, password }) => {
    const isExisting = await doesClientExist({email});
    if(isExisting) return {
        status: HttpStatus.CONFLICT_ERROR,
        message: 'User already Exist'
    }
    try {
        const user = new userObj({
            username,
            email,
            password: await getEncryptedPass(password)
        });
        await user.save();
        return {
            status: HttpStatus.CREATED,
            message: 'User Created Successfully',
            user: {
                username,
                email
            }
        };
    } catch (e) {
        console.error(e);
    }
    return {
        status: HttpStatus.INTERNAL_ERROR,
        message: 'Internal Server Error'
    };
}
