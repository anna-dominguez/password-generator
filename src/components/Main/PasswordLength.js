import React from 'react'

export default function PasswordLength({ nbCharacters, setNbCharacters }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-[16px]">
        <p className="text-almostWhite text-base sm:text-lg">
          Character Length
        </p>
        <p className="text-neonGreen text-2xl">{nbCharacters}</p>
      </div>
      <input
        type="range"
        min="0"
        max="20"
        step="1"
        value={nbCharacters}
        onChange={(e) => setNbCharacters(e.target.value)}
        className="w-full h-2 bg-neonGreen appearance-none cursor-pointer"
      />
    </div>
  )
}
