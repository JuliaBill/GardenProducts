import React from 'react'

import './Footer.scss'
import { BiLogoInstagramAlt } from 'react-icons/bi'
import { PiWhatsappLogoFill } from 'react-icons/pi'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <h2 className="footer__title">Contact</h2>
        <div className="footer__contacts">
          <div className="footer__block">
            <div className="footer__item">
              <h3 className="footer__heading">Phone</h3>
              <a href="tel:+499999999999" className="footer__text" target="_blank">
                +49 999 999 99 99
              </a>
            </div>
            <div className="footer__item footer__item-right">
              <h3 className="footer__heading">Socials</h3>
              <div className="footer__socials">
                <a href="https://www.instagram.com/startainstitute/" className="footer__social-link" target="_blank">
                  <BiLogoInstagramAlt />
                </a>
                <a href="https://tel-ran.de/" className="footer__social-link" target="_blank">
                  <PiWhatsappLogoFill />
                </a>
              </div>
            </div>
          </div>
          <div className="footer__block">
            <div className="footer__item">
              <h3 className="footer__heading">Address</h3>
              <a
                href="https://www.google.com/maps/place/Starta+Institute+by+Tel-Ran/@52.5079361,13.3724698,17z/data=!3m2!4b1!5s0x47a851cbc6be2f3b:0x7edf0a3a9c29227c!4m6!3m5!1s0x47a8515353a68755:0xd0866511db4f838f!8m2!3d52.5079329!4d13.3750447!16s%2Fg%2F11sb3nrbfl?authuser=0&entry=ttu"
                className="footer__text"
                target="_blank"
              >
                Linkstraße 2, 8 OG, 10785, Berlin, Deutschland
              </a>
            </div>
            <div className="footer__item footer__item-right">
              <h3 className="footer__heading">Working Hours</h3>
              <p className="footer__text">24 hours a day</p>
            </div>
          </div>
          <div className="footer__map">
            <iframe
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              id="gmap_canvas"
              src="https://maps.google.com/maps?width=1360&amp;height=350&amp;hl=en&amp;q=Tel%20Ran%20Linkstra%C3%9Fe%202/8%20Berlin+(Tel%20Ran)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>{' '}
            <a href="http://maps-generator.com/ru"></a>{' '}
            <script
              type="text/javascript"
              src="https://embedmaps.com/google-maps-authorization/script.js?id=d350ca5a448bce3d9a503f4693857443ff066ab6"
            ></script>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer