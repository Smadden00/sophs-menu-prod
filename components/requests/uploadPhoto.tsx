const fs = require('fs');
const AWS = require('aws-sdk');

export default async function UploadPhoto(formidableFiles, photoKey) {
    /*
    This function takes in formidable file data, uploads it to the s3 bucket, then deletes the image data off of the server if the upload was successful.
    */
    try {
        //get the data of the image saved on the server
        const imageFilePath = formidableFiles.imageFile[0].filepath;
        const imageData = await fs.promises.readFile(imageFilePath);

        //establish connection with S3 using IAM role or access keys
        const s3Config: any = {
            apiVersion: '2006-03-01',
            region: process.env.S3_BUCKET_REGION || process.env.AWS_REGION
        };
        
        // Only use access keys if not running on EC2 with IAM role
        if (process.env.S3_ACCESS_KEY && process.env.S3_SECRET_ACCESS_KEY) {
            s3Config.accessKeyId = process.env.S3_ACCESS_KEY;
            s3Config.secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
        }
        
        const s3 = new AWS.S3(s3Config);

        //Upload the image to S3
        const s3Response = await s3.putObject({
            Body: imageData,
            Bucket: "sophs-menu-bucket",
            Key: photoKey
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
