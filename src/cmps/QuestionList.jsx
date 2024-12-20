/* eslint-disable react/prop-types */
import { Box } from '@mui/material'
import { QuestionPreview } from './QuestionPreview.jsx'

export function QuestionList({
  questions,
  handleInputChange,
  numBorrowers,
  answers,
}) {
  return (
    <Box sx={{ padding: 3, maxWidth: '900px', mx: 'auto' }}>
      {numBorrowers &&
        [...Array(numBorrowers)].map((_, index) => (
          <Box
            key={index}
            sx={{ mb: 6, border: '1px solid #ccc', p: 3, borderRadius: 5 }}
          >
            <h3>לווה {index + 1}</h3>
            {questions.map((question) => {
              if (question.condition && !answers[question.condition + index]) {
                return null // Skip rendering if the condition isn't met
              }
              return (
                <div key={question.id}>
                  <QuestionPreview
                    question={question}
                    handleInputChange={handleInputChange}
                    answers={answers}
                    index={index}
                  />
                </div>
              )
            })}
          </Box>
        ))}
    </Box>
  )
}
