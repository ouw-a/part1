import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'

const initialAnecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place...',
  'Programming without console.log is like a doctor refusing tests.',
  'The only way to go fast, is to go well.'
]

function App() {
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes)
  const [votes, setVotes] = useState(new Array(initialAnecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)
  const [newAnecdote, setNewAnecdote] = useState('')

  const handleNext = () => {
    let random = Math.floor(Math.random() * anecdotes.length)
    while (random === selected) {
      random = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(random)
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const handleAddAnecdote = (e) => {
    e.preventDefault()
    if (newAnecdote.trim() === '') return
    setAnecdotes(anecdotes.concat(newAnecdote))
    setVotes(votes.concat(0))
    setNewAnecdote('')
  }

  const maxVotes = Math.max(...votes)
  const topIndex = votes.indexOf(maxVotes)

  const data = anecdotes.map((text, i) => ({
    name: i + 1,
    votos: votes[i]
  }))

  return (
    <div>
      <h2>Anecdota del día</h2>
      <AnimatePresence mode="wait">
  <motion.div
    key={`${selected}-${votes[selected]}`}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    <p>{anecdotes[selected]}</p>
    <p>Tiene {votes[selected]} votos</p>
  </motion.div>
</AnimatePresence>

      <button onClick={handleVote}>Votar</button>
      <button onClick={handleNext}>Siguiente anécdota</button>

      <h2>Anecdota con más votos</h2>
      <p>{anecdotes[topIndex]}</p>
      <p>Tiene {maxVotes} votos</p>

      <h3>Gráfico de votos</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="votos" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>

      <h3>Añadir nueva anécdota</h3>
      <form onSubmit={handleAddAnecdote}>
        <textarea value={newAnecdote} onChange={e => setNewAnecdote(e.target.value)} rows="3" />
        <button type="submit">Añadir</button>
      </form>
    </div>
  )
}

export default App
