import { createElement, SFC, useRef, useState } from 'react'
import { useOvermind } from '../../overmind'
import * as ReactImage from '../../images/react.png'
import * as VueImage from '../../images/vue.png'
import * as AngularImage from '../../images/angular.png'
import * as TsImage from '../../images/ts.png'
import * as JsImage from '../../images/js.png'
import Icon from '../Icon'
import * as styles from './styles'
import { css } from 'emotion'

const ViewSelector: SFC = () => {
  const { state, actions } = useOvermind()
  const [isOpen, setOpen] = useState(false)
  const selectorRef = useRef(null)

  function onSelectorClick() {
    if (isOpen) {
      return setOpen(false)
    }

    setOpen(true)

    const onDocumentClick = function() {
      document.removeEventListener('click', onDocumentClick)
      setOpen(false)
    }
    document.addEventListener('click', onDocumentClick)
  }

  const options = {
    vue: (
      <div className={styles.viewOption}>
        <img src={VueImage} width={25} />
        Vue
        <img className={styles.image} src={JsImage} width="20" height="20" />
      </div>
    ),
    react: (
      <div className={styles.viewOption}>
        <img src={ReactImage} width={25} />
        React
        <img className={styles.image} src={JsImage} width="20" height="20" />
      </div>
    ),
    react_ts: (
      <div className={styles.viewOption}>
        <img src={ReactImage} width={25} />
        React
        <img className={styles.image} src={TsImage} width="20" height="20" />
      </div>
    ),
    angular_ts: (
      <div className={styles.viewOption}>
        <img src={AngularImage} width={25} />
        Angular
        <img className={styles.image} src={TsImage} width="20" height="20" />
      </div>
    ),
  }

  return (
    <div className={styles.wrapper}>
      <div
        ref={selectorRef}
        onClick={state.showViewHelp ? null : onSelectorClick}
        className={css(styles.selector, isOpen && styles.selectorOpen)}
      >
        {options[state.theme + (state.typescript ? '_ts' : '')]}
        <span className={styles.chevron}>
          <Icon>chevron-down</Icon>
        </span>
      </div>
      {isOpen ? (
        <div className={styles.dropdown}>
          {Object.keys(options).map((viewTheme) => (
            <div
              key={viewTheme}
              className={styles.option}
              onClick={() => actions.selectTheme(viewTheme)}
            >
              {options[viewTheme]}
            </div>
          ))}
        </div>
      ) : null}
      {state.showViewHelp ? (
        <div className={styles.viewHelpWrapper}>
          <div className={styles.viewHelpArrow}>
            <div className={styles.viewHelpText}>
              You can select a different view layer and toggle Typescript up
              here
            </div>
            <div
              onClick={actions.viewHelpGotIt}
              className={styles.viewHelpButton}
            >
              Got it!
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ViewSelector
