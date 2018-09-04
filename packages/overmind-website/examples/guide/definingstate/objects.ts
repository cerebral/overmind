export default () => [
  {
    code: `
{
  admin: {
    users: {},
    isLoadingUsers: false
  },
  home: {
    tabs: ['issues', 'admin'],
    currentTabIndex: 0
  },
  issues: {
    sortBy: 'name',
    list: []
  }
}
  `,
  },
]
