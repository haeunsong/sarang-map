import ResponseCode from "../../types/enum/response-code-enum";

export default interface ResponseDto {
    code: ResponseCode
    message: string;
}
