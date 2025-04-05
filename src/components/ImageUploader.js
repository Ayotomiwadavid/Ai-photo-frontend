"use client"

import { useState } from "react"
import { XIcon } from "@heroicons/react/solid"

const ImageUploader = ({ onImagesSelected }) => {
  const [selectedImages, setSelectedImages] = useState([])
  const [previewImages, setPreviewImages] = useState([])
  const [description, setDescription] = useState("")
  const [imageType, setImageType] = useState("portrait")

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)

      // Create preview URLs
      const imagePreviewUrls = filesArray.map((file) => URL.createObjectURL(file))

      setSelectedImages([...selectedImages, ...filesArray])
      setPreviewImages([...previewImages, ...imagePreviewUrls])

      // Pass the selected images to the parent component
      onImagesSelected([...selectedImages, ...filesArray])
    }
  }

  const removeImage = (index) => {
    // Remove the image from the arrays
    const newSelectedImages = [...selectedImages]
    const newPreviewImages = [...previewImages]

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviewImages[index])

    newSelectedImages.splice(index, 1)
    newPreviewImages.splice(index, 1)

    setSelectedImages(newSelectedImages)
    setPreviewImages(newPreviewImages)

    // Pass the updated selected images to the parent component
    onImagesSelected(newSelectedImages)
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Upload Your Images</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Image Type</label>
        <select value={imageType} onChange={(e) => setImageType(e.target.value)} className="input-field">
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
          <option value="product">Product</option>
          <option value="artistic">Artistic</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description (What kind of AI images do you want?)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field min-h-[100px]"
          placeholder="Describe what kind of AI-generated images you want..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 10 MB each)</p>
            </div>
            <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageChange} />
          </label>
        </div>
      </div>

      {previewImages.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Images ({previewImages.length})</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {previewImages.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Preview ${index}`}
                  className="h-24 w-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <button type="button" className="btn-primary w-full" disabled={selectedImages.length === 0 || !description}>
          Submit Request
        </button>
      </div>
    </div>
  )
}

export default ImageUploader

