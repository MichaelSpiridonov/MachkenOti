import { useEffect, useState } from 'react'
import { Loader } from '../cmps/Loader.jsx'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material'

export function Form() {
  const questions = [
    { id: 'fullName', text: 'שם מלא', type: 'text', isRequired: true },
    {
      id: 'idNumber',
      text: 'מספר ת.ז',
      type: 'number',
      maxLength: 9,
      isRequired: true,
    },
    {
      id: 'maritalStatus',
      text: 'סטטוס משפחתי',
      type: 'select',
      options: ['רווק', 'נשוי', 'גרוש', 'אלמן'],
      isRequired: true,
    },
    {
      id: 'paysRent',
      text: 'האם מתגורר בשכירות?',
      type: 'boolean',
      isRequired: true,
    },
    {
      id: 'monthlyPayment',
      text: 'כמה משלמים בחודש?',
      type: 'number',
      condition: 'paysRent',
      isRequired: true,
    },
    {
      id: 'mobilePhone',
      text: 'טלפון נייד',
      type: 'number',
      maxLength: 10,
      isRequired: true,
    },
  ]

  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(true)
  const [numBorrowers, setNumBorrowers] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1)
    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (id, value, index) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [id]: value,
      },
    }))
  }

  const handleBorrowersChange = (value) => {
    setNumBorrowers(value)
    setAnswers((prevAnswers) => {
      const newAnswers = { ...prevAnswers }
      if (value < Object.keys(newAnswers).length) {
        // Remove extra borrower forms if the new number is less
        Object.keys(newAnswers)
          .slice(value) // Slice extra borrowers from the array
          .forEach((key) => {
            delete newAnswers[key]
          })
      }
      return newAnswers
    })
  }

  const booleanToText = (value) => {
    return value ? 'yes' : 'no' // Converts true to 'כן' and false to 'לא'
  }

  const handleClear = () => {
    setAnswers({})
  }

  if (loading) return <Loader />
  return (
    <Box sx={{ padding: 3, maxWidth: '700px', mx: 'auto' }}>
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
            />
          ))}
        </RadioGroup>
      </FormControl>

      {numBorrowers &&
        [...Array(numBorrowers)].map((_, index) => (
          <Box
            key={index}
            sx={{ mb: 6, border: '1px solid #ccc', p: 3, borderRadius: 5 }}
          >
            <h3>לווה {index + 1}</h3>
            {questions.map((question) => {
              // Check for conditional rendering
              if (
                question.condition &&
                !answers[index]?.[question.condition] === true
              ) {
                return null
              }

              // Render fields based on type
              switch (question.type) {
                case 'text':
                case 'number':
                  return (
                    <TextField
                      key={question.id}
                      label={question.text}
                      type={question.type}
                      fullWidth
                      sx={{ mb: 2 }}
                      value={answers[index]?.[question.id] || ''}
                      required
                      onChange={(e) =>
                        handleInputChange(question.id, e.target.value, index)
                      }
                    />
                  )

                case 'select':
                  return (
                    <FormControl
                      fullWidth
                      key={question.id}
                      variant='outlined'
                    >
                      <InputLabel id={`${question.id}-label`}>
                        {question.text}
                      </InputLabel>
                      <Select
                        labelId={`${question.id}-label`}
                        id={question.id}
                        value={answers[index]?.[question.id] || ''}
                        onChange={(e) =>
                          handleInputChange(question.id, e.target.value, index)
                        }
                        label={question.text}
                      >
                        {question.options.map((option) => (
                          <MenuItem
                            key={option}
                            value={option}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )

                case 'boolean':
                  return (
                    <FormControl
                      key={question.id}
                      sx={{ mb: 2, mt: 2 }}
                    >
                      <FormLabel>{question.text}</FormLabel>
                      <RadioGroup
                        row
                        value={
                          answers[index]
                            ? booleanToText(answers[index][question.id])
                            : null
                        }
                        onChange={(e) =>
                          handleInputChange(
                            question.id,
                            e.target.value === 'yes',
                            index
                          )
                        }
                      >
                        <FormControlLabel
                          value='yes'
                          control={<Radio />}
                          label='כן'
                        />
                        <FormControlLabel
                          value='no'
                          control={<Radio />}
                          label='לא'
                        />
                      </RadioGroup>
                    </FormControl>
                  )

                default:
                  return null
              }
            })}
          </Box>
        ))}

      {numBorrowers && (
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant='contained'
            onClick={() => console.log('Submitted answers:', answers)}
            sx={{
              mt: 2,
              mb: 4, // Add margin-bottom for spacing
              fontSize: '1.1rem',
              padding: '12px 24px', // Bigger button for mobile
            }}
          >
            שלח
          </Button>
          <Button
            variant='outlined'
            onClick={handleClear}
            sx={{
              mt: 2,
              mb: 4, // Add margin-bottom for spacing
              fontSize: '1.1rem',
              padding: '12px 24px', // Bigger button for mobile
            }}
          >
            נקה
          </Button>
        </Box>
      )}
    </Box>
  )
}
