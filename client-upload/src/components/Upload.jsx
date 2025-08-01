import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { importerUrl } from '../context/constants';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState('');
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadResult(null);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(`${importerUrl}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setUploadResult(res.data);

      // 👉 Auto redirect sau 2s nếu muốn
      // setTimeout(() => {
      //   navigate('/transactions');
      // }, 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Upload CSV File</h3>

      <div className="mb-3">
        <input type="file" className="form-control" onChange={handleFileChange} />
      </div>

      <button className="btn btn-primary mb-3" onClick={handleUpload}>
        Upload
      </button>

      {uploadResult && (
        <div className="alert alert-success mt-3">
          ✅ Uploaded successfully. Total rows: {uploadResult.total}
        </div>
      )}

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <div className="mt-4 d-flex gap-3">
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <button className="btn btn-outline-success" onClick={() => navigate('/transactions')}>
          👉 View transactions
        </button>
      </div>
    </div>
  );
};

export default Upload;