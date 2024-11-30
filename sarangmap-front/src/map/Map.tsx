import React, { useEffect, useState } from "react";
import { getShuttleStopsByLineRequest } from "../apis";

declare const window: typeof globalThis & {
  naver: any;
};

export default function Map() {
  const [map, setMap] = useState<any>(null); // 지도 객체를 state로 저장
  const [latText, setLatText] = useState(""); // 위도 입력값
  const [lngText, setLngText] = useState(""); // 경도 입력값

  const [shuttleStops, setShuttleStops] = useState<any[]>([[], [], []]); // 각 노선의 정류소를 담는 배열

  useEffect(() => {
    const fetchShuttleStops = async () => {
      const line1 = await getShuttleStopsByLineRequest(1);
      const line2 = await getShuttleStopsByLineRequest(2);
      const line3 = await getShuttleStopsByLineRequest(3);

      console.log("Fetched Stops:", line1, line2, line3);
      setShuttleStops([line1, line2, line3]);
    };
    fetchShuttleStops();

    const script = document.createElement("script");
    script.src =
      "https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=61viz7dkel&submodules=geocoder";
    document.head.appendChild(script);

    script.onload = () => {
      const initialMap = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(37.492444, 127.009669),
        zoom: 13,
      });
      console.log("Map initialized:", initialMap);
      setMap(initialMap);
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 공통되는 부분 함수화
  const addMarkers = (stops: any[], lineIndex: number) => {
    const positions = stops.map(
      (stop, index) => new window.naver.maps.LatLng(stop.lat, stop.lng)
    );

    // 마커 추가
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

      if (index !== stops.length - 1) {
        const labelPosition = new window.naver.maps.LatLng(
          stop.lat + 0.000001,
          stop.lng
        );
        new window.naver.maps.Marker({
          position: labelPosition,
          map: map,
          icon: {
            content: `<div style="color: black; font-size: 14px;">${
              index + 1
            }. ${stop.name}</div>`,
            size: new window.naver.maps.Size(100, 30),
            anchor: new window.naver.maps.Point(50, 15),
          },
        });
      }
    });

    // 선 그리기
    if (positions.length > 1) {
      const strokeColor =
        lineIndex === 1 ? "#FF0000" : lineIndex === 2 ? "#FFA500" : "#FFFF00"; // 빨강, 주황, 노랑
      new window.naver.maps.Polyline({
        path: positions,
        strokeColor: strokeColor,
        strokeWeight: 4,
        map: map,
      });
    }
  };

  // 마커와 선 그리기
  useEffect(() => {
    if (map) {
      shuttleStops.forEach((lineStopsObj, index) => {
        const lineStops = lineStopsObj.shuttleStopDtos; // shuttleStopDtos에 접근
        if (lineStops && lineStops.length > 0) {
          console.log("addMarker()");
          addMarkers(lineStops, index + 1);
        }
      });
    }
  }, [map, shuttleStops]);

  // 위도와 경도로 위치 찾기
  const onSubmitLatAndLng = () => {
    const lat = parseFloat(latText);
    const lng = parseFloat(lngText);

    if (!isNaN(lat) && !isNaN(lng) && map) {
      const location = new window.naver.maps.LatLng(lat, lng);

      // 지도 중심을 입력한 위치로 이동
      map.setCenter(location);

      // 해당 위치에 마커 추가
      new window.naver.maps.Marker({
        position: location,
        map: map,
        title: `위치: ${lat}, ${lng}`,
      });

      // 줌 레벨 조정
      map.setZoom(15);
    } else {
      alert("유효한 위도와 경도를 입력하세요.");
    }
  };
  const showCurrentLocation = () => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // 현재 위치로 지도 중심 이동
          const currentLocation = new window.naver.maps.LatLng(lat, lng);
          map.setCenter(currentLocation);

          // 현재 위치에 마커 추가
          new window.naver.maps.Marker({
            position: currentLocation,
            map: map,
            title: "현재 위치",
          });

          // 현재 위치로 줌인
          map.setZoom(15); // 줌 레벨을 더 크게 설정 (예: 15)
        },
        (error) => {
          console.error("Geolocation 에러:", error);
          alert("현재 위치를 가져올 수 없습니다.");
        }
      );
    } else {
      alert("이 브라우저는 Geolocation을 지원하지 않습니다.");
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="위도를 입력해주세요."
          value={latText}
          onChange={(e) => setLatText(e.target.value)}
        />
        <input
          type="text"
          placeholder="경도를 입력해주세요."
          value={lngText}
          onChange={(e) => setLngText(e.target.value)}
        />
        <button onClick={onSubmitLatAndLng}>확인</button>
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "calc(100vh - 100px)",
        }}
      >
        {/* 지도 표시 영역 */}
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
      </div>
      {/* GPS 버튼 */}
      <button
        onClick={showCurrentLocation}
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          padding: "10px",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      >
        📍
      </button>{" "}
    </div>
  );
}
