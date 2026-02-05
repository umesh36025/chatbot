const axios = require('axios');

class CropEyeAPI {
  constructor(baseURL, apiKey) {
    this.baseURL = baseURL || process.env.CROPEYE_API_BASE;
    this.apiKey = apiKey || process.env.CROPEYE_API_KEY;
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
  }

  // Fetch crop-specific data from CropEye platform
  async getCropData(cropName, location = null) {
    try {
      const params = { crop: cropName };
      if (location) params.location = location;

      const response = await this.client.get('/crops/data', { params });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('CropEye API - Crop data error:', error.message);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }

  // Fetch soil analysis data
  async getSoilData(location, coordinates = null) {
    try {
      const params = { location };
      if (coordinates) {
        params.lat = coordinates.lat;
        params.lon = coordinates.lon;
      }

      const response = await this.client.get('/soil/analysis', { params });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('CropEye API - Soil data error:', error.message);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }

  // Fetch weather-based recommendations
  async getWeatherRecommendations(location, cropType = null) {
    try {
      const params = { location };
      if (cropType) params.crop = cropType;

      const response = await this.client.get('/weather/recommendations', { params });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('CropEye API - Weather recommendations error:', error.message);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }

  // Fetch pest and disease information
  async getPestDiseaseData(cropName, symptoms = null) {
    try {
      const params = { crop: cropName };
      if (symptoms) params.symptoms = symptoms;

      const response = await this.client.get('/pest-disease/data', { params });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('CropEye API - Pest/Disease data error:', error.message);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }

  // Fetch irrigation recommendations
  async getIrrigationAdvice(cropName, soilType, location) {
    try {
      const params = { 
        crop: cropName,
        soilType: soilType,
        location: location
      };

      const response = await this.client.get('/irrigation/advice', { params });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('CropEye API - Irrigation advice error:', error.message);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }

  // Fetch fertilizer recommendations
  async getFertilizerRecommendations(cropName, soilTestResults, targetYield = null) {
    try {
      const payload = {
        crop: cropName,
        soilTest: soilTestResults
      };
      if (targetYield) payload.targetYield = targetYield;

      const response = await this.client.post('/fertilizer/recommendations', payload);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('CropEye API - Fertilizer recommendations error:', error.message);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }

  // Fetch market prices and trends
  async getMarketData(cropName, location) {
    try {
      const params = { 
        crop: cropName,
        location: location
      };

      const response = await this.client.get('/market/prices', { params });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('CropEye API - Market data error:', error.message);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }

  // Submit user feedback and data
  async submitFeedback(userId, cropName, feedback, rating) {
    try {
      const payload = {
        userId: userId,
        crop: cropName,
        feedback: feedback,
        rating: rating,
        timestamp: new Date().toISOString()
      };

      const response = await this.client.post('/feedback/submit', payload);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('CropEye API - Feedback submission error:', error.message);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }

  // Get farming calendar for location and crops
  async getFarmingCalendar(location, crops = []) {
    try {
      const params = { location };
      if (crops.length > 0) params.crops = crops.join(',');

      const response = await this.client.get('/calendar/farming', { params });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('CropEye API - Farming calendar error:', error.message);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }

  // Health check for CropEye API
  async healthCheck() {
    try {
      const response = await this.client.get('/health');
      return {
        success: true,
        status: response.data.status || 'healthy',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('CropEye API - Health check error:', error.message);
      return {
        success: false,
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}

// Mock data for development/testing when CropEye API is not available
const mockCropEyeData = {
  cropData: {
    rice: {
      variety: 'Basmati',
      plantingTime: 'June-July',
      harvestTime: 'November-December',
      yield: '4-6 tons/hectare',
      marketPrice: '₹2000-2500/quintal'
    },
    wheat: {
      variety: 'HD-2967',
      plantingTime: 'November-December',
      harvestTime: 'April-May',
      yield: '3-5 tons/hectare',
      marketPrice: '₹1800-2200/quintal'
    }
  },
  soilData: {
    ph: 6.5,
    organicMatter: 2.1,
    nitrogen: 'Medium',
    phosphorus: 'Low',
    potassium: 'High',
    recommendations: ['Add phosphorus fertilizer', 'Maintain organic matter']
  },
  weatherRecommendations: {
    irrigation: 'Increase frequency due to high temperature',
    protection: 'Use shade nets during peak hours',
    timing: 'Avoid field operations during 11 AM - 3 PM'
  }
};

// Factory function to create CropEye API instance
function createCropEyeAPI(config = {}) {
  return new CropEyeAPI(config.baseURL, config.apiKey);
}

module.exports = {
  CropEyeAPI,
  createCropEyeAPI,
  mockCropEyeData
};