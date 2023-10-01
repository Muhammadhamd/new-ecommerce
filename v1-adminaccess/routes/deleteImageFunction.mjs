import admin from 'firebase-admin'
// Your Firebase Storage bucket name (replace with your actual bucket name)
import firebaseConfig from '../../firebaseConfig.mjs';
admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    storageBucket: "gs://yacht-ecommerce.appspot.com",
  });

    const bucket = admin.storage().bucket();
    // Function to delete an image from Firebase Storage
async function deleteImageFromStorage(filePath) {
  try {
    // Get a reference to the Firebase Storage bucket

    // Define the file path to the image you want to delete
    const file = bucket.file(filePath);

    // Check if the file exists
    const exists = await file.exists();

    if (exists[0]) {
      // If the file exists, delete it
      await file.delete();
      console.log(`Image at ${filePath} deleted from Firebase Storage.`);
    } else {
      console.log(`Image at ${filePath} not found in Firebase Storage.`);
    }
  } catch (error) {
    console.error('Error deleting image from Firebase Storage:', error);
  }
}

export default deleteImageFromStorage