import axios from 'axios';

const API_URL = 'https://api.asi1.ai/v1/chat/completions';

// System prompt that defines the AI's role - this stays consistent across all conversations
const SYSTEM_PROMPT = `You are an expert dating coach and profile analyst. Your role is to help users with:

1. **Dating Advice**: Provide practical, respectful dating tips and strategies
2. **Profile Analysis**: Analyze dating profiles and suggest improvements
3. **Pickup Lines**: Generate creative, personalized pickup lines based on someone's interests/bio
4. **Conversation Starters**: Create engaging opening messages based on profile information

Guidelines:
- Be confident but respectful
- Keep advice practical and actionable
- Make pickup lines clever and personalized, not generic
- Focus on genuine connection over manipulation
- Adapt your tone to be friendly and supportive
- When analyzing profiles, highlight strengths and suggest improvements
- For pickup lines, make them specific to the person's interests, hobbies, or bio details

Always maintain a positive, encouraging tone while being direct and helpful.`;

const sendMessage = async (message, conversationHistory = []) => {
  // Use the API key from your environment files
  const apiKey = process.env.REACT_APP_ASI_ONE_API_KEY || 'sk_856d5fa00e5d49ce935f66147e9e378b8d8502eabf73486eaad015eda69ac252';
  
  try {
    // Build messages array with system prompt first, then conversation history, then new message
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const response = await axios.post(API_URL, {
      model: 'asi1-mini',
      messages: messages,
      temperature: 0.7, // Add some creativity for pickup lines
      max_tokens: 500   // Limit response length
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('ASI API Error:', error);
    throw error;
  }
};

export { sendMessage };
