import { useState } from 'react';
import { ReactComponent as CheckSvg } from './svg/check.svg';
import CrossSvg from './svg/cross.svg';
import ArrowSvg from './svg/arrow.svg';
import styles from "./GroupControl.module.css"

function GroupControl(props) {
  let [options, setOptions] = useState(props.values)
  let [checkOpt, setCheckOpt] = useState(props.selected)
  let [showMenu, setShowMenu] = useState(false)

  function showOptions(e) {
    e.currentTarget.classList.toggle(styles.rotateArrow);
    setShowMenu((prev) => !prev)
  }

  function addOptions(e) {
    if (e.target.value.trim() !== '' && !options.includes(e.target.value.trim())) { setOptions((oldOptions) => [...oldOptions, e.target.value]) }
  }
  function clearInner(e) { return e.target.value = '' }

  async function handleBlur(e) {
    await addOptions(e);
    clearInner(e);
  }

  function handleDelete(e) {
    let deleteOption = e.currentTarget.parentNode.parentNode.firstChild.innerHTML;
    let deleteId = e.currentTarget.parentNode.parentNode.id
    setOptions(options.filter(element => element !== deleteOption));

    if (checkOpt > deleteId) {
      setCheckOpt((prev) => prev - 1)
    }
    if (checkOpt == deleteId) {
      setCheckOpt('')
    }
  }

  function handleChecked(e) {
    setCheckOpt(e.currentTarget.parentNode.parentNode.id)
  }

  return (
    <div className={styles.container}>
      <div className={styles.label}> {props.label}: </div>
      <div>
        <div className={styles.inputAndArrow}>
          <input className={styles.input} type="text" placeholder="укажите название" onBlur={handleBlur} />
          {options[0]
            ? <button className={styles.inputArrow} onClick={showOptions}>
              <img src={ArrowSvg} alt="show options" />
            </button>
            : ''}
        </div>
        <div className={styles.optionListContainer}>
          {showMenu
            ? <div className={styles.optionList}>
              {options.map((option, id) => {
                return (
                  <div id={id} className={
                    option == options[checkOpt]
                      ? `${styles.optionChecked} ${styles.option}`
                      : `${styles.option}`} >
                    <span>{option}</span>
                    <div className={styles.optionButtons}>

                      {options.length > 1
                        ? <button className={styles.optionButtons} onClick={handleDelete}>
                          <img src={CrossSvg} alt="delete option" />
                        </button>
                        : ''}

                      <button className={styles.optionButtons} onClick={handleChecked}>
                        <CheckSvg fill={
                          option == options[checkOpt]
                            ? '#b7eb64'
                            : '#000'} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
            : ''}
        </div>
      </div>
    </div>
  )
}

export default GroupControl;
