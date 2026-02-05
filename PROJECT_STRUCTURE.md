# CropEye Agentic AI Chatbot - Project Structure

## 📁 Root Directory
```
cropeye-agentic-chatbot/
├── 📄 package.json              # Backend dependencies and scripts
├── 📄 package-lock.json         # Dependency lock file
├── 📄 server.js                 # Main Express server with AI logic
├── 📄 .env.example              # Environment variables template
├── 📄 start.sh                  # Quick startup script
├── 📄 README.md                 # Comprehensive documentation
├── 📄 PROJECT_STRUCTURE.md      # This file
├── 📁 client/                   # React frontend application
├── 📁 utils/                    # Backend utility modules
└── 📁 node_modules/             # Backend dependencies (auto-generated)
```

## 🎨 Frontend (client/)
```
client/
├── 📄 package.json              # Frontend dependencies
├── 📁 public/
│   └── 📄 index.html            # Main HTML template
├── 📁 src/
│   ├── 📄 index.js              # React app entry point
│   ├── 📄 App.js                # Main application component
│   └── 📁 components/
│       ├── 📄 ChatMessage.js    # Individual chat message component
│       ├── 📄 MessageInput.js   # Message input with suggestions
│       └── 📄 WeatherWidget.js  # Weather information display
└── 📁 node_modules/             # Frontend dependencies (auto-generated)
```

## 🔧 Backend Utilities (utils/)
```
utils/
├── 📄 farmingData.js           # Comprehensive farming knowledge database
├── 📄 aiPrompts.js             # AI prompt templates and enhancement
└── 📄 cropEyeIntegration.js    # CropEye platform API integration
```

## 🚀 Key Components

### Backend Server (server.js)
- **Express.js API server** with CORS and JSON middleware
- **OpenAI integration** for intelligent responses
- **Intent classification** system for farming queries
- **Multiple query handlers** for different farming topics:
  - Water requirements and irrigation
  - Soil information and analysis
  - Weather conditions and recommendations
  - Crop advice and management
  - Pest and disease management
  - Fertilizer recommendations
  - Seasonal planning
- **External API integrations** (Weather, CropEye platform)
- **Comprehensive error handling** and fallback responses

### Frontend Application (client/src/)

#### App.js - Main Application
- **Responsive layout** with sidebar and main chat area
- **Real-time messaging** with loading states
- **Location-based services** integration
- **Quick action buttons** for common queries
- **Weather widget** integration
- **Message history** management

#### ChatMessage.js - Message Display
- **Dual message types** (user/bot) with distinct styling
- **Intent classification badges** for bot responses
- **Additional data display** for API responses
- **Timestamp formatting** and message status
- **Markdown-like formatting** support
- **Loading animations** for better UX

#### MessageInput.js - Input Interface
- **Auto-expanding textarea** with keyboard shortcuts
- **Suggestion chips** for quick queries
- **Send button** with disabled states
- **Form validation** and submission handling

#### WeatherWidget.js - Weather Display
- **Location-based weather** information
- **Real-time updates** when location changes
- **Weather metrics display** (temperature, humidity, wind, visibility)
- **Loading and error states** handling
- **Mock data support** for development

### Utility Modules (utils/)

#### farmingData.js - Knowledge Database
- **Comprehensive crop database** with detailed information:
  - Water requirements and irrigation schedules
  - Soil requirements and pH preferences
  - Climate conditions and seasonal timing
  - Nutrient requirements (NPK)
- **Soil type characteristics** and management advice
- **Pest and disease information** with control methods
- **Weather-based recommendations** system

#### aiPrompts.js - AI Enhancement
- **Prompt templates** for different farming scenarios
- **Context-aware prompt enhancement** based on user data
- **Intent classification prompts** for accurate query routing
- **Customizable AI behavior** through template modification

#### cropEyeIntegration.js - API Integration
- **CropEye platform API client** with full CRUD operations
- **Comprehensive API methods**:
  - Crop data retrieval
  - Soil analysis integration
  - Weather recommendations
  - Pest/disease information
  - Irrigation advice
  - Fertilizer recommendations
  - Market data access
  - Feedback submission
  - Farming calendar
- **Error handling and fallbacks** for API failures
- **Mock data support** for development and testing
- **Health check monitoring** for service status

## 🔑 Key Features

### AI-Powered Intelligence
- **Natural language processing** using OpenAI GPT models
- **Intent classification** for accurate query routing
- **Context-aware responses** based on location and crop type
- **Comprehensive farming knowledge** integration
- **Personalized recommendations** based on user input

### Multi-Source Data Integration
- **CropEye platform** API integration for real-time data
- **Weather API** integration for current conditions
- **Local knowledge database** for comprehensive coverage
- **Fallback mechanisms** for service reliability

### User Experience
- **Responsive design** for all device types
- **Real-time chat interface** with typing indicators
- **Quick action buttons** for common queries
- **Location-based services** for personalized advice
- **Weather widget** for contextual information
- **Suggestion system** for user guidance

### Developer Experience
- **Modular architecture** for easy maintenance
- **Comprehensive documentation** and examples
- **Environment configuration** with .env support
- **Development scripts** for quick setup
- **Error handling** and logging throughout
- **Mock data support** for offline development

## 🛠 Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **OpenAI API** - AI/ML capabilities
- **Axios** - HTTP client for API calls
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React.js** - UI framework with hooks
- **Styled Components** - CSS-in-JS styling
- **React Icons** - Icon library
- **Axios** - API communication

### External Services
- **OpenAI GPT** - Natural language processing
- **OpenWeatherMap** - Weather data
- **CropEye Platform** - Agricultural data and services

## 📋 Setup Requirements

### Environment Variables
```env
OPENAI_API_KEY=your_openai_api_key
CROPEYE_API_KEY=your_cropeye_api_key
WEATHER_API_KEY=your_weather_api_key
PORT=5000
NODE_ENV=development
```

### System Requirements
- **Node.js** v16 or higher
- **npm** or **yarn** package manager
- **Internet connection** for API services
- **Modern web browser** for frontend

## 🚀 Quick Start

1. **Clone and setup**:
   ```bash
   git clone <repository>
   cd cropeye-agentic-chatbot
   ```

2. **Run startup script**:
   ```bash
   ./start.sh
   ```

3. **Manual setup** (alternative):
   ```bash
   npm install
   cd client && npm install && cd ..
   cp .env.example .env
   # Edit .env with your API keys
   npm run dev  # Backend
   npm run client  # Frontend (new terminal)
   ```

## 📈 Scalability Considerations

### Performance
- **Caching mechanisms** for frequently requested data
- **Rate limiting** for API protection
- **Connection pooling** for database operations
- **CDN integration** for static assets

### Monitoring
- **Health check endpoints** for service monitoring
- **Error logging** and alerting systems
- **Performance metrics** collection
- **API usage tracking** and analytics

### Security
- **API key management** and rotation
- **Input validation** and sanitization
- **CORS configuration** for security
- **Rate limiting** to prevent abuse