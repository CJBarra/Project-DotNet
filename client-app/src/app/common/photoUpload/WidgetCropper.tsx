import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

interface IProps {
  setImage: (file: Blob) => void;
  imagePreview: string;
}

const WidgetCropper: React.FC<IProps> = ({ setImage, imagePreview }) => {
  const cropperRef = useRef<Cropper>(null);

  const cropImage = () => {
    if (
      cropperRef.current &&
      typeof cropperRef.current.getCroppedCanvas() === "undefined"
    ) {
      return;
    }

    cropperRef &&
      cropperRef.current &&
      cropperRef.current.getCroppedCanvas().toBlob((blob: any) => {
        setImage(blob);
      }, "image/jpeg");
  };

  return (
    <Cropper
      ref={cropperRef}
      src={imagePreview}
      style={{ height: 200, width: "100%" }}
      //Cropper.js options
      aspectRatio={1 / 1}
      preview=".img-preview"
      guides={false}
      viewMode={1}
      dragMode="move"
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={cropImage}
    />
  );
};
export default WidgetCropper;
