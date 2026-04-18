const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

async function test() {
  const env = fs.readFileSync('.env.local', 'utf8');
  const keyMatch = env.match(/GEMINI_API_KEY=([^\s]+)/);
  if (!keyMatch) {
    console.error('No GEMINI_API_KEY found in .env.local');
    return;
  }
  const key = keyMatch[1].replace(/["']/g, '');
  console.log('Using Key:', key.slice(0, 10) + '...');

  const versions = ['v1', 'v1beta'];
  const models = ['gemini-1.5-flash', 'gemini-1.5-flash-latest', 'gemini-1.5-pro', 'gemini-pro', 'gemini-2.0-flash-exp'];
  
  for (const v of versions) {
    console.log(`--- Testing API Version: ${v} ---`);
    const genAI = new GoogleGenerativeAI(key, { apiVersion: v });
    for (const m of models) {
      console.log(`  Testing model: ${m}...`);
      try {
        const model = genAI.getGenerativeModel({ model: m });
        const result = await model.generateContent('Hello');
        console.log(`    ✅ Success with ${m} (${v}):`, result.response.text().slice(0, 30));
        return; // Stop after first success
      } catch (err) {
        console.error(`    ❌ Failed with ${m} (${v}):`, err.message);
      }
    }
  }
}

test();
