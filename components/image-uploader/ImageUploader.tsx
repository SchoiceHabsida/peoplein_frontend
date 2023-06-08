import React, { useState, ChangeEvent } from 'react';

export const ImageUploader: React.FC<{ onChange: (file: File) => void }> = ({ onChange }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      onChange(event.target.files[0])
    }
  };

  return (
    <div className='w-full h-full absolute'>
      <input type="file" className='cursor-pointer absolute opacity-0 w-full h-full z-20' onChange={handleFileChange} />
      <div className='w-full h-full top-0 absolute z-10 overflow-hidden'>
        {selectedFile && (
          <img className='w-full h-full' src={URL.createObjectURL(selectedFile)} alt="Selected" />
        )}
      </div>
    </div>
  );
};
