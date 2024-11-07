# API 목록 (상시변경)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET   | /api/v1/shuttle-stop/`{line}` | 노선별 정류장 목록 조회 |
| GET    | /api/v1/shuttle-stop/`all`| 전체 정류장 목록 조회 |
| POST    | /api/v1/shuttle-stop| 정류장 추가 |
| PATCH  | /api/v1/shuttle-stop/`{shuttleStopId}` | 정류장 수정 |
| DELETE | /api/v1/shuttle-stop/`{shuttleStopId}` | 정류장 삭제 |

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/shuttle-stop/`{shuttleStopId}/images` | 정류장 이미지 조회 |
| POST | /api/v1/shuttle-stop/`{shuttleStopId}/images` | 정류장 이미지 등록 |

