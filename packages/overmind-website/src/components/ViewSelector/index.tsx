import { createElement, SFC, useRef, useState } from 'react'
import { useOvermind } from '../../app'
import * as ReactImage from '../../images/react.png'
import * as VueImage from '../../images/vue.png'
import * as AngularImage from '../../images/angular.png'
import * as OvermindImage from '../../images/overmind.png'
import * as TsImage from '../../images/ts.png'
import * as TsImageGrayscale from '../../images/ts-grayscale.png'
import Icon from '../Icon'
import * as styles from './styles'
import { css } from 'emotion'

const ViewSelector: SFC = () => {
  const { state, actions } = useOvermind()
  const [isOpen, setOpen] = useState(false)
  const selectorRef = useRef(null)

  function onSelectorClick() {
    setOpen(true)

    const onDocumentClick = function() {
      document.removeEventListener('click', onDocumentClick)
      setOpen(false)
    }
    document.addEventListener('click', onDocumentClick)
  }

  const options = {
    react: (
      <div className={styles.viewOption}>
        <img src={ReactImage} width={25} />
        React
      </div>
    ),
    vue: (
      <div className={styles.viewOption}>
        <img src={VueImage} width={25} />
        Vue
      </div>
    ),
    angular: (
      <div className={styles.viewOption}>
        <img src={AngularImage} width={25} />
        Angular
      </div>
    ),
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.tsImageWrapper} onClick={actions.toggleTypescript}>
        {state.typescript ? (
          <img className={styles.image} src={TsImage} width="20" height="20" />
        ) : (
          <img
            className={css(styles.image, styles.grayscale)}
            src={TsImageGrayscale}
            width="20"
            height="20"
          />
        )}
      </div>
      <div
        ref={selectorRef}
        onClick={onSelectorClick}
        className={css(styles.selector, isOpen && styles.selectorOpen)}
      >
        {options[state.theme]}
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
    </div>
  )
}

export default ViewSelector
