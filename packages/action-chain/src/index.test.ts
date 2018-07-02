import {
  actionChainFactory,
  actionBaseFactory,
  actionFactory,
  Action,
  NoValueAction,
} from './'

const context = {
  foo: {
    bar() {
      return 'baz'
    },
  },
}

type Context = typeof context

const actionChain = actionChainFactory<Context>(context)
const action = function<
  InitialValue = undefined
>(): InitialValue extends undefined
  ? NoValueAction<Context, InitialValue>
  : Action<Context, InitialValue> {
  return actionFactory<Context, InitialValue>(actionChain)
}

beforeEach(() => {
  ;(actionBaseFactory as any).nextActionId = 0
})

describe('VALUE', () => {
  test('should run and return result', () => {
    const test = action<string>()

    expect(test('foo')).toEqual('foo')
  })
})

describe('CONTEXT', () => {
  test('should pass default context', () => {
    expect.assertions(2)
    const test = action().do((_, { execution, path }: any) => {
      expect(execution).toBeTruthy()
      expect(path).toBeTruthy()
    })

    test()
  })

  test('should be able to extend context', () => {
    expect.assertions(1)
    const foo = action().do((_, { foo }) => {
      expect(foo.bar()).toBe('baz')
    })

    foo()
  })
})

describe('PROVIDER', () => {
  test('should track execution of providers', () => {
    expect.assertions(2)
    const foo = action().do((_, { foo }) => {
      expect(foo.bar()).toBe('baz')
    })

    actionChain.once('provider', (task) => {
      expect(task).toEqual({
        operatorId: 0,
        actionId: 0,
        executionId: 0,
        method: 'bar',
        name: 'foo',
        result: 'baz',
      })
    })
    foo()
  })
})
/*
describe('EXECUTION MANAGER', () => {
	test('should track execution', () => {
		const executionManager = new ExecutionManager({});
		const action = () => {
			return {
				bar: 'baz'
			};
		};
		const foo = sequenceFactory(executionManager).do(action);

		executionManager.on('task:add', (task) => {
			expect(task).toEqual({
				id: 0,
				managerId: 0,
				executionId: 0,
				data: {
					type: 'do',
					name: 'action'
				}
			});
		});
		executionManager.on('task:update', (taskUpdate) => {
			expect(taskUpdate).toEqual({
				id: 0,
				executionId: 0,
				managerId: 0,
				data: {
					result: {
						bar: 'baz'
					}
				}
			});
		});
		foo({});
	});
	test('should track async execution', () => {
		expect.assertions(3);
		const executionManager = new ExecutionManager({});
		const action = () => {
			return Promise.resolve({
				bar: 'baz'
			});
		};
		const foo = sequenceFactory(executionManager).do(action);

		executionManager.on('task:add', (task) => {
			expect(task).toEqual({
				id: 0,
				managerId: 0,
				executionId: 0,
				data: {
					type: 'do',
					name: 'action'
				}
			});
		});
		executionManager.once('task:update', (taskUpdate) => {
			expect(taskUpdate).toEqual({
				id: 0,
				executionId: 0,
				managerId: 0,
				data: {
					isAsync: true
				}
			});
			executionManager.once('task:update', (taskUpdate) => {
				expect(taskUpdate).toEqual({
					id: 0,
					executionId: 0,
					managerId: 0,
					data: {
						result: {
							bar: 'baz'
						}
					}
				});
			});
		});
		return foo({});
	});
	test('should allow wrapping callback', () => {
		const context = {
			foo: () => 'bar'
		};
		const executionManager = new ExecutionManager(context, (context, cb) => {
			expect(context).toBeTruthy();

			return cb(context);
		});
		const action = ({ foo }) => {
			expect(foo).toBe('bar');
		};
		const foo = sequenceFactory<{ foo: string }, {}>(executionManager).do(action);
		executionManager.on('task:add', (task) => {
			expect(task).toEqual({
				id: 0,
				managerId: 0,
				executionId: 0,
				data: {
					type: 'do',
					name: 'action'
				}
			});
		});
		foo({});
	});
});

describe('COMPOSITION', () => {
	test('should allow path composition', () => {
		expect.assertions(3);
		const executionManager = new ExecutionManager({});
		const testSequence = <InitialProps, RequiredProps = InitialProps>() => {
			return sequenceFactory<{}, InitialProps, RequiredProps>(executionManager);
		};
		const successSequence = testSequence<{ bar: string }>().do(({ props }) => {
			return {
				biz: 'baz'
			};
		});
		const foo = testSequence()
			.do(
				(_, { success }) => {
					return success({
						bar: 'bah'
					});
				},
				{
					success: successSequence
				}
			)
			.do(({ props }) => {});

		executionManager.once('task:add', (task) => {
			expect(task).toEqual({
				managerId: 0,
				executionId: 0,
				id: 0,
				data: {
					type: 'do',
					name: ''
				}
			});
			executionManager.once('task:add', (task) => {
				expect(task).toEqual({
					managerId: 0,
					executionId: 0,
					id: 1,
					data: {
						type: 'do',
						name: ''
					}
				});
			});
		});

		expect(foo({})).toEqual({
			biz: 'baz',
			bar: 'bah'
		});
	});
});
*/
