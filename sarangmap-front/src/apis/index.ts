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
        console.log("responseBody: ",responseBody);
        return responseBody;
    })
    .catch(error => {
        if (!error.response) return null;
        const responseBody: ResponseDto = error.response.data;
       
        return responseBody;

    })
    return result;
}
