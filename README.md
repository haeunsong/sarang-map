# 1. API V1 완성 (배포 필요)
## 주소로 검색 기능
<img width="340" alt="image" src="https://github.com/user-attachments/assets/1b161523-528c-40c3-9fa7-f264d442791c" />

## 1,2,3,5,7 노선 마킹 (추후 4노선 구현 필요)
<img width="658" alt="image" src="https://github.com/user-attachments/assets/6d538f7a-d5b4-4a37-8062-e4b5a75e2068" />

## 마커 클릭시 주변 이미지 업로드 가능
<img width="837" alt="image" src="https://github.com/user-attachments/assets/a77b3799-e197-4f41-b8b6-40fa8887f0d5" />
---

# 2. API 목록

## Shuttle Stop APIs
| Method | Endpoint                              | Description             |
|--------|---------------------------------------|-------------------------|
| GET    | /api/v1/shuttle-stop/{line}           | 노선별 정류장 목록 조회 |
| GET    | /api/v1/shuttle-stop/all              | 전체 정류장 목록 조회   |

---

## Image APIs
| Method | Endpoint                                      | Description               |
|--------|-----------------------------------------------|---------------------------|
| POST   | /api/v1/images/upload                         | 이미지 업로드             |
| GET    | /api/v1/images/{fileName}                     | 업로드된 단일 이미지 조회 |
| GET    | /api/v1/images/stop/{shuttleStopId}           | 정류장 ID로 이미지 리스트 조회   |

---
