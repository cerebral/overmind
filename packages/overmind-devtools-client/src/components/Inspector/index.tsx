import { css } from 'emotion'
import * as React from 'react'

import { isValidJson } from '../../overmind/utils'
import { colors } from '../../theme'
import * as styles from './styles'
import { isArray, isObject } from './utils'

function renderValue({
  path,
  value,
  delimiter,
  renderPaths,
  expandedPaths,
  onClickPath,
  onToggleExpand,
  selectedStatePath,
  onSubmitState,
}: {
  onSubmitState?: (newState: string) => void
  selectedStatePath?: string
  onToggleExpand: (path: string[]) => void
  path: string
  delimiter: string
  value: any
  renderPaths?: RenderPaths
  expandedPaths: string[]
  onClickPath?: (path: string[]) => void
}) {
  const wrapper = renderPaths && renderPaths[path]
  let node

  if (isObject(value)) {
    node = (
      <Nested
        key={path}
        startBracket="{"
        endBracket="}"
        path={path}
        delimiter={delimiter}
        expandedPaths={expandedPaths}
        hasWrapper={Boolean(wrapper)}
        onClickPath={onClickPath}
        renderPaths={renderPaths}
        onToggleExpand={onToggleExpand}
        isArray={false}
        value={value}
        selectedStatePath={selectedStatePath}
        onSubmitState={onSubmitState}
      />
    )
  } else if (isArray(value)) {
    node = (
      <Nested
        key={path}
        startBracket="["
        endBracket="]"
        delimiter={delimiter}
        renderPaths={renderPaths}
        path={path}
        expandedPaths={expandedPaths}
        hasWrapper={Boolean(wrapper)}
        onClickPath={onClickPath}
        onToggleExpand={onToggleExpand}
        isArray
        value={value}
        selectedStatePath={selectedStatePath}
        onSubmitState={onSubmitState}
      />
    )
  } else {
    node = (
      <ValueComponent
        key={path}
        path={path}
        delimiter={delimiter}
        value={value}
        onClickPath={onClickPath}
        selectedStatePath={selectedStatePath}
        hasWrapper={Boolean(wrapper)}
        onSubmitState={onSubmitState}
      />
    )
  }

  return wrapper ? wrapper(node) : node
}

type PathKeyProps = {
  path: string
  onClickPath: (path: string[]) => void
  onToggleExpand?: (path: string[]) => void
  disabled: boolean
  delimiter: string
}

const PathKey: React.FunctionComponent<PathKeyProps> = ({
  path,
  onClickPath,
  onToggleExpand,
  disabled,
  delimiter,
}) => {
  return path.length ? (
    <span
      className={styles.key}
      onClick={
        disabled
          ? null
          : (event) => {
              event.stopPropagation()
              if (event.metaKey || event.ctrlKey) {
                onClickPath(path.split(delimiter))
              } else if (onToggleExpand) {
                onToggleExpand(path.split(delimiter))
              }
            }
      }
    >
      {path.split(delimiter).pop()}:
    </span>
  ) : null
}

type EditValueProps = {
  value: any
  onSubmit: (newState: string) => void
}

const EditValue: React.FunctionComponent<EditValueProps> = ({
  value,
  onSubmit,
}) => {
  const [state, setState] = React.useState(() => JSON.stringify(value, null, 2))
  const isValid = isValidJson(state)

  return (
    <span
      className={styles.editValueWrapper}
      onClick={(event) => event.stopPropagation()}
    >
      <div className={styles.editValuePopup}>
        <textarea
          autoFocus
          value={state}
          onChange={(event) => setState(event.currentTarget.value)}
          onKeyDown={(event) => {
            if ((event.metaKey || event.ctrlKey) && event.keyCode === 13) {
              onSubmit(state)
            }
          }}
          className={styles.newState}
          style={{
            borderColor: isValid ? null : colors.red,
          }}
        />
        <span className={styles.ok}>CMD/CTRL + ENTER to save</span>
      </div>
    </span>
  )
}

type NestedProps = {
  startBracket: string
  endBracket: string
  expandedPaths: string[]
  renderPaths: RenderPaths
  delimiter: string
  path: string
  hasWrapper: boolean
  isArray: boolean
  value: any
  onToggleExpand: (path: string[]) => void
  onClickPath?: (path: string[]) => void
  selectedStatePath: string
  onSubmitState: (newState: string) => void
}

const Nested: React.FunctionComponent<NestedProps> = React.memo(
  ({
    expandedPaths,
    path,
    onToggleExpand,
    onClickPath,
    startBracket,
    renderPaths,
    hasWrapper,
    endBracket,
    isArray,
    selectedStatePath,
    value,
    delimiter,
    onSubmitState,
  }) => {
    const shouldCollapse = !expandedPaths.includes(path)
    const isClass = value.__CLASS__

    if (selectedStatePath && path === selectedStatePath) {
      return (
        <div
          className={styles.inlineNested}
          onClick={(event) => {
            event.stopPropagation()
            onToggleExpand(path.split(delimiter))
          }}
        >
          {path.length ? (
            <span className={styles.key}>{path.split(delimiter).pop()}:</span>
          ) : null}
          <EditValue
            value={isClass ? value.value : value}
            onSubmit={onSubmitState}
          />
        </div>
      )
    }

    if (shouldCollapse) {
      const keys = isClass ? Object.keys(value.value) : Object.keys(value)

      return (
        <div
          className={styles.inlineNested}
          onClick={(event) => {
            event.stopPropagation()
            onToggleExpand(path.split(delimiter))
          }}
        >
          <PathKey
            path={path}
            delimiter={delimiter}
            onClickPath={onClickPath}
            onToggleExpand={onToggleExpand}
            disabled={!onSubmitState || hasWrapper}
          />
          {startBracket}
          <span className={styles.keyCount}>
            {isArray ? (
              keys.length + ' items'
            ) : (
              <span className={styles.inlineNested}>
                {isClass ? (
                  <span className={styles.inlineClass}>{value.name}</span>
                ) : null}{' '}
                {keys
                  .sort()
                  .slice(0, 3)
                  .join(', ') + '...'}
              </span>
            )}
          </span>
          {endBracket}
        </div>
      )
    }

    return (
      <div>
        <div
          className={styles.bracket(true)}
          onClick={(event) => {
            event.stopPropagation()
            onToggleExpand(path.split(delimiter))
          }}
        >
          <PathKey
            path={path}
            delimiter={delimiter}
            onClickPath={onClickPath}
            onToggleExpand={onToggleExpand}
            disabled={!onSubmitState || hasWrapper}
          />
          {startBracket}
        </div>
        <div className={styles.nestedChildren}>
          {Array.isArray(value)
            ? value.map((_, index) =>
                renderValue({
                  path: path.concat((path ? delimiter : '') + String(index)),
                  delimiter,
                  value: value[index],
                  renderPaths,
                  expandedPaths,
                  onClickPath,
                  onSubmitState,
                  onToggleExpand,
                  selectedStatePath,
                })
              )
            : isClass
            ? [
                <span
                  className={styles.otherValue}
                  key={path.concat((path ? delimiter : '') + '__CLASS__')}
                >
                  {value.name}
                </span>,
                ...Object.keys(value.value)
                  .sort()
                  .map((key) => {
                    return renderValue({
                      path: path.concat((path ? delimiter : '') + key),
                      value: value.value[key],
                      delimiter,
                      renderPaths,
                      expandedPaths,
                      onClickPath,
                      onSubmitState,
                      onToggleExpand,
                      selectedStatePath,
                    })
                  }),
              ]
            : Object.keys(value)
                .sort()
                .map((key) => {
                  return renderValue({
                    path: path.concat((path ? delimiter : '') + key),
                    value: value[key],
                    delimiter,
                    renderPaths,
                    expandedPaths,
                    onClickPath,
                    onSubmitState,
                    onToggleExpand,
                    selectedStatePath,
                  })
                })}
        </div>
        <div className={styles.bracket(false)}>{endBracket}</div>
      </div>
    )
  }
)

type ValueComponentProps = {
  value: string | number | boolean
  path: string
  hasWrapper: boolean
  onClickPath?: (path: string[]) => void
  delimiter: string
  selectedStatePath: string
  onSubmitState: (newState: string) => void
}

const ValueComponent: React.FunctionComponent<ValueComponentProps> = React.memo(
  ({
    value,
    path,
    onClickPath,
    selectedStatePath,
    onSubmitState,
    hasWrapper,
    delimiter,
  }) => {
    const [isHoveringString, setHoveringString] = React.useState(false)

    if (selectedStatePath && path === selectedStatePath) {
      return (
        <div className={styles.genericValue}>
          {path.length ? (
            <span className={styles.key}>{path.split(delimiter).pop()}:</span>
          ) : null}
          <EditValue value={value} onSubmit={onSubmitState} />
        </div>
      )
    }

    if (
      typeof value === 'string' &&
      value[0] === '[' &&
      value[value.length - 1] === ']'
    ) {
      return (
        <div className={styles.otherValue}>
          <PathKey
            path={path}
            delimiter={delimiter}
            onClickPath={onClickPath}
            disabled={!onSubmitState || hasWrapper}
          />
          {value.substr(1, value.length - 2)}
        </div>
      )
    }

    if (typeof value === 'string') {
      return (
        <div className={styles.stringValue}>
          <PathKey
            path={path}
            delimiter={delimiter}
            onClickPath={onClickPath}
            disabled={!onSubmitState || hasWrapper}
          />
          <div
            onMouseOver={() => setHoveringString(true)}
            onMouseOut={() => setHoveringString(false)}
          >
            "
            {value.length > 50 && !isHoveringString
              ? value.substr(0, 50) + '...'
              : value}
            "
          </div>
        </div>
      )
    }

    return (
      <div className={styles.genericValue}>
        <PathKey
          path={path}
          delimiter={delimiter}
          onClickPath={onClickPath}
          disabled={!onSubmitState || hasWrapper}
        />
        {String(value)}
      </div>
    )
  }
)

export type RenderPaths = {
  [path: string]: (children: React.ReactChildren) => React.ReactNode
}

type InspectorProps = {
  value: object
  expandedPaths: string[]
  delimiter: string
  small?: boolean
  onToggleExpand: (path: string[]) => void
  onClickPath?: (path: string[]) => void
  renderPaths?: RenderPaths
  selectedStatePath?: string
  onSubmitState?: (newState: string) => void
}

const Inspector: React.FunctionComponent<InspectorProps> = ({
  value,
  expandedPaths,
  small,
  onToggleExpand,
  delimiter,
  onClickPath = () => {},
  renderPaths,
  selectedStatePath = '',
  onSubmitState,
}) => {
  return (
    <div className={css(small ? styles.smallWrapper : styles.wrapper)}>
      {renderValue({
        path: '',
        delimiter,
        value,
        renderPaths,
        expandedPaths,
        onClickPath,
        onToggleExpand,
        selectedStatePath,
        onSubmitState,
      })}
    </div>
  )
}

export default Inspector
