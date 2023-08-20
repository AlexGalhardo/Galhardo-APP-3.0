export default class ExceptionErrors {
    public static readonly PROCESSING_ERROR = "PROCESSING_ERROR";

    public static readonly CPF_IS_REQUIRED = "CPF is required";
    public static readonly CPF_IS_INVALID = "CPF is invalid";

    public static readonly DOC_NUMBER_IS_REQUIRED = "Document number is required";
    public static readonly DOC_NUMBER_IS_INVALID = "Document number is invalid";

    public static USER_ALREADY_EXISTS: "User already exists";
    public static readonly USER_NOT_FOUND = "User not found";
    public static readonly USER_CANNOT_AUTHENTICATE = "Cannot authenticate user";

    public static readonly TOKEN_EXPIRED_OR_INVALID = "Token expired or invalid";

    public static readonly AUTH_CODE_NOT_FOUND = "Auth code not found";
    public static readonly AUTH_CODE_IS_REQUIRED = "Code is required";
    public static readonly AUTH_CODE_IS_INVALID = "Code is invalid";
    public static readonly AUTH_CODE_EXPIRED = "Auth code expired";

    public static readonly PASSWORD_IS_INVALID: "Password is invalid";
    public static readonly PASSWORD_ALREADY_EXISTS: "The user already has a password";
    public static readonly ZIP_CODE_IS_INVALID = "Zip code is invalid";
    public static readonly PASSWORD_IS_REQUIRED = "Password is required";
    public static readonly PHONE_NUMBER_IS_INVALID = "Phone number is invalid";
    public static readonly EMAIL_IS_INVALID = "Email is invalid";
    public static readonly NAME_IS_INVALID = "Name is invalid";
}
