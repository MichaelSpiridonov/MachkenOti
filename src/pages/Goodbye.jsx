import { Button } from "@mui/material";
import { Link } from "react-router";

export function Goodbye() {
  return (
    <div className='thank-you-page'>
      <div className='thank-you-container'>
        <h1>תודה רבה!</h1>
        <p>הטופס שלך נשלח בהצלחה.</p>
        <Link
          to='/'
          className='home-link'
        >
          <Button
            variant='contained'
            color='primary'
          >
            חזור לדף הבית
          </Button>
        </Link>
        <h1>מישל גיי</h1>
      </div>
    </div>
  )
}
