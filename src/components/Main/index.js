import { useState } from 'react'
import passwordEntropy from 'fast-password-entropy'

import IconCopy from '../../images/IconCopy'
import PasswordLength from './PasswordLength'
import IconCheck from '../../images/IconCheck'
import IconArrow from '../../images/IconArrow'

const checkboxes = [
  { name: 'upper', label: 'Include Uppercase Letters' },
  { name: 'lower', label: 'Include Lowercase Letters' },
  { name: 'numbers', label: 'Include Numbers' },
  { name: 'symbols', label: 'Include Symbols' },
]

export default function Main() {
  const [password, setPassword] = useState(null)
  const [nbCharacters, setNbCharacters] = useState(10)
  const [checked, setChecked] = useState([true, true, true, false])
  const [passwordStrength, setPasswordStrength] = useState(1)

  const handleChecked = (index) => {
    let newChecked = checked

    newChecked[index] = !checked[index]
    setChecked([...newChecked])
  }

  const strengthColor = () => {
    if (passwordStrength === 1) return 'bg-red'
    if (passwordStrength === 2) return 'bg-orange'
    if (passwordStrength === 3) return 'bg-yellow'
    if (passwordStrength === 4) return 'bg-neonGreen'
  }

  const strengthMessage = () => {
    if (passwordStrength === 1) return 'TOO WEAK!'
    if (passwordStrength === 2) return 'WEAK'
    if (passwordStrength === 3) return 'MEDIUM'
    if (passwordStrength === 4) return 'STRONG'
  }

  const generatePassword = () => {
    if (nbCharacters === '0' || !checked.includes(true)) {
      setPassword(null)
      return
    }

    let charsOptions = ''
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lower = 'abcdefghijklmnopqrstuvwxyz'
    const number = '0123456789'.repeat(4)
    const symbol = '!@#$%&*()_-+='.repeat(4)

    if (checked[0]) charsOptions += upper
    if (checked[1]) charsOptions += lower
    if (checked[2]) charsOptions += number
    if (checked[3]) charsOptions += symbol

    const newPassword = [...Array(Number(nbCharacters))].reduce(
      (accumulator) => {
        return (
          accumulator +
          charsOptions[Math.floor(Math.random() * charsOptions.length)]
        )
      },
      ''
    )

    const strength = passwordEntropy(newPassword)
    let score = 0
    if (strength > 90) score = 4
    else if (strength > 70) score = 3
    else if (strength > 50) score = 2
    else score = 1
    setPasswordStrength(score)
    setPassword(newPassword)
  }

  return (
    <main className="grid mx-auto gap-4 md:gap-6 w-[95%] sm:w-[85%] md:w-[75%] lg:w-[50%]">
      <section className="flex justify-between p-4">
        <p
          className={`${
            password == null
              ? 'text-almostWhite opacity-25'
              : 'text-almostWhite'
          }`}
        >
          {password == null ? 'P4$5W0rD!' : password}
        </p>
        <IconCopy
          onClick={() => navigator.clipboard.writeText(password)}
          props="fill-neonGreen hover:fill-white cursor-pointer"
        />
      </section>
      <section className="flex flex-col p-4">
        <PasswordLength
          nbCharacters={nbCharacters}
          setNbCharacters={setNbCharacters}
        />
        <div className="grid gap-5 mt-[42px] text-almostWhite">
          {checkboxes.map(({ name, label }, index) => (
            <div key={name} className="flex gap-5">
              <div className="relative">
                <div
                  onClick={() => handleChecked(index)}
                  id={name}
                  className={`border h-5 w-5 border-almostWhite hover:border-neonGreen cursor-pointer bg-darkGrey ${
                    checked[index] && 'bg-neonGreen border-none'
                  }`}
                  type="checkbox"
                />
                <IconCheck
                  onClick={() => handleChecked(index)}
                  props={`${
                    checked[index] ? 'inline' : 'hidden'
                  } absolute left-1 top-2 cursor-pointer`}
                />
              </div>
              <label>{label}</label>
            </div>
          ))}
        </div>
        <div className="flex justify-between bg-veryDarkGrey p-5 mt-8">
          <p className="text-grey">STRENGTH</p>
          <div className="flex">
            <p className="text-almostWhite mr-4">
              {password && strengthMessage()}
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((nb, index) => (
                <div
                  key={nb}
                  className={`border-2 border-almostWhite w-[10px] h-7 ${
                    password && nb <= passwordStrength
                      ? `border-none ${strengthColor()}`
                      : ''
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={() => generatePassword()}
          className="group flex bg-neonGreen hover:bg-darkGrey border border-neonGreen
         hover:text-neonGreen mt-4 p-5 justify-center items-center"
        >
          GENERATE
          <IconArrow props="group-hover:fill-neonGreen ml-4" />
        </button>
      </section>
    </main>
  )
}
