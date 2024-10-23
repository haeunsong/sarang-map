import React, { useEffect, useState } from "react";

declare const window: typeof globalThis & {
  naver: any;
};

export default function Map() {
  const [map, setMap] = useState<any>(null); // 지도 객체를 state로 저장
  const [latText, setLatText] = useState(""); // 위도 입력값
  const [lngText, setLngText] = useState(""); // 경도 입력값

  // 1노선 정류소 데이터
  const shuttleStopsLine1 = [
    { name: "서초역1번출구", lat: 37.492444, lng: 127.009669 },
    { name: "롯데칠성", lat: 37.489, lng: 127.016525 },
    { name: "강남역9번출구", lat: 37.497985, lng: 127.026897 },
    { name: "서초초등학교", lat: 37.498708, lng: 127.024068 },
    { name: "진흥아파트", lat: 37.496987, lng: 127.023484 },
    { name: "서초역1번출구", lat: 37.492444, lng: 127.009669 },
  ];

  // 2노선 정류소 데이터
  const shuttleStopsLine2 = [
    { name: "교회 올리브영 앞", lat: 37.489522, lng: 127.008956 },
    { name: "국립중앙도서관 맞은편", lat: 37.498039, lng: 127.004828 },
    { name: "성모병원", lat: 37.499663, lng: 127.004314 },
    { name: "반포 한강 시민공원", lat: 37.510605, lng: 126.996247 },
    { name: "효성빌딩(조달약국)", lat: 37.500709, lng: 127.003431 },
    { name: "국립중앙도서관", lat: 37.498356, lng: 127.004095 },
    { name: "교회서초빌딩 앞", lat: 37.489777, lng: 127.00854 },
    { name: "동광빌딩 앞", lat: 37.48142, lng: 127.012781 },
    { name: "이디야카페 앞", lat: 37.482085, lng: 127.012284 },
    { name: "교회 올리브영 앞", lat: 37.489522, lng: 127.008956 },
  ];
  const shuttleStopsLine3 = [
    { name: "교회 스타벅스 앞", lat: 37.490542, lng: 127.008402 },
    { name: "유원 아파트(국민은행 앞)", lat: 37.495486, lng: 127.018366 },
    { name: "서초 래미안 남문", lat: 37.497395, lng: 127.020529 },
    { name: "반포고", lat: 37.501559, lng: 127.016127 },
    { name: "서초 구립 반포도서관 맞은편", lat: 37.502761, lng: 127.012386 },
    { name: "동아 아파트", lat: 37.502761, lng: 127.012386 },
    { name: "잠원역 1번출구", lat: 37.512958, lng: 127.011584 },
    { name: "잠원역4번 출구", lat: 37.513026, lng: 127.011592 },
    { name: "동아 아파트", lat: 37.509027, lng: 127.011173 },
    { name: "서초 구립 반포도서관", lat: 37.502706, lng: 127.01246 },
    { name: "반포고", lat: 37.501455, lng: 127.016227 },
    { name: "서초래미안 정문", lat: 37.500387, lng: 127.018843 },
    { name: "서초 래미안 남문", lat: 37.497407, lng: 127.02029 },
    { name: "유원 아파트(국민은행 앞)", lat: 37.497482, lng: 127.020363 },
    { name: "교회 스타벅스 앞", lat: 37.490542, lng: 127.008402 },
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=61viz7dkel&submodules=geocoder";
    document.head.appendChild(script);

    script.onload = () => {
      const initialMap = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(37.492444, 127.009669), // 초기 위치
        zoom: 13, // 초기 줌 레벨
      });
      setMap(initialMap); // 지도 객체를 state에 저장

      // 1노선 마커 추가
      shuttleStopsLine1.forEach((stop, index) => {
        const position = new window.naver.maps.LatLng(stop.lat, stop.lng);
        new window.naver.maps.Marker({
          position,
          map: initialMap,
          title: `${index + 1}. ${stop.name}`, // 순서 번호 추가
          icon: {
            content: '<div style="color: red; font-size: 14px;">★</div>', // 빨간색 별 마커
            size: new window.naver.maps.Size(20, 20),
          },
        });

        // 마커 옆에 정류소 이름과 번호 추가
        const labelPosition = new window.naver.maps.LatLng(
          stop.lat + 0.0001,
          stop.lng
        ); // 마커 위에 표시
        if (index == shuttleStopsLine1.length - 1) {
          return;
        } else {
          new window.naver.maps.Marker({
            position: labelPosition,
            map: initialMap,
            icon: {
              content: `<div style="color: black; font-size: 14px;">${
                index + 1
              }. ${stop.name}</div>`, // 번호와 이름 표시
              size: new window.naver.maps.Size(100, 30), // 라벨 크기 조정
              anchor: new window.naver.maps.Point(50, 15), // 앵커 포인트 설정
            },
          });
        }
      });

      // 2노선 마커 추가 (초록색)
      shuttleStopsLine2.forEach((stop, index) => {
        const position = new window.naver.maps.LatLng(stop.lat, stop.lng);
        new window.naver.maps.Marker({
          position,
          map: initialMap,
          title: `${index + 1}. ${stop.name}`, // 순서 번호 추가
          icon: {
            content: '<div style="color: green; font-size: 14px;">★</div>', // 초록색 별 마커
            size: new window.naver.maps.Size(20, 20),
          },
        });
        // 마커 옆에 정류소 이름과 번호 추가
        const labelPosition = new window.naver.maps.LatLng(
          stop.lat + 0.0001,
          stop.lng
        ); // 마커 위에 표시
        if (index == shuttleStopsLine2.length - 1) {
          return;
        } else {
          new window.naver.maps.Marker({
            position: labelPosition,
            map: initialMap,
            icon: {
              content: `<div style="color: black; font-size: 14px;">${
                index + 1
              }. ${stop.name}</div>`, // 번호와 이름 표시
              size: new window.naver.maps.Size(100, 30), // 라벨 크기 조정
              anchor: new window.naver.maps.Point(50, 15), // 앵커 포인트 설정
            },
          });
        }
      });

      // 3노선 마커 추가 (파란색)
      shuttleStopsLine3.forEach((stop, index) => {
        const position = new window.naver.maps.LatLng(stop.lat, stop.lng);
        new window.naver.maps.Marker({
          position,
          map: initialMap,
          title: `${index + 1}. ${stop.name}`, // 순서 번호 추가
          icon: {
            content: '<div style="color: blue; font-size: 14px;">★</div>', // 파란색 별 마커
            size: new window.naver.maps.Size(20, 20),
          },
        });

        // 마커 옆에 정류소 이름과 번호 추가
        const labelPosition = new window.naver.maps.LatLng(
          stop.lat + 0.0001,
          stop.lng
        ); // 마커 위에 표시
        if (index == shuttleStopsLine3.length - 1) {
          return;
        } else {
          new window.naver.maps.Marker({
            position: labelPosition,
            map: initialMap,
            icon: {
              content: `<div style="color: black; font-size: 14px;">${
                index + 1
              }. ${stop.name}</div>`, // 번호와 이름 표시
              size: new window.naver.maps.Size(100, 30), // 라벨 크기 조정
              anchor: new window.naver.maps.Point(50, 15), // 앵커 포인트 설정
            },
          });
        }
      });

      // 1노선 마커를 연결하는 선 그리기
      const linePath1 = shuttleStopsLine1.map(
        (stop) => new window.naver.maps.LatLng(stop.lat, stop.lng)
      );
      const polyline1 = new window.naver.maps.Polyline({
        path: linePath1,
        strokeColor: "#FF0000", // 빨간색
        strokeOpacity: 1,
        strokeWeight: 5,
      });
      polyline1.setMap(initialMap); // 지도에 선 추가

      // 2노선 마커를 연결하는 선 그리기 (초록색)
      const linePath2 = shuttleStopsLine2.map(
        (stop) => new window.naver.maps.LatLng(stop.lat, stop.lng)
      );
      const polyline2 = new window.naver.maps.Polyline({
        path: linePath2,
        strokeColor: "#00FF00", // 초록색
        strokeOpacity: 1,
        strokeWeight: 5,
      });
      polyline2.setMap(initialMap); // 지도에 선 추가

      // 3노선 마커를 연결하는 선 그리기 (파란색)
      const linePath3 = shuttleStopsLine3.map(
        (stop) => new window.naver.maps.LatLng(stop.lat, stop.lng)
      );
      const polyline3 = new window.naver.maps.Polyline({
        path: linePath3,
        strokeColor: "#0000FF", // 초록색
        strokeOpacity: 1,
        strokeWeight: 5,
      });
      polyline3.setMap(initialMap); // 지도에 선 추가
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

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
