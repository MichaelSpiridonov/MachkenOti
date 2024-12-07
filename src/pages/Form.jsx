import { useEffect, useRef, useState } from 'react'
import { Loader } from '../cmps/Loader.jsx'
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { QuestionList } from '../cmps/QuestionList.jsx'
import questions from '../data/questions.json'
import { useNavigate } from 'react-router'

export function Form() {
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(true)
  const [numBorrowers, setNumBorrowers] = useState(null)
  const [alertMessage, setAlertMessage] = useState(null)
  const navigate = useNavigate()
  const alertRef = useRef(null)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  function handleInputChange({ target }) {
    const field = target.name
    let value

    switch (target.type) {
      case 'number':
      case 'range':
        value = target.value
        break

      case 'checkbox':
        value = target.checked
        break

      case 'radio':
        // Handle boolean radio buttons
        if (target.value === 'yes') {
          value = true
        } else if (target.value === 'no') {
          value = false
        }
        break

      default:
        value = target.value
        break
    }

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [field]: value,
    }))
  }

  function onSubmit() {
    let missingAnswers = []

    // Iterate through all borrowers and questions
    for (let borrowerIndex = 0; borrowerIndex < numBorrowers; borrowerIndex++) {
      questions.forEach((question) => {
        const answerKey = `${question.id}${borrowerIndex}`

        // Skip validation if the question is not required
        if (!question.isRequired) return

        // Skip validation if the condition exists and is not met
        if (
          question.condition &&
          (!answers[`${question.condition}${borrowerIndex}`] ||
            answers[`${question.condition}${borrowerIndex}`] === false)
        ) {
          return
        }

        // Check if the answer is missing (null or undefined)
        if (answers[answerKey] === null || answers[answerKey] === undefined) {
          missingAnswers.push(`לווה ${borrowerIndex + 1}: ${question.text}`)
        }
      })
    }

    // Show alert and scroll to it
    if (missingAnswers.length > 0) {
      setAlertMessage(
        <Alert
          variant='filled'
          severity='error'
          ref={alertRef}
        >
          <strong>הייתה בעיה במילוי השאלות:</strong>
          <ul>
            {missingAnswers.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </Alert>
      )

      // Scroll to the alert box with padding
      setTimeout(() => {
        if (alertRef.current) {
          const offsetTop =
            alertRef.current.getBoundingClientRect().top + window.scrollY - 20 // Add padding
          window.scrollTo({ top: offsetTop, behavior: 'smooth' })
        }
      }, 100)
    } else {
      setAlertMessage(
        <Alert
          severity='success'
          ref={alertRef}
        >
          <strong>כל השאלות נענו בהצלחה!</strong>
        </Alert>
      )

      // Scroll to the success alert
      setTimeout(() => {
        if (alertRef.current) {
          const offsetTop =
            alertRef.current.getBoundingClientRect().top + window.scrollY - 20 // Add padding
          window.scrollTo({ top: offsetTop, behavior: 'smooth' })
        }
      }, 100)

      // Navigate to the goodbye page
      navigate('/goodbye')
    }
  }

  const handleBorrowersChange = (value) => {
    setNumBorrowers(value)

    setAnswers((prevAnswers) => {
      const newAnswers = { ...prevAnswers }

      // Remove extra borrowers
      Object.keys(newAnswers).forEach((key) => {
        if (key.startsWith('borrower_')) {
          const borrowerIndex = parseInt(key.split('_')[1], 10)
          if (borrowerIndex >= value) {
            delete newAnswers[key]
          }
        }
      })

      return newAnswers
    })
  }

  if (loading) return <Loader />
  return (
    <Box sx={{ padding: 3, maxWidth: '850px', mx: 'auto' }}>
      {alertMessage && <Box sx={{ mb: 2 }}>{alertMessage}</Box>}
      <FormControl
        fullWidth
        sx={{ mb: 5 }}
      >
        <FormLabel sx={{ mx: '0', mb: 1 }}>כמה אנשים בעסקה?</FormLabel>
        <RadioGroup
          sx={{ mx: '0' }}
          row
          value={numBorrowers || ''}
          onChange={(e) => handleBorrowersChange(Number(e.target.value))}
        >
          {[1, 2, 3].map((value) => (
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio />}
              label={value}
              name='numBorrowers'
              onChange={handleInputChange}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <QuestionList
        questions={questions}
        handleInputChange={handleInputChange}
        numBorrowers={numBorrowers}
        answers={answers}
      />

      {numBorrowers && (
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant='contained'
            color='primary'
            onClick={onSubmit}
          >
            שלח
          </Button>
          <Button
            variant='outlined'
            color='secondary'
            onClick={() => setAnswers({})}
          >
            נקה
          </Button>
        </Box>
      )}
    </Box>
  )
}
