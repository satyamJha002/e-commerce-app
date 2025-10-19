import cloudinary from "./cloudinaryConfig.js";
import { Readable } from "stream";

/**
 * Upload a file buffer to Cloudinary
 * @param {Buffer} fileBuffer - The file buffer to upload
 * @param {Object} options - Upload options
 * @param {string} options.folder - Cloudinary folder name
 * @param {string} options.resource_type - Resource type (image, video, raw)
 * @param {string} options.public_id - Custom public ID
 * @param {Array} options.tags - Array of tags
 * @returns {Promise<Object>} Cloudinary upload result
 */

export const uploadToCloudinary = (fileBuffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "ecommerce-products",
        ...options,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    const readableStream = new Readable();
    readableStream.push(fileBuffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};

/**
 * Upload multiple files to Cloudinary
 * @param {Array} files - Array of file objects with buffer and originalname
 * @param {Object} options - Upload options
 * @returns {Promise<Array>} Array of upload results
 */

export const uploadMultipleToCloudinary = async (files, options = {}) => {
  try {
    const uploadPromises = files.map((file) =>
      uploadToCloudinary(file.buffer, {
        ...options,
        public_id: file.originalname.split(".")[0],
      })
    );

    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    throw new Error(`Failed to upload multiple files: ${error.message}`);
  }
};

/**
 * Delete file from Cloudinary
 * @param {string} publicId - Public ID of the file to delete
 * @param {Object} options - Delete options
 * @returns {Promise<Object>} Delete result
 */

export const deleteFromCloudinary = (publicId, options = {}) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, options, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

/**
 * Upload file from base64 string
 * @param {string} base64String - Base64 encoded file
 * @param {Object} options - Upload options
 * @returns {Promise<Object>} Upload result
 */

export const uploadBase64ToCloudinary = (base64String, options = {}) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      base64String,
      {
        resource_type: "auto",
        folder: "ecommerce-products",
        ...options,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

/**
 * Get Cloudinary resource info
 * @param {string} publicId - Public ID of the resource
 * @returns {Promise<Object>} Resource information
 */

export const getCloudinaryResource = (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.api.resource(publicId, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

/**
 * Generate optimized image URL with transformations
 * @param {string} publicId - Public ID of the image
 * @param {Object} transformations - Cloudinary transformations
 * @returns {string} Optimized image URL
 */

export const getOptimizedImageUrl = (publicId, transformations = {}) => {
  return cloudinary.url(publicId, {
    quality: "auto",
    fetch_format: "auto",
    ...transformations,
  });
};
