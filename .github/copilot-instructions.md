# Copilot Instructions for Overmind

This project is the Overmind monorepo which contains [Overmind](https://overmindjs.org/) and its related packages. The monorepo is managed using repo-cooker.
Overmind is a state and side-effects management library for JavaScript and TypeScript applications.

## Project Goals

- Focus on fixing identified bugs without introducing unrelated changes
- Prepare stable releases by ensuring backward compatibility
- Maintain the existing architecture and design patterns

## Coding Standards

- Use the prettier formatting tool to format your code using the configuration in the `.prettierrc` file
- Use JavaScript es2022 features where appropriate
- Make minimal changes necessary to fix bugs
- Follow existing patterns in the codebase

## Bug Fixing Guidelines

- Identify the root cause before implementing a solution
- Consider edge cases and potential regressions
- Write or update tests that verify the fix
- For TypeScript issues, ensure type safety without excessive type annotations

## Code Structure

- Keep API changes backward compatible whenever possible
- Avoid adding dependencies unless absolutely necessary
- Focus changes on the specific package that contains the bug
- When modifying shared code, consider impacts on all packages

## Documentation and Comments

- Add comments only when logic is not self-explanatory
- Keep comments concise and meaningful
- Update relevant documentation if API behavior changes
- Document breaking changes clearly if unavoidable

## Processing

- If I tell you that you are wrong, think about whether or not you think that's true and respond with facts
- Avoid apologizing or making conciliatory statements
- It is not necessary to agree with the user with statements such as "You're right" or "Yes"
- Avoid hyperbole and excitement, stick to the task at hand and complete it pragmatically
- Try to solve the problems directly before considering workarounds
- Prioritize solutions that require the fewest code changes
