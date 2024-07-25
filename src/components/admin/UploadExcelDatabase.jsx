import React, { useState } from 'react';
import Bar from '../../Sidebar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UploadExcelDatabase() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadDate, setUploadDate] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setErrorMessage('');
    setUploadStatus('');
    setUploadDate('');
  };

  const onFileUpload = async () => {
    if (!selectedFile) {
      setErrorMessage('No file selected');
      toast.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    let token = localStorage.getItem('token');

    try {
      setUploadStatus('Uploading...');
      const res = await axios.post('http://localhost:8000/admin/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      setUploadStatus('Upload Successful');
      setErrorMessage('');
      setUploadDate(new Date().toLocaleDateString());
      toast.success('File Uploaded Successfully');
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Error uploading file';
      setErrorMessage(errorMsg);
      setUploadStatus('Upload Failed');
      toast.error(errorMsg);
    }
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div className='mt-4'>
          <h2 className='text-lg font-medium'>File Details:</h2>
          <p><strong>File Name:</strong> {selectedFile.name}</p>
          <p><strong>File Type:</strong> {selectedFile.type}</p>
          <p><strong>Last Modified:</strong> {selectedFile.lastModifiedDate.toDateString()}</p>
          {uploadDate && <p><strong>Upload Date:</strong> {uploadDate}</p>}
        </div>
      );
    } else {
      return (
        <div className='mt-4'>
          <h4 className='text-lg font-medium'>กรุณาเลือกไฟล์</h4>
        </div>
      );
    }
  };

  return (
    <div className='flex'>
      <Bar />
      <div className='flex flex-col items-center p-6 w-full'>
        <p className='mb-6 text-xl font-semibold'>Upload ข้อมูลประจำเดือน</p>
        <form
          onSubmit={(e) => { e.preventDefault(); onFileUpload(); }}
          className='w-full max-w-md'
        >
          <div className='mb-4'>
            <input
              type='file'
              onChange={handleFileChange}
              className='border p-2 w-full rounded'
              aria-label='เลือกไฟล์'
            />
          </div>
          <button
            type='submit'
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full'
          >
            Upload
          </button>
        </form>
        {fileData()}
        {errorMessage && <p className='mt-4 text-red-600'>{errorMessage}</p>}
        {uploadStatus && <p className='mt-4'>{uploadStatus}</p>}
        <ToastContainer />
      </div>
    </div>
  );
}

export default UploadExcelDatabase;
