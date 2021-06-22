import { useEffect, useState } from 'react'
import * as style from '../styles/components/Loader.module.css'


const Loader = () => {

  const [message, setMessage] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(true)
    }, 8000);
    return () => clearTimeout(timer);
  }, [])


  return (
    <div>
      { message === false ?
				<div className={style.spinner}>
          <div className={style.bounce1}></div>
          <div className={style.bounce2}></div>
          <div className={style.bounce3}></div>
        </div> :
				<div className={style.message}>
					no data available!
				</div>
			}
    </div>
  )
}

export default Loader