import React, {useState} from 'react'
import '../assets/styles/asideConfig.css'
import { NoAccountError } from './NoAccountError';

export const AsideConfig = () => {
  const [isAccountVisible, setIsAccountVisible] = useState(true);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [isLanguageVisible, setIsLanguageVisible] = useState(false);
  const [isPrivacyVisible, setIsPrivacyVisible] = useState(false);
  const [isAdvConfigVisible, setIsAdvConfigVisible] = useState(false);

  const toggleAccount =() =>{
      setIsAccountVisible(!isAccountVisible);
  }
  const toggleNotification =() =>{
      setIsNotificationVisible(!isNotificationVisible);
  }
  const toggleLanguage =() =>{
      setIsLanguageVisible(!isLanguageVisible);
  }
  const togglePrivacy =() =>{
      setIsPrivacyVisible(!isPrivacyVisible);
  }
  const toggleAdvConfig =() =>{
      setIsAdvConfigVisible(!isAdvConfigVisible);
  }
  
  return (
    <div>
        <div className='config__container'>
            <h2>Configuracion</h2>
            <div className='config__buttons'>
                <button id='account'>Cuenta</button>
                <button id='notifications'>Notificaciones</button>
                <button id='language'>Idioma</button>
                <button id='privacy'>Privacidad</button>
                <button id='advanced__config'>Configuracion avanzada</button>
            </div>
        </div>
          <div className={`account ${isAccountVisible ? 'visible' : ''}`}>
              
              <div className='no-Account'>
                <NoAccountError/>
              </div>
          </div>
          <div className={`notifications ${isNotificationVisible ? 'visible' : ''}`}>
              
              <div className='no-Account'>
                <NoAccountError/>
              </div>
          </div>
          <div className={`change__language ${isLanguageVisible ? 'visible' : ''}`}>
            <button>Español - Spanish</button>
            <button>English - Inglés</button>
          </div>
          <div className={`privacy ${isPrivacyVisible ? 'visible' : ''}`}>
              <div className='privacy__content'>
                blah blah blah
              </div>
          </div>
          <div className={`advanced__config ${isAdvConfigVisible ? 'visible' : ''} `}>
              
                <div className='no-Account'>
                  <NoAccountError/>
              </div>
          </div>
    </div>
  )
}
export default AsideConfig;
