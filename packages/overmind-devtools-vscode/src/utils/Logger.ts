// const isVerbose = vscode.workspace.getConfiguration().get('overmind-devtools.verbose');
// TODO: check verbose in config, do not log if set
export function log(...args: any) {
  console.log(...args)
}
