# Language Translator

A responsive language translator built with React and Vite. Enter text, choose a source and target language, and get a translation that you can copy or listen to.

## Features

- Translate between English, Spanish, French, German, Urdu, Arabic, Chinese, and Hindi
- Two-panel interface with a clean, responsive layout
- Copy the translation to your clipboard
- Listen to the translation using the browser's built-in text-to-speech
- Notice for very short inputs, where translation quality is lower

## Tech Stack

- React 19 with hooks (`useState`)
- Vite
- MyMemory Translation API (free, no API key required)
- Web Speech API (`SpeechSynthesisUtterance`)
- Clipboard API

## Getting Started

```bash
git clone https://github.com/zainab-batool26/translator-app.git
cd translator-app
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

## How It Works

1. The input text is split into sentences.
2. Each sentence is sent to the MyMemory API with the selected language pair.
3. The translated sentences are joined and shown in the output panel.

## Limitations

- Translations come from MyMemory, a free service. Quality varies by language and is weakest for Urdu.
- Very short inputs (one or two words) can produce wrong or inappropriate results.
- Machine translation may be inaccurate. This project is a learning demonstration, not a production translator.

## Live Demo

https://translator-app-topaz.vercel.app/

## What I Learned

- Calling a REST API with `fetch` and handling its responses
- Managing component state and derived values with React hooks
- Handling loading states and errors in async code
- Using browser APIs for clipboard and speech
