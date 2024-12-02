import Instagram from '../assets/icons/instagram.svg?react'
import Facebook from '../assets/icons/facebook.svg?react'
import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <section className='landing-page'>
      <h1>כותרת לדף נחיתה</h1>
      <img
        className='profile-image'
        src='./img/ProfileImage.jpg?'
        alt='Person Image'
      />
      <Link to={'/form'} className='frm-btn'>לחץ כאן כדי להתחיל תהליך הרשמה</Link>
      <section className='profile-information'></section>
      <section className='socials'>
        <a href='https://www.instagram.com/eldad_cremisi/'>
          <Instagram />
          <h1>Instagram</h1>
        </a>
        <a href='https://www.facebook.com/eldad.cremisi.3'>
          <Facebook />
          <h1> Facebook</h1>
        </a>
      </section>
    </section>
  )
}
