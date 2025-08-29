import { HttpStatus } from "../errors/response.js";

export const INTERNAL_ERROR_OBJ = {
    status: HttpStatus.INTERNAL_ERROR,
    message: 'Internal Server Error'
};