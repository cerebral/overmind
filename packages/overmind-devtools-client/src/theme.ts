export function getThemeCss<
  T extends { [key: string]: { [key: string]: string } }
>(variables: T): string {
  return `
:root {
  ${Object.keys(variables).reduce((parentAggr, parentKey) => {
    return Object.keys(variables[parentKey]).reduce((aggr, key) => {
      return `${aggr}\n--${parentKey}-${key}: ${variables[parentKey][key]};`
    }, parentAggr)
  }, '')}
}
`
}

export function getTheme<
  T extends { [key: string]: { [key: string]: string } }
>(variables: T): { [P in keyof T]: { [C in keyof T[P]]: string } } {
  return Object.keys(variables).reduce(
    (aggr, key) => ({
      ...aggr,
      [key]: Object.keys(variables[key]).reduce((aggr, nestedKey) => {
        return Object.assign(aggr, {
          [nestedKey]: `var(--${key}-${nestedKey})`,
        })
      }, {}),
    }),
    {}
  ) as any
}

const variables = {
  colors: {
    purple: '#c5a5c5',
    yellow: '#fac863',
    green: '#5bd85d',
    blue: '#79b6f2',
    red: '#cc0000',
    // activityBar-background
    foreground: 'hsl(206, 57%, 17%)',
    // editor-background
    background: 'hsl(206, 57%, 13%)',
    // dropdown-border
    border: 'hsl(206, 57%, 16%)',
    // editor-foreground
    text: 'hsl(0, 0%, 90%)',
    // focusForeground
    highlight: 'hsl(0, 0%, 85%)',
  },
}

export const css = getThemeCss(variables)
export const theme = getTheme(variables)
export const colors = theme.colors
