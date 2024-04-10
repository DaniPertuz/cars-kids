import { ImagePickerResponse } from 'react-native-image-picker';
import sha1 from 'sha1';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '@env';

const headers = {
    'Content-Type': 'multipart/form-data'
};

export const useCloudinaryOperation = () => {

    const handleUpdateCloudinaryPic = async (data: ImagePickerResponse, deleteExisting: boolean = false, existingImg: string | undefined = undefined): Promise<string[]> => {

        try {
            let pics: string[] = [];

            if (deleteExisting && existingImg) {
                await deleteCloudinaryPic(existingImg);
            }

            for (let i = 0; i < data.assets!.length; i++) {
                const element = data.assets![i];
                const { uri, type, fileName } = element;

                const fileToUpload = {
                    uri,
                    type,
                    name: fileName
                };
                const uploadData = new FormData();
                uploadData.append('file', fileToUpload);
                uploadData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

                const upload = await fetch('https://api.cloudinary.com/v1_1/dpertuzo/upload', {
                    method: 'POST',
                    headers,
                    body: uploadData
                });

                const { secure_url } = await upload.json();

                pics.push(secure_url);
            }

            return pics;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const deleteCloudinaryPic = async (img: string) => {
        try {
            const nameArr = img.split('/');
            const name = nameArr[nameArr.length - 1];
            const [public_id] = name.split('.');

            const timestamp = new Date().getTime();
            const image = `public_id=${public_id}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
            const signature = sha1(image);
            const destroyData = new FormData();

            destroyData.append('public_id', public_id);
            destroyData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
            destroyData.append('api_key', CLOUDINARY_API_KEY);
            destroyData.append('cloud_name', CLOUDINARY_CLOUD_NAME);
            destroyData.append('signature', signature);
            destroyData.append('timestamp', timestamp);

            await fetch('https://api.cloudinary.com/v1_1/dpertuzo/image/destroy', {
                method: 'POST',
                headers,
                body: destroyData
            });
        } catch (error) {
            console.error(error);
        }
    };

    return {
        handleUpdateCloudinaryPic,
        deleteCloudinaryPic
    };
};
