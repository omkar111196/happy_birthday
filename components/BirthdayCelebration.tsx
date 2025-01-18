'use client'

import { useState, useEffect } from 'react'
import styles from './BirthdayCelebration.module.css'

const emojis = ['🎈', '✨', '💫', '💝', '🌟', '🎀', '💖', '🎉']
const messages = [
  "I wanted to make something as special as you are... 💝",
  "Would you like to see your surprise? ✨",
  "3... 💫",
  "2... 🌟",
  "1... 💖",
  "Let the magic begin! ✨",
  "A special message for someone extraordinary... 💝",
  "Wishing you a day as wonderful as you! 🎉"
]

export default function BirthdayCelebration() {
  const [currentStep, setCurrentStep] = useState(0)
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null)

  useEffect(() => {
    createBackgroundElements()
  }, [])

  function createBackgroundElements() {
    const backgroundElements = document.querySelector(`.${styles.backgroundElements}`)
    if (backgroundElements) {
      for(let i = 0; i < 100; i++) {
        const emoji = document.createElement('div')
        emoji.className = styles.floatingEmoji
        emoji.style.left = `${Math.random() * 100}vw`
        emoji.style.top = `${Math.random() * 100}vh`
        emoji.style.animationDelay = `${Math.random() * 5}s`
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)]
        backgroundElements.appendChild(emoji)
      }
    }
  }

  function startSequence() {
    setCurrentStep(1)
    showModal(messages[0], true, "Continue", showYesNoPrompt)
  }

  function showModal(content: string, hasButton = true, buttonText = 'Continue', onClick: (() => void) | null = null) {
    setModalContent(
      <div className={`${styles.modal} animate__animated animate__fadeIn`}>
        <h2>{content}</h2>
        {hasButton && (
          <button className={styles.btn} onClick={onClick || (() => nextStep())}>
            {buttonText}
          </button>
        )}
      </div>
    )
  }

  function showYesNoPrompt() {
    setModalContent(
      <div className={`${styles.modal} animate__animated animate__fadeIn`}>
        <h2>{messages[1]}</h2>
        <div className={styles.buttonGroup}>
          <button className={styles.btn} onClick={startCountdown}>Yes</button>
          <button className={styles.btn} onClick={showPleaseSeeSurprise}>Not Yet</button>
        </div>
      </div>
    )
  }

  function showPleaseSeeSurprise() {
    showModal("Please see the surprise, it's made with love! 🎁", true, "Okay", showYesNoPrompt)
  }

  function startCountdown() {
    let count = 3
    function countdown() {
      if (count > 0) {
        showModal(count + "...", false)
        count--
        setTimeout(countdown, 1000)
      } else {
        showHappyBirthday()
      }
    }
    countdown()
  }

  function showHappyBirthday() {
    showModal("Happy Birthday Madamji! 🎉✨", true, "Let's Cut the Cake!", showCake)
  }

  function showCake() {
    setModalContent(
      <div className={styles.modal}>
        <div className={styles.cake}>
          <img src="https://raw.githubusercontent.com/omkar111196/happy_birthday/refs/heads/main/uploads/cake.jpg" alt="Birthday Cake" className={styles.cakeImage} />
          <img src="https://raw.githubusercontent.com/omkar111196/happy_birthday/refs/heads/main/uploads/knife.png" alt="Knife" className={styles.knife} onClick={cutCake} />
        </div>
        <h3>Click on the knife to cut the cake!</h3>
      </div>
    )
  }

  function cutCake() {
    const knife = document.querySelector(`.${styles.knife}`)
    knife?.classList.add(styles.knifeCutting)
    setTimeout(() => showFinalMessage(), 1000)
  }

  function showFinalMessage() {
    showModal(`Dear Madamji,
      May your day be filled with joy, success, and endless possibilities.
      Thank you for being an inspiration! 
      💖✨🎉
    `, true, "Celebrate Again!", () => window.location.reload())
  }

  function nextStep() {
    setCurrentStep(prevStep => prevStep + 1)
    switch(currentStep) {
      case 1:
        showYesNoPrompt()
        break
    }
  }

  return (
    <div className={styles.container}>
      <audio id="background-music" loop autoPlay>
        <source src="https://raw.githubusercontent.com/omkar111196/happy_birthday/refs/heads/main/uploads/happy-birthday-audio.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <div className={styles.backgroundElements}></div>
      {currentStep === 0 ? (
        <div className={`${styles.modal} animate__animated animate__fadeIn`}>
          <h2>✨ It's Your Special Day! ✨</h2>
          <button className={styles.btn} onClick={startSequence}>Begin the Magic</button>
        </div>
      ) : (
        modalContent
      )}
    </div>
  )
}

