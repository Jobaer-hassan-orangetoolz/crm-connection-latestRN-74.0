import {
  CustomImagePicker,
  ImagePickerCommonOptions,
} from './imagePicker.package';
interface imagePickerInterface {
  success: (params: any) => void;
  failed: (params: any) => void;
  multiple?: ImagePickerCommonOptions['multiple'];
  mediaType?: 'photo' | 'video' | 'any';
}

class imagePicker {
  async openCamera({success, failed}: imagePickerInterface) {
    try {
      const image = await CustomImagePicker.openCamera({
        width: 300,
        height: 400,
        cropperCircleOverlay: true,
        useFrontCamera: true,
      });
      success(image);
    } catch (e) {
      failed(false);
    }
  }
  async openGallery({
    success,
    failed,
    multiple = false,
    mediaType = 'photo',
  }: imagePickerInterface) {
    try {
      const image = await CustomImagePicker.openPicker({
        multiple: multiple,
        cropperCircleOverlay: true,
        mediaType,
      });
      success(image);
    } catch (e) {
      failed(false);
    }
  }
}

export default new imagePicker();
