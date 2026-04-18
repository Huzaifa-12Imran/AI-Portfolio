const fs = require('fs');

async function testStreaming() {
  const env = fs.readFileSync('.env.local', 'utf8');
  const keyMatch = env.match(/GEMINI_API_KEY=([^\s]+)/);
  if (!keyMatch) return console.error('No key');
  const key = keyMatch[1].replace(/["']/g, '');

  const models = ['gemini-1.5-flash', 'gemini-2.0-flash-exp', 'gemini-pro'];
  const versions = ['v1', 'v1beta'];

  for (const v of versions) {
    for (const m of models) {
      const url = `https://generativelanguage.googleapis.com/${v}/models/${m}:streamGenerateContent?alt=sse&key=${key}`;
      console.log(`Testing ${m} on ${v}...`);
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: 'hi' }] }] })
        });
        if (res.ok) {
           console.log(`  ✅ SUCCESS! ${m} on ${v} works for streaming.`);
           return;
        } else {
           const err = await res.text();
           console.log(`  ❌ Failed: ${res.status}. ${err.slice(0, 100)}`);
        }
      } catch (e) {
        console.log(`  ❌ Error: ${e.message}`);
      }
    }
  }
}

testStreaming();
