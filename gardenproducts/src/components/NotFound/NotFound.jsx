import img_404 from '../../media/images/404.svg'
import s from './NotFound.module.css'
import BtnCart, { ButtonTypes } from '../../UI/btnCard/BtnCart'

export default function NotFound() {
  return (
    <div className={s.page_not_found}>
      <div classname={s.page_not_found}>
        <img src={img_404} alt="Page not Found" classname={s.image_not_found} />
        <h1 className={s.heading}>Page not found</h1>
        <p className={s.p_not_found}>We're sorry, but the page you requested was not found.</p>
        <p className={s.p_not_found_2}>Please go back to the main page.</p>
        <BtnCart type={ButtonTypes.GO_HOME} />
      </div>
    </div>
  )
}