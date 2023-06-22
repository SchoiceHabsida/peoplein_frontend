import React, { useState, ChangeEvent, Fragment } from 'react';
import { ImageCropper } from '../image-cropper/ImageCropper';
import { UploadIcon } from '@/common/icons/UploadIcon';

export const ImageUploader: React.FC<{ onChange: (file: File) => void, imagePath?: string, aspect?: number }> = ({
  onChange, imagePath, aspect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [croppedFile, setCroppedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onCropped = (croppedFile: File) => {
    onChange(croppedFile)
    setCroppedFile(croppedFile)
    setSelectedFile(null)
  }

  return (<Fragment>
    {
      selectedFile && <ImageCropper file={selectedFile} onCropped={onCropped} aspect={aspect} />
    }
    <div className='w-full h-full relative  flex items-center justify-center'>
      <UploadIcon />
      <input type="file" accept="image/*" className='cursor-pointer absolute opacity-0 w-full h-full z-20'
        onChange={handleFileChange} />
      <div className='w-full h-full top-0 absolute z-10 overflow-hidden'>
        {(croppedFile || imagePath) && (
          <img className='w-full h-full'
            src={croppedFile ? URL.createObjectURL(croppedFile) : imagePath} alt="Selected" />
        )}
      </div>
    </div>
  </Fragment>
  );
};
