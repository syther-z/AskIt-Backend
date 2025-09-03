import { userFollowObj, userObj, userResponseObj } from "../../index.js";
import { HttpStatus } from "../../src/errors/response.js";
import { getEncryptedPass } from '../../src/utils/passencrytion.js';
import { doesClientExist } from "./existingcheck.js";
export const registerClient = async ({ username, email, password }) => {
    const isExisting = await doesClientExist({email});
    if(isExisting) return {
        status: HttpStatus.CONFLICT_ERROR,
        message: 'Account already Exist'
    }
    try {
        //user creation
        const user = new userObj({
            username,
            email,
            password: await getEncryptedPass(password)
        });
        await user.save();
        // console.log(1);
        //user interaction
        const userInt = new userResponseObj({
            email,
            upvotes: [],
            replies: [],
            bookmarks: [],
        });
        await userInt.save();
        // console.log(2);
        //user follow and following
        const userFollow = new userFollowObj({
            email,
            followers: [],
            following: []
        });
        await userFollow.save();
        // console.log(3);
        return {
            status: HttpStatus.CREATED,
            message: 'Account Created Successfully',
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
