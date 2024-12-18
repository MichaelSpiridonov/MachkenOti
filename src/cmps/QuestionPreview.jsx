/* eslint-disable react/prop-types */
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Checkbox,
} from '@mui/material'

export function QuestionPreview({
  question,
  handleInputChange,
  answers,
  index,
}) {
  switch (question.type) {
    case 'text':
      return (
        <TextField
          key={question.id}
          label={question.text}
          name={question.id + index}
          type={question.type}
          fullWidth
          sx={{ mb: 2 }}
          value={answers[question.id + index] || ''}
          required
          onChange={handleInputChange}
        />
      )
    case 'number':
      return (
        <TextField
          key={question.id}
          label={question.text}
          name={question.id + index}
          type='text'
          fullWidth
          pattern='/^\d*$/'
          sx={{ mb: 2 }}
          value={answers[question.id + index] || ''}
          required
          onChange={(e) => {
            let value = e.target.value

            // Allow only numeric input, including leading zeros
            if (!/^\d*$/.test(value)) return

            // Update answers state
            handleInputChange({
              target: { name: e.target.name, value, type: 'text' },
            })
          }}
          onInput={(e) => {
            let value = e.target.value

            // Ensure value does not exceed maxLength
            if (question?.maxLength && value.length > question?.maxLength) {
              value = value.slice(0, question?.maxLength)
              e.target.value = value
            }
          }}
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
          <InputLabel id={`${question.id}-label`}>{question.text}</InputLabel>
          <Select
            labelId={`${question.id}-label`}
            id={question.id}
            value={answers[question.id + index] || ''}
            onChange={handleInputChange}
            label={question.text}
            name={question.id + index}
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
              answers[question.id + index] === true
                ? 'yes'
                : answers[question.id + index] === false
                ? 'no'
                : ''
            }
            name={question.id + index}
            onChange={handleInputChange}
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

    case 'date':
      return (
        <TextField
          key={question.id}
          label={question.text}
          name={question.id + index}
          type={question.type}
          fullWidth
          sx={{ mb: 2 }}
          value={answers[question.id + index] || ''}
          required
          format={'D/M/YYYY'}
          onChange={handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )
    case 'checkbox':
      return (
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography sx={{ fontWeight: 'bold' }}>
              ברור לי כי אני מחוייב\ת על אמינות ועדכניות הפרטים שמלאתי *
            </Typography>
          }
          name={question.id + index}
          value={answers['AgreedTo' + index]}
          onClick={handleInputChange}
          key={question.id}
          type={question.type}
        />
      )

    default:
      return null
  }
}
