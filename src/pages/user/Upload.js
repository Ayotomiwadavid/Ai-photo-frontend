"use client"

import { useState } from "react"
import ImageUploader from "../../components/ImageUploader"

const UserUpload = () => {
  const [selectedImages, setSelectedImages] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleImagesSelected = (images) => {
    setSelectedImages(images)
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setSelectedImages([])

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    }, 2000)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Upload Photos</h1>

      {isSuccess && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6"
          role="alert"
        >
          <strong className="font-bold">Success! </strong>
          <span className="block sm:inline">
            Your photos have been uploaded and sent for processing. You'll receive a notification when your AI-generated
            photos are ready.
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ImageUploader onImagesSelected={handleImagesSelected} />
        </div>

        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Upload Guidelines</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Upload clear, high-quality images for best results</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Maximum file size: 10MB per image</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Supported formats: JPG, PNG, JPEG</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Be specific in your description for better results</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Processing time may vary depending on request volume</span>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-purple-50 rounded-md">
              <h4 className="font-medium text-purple-800 mb-2">How it works</h4>
              <ol className="space-y-2 text-gray-600 list-decimal list-inside">
                <li>Upload your photos and provide a description</li>
                <li>Our team receives your request</li>
                <li>We generate AI photos based on your requirements</li>
                <li>You receive a notification when your photos are ready</li>
                <li>View and download your AI-generated photos</li>
              </ol>
            </div>

            <button
              onClick={handleSubmit}
              disabled={selectedImages.length === 0 || isSubmitting}
              className={`mt-6 w-full btn-primary ${selectedImages.length === 0 || isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? "Uploading..." : "Submit Request"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserUpload

