 'use client'
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  ImagePlus, 
  Upload, 
  X, 
  DollarSign,
  Coffee,
  Utensils,
  IceCream,
  Wine,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { localUrl } from '../components/Url';

// Category configuration with icons and colors
const categoryConfig = {
  appetizer: {
    icon: <Utensils className="w-5 h-5" />,
    color: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  main: {
    icon: <Utensils className="w-5 h-5" />,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  dessert: {
    icon: <IceCream className="w-5 h-5" />,
    color: 'bg-pink-50 text-pink-700 border-pink-200'
  },
  beverage: {
    icon: <Coffee className="w-5 h-5" />,
    color: 'bg-purple-50 text-purple-700 border-purple-200'
  }
};

const MenuItemForm = () => {
  // State management
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Handle file drop
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles[0]) {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size should be less than 10MB');
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setFormData(prev => ({ ...prev, image: file }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: false
  });

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.category) newErrors.category = 'Category is required';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        let requestBody;
        let headers = {};
  
        // Check if we have a file image or an image URL
        const hasFileImage = formData.image instanceof File;
        const hasImageUrl = typeof formData.image === 'string' && formData.image.trim() !== '';
  
        if (hasFileImage) {
          // If we have a file image, use FormData
          requestBody = new FormData();
          Object.keys(formData).forEach(key => {
            requestBody.append(key, formData[key]);
          });
          // No need to set Content-Type header for FormData
        } else {
          // If we have an image URL or no image, use JSON
          requestBody = JSON.stringify({
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            category: formData.category,
            image: hasImageUrl ? formData.image : null, // Include image URL if exists
            imageType: hasImageUrl ? 'url' : null // Indicate the image type for backend
          });
          headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          };
        }
  
        const response = await fetch(`${localUrl}/api/menu`, {
          method: 'POST',
          headers,
          body: requestBody,
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.message)
          throw new Error(errorData.message || 'Failed to add menu item');
        }
  
        const result = await response.json();
        toast.success('Menu item added successfully!');
        
        // Reset form
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          image: ''
        });
        setPreviewImage(null);
        setSelectedCategory(null);
        
      } catch (error) {
        console.error('Submission error:', error);
        alert(error.message)
        toast.error(error.message || 'Something went wrong');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
      toast.error('Please fill all required fields');
    }
  };
  

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle image removal
  const handleImageRemove = () => {
    setPreviewImage(null);
    setFormData(prev => ({ ...prev, image: '' }));
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mx-auto max-w-4xl">
        {/* Form Card */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12 overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-bold text-3xl text-white">Add New Menu Item</h2>
              <p className="mt-2 text-blue-100">
                Create a new delicious item for your menu
              </p>
            </div>
            <div className="top-0 right-0 absolute opacity-10 w-1/2 h-full">
              <Utensils className="w-full h-full" />
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-8 p-8">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="flex items-center gap-2 font-medium text-gray-700 text-sm">
                Item Name
                {errors.name && (
                  <span className="flex items-center gap-1 text-red-500 text-xs">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </span>
                )}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.name 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                } focus:ring-2 focus:border-transparent transition-all duration-200`}
                placeholder="Enter item name"
              />
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label htmlFor="description" className="flex items-center gap-2 font-medium text-gray-700 text-sm">
                Description
                {errors.description && (
                  <span className="flex items-center gap-1 text-red-500 text-xs">
                    <AlertCircle className="w-3 h-3" /> {errors.description}
                  </span>
                )}
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.description 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                } focus:ring-2 focus:border-transparent transition-all duration-200`}
                placeholder="Describe your menu item..."
              />
            </div>

            {/* Price and Category */}
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
              {/* Price Field */}
              <div className="space-y-2">
                <label htmlFor="price" className="flex items-center gap-2 font-medium text-gray-700 text-sm">
                  Price
                  {errors.price && (
                    <span className="flex items-center gap-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3" /> {errors.price}
                    </span>
                  )}
                </label>
                <div className="relative">
                  <div className="left-0 absolute inset-y-0 flex items-center pl-4 pointer-events-none">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      errors.price 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500'
                    } focus:ring-2 focus:border-transparent transition-all duration-200`}
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Category Selection */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-medium text-gray-700 text-sm">
                  Category
                  {errors.category && (
                    <span className="flex items-center gap-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3" /> {errors.category}
                    </span>
                  )}
                </label>
                <div className="gap-2 grid grid-cols-2">
                  {Object.entries(categoryConfig).map(([key, { icon, color }]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, category: key }));
                        setSelectedCategory(key);
                      }}
                      className={`flex items-center gap-2 p-3 rounded-lg border transition-all duration-200 ${
                        selectedCategory === key
                          ? `${color} border-2`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {icon}
                      <span className="capitalize">{key}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <label className="font-medium text-gray-700 text-sm">Item Image</label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                  isDragActive
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input {...getInputProps()} />
                <div className="space-y-4">
                  <div className="flex justify-center items-center bg-blue-50 mx-auto rounded-full w-16 h-16">
                    <Upload className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-gray-500 text-sm">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* Image Preview */}
              {previewImage && (
                <div className="inline-block relative">
                  <div className="relative shadow-md rounded-lg overflow-hidden">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-48 h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleImageRemove}
                      className="top-2 right-2 absolute bg-white hover:bg-gray-100 shadow-lg p-1.5 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-lg text-white font-medium transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Adding Item...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Add Menu Item
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MenuItemForm;