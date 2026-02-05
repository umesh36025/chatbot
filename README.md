# CropEye Agentic AI Chatbot - No API Required

An intelligent farming assistant with comprehensive built-in agricultural knowledge. No external APIs needed!

## 🌱 Features

### Core Capabilities (All Built-in)
- **Water Requirements**: Detailed irrigation advice for 5+ major crops
- **Soil Information**: Comprehensive soil analysis and improvement recommendations
- **Weather Simulation**: Location-based weather patterns for 8 major Indian cities
- **Crop Management**: Complete growing guides with planting calendars
- **Pest & Disease Control**: Integrated management strategies
- **Fertilizer Advice**: NPK recommendations based on crop and soil
- **Seasonal Planning**: Month-wise farming activities and crop rotation

### 🤖 AI-Powered Intelligence (No OpenAI Required)
- Smart intent classification using keyword matching
- Context-aware responses based on location and crop type
- Comprehensive farming knowledge database
- Natural language understanding for farming queries

### 📊 Built-in Data Sources
- **5 Major Crops**: Rice, Wheat, Corn, Tomato, Potato with complete profiles
- **8 Indian Cities**: Delhi, Mumbai, Bangalore, Chennai, Kolkata, Pune, Hyderabad, Ahmedabad
- **Soil Types**: Clay, Sandy, Loam, Silt with management advice
- **Pest Database**: Common pests with organic and chemical control methods
- **Disease Database**: Major crop diseases with prevention and treatment
- **Market Prices**: Current price ranges for major crops

## Quick Start (No API Keys Needed!)

### 1. Clone and Install
```bash
git clone <repository-url>
cd cropeye-agentic-chatbot
npm install
cd client && npm install && cd ..
```

### 2. Start the Application
```bash
# Option 1: Use the startup script
./start.sh

# Option 2: Manual start
npm run dev        # Backend (Terminal 1)
npm run client     # Frontend (Terminal 2)
```

### 3. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

That's it! No API keys, no external dependencies, no configuration needed.

## 🎯 Example Queries

Try these questions with the chatbot:

### Water Management
- "How much water does rice need?"
- "Irrigation schedule for tomatoes in summer"
- "Water requirements for wheat in Delhi"

### Soil & Fertilizers
- "Best soil type for potato cultivation"
- "NPK requirements for corn"
- "How to improve clay soil for vegetables"

### Weather & Seasonal
- "Current weather conditions in Mumbai for farming"
- "When to plant wheat in North India"
- "Monsoon farming tips"

### Pest & Disease Control
- "How to control aphids in tomato naturally"
- "Organic pest control methods"
- "Disease prevention in rice crops"

### General Farming
- "Organic farming practices"
- "How to increase crop yield"
- "Cost-effective farming methods"

## 🏗 Architecture

### Backend (No External APIs)
- **Express.js server** with comprehensive farming knowledge
- **Smart intent classification** using keyword matching
- **Location-based recommendations** for 8 major cities
- **Crop-specific advice** for 5 major crops
- **Weather simulation** based on regional patterns
- **Market price information** for planning

### Frontend
- **React.js** with beautiful, responsive design
- **Real-time chat interface** with typing indicators
- **Weather widget** showing simulated local conditions
- **Quick action buttons** for common queries
- **Location-based services** for personalized advice

### Knowledge Database
- **Comprehensive crop profiles** with water, soil, climate, and nutrient requirements
- **Pest and disease database** with symptoms and control methods
- **Soil type characteristics** and management recommendations
- **Weather patterns** for major agricultural regions
- **Seasonal farming calendar** with planting and harvesting times

## 📁 Project Structure

```
cropeye-agentic-chatbot/
├── server.js                    # Main server with built-in AI logic
├── package.json                 # Minimal dependencies (express, cors, dotenv)
├── utils/
│   ├── farmingData.js          # Comprehensive farming knowledge database
│   ├── aiPrompts.js            # AI prompt templates (for future API integration)
│   └── cropEyeIntegration.js   # API integration utilities (for future use)
├── client/                     # React frontend
│   ├── src/
│   │   ├── App.js              # Main application
│   │   └── components/         # Chat components
│   └── package.json            # Frontend dependencies
└── README.md                   # This file
```

## 🔧 Customization

### Adding New Crops
Edit `utils/farmingData.js`:

```javascript
crops: {
  newCrop: {
    waterRequirement: {
      amount: '500-700mm',
      frequency: 'Every 5-7 days',
      criticalPeriods: ['Flowering', 'Fruit development']
    },
    soilRequirements: {
      type: ['Loam', 'Sandy loam'],
      ph: '6.0-7.0',
      drainage: 'Well-drained'
    },
    // ... more properties
  }
}
```

### Adding New Locations
Add to `weatherPatterns` in `server.js`:

```javascript
weatherPatterns: {
  'newcity': { 
    temp: 25, 
    humidity: 70, 
    rainfall: 'Moderate', 
    season: 'Pleasant' 
  }
}
```

### Customizing Responses
Modify handler functions in `server.js` to change response formats and content.

## 🚀 Deployment

### Local Development
```bash
npm run dev     # Backend with auto-reload
npm run client  # Frontend development server
```

### Production Build
```bash
cd client && npm run build && cd ..
npm start
```

### Docker (Optional)
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN cd client && npm install && npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

## 🌟 Key Benefits

### ✅ No External Dependencies
- Works completely offline
- No API keys or accounts needed
- No rate limits or usage costs
- Instant setup and deployment

### ✅ Comprehensive Knowledge
- 5 major crops with complete growing profiles
- 8 Indian cities with weather patterns
- Pest and disease management database
- Soil types and fertilizer recommendations

### ✅ Smart & Responsive
- Intent classification for accurate responses
- Location and crop-specific advice
- Beautiful, mobile-friendly interface
- Real-time chat experience

### ✅ Easily Extensible
- Modular architecture for easy customization
- Simple data structures for adding content
- Ready for API integration when needed
- Comprehensive documentation

## 🔮 Future Enhancements

When you're ready to add external APIs:

1. **Weather Integration**: Uncomment weather API code in server.js
2. **OpenAI Integration**: Add OpenAI key for advanced AI responses  
3. **CropEye Platform**: Connect to real agricultural data APIs
4. **Image Recognition**: Add crop and pest identification
5. **Voice Interface**: Add speech-to-text capabilities

## 📞 Support

This is a complete, working solution that requires no external services. All farming knowledge is built-in and ready to use immediately after installation.

For questions or customizations, refer to the comprehensive code comments and documentation throughout the project.