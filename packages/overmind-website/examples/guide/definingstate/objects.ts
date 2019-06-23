export default () => [
  {
    code: `
{
  modes: ['issues', 'admin'],
  currentModeIndex: 0,
  admin: {
    currentUserId: null,
    users: {
      isLoading: false,
      data: {},
      error: null
    },
  },
  issues: {
    sortBy: 'name',
    isLoading: false,
    data: {},
    error: null
  }
}
  `,
  },
]
