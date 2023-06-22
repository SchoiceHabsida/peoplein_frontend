import React, { useState, useRef, FC, useEffect } from 'react'

import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
} from 'react-image-crop'
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'
import './styles.css'

import 'react-image-crop/dist/ReactCrop.css'

function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

interface IImageCropperProps {
    file: File
    onCropped: (file: File) => void,
    aspect?: number
}

export const ImageCropper: FC<IImageCropperProps> = ({ file, onCropped, aspect = 4 / 4 }) => {
    const [imgSrc, setImgSrc] = useState('')
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const [crop, setCrop] = useState<Crop>()
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)

    useEffect(() => {
        if (file) {
            setImgSrc(URL.createObjectURL(file) || '')
        }
    }, [file])

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    }

    function onDownloadCropClick() {
        if (!previewCanvasRef.current) {
            throw new Error('Crop canvas does not exist')
        }

        previewCanvasRef.current.toBlob((blob) => {
            if (!blob) {
                throw new Error('Failed to create blob')
            }
            onCropped(new File([blob], file.name))
        })
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    scale,
                    rotate,
                )
            }
        },
        100,
        [completedCrop, scale, rotate],
    )
    return (
        <div className="image-cropper position absolute z-50 top-0 overflow-hidden 
        h-screen w-screen left-0 flex justify-center pt-5">
            <div className='cropper-content opacity-1 bg-white p-4 flex items-center flex-col justify-center gap-4'>
                {!!imgSrc && (
                    <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspect}
                    >
                        <img
                            className='crop-image'
                            ref={imgRef}
                            alt="Crop me"
                            src={imgSrc}
                            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` , maxHeight: '450px', maxWidth: '480px'}}
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>
                )}

                {!!completedCrop && (
                    <>
                        <div className='hidden'>
                            <canvas
                                ref={previewCanvasRef}
                                style={{
                                    border: '1px solid black',
                                    objectFit: 'contain',
                                    width: completedCrop.width,
                                    height: completedCrop.height,
                                }}
                            />
                        </div>
                    </>
                )}
                <div className="Crop-Controls">
                    <div>
                        <button type='button' onClick={onDownloadCropClick}>Crop Image</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
