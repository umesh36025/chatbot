// AI prompt templates for different farming scenarios

const promptTemplates = {
  cropAdvice: (crop, location, season) => `
You are an expert agricultural advisor for the CropEye platform. Provide comprehensive growing advice for ${crop} in ${location} during ${season} season.

Include specific information about:
1. Optimal planting time and conditions
2. Soil preparation requirements
3. Irrigation schedule and water management
4. Fertilization program
5. Common pests and diseases to watch for
6. Harvesting indicators and timing
7. Post-harvest handling recommendations

Make your advice practical, location-specific, and actionable for farmers.
`,

  soilAnalysis: (soilType, cropType, testResults) => `
As a soil science expert, analyze this soil information and provide recommendations:

Soil Type: ${soilType}
Intended Crop: ${cropType}
Test Results: ${testResults ? JSON.stringify(testResults) : 'Not provided'}

Provide detailed advice on:
1. Soil suitability for the intended crop
2. pH adjustment recommendations if needed
3. Nutrient deficiencies and fertilizer recommendations
4. Organic matter improvement strategies
5. Drainage and aeration improvements
6. Long-term soil health maintenance

Focus on practical, cost-effective solutions.
`,

  pestManagement: (pest, crop, severity) => `
You are an integrated pest management specialist. Provide comprehensive advice for managing ${pest} in ${crop} crops.

Current severity level: ${severity}

Include recommendations for:
1. Immediate control measures
2. Biological control options
3. Cultural practices for prevention
4. Chemical control (if necessary) with safety guidelines
5. Monitoring and threshold levels
6. Long-term prevention strategies
7. Environmental considerations

Prioritize sustainable and environmentally friendly approaches.
`,

  weatherAdvisory: (weatherData, crops) => `
As a agricultural meteorologist, provide farming advice based on current weather conditions:

Weather Data: ${JSON.stringify(weatherData)}
Crops in question: ${crops.join(', ')}

Provide specific recommendations for:
1. Immediate actions needed based on current conditions
2. Irrigation adjustments
3. Crop protection measures
4. Field operation timing
5. Disease and pest risk assessment
6. 7-day outlook and planning advice

Make recommendations specific to the weather conditions and crops mentioned.
`,

  irrigationSchedule: (crop, soilType, climate, growthStage) => `
You are an irrigation specialist. Design an optimal irrigation schedule for:

Crop: ${crop}
Soil Type: ${soilType}
Climate: ${climate}
Current Growth Stage: ${growthStage}

Provide detailed guidance on:
1. Irrigation frequency and timing
2. Water application rates
3. Irrigation method recommendations
4. Soil moisture monitoring techniques
5. Critical growth periods requiring special attention
6. Water conservation strategies
7. Signs of over/under-watering to watch for

Include both general principles and specific scheduling recommendations.
`,

  diseaseManagement: (disease, crop, symptoms) => `
As a plant pathologist, provide comprehensive disease management advice:

Disease: ${disease}
Affected Crop: ${crop}
Observed Symptoms: ${symptoms}

Include detailed recommendations for:
1. Disease confirmation and diagnosis
2. Immediate treatment options
3. Preventive measures for future seasons
4. Cultural practices to reduce disease pressure
5. Resistant varieties if available
6. Fungicide recommendations with application timing
7. Environmental management strategies

Focus on integrated disease management approaches.
`,

  fertilityManagement: (crop, soilTestResults, targetYield) => `
You are a crop nutrition specialist. Develop a comprehensive fertility program:

Crop: ${crop}
Soil Test Results: ${JSON.stringify(soilTestResults)}
Target Yield: ${targetYield}

Provide detailed recommendations for:
1. Nutrient requirements calculation
2. Fertilizer selection and rates
3. Application timing and methods
4. Organic vs. synthetic fertilizer options
5. Micronutrient considerations
6. Soil pH management
7. Monitoring and adjustment strategies

Include both immediate and long-term fertility management strategies.
`,

  seasonalPlanning: (location, crops, season) => `
As a farm planning specialist, create a comprehensive seasonal plan:

Location: ${location}
Planned Crops: ${crops.join(', ')}
Season: ${season}

Develop a detailed plan including:
1. Crop rotation considerations
2. Planting schedule and timing
3. Resource requirements (seeds, fertilizers, labor)
4. Risk assessment and mitigation strategies
5. Market timing considerations
6. Equipment and infrastructure needs
7. Monitoring and record-keeping recommendations

Make the plan practical and implementable for the specific location and season.
`
};

// Context-aware prompt enhancement
const enhancePrompt = (basePrompt, context) => {
  let enhancedPrompt = basePrompt;
  
  if (context.location) {
    enhancedPrompt += `\n\nLocation-specific considerations for ${context.location}:
- Consider local climate patterns and seasonal variations
- Account for regional soil types and conditions
- Include locally available resources and materials
- Reference local agricultural practices and regulations`;
  }
  
  if (context.experience) {
    enhancedPrompt += `\n\nAdjust advice for farmer experience level: ${context.experience}
- Provide appropriate level of technical detail
- Include relevant background information if needed
- Suggest resources for further learning`;
  }
  
  if (context.farmSize) {
    enhancedPrompt += `\n\nScale recommendations for farm size: ${context.farmSize}
- Consider equipment and resource constraints
- Adjust labor requirements accordingly
- Include cost-benefit considerations`;
  }
  
  enhancedPrompt += `\n\nAlways provide:
- Practical, actionable advice
- Clear step-by-step instructions where applicable
- Warning signs to watch for
- When to seek additional professional help
- Cost-effective solutions prioritized
- Sustainable and environmentally responsible practices`;
  
  return enhancedPrompt;
};

// Intent classification prompts
const intentClassificationPrompt = (userMessage) => `
Analyze this farming-related message and classify the user's intent:

User Message: "${userMessage}"

Classify into one of these categories:
1. WATER_REQUIREMENTS - Questions about irrigation, water needs, watering schedules
2. SOIL_INFORMATION - Questions about soil type, pH, nutrients, soil testing, amendments
3. WEATHER_INFORMATION - Questions about weather impact, climate conditions, forecasts
4. CROP_ADVICE - General crop growing advice, planting, harvesting, varieties
5. PEST_MANAGEMENT - Questions about insects, pests, pest control methods
6. DISEASE_MANAGEMENT - Questions about plant diseases, symptoms, treatments
7. FERTILIZER_ADVICE - Questions about fertilizers, nutrients, feeding schedules
8. SEASONAL_PLANNING - Questions about timing, seasonal activities, crop rotation
9. GENERAL_FARMING - Other farming-related questions

Also extract:
- Crop names mentioned (if any)
- Location mentioned (if any)
- Specific problems or symptoms described
- Urgency level (low, medium, high)

Respond in JSON format:
{
  "intent": "CATEGORY_NAME",
  "crop": "crop_name_or_null",
  "location": "location_or_null",
  "problem": "specific_problem_or_null",
  "urgency": "low|medium|high",
  "confidence": 0.0-1.0
}`;

module.exports = {
  promptTemplates,
  enhancePrompt,
  intentClassificationPrompt
};