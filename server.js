const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('client/build'));

// Weather API configuration
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_BASE = 'https://api.openweathermap.org/data/2.5';

// Farming knowledge base
const farmingKnowledge = {
  waterRequirements: {
    rice: { amount: '1500-2000mm', frequency: 'Daily flooding', season: 'Monsoon' },
    wheat: { amount: '450-650mm', frequency: '7-10 days', season: 'Winter' },
    corn: { amount: '500-800mm', frequency: '5-7 days', season: 'Summer' },
    tomato: { amount: '400-600mm', frequency: '2-3 days', season: 'All seasons' },
    potato: { amount: '500-700mm', frequency: '7-10 days', season: 'Winter' }
  },
  soilTypes: {
    clay: { ph: '6.0-7.0', drainage: 'Poor', crops: ['rice', 'wheat'] },
    sandy: { ph: '6.0-7.5', drainage: 'Excellent', crops: ['potato', 'carrot'] },
    loam: { ph: '6.0-7.0', drainage: 'Good', crops: ['tomato', 'corn', 'beans'] },
    silt: { ph: '6.5-7.5', drainage: 'Moderate', crops: ['wheat', 'barley'] }
  }
};

// Import utilities
const { farmingDatabase, weatherRecommendations } = require('./utils/farmingData');

// Enhanced farming knowledge with more comprehensive data
const enhancedFarmingKnowledge = {
  ...farmingDatabase,
  
  // Weather simulation data for different locations
  weatherPatterns: {
    'delhi': { temp: 28, humidity: 65, rainfall: 'Moderate', season: 'Summer' },
    'mumbai': { temp: 32, humidity: 85, rainfall: 'High', season: 'Monsoon' },
    'bangalore': { temp: 24, humidity: 70, rainfall: 'Low', season: 'Pleasant' },
    'chennai': { temp: 35, humidity: 80, rainfall: 'Moderate', season: 'Hot' },
    'kolkata': { temp: 30, humidity: 75, rainfall: 'High', season: 'Humid' },
    'pune': { temp: 26, humidity: 60, rainfall: 'Low', season: 'Moderate' },
    'hyderabad': { temp: 29, humidity: 65, rainfall: 'Low', season: 'Dry' },
    'ahmedabad': { temp: 33, humidity: 55, rainfall: 'Very Low', season: 'Arid' }
  },

  // Comprehensive crop calendar
  cropCalendar: {
    rice: {
      kharif: { sowing: 'June-July', harvesting: 'October-November' },
      rabi: { sowing: 'November-December', harvesting: 'April-May' }
    },
    wheat: { sowing: 'November-December', harvesting: 'March-April' },
    corn: { 
      kharif: { sowing: 'June-July', harvesting: 'September-October' },
      rabi: { sowing: 'January-February', harvesting: 'May-June' }
    },
    tomato: { 
      summer: { sowing: 'January-February', harvesting: 'April-May' },
      monsoon: { sowing: 'June-July', harvesting: 'September-October' },
      winter: { sowing: 'September-October', harvesting: 'December-January' }
    },
    potato: { sowing: 'October-November', harvesting: 'February-March' }
  },

  // Market prices (simulated)
  marketPrices: {
    rice: '₹2000-2500/quintal',
    wheat: '₹1800-2200/quintal',
    corn: '₹1500-2000/quintal',
    tomato: '₹800-1500/quintal',
    potato: '₹600-1200/quintal'
  }
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'CropEye Agentic AI Chatbot is running',
    services: {
      server: 'healthy',
      knowledgeBase: 'loaded',
      weatherAPI: WEATHER_API_KEY ? 'configured' : 'using simulated data',
      crops: Object.keys(enhancedFarmingKnowledge.crops).length,
      locations: Object.keys(enhancedFarmingKnowledge.weatherPatterns).length
    },
    timestamp: new Date().toISOString()
  });
});

// Get farming knowledge base
app.get('/api/knowledge/:category', (req, res) => {
  const { category } = req.params;
  
  switch (category) {
    case 'crops':
      res.json(enhancedFarmingKnowledge.crops);
      break;
    case 'soils':
      res.json(enhancedFarmingKnowledge.soilTypes);
      break;
    case 'pests':
      res.json(enhancedFarmingKnowledge.pests);
      break;
    case 'diseases':
      res.json(enhancedFarmingKnowledge.diseases);
      break;
    case 'calendar':
      res.json(enhancedFarmingKnowledge.cropCalendar);
      break;
    case 'prices':
      res.json(enhancedFarmingKnowledge.marketPrices);
      break;
    default:
      res.status(404).json({ error: 'Category not found' });
  }
});

// Get crop-specific information
app.get('/api/crops/:cropName', (req, res) => {
  const { cropName } = req.params;
  const { location } = req.query;
  
  const cropData = enhancedFarmingKnowledge.crops[cropName.toLowerCase()];
  const locationWeather = location ? enhancedFarmingKnowledge.weatherPatterns[location.toLowerCase()] : null;
  const cropCalendar = enhancedFarmingKnowledge.cropCalendar[cropName.toLowerCase()];
  const marketPrice = enhancedFarmingKnowledge.marketPrices[cropName.toLowerCase()];
  
  if (!cropData) {
    return res.status(404).json({ error: 'Crop information not found' });
  }
  
  const response = {
    crop: cropName,
    location: location || 'General',
    data: cropData,
    calendar: cropCalendar,
    marketPrice: marketPrice,
    locationWeather: locationWeather,
    source: 'Built-in Knowledge Base',
    timestamp: new Date().toISOString()
  };
  
  res.json(response);
});

// Weather endpoint for frontend widget with live data
app.get('/api/weather', async (req, res) => {
  const { location } = req.query;
  
  if (!location) {
    return res.status(400).json({ error: 'Location parameter required' });
  }
  
  try {
    // Try to get live weather data first
    const liveWeatherData = await fetchLiveWeatherData(location);
    
    if (liveWeatherData) {
      return res.json(liveWeatherData);
    }
    
    // Fallback to simulated data if API fails
    const simulatedData = getWeatherData(location);
    if (simulatedData) {
      return res.json({
        ...simulatedData,
        source: 'simulated',
        note: 'Live weather data unavailable, showing simulated data'
      });
    }
    
    return res.status(404).json({ error: 'Weather data not available for this location' });
    
  } catch (error) {
    console.error('Weather API error:', error);
    
    // Fallback to simulated data on error
    const simulatedData = getWeatherData(location);
    if (simulatedData) {
      return res.json({
        ...simulatedData,
        source: 'simulated',
        note: 'Live weather API error, showing simulated data'
      });
    }
    
    return res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Main chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, location, cropType } = req.body;
    
    // Analyze user intent
    const intent = await analyzeIntent(message);
    
    let response = '';
    let additionalData = {};

    switch (intent.type) {
      case 'water_requirements':
        response = await handleWaterQuery(intent.crop, location);
        additionalData = getIrrigationData(intent.crop, location);
        break;
      case 'soil_information':
        response = await handleSoilQuery(intent.crop, location);
        additionalData = getSoilData(location);
        break;
      case 'weather_information':
        response = await handleWeatherQuery(location);
        additionalData = getWeatherData(location);
        break;
      case 'crop_advice':
        response = await handleCropAdvice(intent.crop, location);
        additionalData = getCropData(intent.crop);
        break;
      case 'pest_management':
        response = await handlePestQuery(intent.crop, message);
        additionalData = getPestData(intent.crop);
        break;
      case 'disease_management':
        response = await handleDiseaseQuery(intent.crop, message);
        break;
      case 'fertilizer_advice':
        response = await handleFertilizerQuery(intent.crop, location);
        break;
      case 'seasonal_planning':
        response = await handleSeasonalQuery(location, intent.crop);
        additionalData = getSeasonalData(location);
        break;
      default:
        response = await handleGeneralQuery(message, location, intent.crop);
    }

    res.json({
      response,
      intent: intent.type,
      additionalData,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process your request' });
  }
});

// Enhanced intent analysis using pattern matching and keywords
async function analyzeIntent(message) {
  const msg = message.toLowerCase();
  
  // Intent classification based on keywords
  let intent = { type: 'general', crop: null, location: null, urgency: 'low', confidence: 0.8 };
  
  // Water-related keywords
  if (msg.includes('water') || msg.includes('irrigation') || msg.includes('watering') || 
      msg.includes('drought') || msg.includes('flood') || msg.includes('moisture')) {
    intent.type = 'water_requirements';
    intent.confidence = 0.9;
  }
  
  // Soil-related keywords
  else if (msg.includes('soil') || msg.includes('ph') || msg.includes('nutrient') || 
           msg.includes('fertilizer') || msg.includes('compost') || msg.includes('organic matter')) {
    if (msg.includes('fertilizer') || msg.includes('nutrient') || msg.includes('npk')) {
      intent.type = 'fertilizer_advice';
    } else {
      intent.type = 'soil_information';
    }
    intent.confidence = 0.9;
  }
  
  // Weather-related keywords
  else if (msg.includes('weather') || msg.includes('climate') || msg.includes('temperature') || 
           msg.includes('rain') || msg.includes('humidity') || msg.includes('season')) {
    intent.type = 'weather_information';
    intent.confidence = 0.9;
  }
  
  // Pest-related keywords
  else if (msg.includes('pest') || msg.includes('insect') || msg.includes('bug') || 
           msg.includes('aphid') || msg.includes('caterpillar') || msg.includes('control')) {
    intent.type = 'pest_management';
    intent.confidence = 0.9;
  }
  
  // Disease-related keywords
  else if (msg.includes('disease') || msg.includes('fungus') || msg.includes('blight') || 
           msg.includes('rot') || msg.includes('wilt') || msg.includes('spot')) {
    intent.type = 'disease_management';
    intent.confidence = 0.9;
  }
  
  // Seasonal/timing keywords
  else if (msg.includes('when') || msg.includes('time') || msg.includes('season') || 
           msg.includes('plant') || msg.includes('sow') || msg.includes('harvest')) {
    intent.type = 'seasonal_planning';
    intent.confidence = 0.85;
  }
  
  // General crop advice
  else if (msg.includes('grow') || msg.includes('cultivation') || msg.includes('farming') || 
           msg.includes('crop') || msg.includes('yield') || msg.includes('production')) {
    intent.type = 'crop_advice';
    intent.confidence = 0.8;
  }
  
  // Extract crop names
  const crops = ['rice', 'wheat', 'corn', 'tomato', 'potato', 'cotton', 'sugarcane', 'onion', 'garlic', 'beans'];
  for (const crop of crops) {
    if (msg.includes(crop)) {
      intent.crop = crop;
      intent.confidence += 0.1;
      break;
    }
  }
  
  // Extract location
  const locations = ['delhi', 'mumbai', 'bangalore', 'chennai', 'kolkata', 'pune', 'hyderabad', 'ahmedabad'];
  for (const location of locations) {
    if (msg.includes(location)) {
      intent.location = location;
      intent.confidence += 0.05;
      break;
    }
  }
  
  // Determine urgency
  if (msg.includes('urgent') || msg.includes('emergency') || msg.includes('dying') || 
      msg.includes('help') || msg.includes('problem')) {
    intent.urgency = 'high';
  } else if (msg.includes('soon') || msg.includes('quickly') || msg.includes('asap')) {
    intent.urgency = 'medium';
  }
  
  return intent;
}

// Water requirements handler
async function handleWaterQuery(crop, location) {
  let response = "Here's comprehensive water management advice:\n\n";
  
  if (crop && enhancedFarmingKnowledge.crops[crop.toLowerCase()]) {
    const waterInfo = enhancedFarmingKnowledge.crops[crop.toLowerCase()].waterRequirement;
    response += `**${crop.toUpperCase()} Water Requirements:**\n`;
    response += `• Amount: ${waterInfo.amount} per season\n`;
    response += `• Frequency: ${waterInfo.frequency}\n`;
    response += `• Critical periods: ${waterInfo.criticalPeriods.join(', ')}\n\n`;
  }

  // Add location-specific advice if available
  if (location && enhancedFarmingKnowledge.weatherPatterns[location.toLowerCase()]) {
    const weatherData = enhancedFarmingKnowledge.weatherPatterns[location.toLowerCase()];
    response += `**Current conditions in ${location}:**\n`;
    response += `• Temperature: ${weatherData.temp}°C\n`;
    response += `• Humidity: ${weatherData.humidity}%\n`;
    response += `• Rainfall: ${weatherData.rainfall}\n`;
    response += `• Season: ${weatherData.season}\n\n`;
    
    // Weather-based recommendations
    if (weatherData.temp > 30) {
      response += "**Heat Stress Management:**\n";
      response += "• Increase irrigation frequency by 20-30%\n";
      response += "• Water early morning (5-7 AM) or evening (6-8 PM)\n";
      response += "• Apply mulch to reduce evaporation\n\n";
    }
    
    if (weatherData.humidity > 80) {
      response += "**High Humidity Precautions:**\n";
      response += "• Reduce irrigation frequency slightly\n";
      response += "• Ensure good drainage to prevent waterlogging\n";
      response += "• Monitor for fungal diseases\n\n";
    }
  }

  response += "**General Irrigation Best Practices:**\n";
  response += "• Check soil moisture before watering\n";
  response += "• Use drip irrigation for water efficiency\n";
  response += "• Maintain consistent moisture levels\n";
  response += "• Avoid watering during peak sun hours\n";

  return response;
}

// Soil information handler
async function handleSoilQuery(crop, location) {
  let response = "Here's comprehensive soil management advice:\n\n";
  
  // General soil testing recommendations
  response += "**Soil Testing Recommendations:**\n";
  response += "• Test pH levels (ideal range: 6.0-7.5 for most crops)\n";
  response += "• Check nitrogen, phosphorus, potassium levels\n";
  response += "• Assess organic matter content (should be >2%)\n";
  response += "• Evaluate drainage capacity and soil structure\n";
  response += "• Test for micronutrients (zinc, iron, manganese)\n\n";

  if (crop && enhancedFarmingKnowledge.crops[crop.toLowerCase()]) {
    const soilReq = enhancedFarmingKnowledge.crops[crop.toLowerCase()].soilRequirements;
    response += `**Soil Requirements for ${crop.toUpperCase()}:**\n`;
    response += `• Preferred soil types: ${soilReq.type.join(', ')}\n`;
    response += `• Optimal pH range: ${soilReq.ph}\n`;
    response += `• Drainage requirement: ${soilReq.drainage}\n`;
    response += `• Organic matter: ${soilReq.organicMatter}\n\n`;
  }

  // Soil improvement recommendations
  response += "**Soil Improvement Strategies:**\n";
  response += "• Add compost or well-rotted manure annually\n";
  response += "• Practice crop rotation to maintain soil health\n";
  response += "• Use cover crops during fallow periods\n";
  response += "• Avoid over-tillage to preserve soil structure\n";
  response += "• Apply lime if soil is too acidic (pH < 6.0)\n";
  response += "• Add sulfur if soil is too alkaline (pH > 7.5)\n";

  return response;
}

// Fetch live weather data from OpenWeatherMap API
async function fetchLiveWeatherData(location) {
  if (!WEATHER_API_KEY) {
    console.log('Weather API key not configured, using simulated data');
    return null;
  }

  try {
    const response = await axios.get(`${WEATHER_API_BASE}/weather`, {
      params: {
        q: location,
        appid: WEATHER_API_KEY,
        units: 'metric'
      },
      timeout: 5000
    });

    const data = response.data;
    
    return {
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      visibility: data.visibility ? Math.round(data.visibility / 1000) : 10, // Convert m to km
      description: data.weather[0].description,
      condition: data.weather[0].main,
      pressure: data.main.pressure,
      feelsLike: Math.round(data.main.feels_like),
      rainfall: data.rain ? data.rain['1h'] || 0 : 0,
      cloudiness: data.clouds.all,
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
      location: data.name,
      country: data.sys.country,
      source: 'live',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Live weather API error:', error.message);
    return null;
  }
}

// Enhanced weather information handler with live data
async function handleWeatherQuery(location) {
  let response = "Here's current weather information and farming recommendations:\n\n";
  
  try {
    // Try to get live weather data
    const liveWeather = await fetchLiveWeatherData(location);
    
    if (liveWeather) {
      response += `**Live Weather for ${liveWeather.location}, ${liveWeather.country}:**\n`;
      response += `• Current Temperature: ${liveWeather.temperature}°C (feels like ${liveWeather.feelsLike}°C)\n`;
      response += `• Condition: ${liveWeather.description}\n`;
      response += `• Humidity: ${liveWeather.humidity}%\n`;
      response += `• Wind Speed: ${liveWeather.windSpeed} km/h\n`;
      response += `• Visibility: ${liveWeather.visibility} km\n`;
      response += `• Pressure: ${liveWeather.pressure} hPa\n`;
      response += `• Cloudiness: ${liveWeather.cloudiness}%\n`;
      if (liveWeather.rainfall > 0) {
        response += `• Rainfall: ${liveWeather.rainfall} mm/h\n`;
      }
      response += `• Sunrise: ${liveWeather.sunrise}\n`;
      response += `• Sunset: ${liveWeather.sunset}\n\n`;
      
      // Add farming advice based on live weather
      response += "**Farming Recommendations Based on Current Conditions:**\n";
      
      if (liveWeather.temperature > 32) {
        response += "• **High Temperature Alert:**\n";
        response += "  - Increase irrigation frequency by 20-30%\n";
        response += "  - Use shade nets for sensitive crops\n";
        response += "  - Avoid field operations during 11 AM - 3 PM\n";
        response += "  - Apply mulch to conserve soil moisture\n\n";
      } else if (liveWeather.temperature < 10) {
        response += "• **Cold Weather Precautions:**\n";
        response += "  - Protect sensitive crops from frost\n";
        response += "  - Reduce irrigation frequency\n";
        response += "  - Use row covers or tunnels\n";
        response += "  - Delay planting of warm-season crops\n\n";
      }
      
      if (liveWeather.humidity > 80) {
        response += "• **High Humidity Management:**\n";
        response += "  - Monitor for fungal diseases\n";
        response += "  - Ensure good air circulation\n";
        response += "  - Apply preventive fungicides if needed\n";
        response += "  - Reduce irrigation if soil is already moist\n\n";
      } else if (liveWeather.humidity < 40) {
        response += "• **Low Humidity Management:**\n";
        response += "  - Increase irrigation frequency\n";
        response += "  - Use drip irrigation to maintain soil moisture\n";
        response += "  - Apply organic mulch\n";
        response += "  - Monitor for spider mites\n\n";
      }
      
      if (liveWeather.rainfall > 0) {
        response += "• **Current Rainfall Management:**\n";
        response += "  - Ensure proper field drainage\n";
        response += "  - Avoid waterlogging in low-lying areas\n";
        response += "  - Delay fertilizer application\n";
        response += "  - Monitor for pest outbreaks after rain\n\n";
      }
      
      if (liveWeather.windSpeed > 20) {
        response += "• **High Wind Precautions:**\n";
        response += "  - Provide support for tall crops\n";
        response += "  - Avoid spraying pesticides/fertilizers\n";
        response += "  - Check for physical damage to crops\n\n";
      }
      
      // UV and sun exposure advice
      if (liveWeather.cloudiness < 30) {
        response += "• **Clear Sky Conditions:**\n";
        response += "  - High UV exposure - protect workers\n";
        response += "  - Optimal conditions for photosynthesis\n";
        response += "  - Good for drying harvested crops\n\n";
      }
      
    } else {
      // Fallback to simulated data with note
      if (location && enhancedFarmingKnowledge.weatherPatterns[location.toLowerCase()]) {
        const weatherData = enhancedFarmingKnowledge.weatherPatterns[location.toLowerCase()];
        
        response += `**Weather Information for ${location.toUpperCase()} (Simulated):**\n`;
        response += `• Temperature: ${weatherData.temp}°C\n`;
        response += `• Humidity: ${weatherData.humidity}%\n`;
        response += `• Rainfall Pattern: ${weatherData.rainfall}\n`;
        response += `• Season: ${weatherData.season}\n\n`;
        
        response += "**Note:** Live weather data unavailable. Showing typical conditions.\n\n";
      } else {
        response += "**General Weather Considerations:**\n";
        response += "• Monitor local weather forecasts daily\n";
        response += "• Adjust irrigation based on rainfall\n";
        response += "• Protect crops during extreme weather\n";
        response += "• Plan field operations around weather patterns\n\n";
      }
    }
  } catch (error) {
    console.error('Weather query error:', error);
    response += "**Weather information temporarily unavailable.**\n\n";
  }

  response += "**General Weather-Based Farming Tips:**\n";
  response += "• Check weather forecast before planning field activities\n";
  response += "• Maintain weather records for better crop planning\n";
  response += "• Use weather apps for hourly updates\n";
  response += "• Plan irrigation based on upcoming rainfall\n";
  response += "• Protect crops during extreme weather events\n";

  return response;
}

// Crop advice handler
async function handleCropAdvice(crop, location) {
  let response = `**Comprehensive Growing Guide${crop ? ` for ${crop.toUpperCase()}` : ''}:**\n\n`;
  
  if (crop && enhancedFarmingKnowledge.crops[crop.toLowerCase()]) {
    const cropInfo = enhancedFarmingKnowledge.crops[crop.toLowerCase()];
    const calendar = enhancedFarmingKnowledge.cropCalendar[crop.toLowerCase()];
    const price = enhancedFarmingKnowledge.marketPrices[crop.toLowerCase()];
    
    response += `**Crop Overview:**\n`;
    response += `• Climate requirement: ${cropInfo.climate.temperature}\n`;
    response += `• Rainfall needed: ${cropInfo.climate.rainfall}\n`;
    response += `• Growing season: ${cropInfo.climate.season}\n`;
    response += `• Current market price: ${price}\n\n`;
    
    if (calendar) {
      response += `**Planting Calendar:**\n`;
      if (calendar.kharif) {
        response += `• Kharif season: Sowing ${calendar.kharif.sowing}, Harvesting ${calendar.kharif.harvesting}\n`;
      }
      if (calendar.rabi) {
        response += `• Rabi season: Sowing ${calendar.rabi.sowing}, Harvesting ${calendar.rabi.harvesting}\n`;
      }
      if (calendar.sowing) {
        response += `• Sowing: ${calendar.sowing}, Harvesting: ${calendar.harvesting}\n`;
      }
      response += "\n";
    }
    
    response += `**Water Management:**\n`;
    response += `• Water requirement: ${cropInfo.waterRequirement.amount}\n`;
    response += `• Irrigation frequency: ${cropInfo.waterRequirement.frequency}\n`;
    response += `• Critical watering periods: ${cropInfo.waterRequirement.criticalPeriods.join(', ')}\n\n`;
    
    response += `**Soil Requirements:**\n`;
    response += `• Preferred soil types: ${cropInfo.soilRequirements.type.join(', ')}\n`;
    response += `• Optimal pH: ${cropInfo.soilRequirements.ph}\n`;
    response += `• Drainage: ${cropInfo.soilRequirements.drainage}\n\n`;
    
    response += `**Nutrition Program:**\n`;
    response += `• Nitrogen: ${cropInfo.nutrients.nitrogen}\n`;
    response += `• Phosphorus: ${cropInfo.nutrients.phosphorus}\n`;
    response += `• Potassium: ${cropInfo.nutrients.potassium}\n\n`;
  }

  response += "**General Best Practices:**\n";
  response += "• **Land Preparation:** Deep plowing and organic matter incorporation\n";
  response += "• **Seed Selection:** Use certified, high-yielding, disease-resistant varieties\n";
  response += "• **Sowing:** Follow recommended spacing and depth\n";
  response += "• **Fertilization:** Apply based on soil test recommendations\n";
  response += "• **Pest Management:** Implement integrated pest management (IPM)\n";
  response += "• **Disease Control:** Use preventive measures and resistant varieties\n";
  response += "• **Harvesting:** Monitor maturity indicators for optimal timing\n";
  response += "• **Post-Harvest:** Proper handling, storage, and marketing\n";

  return response;
}

// General query handler
async function handleGeneralQuery(message) {
  const prompt = `You are an expert agricultural advisor for the CropEye platform. 
  Answer this farming question with practical, actionable advice:
  
  Question: ${message}
  
  Provide specific, helpful information about farming practices, crop management, 
  or agricultural techniques. Keep the response informative but concise.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('General query error:', error);
    return "I'm here to help with your farming questions. Could you please rephrase your question?";
  }
}

// Fetch weather data (live or simulated)
async function fetchWeatherData(location) {
  return await getWeatherData(location);
}

// Fetch soil data (local simulation)  
function fetchSoilData(location) {
  return getSoilData(location);
}

// Fetch CropEye platform data (local simulation)
function fetchCropEyeData(crop) {
  return getCropData(crop);
}

app.listen(PORT, () => {
  console.log(`CropEye Agentic AI Chatbot server running on port ${PORT}`);
});

// Pest management handler
async function handlePestQuery(crop, message) {
  let response = "Here's comprehensive pest management advice:\n\n";
  
  if (crop && enhancedFarmingKnowledge.pests) {
    const relevantPests = Object.entries(enhancedFarmingKnowledge.pests)
      .filter(([_, pestInfo]) => pestInfo.crops.includes(crop.toLowerCase()));
    
    if (relevantPests.length > 0) {
      response += `**Common pests affecting ${crop.toUpperCase()}:**\n`;
      relevantPests.forEach(([pestName, info]) => {
        response += `\n**${pestName.charAt(0).toUpperCase() + pestName.slice(1)}:**\n`;
        response += `• **Symptoms:** ${info.symptoms.join(', ')}\n`;
        response += `• **Biological control:** ${info.control.biological.join(', ')}\n`;
        response += `• **Cultural control:** ${info.control.cultural.join(', ')}\n`;
        response += `• **Chemical control:** ${info.control.chemical.join(', ')}\n`;
      });
      response += "\n";
    }
  }
  
  response += "**Integrated Pest Management (IPM) Strategy:**\n";
  response += "• **Prevention First:** Use resistant varieties and healthy seeds\n";
  response += "• **Regular Monitoring:** Scout fields weekly for early detection\n";
  response += "• **Biological Control:** Encourage beneficial insects and natural predators\n";
  response += "• **Cultural Practices:** Crop rotation, intercropping, and field sanitation\n";
  response += "• **Mechanical Control:** Traps, barriers, and physical removal\n";
  response += "• **Chemical Control:** Use only when necessary, rotate active ingredients\n\n";
  
  response += "**Natural Pest Control Methods:**\n";
  response += "• **Neem-based sprays:** Effective against many soft-bodied insects\n";
  response += "• **Soap solution:** Mix 2-3 tbsp liquid soap per liter of water\n";
  response += "• **Companion planting:** Marigold, basil, and mint repel many pests\n";
  response += "• **Beneficial insects:** Release ladybugs, lacewings, or parasitic wasps\n";
  response += "• **Pheromone traps:** Monitor and control specific pest populations\n\n";
  
  response += "**When to Take Action:**\n";
  response += "• **Economic threshold:** Treat when pest damage exceeds control costs\n";
  response += "• **Early intervention:** Act quickly when pests are detected\n";
  response += "• **Weather consideration:** Apply treatments during optimal conditions\n";
  response += "• **Beneficial insects:** Avoid broad-spectrum pesticides when possible\n";

  return response;
}

// Disease management handler
async function handleDiseaseQuery(crop, message) {
  let response = "Here's comprehensive disease management guidance:\n\n";
  
  if (crop && enhancedFarmingKnowledge.diseases) {
    const relevantDiseases = Object.entries(enhancedFarmingKnowledge.diseases)
      .filter(([_, diseaseInfo]) => diseaseInfo.crops.includes(crop.toLowerCase()));
    
    if (relevantDiseases.length > 0) {
      response += `**Common diseases affecting ${crop.toUpperCase()}:**\n`;
      relevantDiseases.forEach(([diseaseName, info]) => {
        response += `\n**${diseaseName.charAt(0).toUpperCase() + diseaseName.slice(1)}:**\n`;
        response += `• **Symptoms:** ${info.symptoms.join(', ')}\n`;
        response += `• **Prevention:** ${info.prevention.join(', ')}\n`;
        response += `• **Treatment:** ${info.treatment.join(', ')}\n`;
      });
      response += "\n";
    }
  }
  
  response += "**Disease Prevention Strategy:**\n";
  response += "• **Seed Treatment:** Use certified, disease-free seeds\n";
  response += "• **Soil Health:** Maintain proper drainage and soil structure\n";
  response += "• **Plant Spacing:** Ensure adequate air circulation\n";
  response += "• **Water Management:** Avoid overhead irrigation when possible\n";
  response += "• **Crop Rotation:** Break disease cycles with non-host crops\n";
  response += "• **Field Sanitation:** Remove and destroy infected plant material\n\n";
  
  response += "**Organic Disease Control:**\n";
  response += "• **Copper-based fungicides:** Effective against bacterial and fungal diseases\n";
  response += "• **Baking soda spray:** 1 tsp per liter water for powdery mildew\n";
  response += "• **Compost tea:** Boosts plant immunity and beneficial microorganisms\n";
  response += "• **Milk spray:** 1:10 ratio with water for fungal diseases\n";
  response += "• **Garlic and chili extract:** Natural antifungal properties\n\n";
  
  response += "**Environmental Management:**\n";
  response += "• **Humidity Control:** Reduce humidity around plants\n";
  response += "• **Temperature Management:** Avoid temperature stress\n";
  response += "• **Nutrition Balance:** Avoid over-fertilization with nitrogen\n";
  response += "• **Mulching:** Use organic mulch to prevent soil splash\n";
  response += "• **Pruning:** Remove lower leaves to improve air circulation\n";

  return response;
}

// Fertilizer advice handler
async function handleFertilizerQuery(crop, location) {
  let response = "Here's fertilizer management advice:\n\n";
  
  if (crop && farmingDatabase.crops[crop.toLowerCase()]) {
    const cropInfo = farmingDatabase.crops[crop.toLowerCase()];
    response += `**Nutrient requirements for ${crop.toUpperCase()}:**\n`;
    response += `• Nitrogen: ${cropInfo.nutrients.nitrogen}\n`;
    response += `• Phosphorus: ${cropInfo.nutrients.phosphorus}\n`;
    response += `• Potassium: ${cropInfo.nutrients.potassium}\n\n`;
  }
  
  response += "**General Fertilizer Guidelines:**\n";
  response += "• Conduct soil testing before fertilizer application\n";
  response += "• Apply fertilizers based on soil test recommendations\n";
  response += "• Split nitrogen applications for better efficiency\n";
  response += "• Apply phosphorus and potassium at planting time\n";
  response += "• Consider organic fertilizers for long-term soil health\n";
  response += "• Monitor crop response and adjust accordingly\n\n";
  
  response += "**Application Timing:**\n";
  response += "• Basal dose: At the time of sowing/transplanting\n";
  response += "• Top dressing: During active growth periods\n";
  response += "• Foliar feeding: For quick nutrient correction\n";
  
  return response;
}

// Seasonal planning handler
async function handleSeasonalQuery(location, crop) {
  let response = "Here's seasonal planning guidance:\n\n";
  
  const currentMonth = new Date().getMonth() + 1;
  const seasons = {
    'winter': [11, 12, 1, 2, 3],
    'summer': [3, 4, 5, 6],
    'monsoon': [6, 7, 8, 9, 10]
  };
  
  let currentSeason = 'transition';
  for (const [season, months] of Object.entries(seasons)) {
    if (months.includes(currentMonth)) {
      currentSeason = season;
      break;
    }
  }
  
  response += `**Current Season: ${currentSeason.toUpperCase()}**\n\n`;
  
  if (crop && farmingDatabase.crops[crop.toLowerCase()]) {
    const cropInfo = farmingDatabase.crops[crop.toLowerCase()];
    response += `**${crop.toUpperCase()} Seasonal Recommendations:**\n`;
    response += `• Best growing season: ${cropInfo.climate.season}\n`;
    response += `• Temperature range: ${cropInfo.climate.temperature}\n`;
    response += `• Rainfall requirement: ${cropInfo.climate.rainfall}\n\n`;
  }
  
  response += "**General Seasonal Activities:**\n";
  
  switch (currentSeason) {
    case 'winter':
      response += "• Plant winter crops (wheat, barley, peas)\n";
      response += "• Harvest summer crops if ready\n";
      response += "• Prepare land for spring planting\n";
      response += "• Protect crops from frost\n";
      break;
    case 'summer':
      response += "• Plant summer crops (corn, cotton, sugarcane)\n";
      response += "• Increase irrigation frequency\n";
      response += "• Harvest winter crops\n";
      response += "• Prepare for monsoon season\n";
      break;
    case 'monsoon':
      response += "• Plant monsoon crops (rice, pulses)\n";
      response += "• Ensure proper drainage\n";
      response += "• Monitor for fungal diseases\n";
      response += "• Harvest summer crops\n";
      break;
    default:
      response += "• Plan crop rotation for next season\n";
      response += "• Conduct soil testing\n";
      response += "• Prepare equipment and inputs\n";
  }
  
  return response;
}

// Enhanced general query handler with built-in knowledge
async function handleGeneralQuery(message, location = null, crop = null) {
  const msg = message.toLowerCase();
  let response = "Here's helpful farming advice based on your question:\n\n";
  
  // Handle specific farming topics
  if (msg.includes('yield') || msg.includes('production')) {
    response += "**Maximizing Crop Yield:**\n";
    response += "• Use high-yielding, disease-resistant varieties\n";
    response += "• Maintain optimal plant population and spacing\n";
    response += "• Follow balanced fertilization program\n";
    response += "• Ensure adequate and timely irrigation\n";
    response += "• Implement integrated pest and disease management\n";
    response += "• Harvest at proper maturity stage\n\n";
  }
  
  if (msg.includes('organic') || msg.includes('natural')) {
    response += "**Organic Farming Practices:**\n";
    response += "• Use compost and organic manures instead of chemical fertilizers\n";
    response += "• Practice crop rotation and intercropping\n";
    response += "• Use biological pest control methods\n";
    response += "• Maintain soil health through cover crops\n";
    response += "• Avoid synthetic pesticides and herbicides\n";
    response += "• Focus on building soil organic matter\n\n";
  }
  
  if (msg.includes('cost') || msg.includes('profit') || msg.includes('economics')) {
    response += "**Farm Economics and Cost Management:**\n";
    response += "• Plan crop selection based on market demand\n";
    response += "• Use efficient irrigation systems to reduce water costs\n";
    response += "• Buy inputs in bulk during off-season for better prices\n";
    response += "• Practice integrated farming (crops + livestock)\n";
    response += "• Reduce post-harvest losses through proper storage\n";
    response += "• Consider value addition and direct marketing\n\n";
  }
  
  if (msg.includes('climate') || msg.includes('change')) {
    response += "**Climate-Smart Farming:**\n";
    response += "• Choose climate-resilient crop varieties\n";
    response += "• Implement water conservation techniques\n";
    response += "• Use weather forecasting for planning\n";
    response += "• Practice conservation agriculture\n";
    response += "• Diversify crops to spread risk\n";
    response += "• Build soil carbon through organic practices\n\n";
  }
  
  // Add location-specific advice if available
  if (location && enhancedFarmingKnowledge.weatherPatterns[location.toLowerCase()]) {
    const locationData = enhancedFarmingKnowledge.weatherPatterns[location.toLowerCase()];
    response += `**Specific advice for ${location.toUpperCase()}:**\n`;
    response += `• Current season: ${locationData.season}\n`;
    response += `• Temperature: ${locationData.temp}°C - ${locationData.temp > 30 ? 'Focus on heat management' : 'Moderate temperature conditions'}\n`;
    response += `• Humidity: ${locationData.humidity}% - ${locationData.humidity > 80 ? 'Monitor for diseases' : 'Good humidity levels'}\n`;
    response += `• Rainfall: ${locationData.rainfall} - Plan irrigation accordingly\n\n`;
  }
  
  // Add crop-specific advice if mentioned
  if (crop && enhancedFarmingKnowledge.crops[crop.toLowerCase()]) {
    response += `**Key points for ${crop.toUpperCase()} cultivation:**\n`;
    const cropData = enhancedFarmingKnowledge.crops[crop.toLowerCase()];
    response += `• Best growing temperature: ${cropData.climate.temperature}\n`;
    response += `• Water requirement: ${cropData.waterRequirement.amount}\n`;
    response += `• Preferred soil pH: ${cropData.soilRequirements.ph}\n`;
    response += `• Growing season: ${cropData.climate.season}\n\n`;
  }
  
  response += "**General Farming Success Tips:**\n";
  response += "• Keep detailed records of all farming activities\n";
  response += "• Stay updated with latest agricultural techniques\n";
  response += "• Connect with local agricultural extension services\n";
  response += "• Join farmer groups for knowledge sharing\n";
  response += "• Invest in soil and water conservation\n";
  response += "• Plan for both good and bad seasons\n";
  
  return response;
}

// Local data functions (with live weather integration)
async function getWeatherData(location) {
  if (!location) return null;
  
  // Try live weather first
  const liveData = await fetchLiveWeatherData(location);
  if (liveData) {
    return liveData;
  }
  
  // Fallback to simulated data
  const locationData = enhancedFarmingKnowledge.weatherPatterns[location.toLowerCase()];
  if (!locationData) return null;
  
  return {
    temperature: locationData.temp,
    humidity: locationData.humidity,
    rainfall: locationData.rainfall,
    season: locationData.season,
    windSpeed: Math.round(Math.random() * 10 + 5), // 5-15 km/h
    visibility: Math.round(Math.random() * 5 + 5), // 5-10 km
    source: 'simulated'
  };
}

function getSoilData(location) {
  if (!location) return null;
  
  // Simulated soil data based on location
  const soilData = {
    ph: (Math.random() * 2 + 6).toFixed(1), // 6.0-8.0
    organicMatter: (Math.random() * 2 + 1.5).toFixed(1), // 1.5-3.5%
    nitrogen: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
    phosphorus: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
    potassium: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
    recommendations: [
      'Regular soil testing recommended',
      'Add organic matter to improve soil structure',
      'Consider balanced NPK fertilization'
    ]
  };
  
  return soilData;
}

function getCropData(crop) {
  if (!crop) return null;
  
  const cropData = enhancedFarmingKnowledge.crops[crop.toLowerCase()];
  const calendar = enhancedFarmingKnowledge.cropCalendar[crop.toLowerCase()];
  const price = enhancedFarmingKnowledge.marketPrices[crop.toLowerCase()];
  
  if (!cropData) return null;
  
  return {
    ...cropData,
    calendar: calendar,
    marketPrice: price,
    recommendations: [
      'Use certified seeds for better yield',
      'Follow recommended planting density',
      'Monitor for pests and diseases regularly'
    ]
  };
}

function getIrrigationData(crop, location) {
  if (!crop) return null;
  
  const cropData = enhancedFarmingKnowledge.crops[crop.toLowerCase()];
  const locationWeather = location ? enhancedFarmingKnowledge.weatherPatterns[location.toLowerCase()] : null;
  
  if (!cropData) return null;
  
  let irrigationSchedule = {
    frequency: cropData.waterRequirement.frequency,
    amount: cropData.waterRequirement.amount,
    criticalPeriods: cropData.waterRequirement.criticalPeriods,
    method: 'Drip irrigation recommended for water efficiency'
  };
  
  // Adjust based on weather
  if (locationWeather) {
    if (locationWeather.temp > 30) {
      irrigationSchedule.adjustment = 'Increase frequency by 20-30% due to high temperature';
    }
    if (locationWeather.humidity > 80) {
      irrigationSchedule.adjustment = 'Reduce frequency slightly due to high humidity';
    }
    if (locationWeather.rainfall === 'High') {
      irrigationSchedule.adjustment = 'Reduce irrigation during heavy rainfall periods';
    }
  }
  
  return irrigationSchedule;
}

function getPestData(crop) {
  if (!crop) return null;
  
  const relevantPests = Object.entries(enhancedFarmingKnowledge.pests || {})
    .filter(([_, pestInfo]) => pestInfo.crops.includes(crop.toLowerCase()));
  
  return {
    commonPests: relevantPests.map(([name, info]) => ({
      name: name,
      symptoms: info.symptoms,
      control: info.control
    })),
    generalAdvice: [
      'Regular field monitoring is essential',
      'Use integrated pest management approach',
      'Encourage beneficial insects'
    ]
  };
}

function getSeasonalData(location) {
  const currentMonth = new Date().getMonth() + 1;
  const seasons = {
    'winter': [11, 12, 1, 2, 3],
    'summer': [3, 4, 5, 6],
    'monsoon': [6, 7, 8, 9, 10]
  };
  
  let currentSeason = 'transition';
  for (const [season, months] of Object.entries(seasons)) {
    if (months.includes(currentMonth)) {
      currentSeason = season;
      break;
    }
  }
  
  const seasonalActivities = {
    winter: [
      'Plant winter crops (wheat, barley, peas)',
      'Harvest summer crops if ready',
      'Protect crops from frost',
      'Prepare land for spring planting'
    ],
    summer: [
      'Plant summer crops (corn, cotton, sugarcane)',
      'Increase irrigation frequency',
      'Harvest winter crops',
      'Prepare for monsoon season'
    ],
    monsoon: [
      'Plant monsoon crops (rice, pulses)',
      'Ensure proper drainage',
      'Monitor for fungal diseases',
      'Harvest summer crops'
    ],
    transition: [
      'Plan crop rotation for next season',
      'Conduct soil testing',
      'Prepare equipment and inputs'
    ]
  };
  
  return {
    currentSeason: currentSeason,
    activities: seasonalActivities[currentSeason],
    location: location,
    month: currentMonth
  };
}