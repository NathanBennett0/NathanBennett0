import { useState } from 'react'
import ProfilePhoto from './images/ProfilePhoto.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="header-text">
          <h2>Software Developer.</h2>
          <h1>Hi i'm <span>Nathan Bennett</span></h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <div className="logo">
          <img src={ProfilePhoto} className="profile-photo" alt="Profile photo" />
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <section id="footer">
        <div id="social">
          <h2>Connect with me</h2>
          <ul>
            <li>
              <a href="https://github.com/NathanBennett0" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </section>
      <section id="spacer"></section>
    </>
  )
}

export default App
