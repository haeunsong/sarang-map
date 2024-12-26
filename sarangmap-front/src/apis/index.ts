import axios, { AxiosRequestConfig } from 'axios';
import ResponseDto from './response';
import GetShuttleStopsByLineResponseDto from './response/get-shuttle-stop-by-line.response.dto';

const DOMAIN = "http://localhost:4000";
const API_DOMAIN = "/api/v1";

const GET_SHUTTLE_STOPS_BY_LINE_URL = (line:number) => `${API_DOMAIN}/shuttle-stop/${line}`;
export const getShuttleStopsByLineRequest = async(line:number) : Promise<GetShuttleStopsByLineResponseDto[]> => {
    const result = await axios.get(GET_SHUTTLE_STOPS_BY_LINE_URL(line))
    .then(response => {
        const responseBody = response.data;
        return responseBody;
    })
    .catch(error => {
        if (!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
       
        return responseBody;

    })
    return result;
}

export const uploadImageRequest = async function uploadImage(file: File, shuttle_stop_id: number) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("shuttle_stop_id", shuttle_stop_id.toString()); // 서버에서 받는 이름으로 해야돼!!!

    try {
        const response = await axios.post("/api/v1/images/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data; // 업로드된 이미지의 URL 반환
    } catch (error) {
        console.error("이미지 업로드 실패:", error);
        throw error;
    }
}
