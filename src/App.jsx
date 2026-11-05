import { useState } from 'react'
import './App.css'

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'ur', name: 'Urdu' },
  { code: 'ar', name: 'Arabic' },
  { code: 'zh', name: 'Chinese' },
  { code: 'hi', name: 'Hindi' },
]

async function translateText(text, source, target) {
  const sentences = text.match(/[^.!?]+[.!?]?/g) || [text]
  const results = []

  for (const sentence of sentences) {
    const trimmed = sentence.trim()
    if (!trimmed) continue

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=${source}|${target}`
    const response = await fetch(url)
    const data = await response.json()
    results.push(data.responseData.translatedText)
  }

  return results.join(' ')
}

function speak(text, langCode) {
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = langCode
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utterance)
}

function App() {
  const [inputText, setInputText] = useState('')
  const [sourceLang, setSourceLang] = useState('en')
  const [targetLang, setTargetLang] = useState('ur')
  const [translatedText, setTranslatedText] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <div className="container">
      <h1>Language Translator</h1>

      <div className="language-row">
        <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>{lang.name}</option>
          ))}
        </select>

        <span>→</span>

        <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>{lang.name}</option>
          ))}
        </select>
      </div>

      <div className="panels">
        <textarea
          placeholder="Enter text to translate..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <div className="output">
          <p>{translatedText || (inputText ? 'Click Translate to see the result.' : 'Translation will appear here.')}</p>
          {translatedText && (
            <div className="actions">
              <button onClick={() => navigator.clipboard.writeText(translatedText)}>
                Copy
              </button>
              <button onClick={() => speak(translatedText, targetLang)}>
                Listen
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        className="translate-btn"
        disabled={!inputText.trim() || loading}
        onClick={async () => {
          setLoading(true)
          try {
            const result = await translateText(inputText, sourceLang, targetLang)
            setTranslatedText(result)
          } catch (err) {
            setTranslatedText('Error: ' + err.message)
          } finally {
            setLoading(false)
          }
        }}
      >
        {loading ? 'Translating...' : 'Translate'}
      </button>

      <small className="disclaimer">Machine translation may not be perfectly accurate.</small>
    </div>
  )
}

export default App