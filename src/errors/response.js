export class HttpStatus {
    static OK = 200;
    static CREATED = 201;
    static BAD_REQUEST = 400;
    static UNAUTHORIZED = 401;
    static NOT_FOUND = 404;
    static INTERNAL_ERROR = 500;
    static CONFLICT_ERROR = 409;
    static UNAUTHORIZED = 401;
  }
  
export class AppResponse {
    static USER_NOT_FOUND = "User not found";
    static LOGIN_SUCCESS = "Login successful";
    static SIGNUP_SUCCESS = "Signup successful";
    static SIGNUP_FAILED = "Signup Failed";
    static SIGNIN_FAILED = "Signin Failed";
    static custom(str) { return str.toUpperCase(); };
  }
  