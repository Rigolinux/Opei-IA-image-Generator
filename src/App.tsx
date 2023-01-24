import { useState } from 'react'
import { Configuration,OpenAIApi } from 'openai'
import './App.css'

function App() {
  //add environment variable
  const [prompt, setPrompt] = useState<string>('')
  const [image, setImage] = useState<string>('')
  
  const config = new Configuration({
    apiKey: import.meta.env.VITE_API_KEY_OPEN_IA,

  });
  const openai = new OpenAIApi(config);

  const generateImage = async () => {
     const res = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    });
    let image:any = res.data.data[0].url
    setImage(image);
  }

  return (
    <div className="app-main">
      <h1>OpenAI Image Generator</h1>
      <input className='app-input'
       placeholder='Enter a idea for an image'
      type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      <button onClick={generateImage}>Generate Image</button>
     { image.length > 0? <img src={image} className='app-image' alt="Generated Image" />:<></>}
     
     
    </div>
  )
}

export default App
