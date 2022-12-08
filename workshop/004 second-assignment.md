# Second Assignment

Get my HIOs

## Background

Every user needs a way to get the HIOs which were sent to him/her, and this is what we are going to implement in this assignment.

We will start the same way as the previous assignment. adding a new route in the **hios** service, then add a new route in **hio-api** gateway

## New route in hios service

The new implementation will reply to the following route `GET /hios?targetUserId={someUUID}`

The stages in this task are the same as the previous assignment.

These are the places where code should be added:

- `/repositories/hioRepository.ts` Add a `getByTargetUserId` function which returns all the hios with the specified `targetUserId`.

- `/dtos/hioDto.ts` Add `GetHiosByTargetUserIdDto` interface which declares `targetUserId` as `string` field.

- `/handlers/getHiosByTargetUserId.ts` Add this file and implement:

  - `hander` function which uses the repository and returns an array of `HioDto` (Use the `modelToDto` function which is located in `/dtos/hioDto.ts` file, this is required in order to convert the model into a dto)
  - `requestToDto` function which receives a request and builds a `HioDto` array from the repository.

- `/handlers/index.ts` Export the new handler.

- `/routes/hios.ts` Setup the new route in express and add a suitable openapi declaration. You can find valueable information in swagger specification, [here](https://swagger.io/specification/). You can also use the [editor](https://editor-next.swagger.io/) and [apibldr](https://www.apibldr.com/) to assist you to test and build the right specification.

Thats it. We are ready to test the new route we just implemented.

If you haven't added `swagger-ui-express` to **hios** service yet, now is the time. You can follow the instructions [here](./003%20first-assignment.md#swagger-ui)

Run the project and browse [http://localhost:5002/docs](http://localhost:5002/docs), You sould see the new route listed in the routes list

## New route in hio-api gateway

We added the new route to **hios** service, but this is not enough. In order for our client (The app) to be able to use this route we should add a route in the gateway as well.

This route will be secure, and will extract the current user's id from the request token and will send it as the `targetUserId` to the **hios** service.

The route will respond to `GET /hios` and will return the hios in which the current user is the target user.

Let's begin.

- `/dtos/hioDto.ts` Export a new `GetHiosDto` interface which contains `targetUserId` as a `string` field.

- `handlers/getMyHios.ts` Create the file and add the following methods:

  - `requestToDto` which returns a `GetHiosDto`. You can get the current user dto from `request.user.id`
  - `handler` which returns an array of `HioDto` and uses `hiosApi` to get the users hios. See `handlers/sendHio` as a reference.

  > **_VSCode Tip:_** If you cannot find the new `getHiosByTargetUserId` function in the `hiosApi` try this:
  >
  > 1. Open the Command Palette (view menu → command palette or COMMAND + SHIFT + P or F1)
  > 2. Enter TypeScript: Restart TS server. (type "restart" and it should autosuggest)
  >    This comman will show up if the current open file is a .ts file.

- `/handlers/index.ts` Export the new handler.

- `/routes/hios.ts` Setup the new route in the express router and add the suitable openapi declaration in the comment above the route setup.

  Be sure to include the `security` section in the specification which states this route is secured.

Think the route is ready? Let's find out.

Run the project and browse to [http://localhost:5010/docs](http://localhost:5010/docs), you should see the new route in the list of routes

---

Well Done! 🎊

We can move on the the [Last Assignment >>]()
