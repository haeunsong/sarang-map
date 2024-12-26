import React, {useState} from "react";
import {uploadImageRequest} from "../apis"; // API 함수 추가

export default function UploadForm({stop, onClose}: any) {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("파일을 선택하세요.");
            return;
        }

        try {
            const url = await uploadImageRequest(file, stop.id); // 업로드 API 호출
            alert("이미지 업로드 성공! URL: " + url);
            onClose(); // 업로드 후 폼 닫기
        } catch (error) {
            alert("업로드 실패!");
        }
    };

    return (
        <div className="upload-form">
            <h3>{stop.name}에 이미지 업로드</h3>
            <input type="file" onChange={handleFileChange}/>
            <button onClick={handleUpload}>업로드</button>
            <button onClick={onClose}>닫기</button>
        </div>
    );
}
