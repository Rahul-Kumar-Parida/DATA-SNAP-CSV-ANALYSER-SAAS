import React, { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ onResult, setLoading }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await axios.post("http://127.0.0.1:8000/analyze/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            onResult(res.data); // Passes analysis result to parent (App)
        } catch (err) {
            onResult({ error: "Failed to analyze file." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="upload-form" onSubmit={handleSubmit}>
            <input
                type="file"
                accept=".csv, .xls, .xlsx"
                onChange={handleFileChange}
                className="file-input"
            />
            <button
                type="submit"
                className="analyze-btn"
                disabled={!file}
            >
                Analyze
            </button>
        </form>
    );
};

export default FileUpload;