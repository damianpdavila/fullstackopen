import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import anecdoteService from './services/anecdotes.js'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch =  useDispatch()

  useEffect(() => {
    anecdoteService.getAll()
    .then(notes => dispatch(setAnecdotes(notes)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App