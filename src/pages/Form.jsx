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
import { Link } from 'react-router'

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
      id: 'EmploymentStatus',
      text: 'סטטוס תעסוקתי',
      type: 'select',
      options: ['שכיר', 'עצמאי', 'שכיר בעל שליטה', 'פנסיונר', 'חייל'],
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
    {
      id: 'homeAddress',
      text: 'כתובת מגורים מלאה',
      type: 'text',
      isRequired: true,
    },
  ]

  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(true)
  const [numBorrowers, setNumBorrowers] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
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
              const conditionMet =
                !question.condition ||
                answers[index]?.[question.condition] === true

              if (!conditionMet) return null

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
                      sx={{ mb: 2 }}
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
                            ? answers[index][question.id]
                              ? 'yes'
                              : 'no'
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

            <Link to='/goodbye'>
              <Button
                variant='contained'
                sx={{
                  mt: 2,
                  mb: 4,
                  fontSize: '1.1rem',
                  padding: '12px 24px',
                }}
              >
                שלח
              </Button>
            </Link>
          <Button
            variant='outlined'
            onClick={() => setAnswers({})}
            sx={{
              mt: 2,
              mb: 4,
              fontSize: '1.1rem',
              padding: '12px 24px',
            }}
          >
            נקה
          </Button>
        </Box>
      )}
    </Box>
  )
}
