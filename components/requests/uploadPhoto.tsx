const fs = require('fs');
const AWS = require('aws-sdk');
const sharp = require('sharp');

export default async function UploadPhoto(formidableFiles, photoKey) {
    /*
    This function takes in formidable file data, uploads it to the s3 bucket, then deletes the image data off of the server if the upload was successful.
    */
    try {
        // Validate file exists
        if (!formidableFiles.imageFile || !formidableFiles.imageFile[0]) {
            throw new Error("No image file provided");
        }

        const file = formidableFiles.imageFile[0];
        
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.mimetype)) {
            throw new Error(`Invalid file type: ${file.mimetype}. Only JPEG, JPG, PNG, and WebP are allowed.`);
        }

        //get the data of the image saved on the server
        const imageFilePath = file.filepath;
        
        // Read and process the image with sharp
        let imageBuffer;
        const originalImage = sharp(imageFilePath);
        const metadata = await originalImage.metadata();
        
        console.log(`Original image: ${metadata.width}x${metadata.height}, ${Math.round(file.size / 1024)}KB`);
        
        // Define max dimensions and quality settings
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        const JPEG_QUALITY = 80;
        
        // Resize if image is too large
        if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
            console.log('Resizing image...');
            imageBuffer = await originalImage
                .resize(MAX_WIDTH, MAX_HEIGHT, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .jpeg({ quality: JPEG_QUALITY }) // Convert to JPEG with compression
                .toBuffer();
        } else {
            // Optimize existing image without resizing
            console.log('Optimizing image without resizing...');
            imageBuffer = await originalImage
                .jpeg({ quality: JPEG_QUALITY })
                .toBuffer();
        }
        
        console.log(`Processed image size: ${Math.round(imageBuffer.length / 1024)}KB`);
        
        const imageData = imageBuffer;

        //establish connection with S3 using IAM role or access keys
        const s3Config: any = {
            apiVersion: '2006-03-01',
            region: process.env.S3_BUCKET_REGION || process.env.AWS_REGION
        };
                
        const s3 = new AWS.S3(s3Config);

        //Upload the image to S3
        const s3Response = await s3.putObject({
            Body: imageData,
            Bucket: "sophs-menu-imgs",
            Key: photoKey,
            ContentType: 'image/jpeg', // Always JPEG after processing
            ContentLength: imageData.length
        }).promise();

        //Delete the file from the server afterwards
        fs.unlink(imageFilePath, (err) => {
            if (err) {
                throw new Error("Error deleting file: ", err);
            } else {
                console.log("Successfully deleted file from server");
            }
        });

        return {status: "Success", response: s3Response};

    } catch(err){
        console.error("There was an error in image upload or server file deletion:", err)
        return {status: "Failure", response: null, err: err}
    }

};
