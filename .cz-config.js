'use strict'

module.exports = {
  types: [
    { value: 'feat', name: 'feat:     A new feature' },
    { value: 'fix', name: 'fix:      A bug fix' },
    { value: 'docs', name: 'docs:     Documentation only changes' },
    {
      value: 'style',
      name:
        'style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)',
    },
    {
      value: 'refactor',
      name:
        'refactor: A code change that neither fixes a bug nor adds a feature',
    },
    {
      value: 'perf',
      name: 'perf:     A code change that improves performance',
    },
    { value: 'test', name: 'test:     Adding missing tests' },
    {
      value: 'chore',
      name:
        'chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation',
    },
    { value: 'revert', name: 'revert:   Revert to a commit' },
  ],

  scopes: [
    { name: 'overmind' },
    { name: 'overmind-devtools' },
    { name: 'overmind-devtools-client' },
    { name: 'overmind-devtools-vscode' },
    { name: 'overmind-graphql' },
    { name: 'overmind-statechart' },
    { name: 'overmind-react' },
    { name: 'overmind-svelte' },
    { name: 'overmind-vue' },
    { name: 'overmind-angular' },
    { name: 'action-chain' },
    { name: 'proxy-state-tree' },
    { name: 'betsy' },
  ],

  // it needs to match the value for field type. Eg.: 'fix'
  scopeOverrides: {
    chore: [],
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  appendBranchNameToCommitMessage: false,
}
