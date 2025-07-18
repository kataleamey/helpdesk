import axios from 'axios';

const defaultResponse = "I'm not sure how to answer that. Would you like me to search the web for an answer?";

const getAIResponse = async (message, knowledgeBase, llmConfig, conversationHistory = []) => {
  if (llmConfig && llmConfig.apiKey && llmConfig.model) {
    const knowledgeContext = knowledgeBase.length > 0
      ? `Here is the knowledge base you must use as evidence to answer the user's question.
        ---
        ${knowledgeBase.map(doc => `Document Title: ${doc.title}\nContent: ${doc.content}`).join('\n\n---\n\n')}
        ---`
      : "No knowledge base is available. You must rely on your general knowledge.";
      
    const historyContext = conversationHistory.length > 0
      ? `Here is the recent conversation history for context:
        ---
        ${conversationHistory.map(msg => `${msg.from === 'user' ? 'User' : 'Assistant'}: ${msg.text || msg.content}`).join('\n')}
        ---`
       : "";

    const prompt = `You are a Question Answering AI. Your task is to provide a direct and concise answer to the user's question based *only* on the provided evidence.

**Process:**
1.  **Identify the User's Question:** Read the user's question carefully.
2.  **Find the Evidence:** Locate the specific sentence(s) in the "Knowledge Base Context" that contain the answer.
3.  **Formulate the Answer:** Create a new, short answer in your own words.

**CRITICAL RULES:**
-   **DO NOT** copy and paste from the knowledge base.
-   Your answer **MUST** be a maximum of two lines.
-   Your answer **MUST** directly answer the question.
-   If the knowledge base does not contain the answer, state: "I'm sorry, I couldn't find a specific answer to that question."

**Knowledge Base Context (Evidence):**
${knowledgeContext}

**Conversation History:**
${historyContext}

**User's Question:** "${message}"

**Final Answer (Synthesized, 2 lines max):**`;

    try {
      const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
        model: llmConfig.model,
        messages: [{ role: 'user', content: prompt }],
      }, {
        headers: {
          'Authorization': `Bearer ${llmConfig.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      const reply = response.data.choices[0].message.content.trim();
      return { success: true, data: { reply: reply || defaultResponse } };

    } catch (error) {
      console.error("Error calling OpenRouter API:", error);
      return { success: false, error: 'Failed to get response from LLM.' };
    }
  }

  // Fallback to simple search if no LLM is configured
  const normalizedMessage = message.toLowerCase().trim().replace(/[?.,!]/g, '');
  await new Promise(resolve => setTimeout(resolve, 500));

  if (knowledgeBase && knowledgeBase.length > 0) {
    let bestMatch = null;
    let highestScore = 0;

    knowledgeBase.forEach(doc => {
      const title = doc.title.toLowerCase();
      const content = doc.content.toLowerCase();
      let score = 0;
      const searchTerms = normalizedMessage.split(' ');
      searchTerms.forEach(term => {
        if (title.includes(term)) score += 2;
        if (content.includes(term)) score += 1;
      });
      if (score > highestScore) {
        highestScore = score;
        bestMatch = doc.content;
      }
    });

    if (highestScore > 1) {
      // Truncate for brevity in fallback mode
      const sentences = bestMatch.split('. ');
      const shortResponse = sentences.slice(0, 2).join('. ');
      return { success: true, data: { reply: shortResponse } };
    }
  }

  return { success: true, data: { reply: defaultResponse } };
};

export default getAIResponse;