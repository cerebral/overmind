import * as React from 'react'
import { useAppState } from '../../overmind'
import { Tab } from '../../overmind/types'
import * as styles from './styles'
import Tabs from '../Tabs'
import Actions from '../Actions'

import Console from '../Console'
import State from '../State'
import Components from '../Components'
import Flushes from '../Flushes'
import History from '../History'
import Charts from '../Charts'
import { FaChrome } from 'react-icons/fa'

const pages: { [key in Tab]: React.FunctionComponent } = {
  [Tab.Actions]: Actions,
  [Tab.Console]: Console,
  [Tab.State]: State,
  [Tab.Components]: Components,
  [Tab.Flushes]: Flushes,
  [Tab.Remove]: () => null,
  [Tab.History]: History,
  [Tab.Charts]: Charts,
}

const Workspace: React.FunctionComponent = () => {
  const state = useAppState()

  const Page = pages[state.currentTab]

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Tabs />
        <div className={styles.pageContainer}>
          {state.isConnecting ? (
            <div className={styles.waitWrapper}>
              <h1>Application not connected...</h1>
              <div>
                Click <FaChrome /> to adjust how you want to connect your app
              </div>
            </div>
          ) : (
            <Page />
          )}
        </div>
      </div>
    </div>
  )
}

export default Workspace
