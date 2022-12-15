# Optional Assignment

Setup jest and add a test to check the route is working.

## Background

No code is perfect, this is why we have tests, it is our way to ensure everything is working as it should be. So, lets add tests!!

## Set ts-jest as a testing framework

Follow the instructions how to add jest to a typescript project [here](https://kulshekhar.github.io/ts-jest/docs/getting-started/installation) and add jest to the project.

## Add a unit test to `createHio`

Add `/tests` folder in **hios** service in `/src/handlers` and create a new file `createHio.unit.test.ts`.

Add tests which assert the behavior of the handler both when the user exists and when the user does not exist and a `NotFoundError` is thrown.

Use `jest.mock(...)` to mock `hiosRepository` and `usersApi`.

> The `jest.mock` statements should be the first in the file, also before the imports statements.

Use `jest.mocked(...)` to get the correct type of the mocked object. See [here](https://kulshekhar.github.io/ts-jest/docs/27.0/guides/test-helpers) and [here](https://dev.to/studio_m_song/testing-with-jest-and-typescript-the-tricky-parts-1gnc). In these articles you can find an example for `import { mocked } from 'ts-jest/utils'` which is now redundant and was moved to `jest.mocked(...)` in the latest ts-jest version.

## Good Luck!
