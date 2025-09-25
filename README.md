# ASI:One Chatbot Frontend

A modern React-based chatbot frontend that integrates with the ASI:One API.

## Features

- 🎨 Modern, responsive chat interface
- 💬 Real-time messaging with ASI:One API
- 🔄 Loading states and typing indicators
- 📱 Mobile-friendly design
- 🎯 Clean and intuitive UI

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure API Key:**
   Create a `.env` file in the root directory and add your ASI:One API key:

   ```
   REACT_APP_ASI_ONE_API_KEY=your_api_key_here
   ```

   Get your API key from [ASI:One](https://asi1.ai/)

3. **Start the development server:**

   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── ChatBot.js          # Main chatbot component
│   └── ChatBot.css         # Chatbot styles
├── services/
│   └── asiApi.js           # ASI:One API integration
├── App.js                  # Main app component
├── App.css                 # App styles
├── index.js                # React entry point
└── index.css               # Global styles
```

## API Integration

The chatbot uses the ASI:One API with the `asi1-mini` model. The API service is configured in `src/services/asiApi.js` and handles:

- Message sending to ASI:One API
- Error handling
- Response processing

## Customization

You can easily customize the chatbot by modifying:

- **Styles**: Update CSS files for different themes
- **API Model**: Change the model in `asiApi.js`
- **UI Components**: Modify React components in `src/components/`
- **Message Handling**: Update the message processing logic

## Troubleshooting

- **API Key Issues**: Ensure your API key is correctly set in the `.env` file
- **CORS Issues**: The ASI:One API should handle CORS properly for browser requests
- **Network Errors**: Check your internet connection and API endpoint availability

## Built With

- React 18
- Axios for API calls
- CSS3 for styling
- ASI:One API for AI responses
