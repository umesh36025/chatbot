// Comprehensive farming knowledge database
const farmingDatabase = {
  crops: {
    rice: {
      waterRequirement: {
        amount: '1500-2000mm',
        frequency: 'Daily flooding during growing season',
        criticalPeriods: ['Transplanting', 'Flowering', 'Grain filling']
      },
      soilRequirements: {
        type: ['Clay', 'Clay loam'],
        ph: '5.5-7.0',
        drainage: 'Poor to moderate (for flooded conditions)',
        organicMatter: 'High (>2.5%)'
      },
      climate: {
        temperature: '20-35°C',
        rainfall: '1000-2000mm annually',
        humidity: '80-90%',
        season: 'Monsoon (June-October)'
      },
      nutrients: {
        nitrogen: 'High requirement (120-150 kg/ha)',
        phosphorus: 'Moderate (40-60 kg/ha)',
        potassium: 'Moderate (40-60 kg/ha)'
      }
    },
    wheat: {
      waterRequirement: {
        amount: '450-650mm',
        frequency: 'Every 7-10 days',
        criticalPeriods: ['Crown root initiation', 'Jointing', 'Flowering']
      },
      soilRequirements: {
        type: ['Loam', 'Clay loam', 'Silt loam'],
        ph: '6.0-7.5',
        drainage: 'Well-drained',
        organicMatter: 'Moderate (1.5-2.5%)'
      },
      climate: {
        temperature: '15-25°C',
        rainfall: '300-1000mm annually',
        humidity: '50-70%',
        season: 'Winter (November-April)'
      },
      nutrients: {
        nitrogen: 'High requirement (100-120 kg/ha)',
        phosphorus: 'Moderate (40-50 kg/ha)',
        potassium: 'Low to moderate (20-40 kg/ha)'
      }
    },
    corn: {
      waterRequirement: {
        amount: '500-800mm',
        frequency: 'Every 5-7 days',
        criticalPeriods: ['Silking', 'Tasseling', 'Grain filling']
      },
      soilRequirements: {
        type: ['Loam', 'Sandy loam', 'Silt loam'],
        ph: '6.0-7.0',
        drainage: 'Well-drained',
        organicMatter: 'Moderate to high (2-3%)'
      },
      climate: {
        temperature: '21-30°C',
        rainfall: '500-1200mm annually',
        humidity: '60-80%',
        season: 'Summer (March-July)'
      },
      nutrients: {
        nitrogen: 'Very high requirement (150-200 kg/ha)',
        phosphorus: 'High (60-80 kg/ha)',
        potassium: 'High (60-80 kg/ha)'
      }
    },
    tomato: {
      waterRequirement: {
        amount: '400-600mm',
        frequency: 'Every 2-3 days',
        criticalPeriods: ['Flowering', 'Fruit development', 'Ripening']
      },
      soilRequirements: {
        type: ['Loam', 'Sandy loam'],
        ph: '6.0-7.0',
        drainage: 'Well-drained',
        organicMatter: 'High (>3%)'
      },
      climate: {
        temperature: '18-29°C',
        rainfall: '600-1250mm annually',
        humidity: '60-70%',
        season: 'All seasons (with protection)'
      },
      nutrients: {
        nitrogen: 'High requirement (120-150 kg/ha)',
        phosphorus: 'High (80-100 kg/ha)',
        potassium: 'Very high (150-200 kg/ha)'
      }
    },
    potato: {
      waterRequirement: {
        amount: '500-700mm',
        frequency: 'Every 7-10 days',
        criticalPeriods: ['Tuber initiation', 'Tuber bulking', 'Maturation']
      },
      soilRequirements: {
        type: ['Sandy loam', 'Loam'],
        ph: '5.0-6.5',
        drainage: 'Well-drained',
        organicMatter: 'High (>2.5%)'
      },
      climate: {
        temperature: '15-25°C',
        rainfall: '500-700mm annually',
        humidity: '80-90%',
        season: 'Winter (October-February)'
      },
      nutrients: {
        nitrogen: 'Moderate (80-120 kg/ha)',
        phosphorus: 'High (80-100 kg/ha)',
        potassium: 'Very high (150-200 kg/ha)'
      }
    }
  },

  soilTypes: {
    clay: {
      characteristics: {
        texture: 'Fine, sticky when wet',
        drainage: 'Poor',
        waterHolding: 'Very high',
        aeration: 'Poor',
        workability: 'Difficult when wet or dry'
      },
      suitableCrops: ['rice', 'wheat', 'sugarcane'],
      management: {
        tillage: 'Deep plowing when moisture is optimal',
        organicMatter: 'Add compost to improve structure',
        drainage: 'Install drainage systems if needed'
      }
    },
    sandy: {
      characteristics: {
        texture: 'Coarse, gritty',
        drainage: 'Excellent',
        waterHolding: 'Low',
        aeration: 'Excellent',
        workability: 'Easy to work'
      },
      suitableCrops: ['potato', 'carrot', 'groundnut', 'watermelon'],
      management: {
        irrigation: 'Frequent, light applications',
        fertilizer: 'Split applications to prevent leaching',
        organicMatter: 'Regular addition of compost'
      }
    },
    loam: {
      characteristics: {
        texture: 'Balanced mix of sand, silt, clay',
        drainage: 'Good',
        waterHolding: 'Moderate to high',
        aeration: 'Good',
        workability: 'Excellent'
      },
      suitableCrops: ['tomato', 'corn', 'beans', 'most vegetables'],
      management: {
        maintenance: 'Maintain organic matter levels',
        tillage: 'Minimal tillage often sufficient',
        fertility: 'Regular soil testing recommended'
      }
    },
    silt: {
      characteristics: {
        texture: 'Smooth, flour-like when dry',
        drainage: 'Moderate',
        waterHolding: 'High',
        aeration: 'Moderate',
        workability: 'Good when not too wet'
      },
      suitableCrops: ['wheat', 'barley', 'oats', 'soybeans'],
      management: {
        erosion: 'Implement erosion control measures',
        compaction: 'Avoid working when too wet',
        structure: 'Add organic matter to improve structure'
      }
    }
  },

  pests: {
    aphids: {
      crops: ['tomato', 'potato', 'wheat', 'corn'],
      symptoms: ['Yellowing leaves', 'Stunted growth', 'Honeydew secretion'],
      control: {
        biological: ['Ladybugs', 'Lacewings', 'Parasitic wasps'],
        cultural: ['Reflective mulches', 'Companion planting'],
        chemical: ['Neem oil', 'Insecticidal soap', 'Systemic insecticides']
      }
    },
    cutworms: {
      crops: ['tomato', 'corn', 'potato', 'beans'],
      symptoms: ['Cut stems at soil level', 'Missing seedlings'],
      control: {
        biological: ['Beneficial nematodes', 'Ground beetles'],
        cultural: ['Collar barriers', 'Clean cultivation'],
        chemical: ['Bt sprays', 'Soil-applied insecticides']
      }
    }
  },

  diseases: {
    blight: {
      crops: ['tomato', 'potato'],
      symptoms: ['Dark spots on leaves', 'Yellowing', 'Defoliation'],
      prevention: ['Crop rotation', 'Resistant varieties', 'Good air circulation'],
      treatment: ['Copper fungicides', 'Remove infected plants', 'Improve drainage']
    },
    rust: {
      crops: ['wheat', 'corn', 'beans'],
      symptoms: ['Orange/brown pustules', 'Yellowing leaves'],
      prevention: ['Resistant varieties', 'Proper spacing', 'Avoid overhead irrigation'],
      treatment: ['Fungicide sprays', 'Remove infected debris', 'Improve air circulation']
    }
  }
};

// Weather-based farming recommendations
const weatherRecommendations = {
  highTemperature: {
    threshold: 35,
    recommendations: [
      'Increase irrigation frequency',
      'Apply mulch to conserve soil moisture',
      'Provide shade for sensitive crops',
      'Harvest early morning or evening',
      'Monitor for heat stress symptoms'
    ]
  },
  lowTemperature: {
    threshold: 10,
    recommendations: [
      'Use row covers or tunnels',
      'Delay planting of warm-season crops',
      'Protect sensitive plants from frost',
      'Reduce irrigation frequency',
      'Monitor for cold damage'
    ]
  },
  highHumidity: {
    threshold: 85,
    recommendations: [
      'Improve air circulation',
      'Monitor for fungal diseases',
      'Reduce irrigation if possible',
      'Apply preventive fungicides',
      'Ensure proper plant spacing'
    ]
  },
  lowHumidity: {
    threshold: 30,
    recommendations: [
      'Increase irrigation frequency',
      'Use drip irrigation to maintain soil moisture',
      'Apply organic mulch',
      'Monitor for spider mites',
      'Consider misting systems for greenhouses'
    ]
  }
};

module.exports = {
  farmingDatabase,
  weatherRecommendations
};