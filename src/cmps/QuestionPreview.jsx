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
} from '@mui/material'

export function QuestionPreview({
  question,
  handleInputChange,
  answers,
  index,
}) {
  switch (question.type) {
    case 'text':
    case 'number':
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
            value={answers[question.id + index] === true ? 'yes' : answers[question.id + index] === false ? 'no' : ''}
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
          type='date'
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

    default:
      return null
  }
}
