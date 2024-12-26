import React, {useEffect, useState} from "react";
import "./map.css";
import {getShuttleStopsByLineRequest} from "../apis";
import UploadForm from "./UploadForm";
import axios from "axios";

declare const window: typeof globalThis & {
    naver: any;
};

export default function Map() {
    const [map, setMap] = useState<any>(null); // 지도 객체를 state로 저장
    const [infoWindow, setInfoWindow] = useState<any>(null); // InfoWindow 객체
    const [shuttleStops, setShuttleStops] = useState<any[]>([[], [], []]); // 셔틀 정류소 데이터
    const [address, setAddress] = useState(""); // 입력된 주소

    // image 처리 관련 상태
    const [uploadVisible, setUploadVisible] = useState(false);
    const [selectedStop, setSelectedStop] = useState<any>(null);
    const [imageFile, setImageFile] = useState<File | null>(null); // 업로드된 파일
    const [images, setImages] = useState<string[]>([]); // 정류소 이미지 목록

    // 지도 및 InfoWindow 초기화
    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=61viz7dkel&submodules=geocoder";
        document.head.appendChild(script);

        script.onload = () => {
            const initialMap = new window.naver.maps.Map("map", {
                center: new window.naver.maps.LatLng(37.491282, 127.007408),
                zoom: 15,
                mapTypeControl: true,
            });

            const initialInfoWindow = new window.naver.maps.InfoWindow({
                anchorSkew: true,
            });

            setMap(initialMap);
            setInfoWindow(initialInfoWindow);

            // 지도 클릭 시 InfoWindow 닫기 이벤트 추가
            window.naver.maps.Event.addListener(initialMap, "click", () => {
                initialInfoWindow.close();
            });

            // 초기 검색 실행
            searchAddressToCoordinate("서울특별시 서초구");
        };

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    // 셔틀 정류소 데이터 가져오기
    useEffect(() => {
        const fetchShuttleStops = async () => {
            try {
                const line1 = await getShuttleStopsByLineRequest(1);
                const line2 = await getShuttleStopsByLineRequest(2);
                const line3 = await getShuttleStopsByLineRequest(3);
                const line5 = await getShuttleStopsByLineRequest(5);
                const line7 = await getShuttleStopsByLineRequest(7);

                setShuttleStops([line1, line2, line3, line5, line7]);
            } catch (error) {
                console.error("셔틀 정류소 데이터를 가져오는 중 에러 발생:", error);
            }
        };

        fetchShuttleStops();
    }, []);

    // 지도에 셔틀 정류소 데이터 추가
    useEffect(() => {
        if (map && shuttleStops.length > 0) {
            shuttleStops.forEach((lineStopsObj, index) => {
                const lineStops = lineStopsObj?.shuttleStopDtos || [];
                if (lineStops.length > 0) {
                    addMarkers(lineStops, index + 1);
                }
            });
        }
    }, [map, shuttleStops]);

    // 셔틀 정류소 마커 및 경로 추가
    const addMarkers = (stops: any[], lineIndex: number) => {
        const positions = stops.map(
            (stop) => new window.naver.maps.LatLng(stop.lat, stop.lng)
        );

        stops.forEach((stop, index) => {
            const position = positions[index];

            const marker = new window.naver.maps.Marker({
                position,
                map: map,
                title: `${index + 1}. ${stop.name}`,
                icon: {
                    content: `
          <div style="position: relative; display: flex; align-items: center;">
            <div style="color: red; font-size: 16px; margin-right: 4px;">★</div>
          </div>
        `,
                    size: new window.naver.maps.Size(20, 20),
                },
            });

          // 인포창 생성
          const infoWindow = new window.naver.maps.InfoWindow({
            content:`
    <div style="padding: 10px; font-size: 14px; white-space: nowrap;">
      <div style="font-weight: bold;">${stop.line}노선</div>
      ${stop.number}. ${stop.name}
    </div>
  `,
            backgroundColor: "#fff",
            borderColor: "#ccc",
            borderWidth: 1,
            disableAutoPan: true,
          });
            // 마커 클릭 시 이미지 업로드 폼 표시
            window.naver.maps.Event.addListener(marker, "click", () => {
                setSelectedStop(stop); // 선택된 정류소 데이터 저장
                setUploadVisible(true); // 업로드 폼 표시
                fetchStopImages(stop.id);
            });


          // 마커에 마우스 이벤트 추가
          window.naver.maps.Event.addListener(marker, "mouseover", () => {
            infoWindow.open(map, marker); // 인포창 열기
          });

          window.naver.maps.Event.addListener(marker, "mouseout", () => {
            infoWindow.close(); // 인포창 닫기
          });

        });

        if (positions.length > 1) {
            const strokeColor =
                lineIndex === 1
                    ? "#FF0000" // 빨강
                    : lineIndex === 2
                        ? "#FFA500" // 주황
                        : lineIndex === 3
                            ? "#FFFF00" // 노랑
                            : lineIndex === 5
                                ? "#008000" // 초록
                                : lineIndex === 7
                                    ? "#0000FF" // 파랑
                                    : "#000000"; // 기본값 (검정)

            new window.naver.maps.Polyline({
                path: positions,
                strokeColor: strokeColor,
                strokeWeight: 4,
                map: map,
            });
        }

    };

    // 주소 → 좌표 변환
    const searchAddressToCoordinate = (query: string) => {
        if (!map || !infoWindow) return;

        window.naver.maps.Service.geocode(
            {query},
            (status: any, response: any) => {
                if (status === window.naver.maps.Service.Status.ERROR) {
                    alert("Something Wrong!");
                    return;
                }

                if (response.v2.meta.totalCount === 0) {
                    alert("주소를 찾을 수 없습니다.");
                    return;
                }

                const item = response.v2.addresses[0];
                const point = new window.naver.maps.Point(item.x, item.y);

                infoWindow.setContent(
                    `<div style="padding:10px;min-width:200px;line-height:150%;">
            <h4 style="margin-top:5px;">검색 주소 : ${query}</h4><br />
            [도로명 주소] ${item.roadAddress || "N/A"}<br />
            [지번 주소] ${item.jibunAddress || "N/A"}
          </div>`
                );

                map.setCenter(point);
                infoWindow.open(map, point);
            }
        );
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        searchAddressToCoordinate(address);
    };

    const fetchStopImages = async (shuttle_stop_id: number) => {
        try {
            const response = await axios.get(`/api/v1/images/stop/${shuttle_stop_id}`);
            setImages(response.data);
        }catch(error) {
            console.error("이미지 가져오기 실패:",error);
        }
    };

    return (
        <div>
            <div>
                <div id="map" style={{width: "100%", height: "500px"}}></div>
                {uploadVisible && selectedStop && (
                    <UploadForm stop={selectedStop} onClose={() => setUploadVisible(false)}/>
                )}
            </div>
            <div>
                <div className="map-container">
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="주소를 입력하세요."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="input-field"
                        />
                        <button type="submit" className="submit-button">
                            검색
                        </button>
                    </form>
                </div>
                {/* 이미지 목록 표시 */}
                <div className="images-container">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`정류소 ${selectedStop.name} 이미지`}
                        />
                    ))}
                </div>
                <div id="map" style={{width: "100%", height: "500px"}}></div>
            </div>
        </div>

    );
}
