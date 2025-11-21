import { GoogleGenAI } from "@google/genai";

// Helper to safely get the client
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY not found in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateCoverLetter = async (
  jobTitle: string,
  companyName: string,
  jobDescription: string
): Promise<string> => {
  const ai = getAiClient();
  if (!ai) {
    return "Error: API Key is missing. Please configure the environment.";
  }

  try {
    // We use 2.5 flash as it is fast and efficient for text generation
    const model = "gemini-2.5-flash";
    
    // Clean HTML tags from description for the prompt
    const cleanDesc = jobDescription.replace(/<[^>]*>?/gm, '').substring(0, 2000); // Limit context size

    const prompt = `
      You are a professional career coach. Write a concise, compelling, and professional cover letter for the position of "${jobTitle}" at "${companyName}".
      
      Here is the job description snippet:
      "${cleanDesc}..."

      The cover letter should:
      1. Be enthusiastic but professional.
      2. Highlight generic but relevant skills based on the description.
      3. Include placeholders like [Your Name] or [Your Experience] where the user should fill in details.
      4. Be no longer than 300 words.
      5. Format it with clear paragraphs.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Failed to generate content.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, we couldn't generate the cover letter at this time due to an API error.";
  }
};

export const summarizeJob = async (jobDescription: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "API Key missing.";

  try {
    const cleanDesc = jobDescription.replace(/<[^>]*>?/gm, '').substring(0, 4000);
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Summarize this job description in 3 bullet points highlighting the key requirements and perks:\n\n${cleanDesc}`,
    });

    return response.text || "Could not summarize.";
  } catch (e) {
    return "Summary unavailable.";
  }
}