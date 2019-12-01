export default (ts, view) =>
  ts
    ? [
        {
          code: `
// Nested
const isSearching = state.dashboard.matches({
  issues: {
    LIST: {
      search: {
        SEARCHING: true
      }
    }
  }
})

// Parallel
const isDownloadingAndUploading = state.files.matches({
  download: {
    LOADING: true
  },
  upload: {
    LOADING: true
  }
})

// Complex match
const isOnlyDownloading = state.files.matches({
  download: {
    LOADING: true
  },
  upload: {
    LOADING: false
  }
})
`,
        },
      ]
    : [
        {
          code: `
// Nested
const isSearching = state.dashboard.matches({
  issues: {
    LIST: {
      search: {
        SEARCHING: true
      }
    }
  }
})

// Parallel
const isDownloadingAndUploading = state.files.matches({
  download: {
    LOADING: true
  },
  upload: {
    LOADING: true
  }
})

// Complex match
const isOnlyDownloading = state.files.matches({
  download: {
    LOADING: true
  },
  upload: {
    LOADING: false
  }
})
`,
        },
      ]
