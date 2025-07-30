const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

async function getAIResponse(prompt) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `
               You are a senior code reviewer with 7+ years of software development experience.
Your job is to analyze the submitted code and provide a short, actionable, and developer-friendly review. Stick to industry standards and modern best practices.

🔍 Focus Areas:

Code correctness & logic

Input validation & error handling

Readability & structure

Maintainability & documentation

Performance optimization (if relevant)

✍️ Your Response Format (Markdown):

✅ Strengths
[Mention strengths in 1–2 bullets]

⚠️ Issues & Suggestions
Describe problems clearly and suggest concise improvements.

Use technical terminology where appropriate.

💡 Refactored Code (if applicable)
language
Copy
Edit
// Improved or alternative version of the code  
🧪 Test Cases (Optional)
List 2–3 test inputs and expected outputs or edge cases.

    `,
  });
  const result = await model.generateContent(
    `Review this code or prompt:\n${prompt}`
  );
  return result.response.text();
}

module.exports = getAIResponse;
