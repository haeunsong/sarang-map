import React, { useEffect, useState } from "react";
import "./map.css";
import { getShuttleStopsByLineRequest } from "../apis";

declare const window: typeof globalThis & {
  naver: any;
};

export default function Map() {
  const [map, setMap] = useState<any>(null); // 지도 객체를 state로 저장
  const [infoWindow, setInfoWindow] = useState<any>(null); // InfoWindow 객체
  const [shuttleStops, setShuttleStops] = useState<any[]>([[], [], []]); // 셔틀 정류소 데이터
  const [address, setAddress] = useState(""); // 입력된 주소

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
      new window.naver.maps.Marker({
        position,
        map: map,
        title: `${index + 1}. ${stop.name}`,
        icon: {
          content: '<div style="color: red; font-size: 14px;">★</div>',
          size: new window.naver.maps.Size(20, 20),
        },
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
        { query },
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

  return (
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
        <div id="map" style={{ width: "100%", height: "500px" }}></div>
      </div>
  );
}
