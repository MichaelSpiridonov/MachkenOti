import { useEffect, useRef, useState } from 'react'
import { saveToStorage, loadFromStorage } from '../services/util.service'
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Chip,
  Paper,
  CircularProgress,
  InputAdornment,
  Avatar,
  Grid,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

const chatbotFlow = [
  { question: 'מהו שמך?', key: 'name' },
  { question: 'למה אתה חושב שאתה כאן?', key: 'help' },
  {
    question: 'מה אתה חושב על מישל?',
    key: 'moreHelp',
    options: ['אחלה גבר', 'הוא בסדר', 'בחורות אומרות בחור טוב', 'וואלה גיי'],
  },
  {
    question: 'האם מישל גיי?',
    key: 'mishelGay',
    options: ['כן', 'כן'],
  },
  {
    question: 'האם אתה עדיין חושב שמישל גיי?',
    key: 'mishelGay2',
    options: ['כן', 'כן'],
  },
]

const STORAGE_KEY = 'chatbotResponses'

export function Chatbot() {
  const [step, setStep] = useState(0)
  const [responses, setResponses] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatWindowRef = useRef(null)

  // Load responses from localStorage on mount
  useEffect(() => {
    const savedResponses = loadFromStorage(STORAGE_KEY)
    if (savedResponses) {
      setResponses(savedResponses)
      setStep(savedResponses.length)
    }
  }, [])

  // Save responses to localStorage whenever they change
  useEffect(() => {
    saveToStorage(STORAGE_KEY, responses)
  }, [responses])

  // Scroll to bottom when responses or step change
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight
    }
  }, [responses, step, isTyping])

  function handleAnswer(answer) {
    if (answer.trim() === '') return

    setResponses((prev) => [
      ...prev,
      { question: chatbotFlow[step].question, answer },
    ])
    setInputValue('')

    // Simulate typing indicator before moving to the next step
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setStep((prev) => prev + 1)
    }, 500)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 700,
          padding: 2,
          borderRadius: 3,
          backgroundColor: '#fff',
        }}
      >
        <Box
          ref={chatWindowRef}
          sx={{
            maxHeight: 500,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            padding: 1,
            backgroundColor: '#f9f9f9',
            borderRadius: 2,
            border: '1px solid #ddd',
          }}
        >
          {responses.map((item, index) => (
            <Box
              key={index}
              sx={{ marginBottom: 2 }}
            >
              {/* Question with Cyan Background and Box Border */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: 1,
                }}
              >
                <Avatar
                  sx={{ marginRight: 1, width: 30, height: 30 }}
                  alt='Chatbot'
                  src='./img/bot.png'
                />
                <Box
                  sx={{
                    backgroundColor: '#a27ffa',
                    padding: 1,
                    borderRadius: 2,
                    maxWidth: '80%',
                  }}
                >
                  <Typography
                    variant='body1'
                    color='textSecondary'
                  >
                    {item.question}
                  </Typography>
                </Box>
              </Box>

              {/* Answer Box with Matching Text Style */}
              <Box sx={{ display: 'flex', justifySelf: 'flex-end' }}>
                <Box sx={{ textAlign: 'left', justifySelf: 'flex-end' }}>
                  <Chip
                    label={item.answer}
                    sx={{
                      backgroundColor: '#2196f3',
                      color: '#fff',
                      marginTop: 1,
                      alignSelf: 'flex-end',
                      borderRadius: 2,
                      padding: '0.5rem',
                      fontSize: '1rem', // Match the question text size
                      fontWeight: 'normal', // Ensure the text weight matches
                    }}
                  />
                </Box>
              </Box>
            </Box>
          ))}

          {isTyping && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 1,
                padding: '0.5rem',
              }}
            >
              <CircularProgress size={20} />
              <Typography
                variant='body1'
                color='textSecondary'
              >
                Typing...
              </Typography>
            </Box>
          )}

          {!isTyping && step < chatbotFlow.length && (
            <Box>
              <Typography
                variant='body1'
                color='textSecondary'
              >
                {chatbotFlow[step].question}
              </Typography>

              {chatbotFlow[step].options && (
                <Grid
                  container
                  spacing={1}
                  sx={{
                    marginTop: 1,
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                  }}
                >
                  {chatbotFlow[step].options.map((option) => (
                    <Grid
                      item
                      key={option}
                      xs='auto'
                    >
                      <Chip
                        key={option}
                        label={option}
                        clickable
                        color='primary'
                        onClick={() => handleAnswer(option)}
                        sx={{
                          padding: '0.5rem 1rem',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          whiteSpace: 'normal',
                          maxWidth: '100%',
                          overflowWrap: 'break-word',
                          wordBreak: 'break-word',
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          )}
        </Box>

        <Box sx={{ marginTop: 2 }}>
          {step < chatbotFlow.length && !chatbotFlow[step].options && (
            <TextField
              fullWidth
              size='large'
              placeholder='כתוב את תשובתך...'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAnswer(inputValue)
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      color='primary'
                      onClick={() => handleAnswer(inputValue)}
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
              }}
            />
          )}
        </Box>

        {step >= chatbotFlow.length && (
          <Typography
            variant='body1'
            sx={{
              textAlign: 'center',
              marginTop: 2,
              padding: 1,
              backgroundColor: '#e3f2fd',
              borderRadius: 1,
            }}
          >
            !תודה רבה על מענה השאלון לגבי מישל הגיי
          </Typography>
        )}
      </Paper>
    </Box>
  )
}
