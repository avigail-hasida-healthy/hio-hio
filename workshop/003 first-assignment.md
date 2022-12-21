# First Assignment

Validate the target user id exists in the system

## Background

We were able to send a HIO to some user, but the `targetUserId` was not a real user in the system. It was just a random uuid generated on the web...

What we are going to do in this assignment is to add this validation in the `createHio` handler in the **hios** service

But first, a `getUser` functionallity should be exposed in the **auth** service, and just then the validation can be used from the **hios** service.

## Implement a new route

#### Repository

Open `usersRepository.ts` (located in `/services/auth/src/repositories`)

Add a `getById` function which will use the sequelize `User.findOne` function and will return `UserModel` by the specified `id`.

Copy the following signature and implement the method's body

```typescript
export const getById = async (id: string): Promise<UserModel> => {};
```

#### Dto

Open the `userDto.ts` file located in the `/dtos` folder, and add the following interface:

```typescript
/**
 * Represents the data received when requesting a user
 */
export interface GetUserDto {
  id: string;
}
```

#### Handler

Create a new file `getUser.ts` under the `/handlers` folder

Add a `handler` method which will use the `usersRepository` to retreive the requested user and will throw a `NotFoundError` if the user does not exist.

Copy the following signature and implement the method's body

```typescript
export const handler = async (dto: GetUserDto): Promise<UserDto> => {};
```

> Retype the types on the signature to auto add the required `import` statements

Use `modelToDto` function to return the user object.

> This is required because the object returned from the repository contains all the db record data, like `hashedPassword` and `updatedAt` fields. While we want to return only the `id` and the `name` of the user. The `modelToDto` function does exactly that. It clones the model object and builds a new object which contains only the dto fields.

We have a handler which does all the logic, thats great! Now we need to extract the data from the request into a `GetUserDto` object.

Copy the following method and add it in `getUser.ts` file:

```typescript
/**
 * Converts the request to create user dto
 * @param req The request
 * @returns Returns the get user dto
 */
export const requestToDto = (req: Request): GetUserDto => ({
  id: req.params.id,
});
```

We are done with the handler. Now add an `export` statement in the `index.ts` file on the same folder (`/handlers`).

#### Route

Now to the fun part, we will declare the route as part of the express app and add the suitable openapi specification.

Open `users.ts` file from the `/routes` folder. You can see there are already two routes declared in this file, the `POST /users` and the `POST /users/verify` we will add a new route for `GET /users/:id`.

Copy the following code into the `setupRouter` function:

```typescript
usersRouter.get(
  "/:id",
  handleRequest(getUser.requestToDto, getUser.handler, 200)
);
```

> As this file is in a router scope, it means that the `/users` part of the route was already declared outside of this file, we only need to declare the `/:id` part of the route which follows `/users`.

The `handleRequest` middleware sends the request to the first parameter (`requestToDto`) executes the second parameter (`handler`) with the object it retrieved. The third parameter states which status to return in the response when the `handler` is done.

#### Openapi

Now let's declare the openapi suitable to this route.

The openapi declaration is written in yaml syntax inside a comment which starts with `@openapi` to let `swagger-jsdoc` package know which part to collect into the final openapi.json file it generates.

We will start by copying the openapi from the previous route and modify it as necessary.

Copy the `@openapi` comment above the `/verify` route declaration and paste it above the `:id` route declaration.

Change <s>`/users/verify:`</s> to `/users/{id}:`

> We need to declare the whole route here, because it is not part of the express router

Change <s>`post:`</s> to `get:`

Change the `summary` and `description`, and set the `operationId` to `getUser`.

> The `operationId` declares the name of the function which is generated in the client and we will use it later from the hios service.

Leave the `tags` part as is.

Remove all the `requestBody` section. We describe a `GET` route which does not contain any payload. And replace it with the following `parameters` section:

```yaml
   *     parameters:
   *       - in: path
   *         name: id
   *         description: The user id to get
   *         schema:
   *           type: string
   *           format: uuid
   *         required: true
```

> You can read more about openapi parameters in swagger openapi specification [here](https://swagger.io/docs/specification/describing-parameters/)

In the `responses` section, remove the `401:` defenition. This route is not secured so it will not response with "Unauthorized". Instead, add a `404:` and change the reference to `#/components/responses/NotFound`.

Also, edit the `200:` section's `description` to `The user data`.

Openapi - Done!

Actually, we are done declaring the route. We can now try it out.

#### Swagger UI

The `/docs` / swagger we used in the previous section was the one declared in **hio-api** gateway the services does not have a swagger definition yet, so we should declare a seperate swagger to each of the services.

Lets add swagger to the **"auth"** service.

Install `swagger-ui-express` to "auth" service:

```bash
npm install swagger-ui-express --w services/auth
```

Open `index.ts` file from the `/routes` folder.

Add the `import` statement for `swaggerUi`:

```typescript
import swaggerUi from "swagger-ui-express";
```

Add the following line as the first statement in the `setupRoutes` function:

```typescript
app.use("/docs", swaggerUi.serve, swaggerUi.setup(apiSpec));
```

#### Run the service

Run npm install
```bash
npm install
```

We are now ready to test our new and shining route.

Run the project (`F5`).

Wait for all three projects to start.

Go to [http://localhost:5001/docs](http://localhost:5001/docs) in your browser.

You should see three routes, one of them is our new `GET /users/{id}`

#### Try it out

Click on the route, then click the **_"Try it out"_** button and insert some text into the "id" text-box and click the **_"Execute"_** button

Haa, a **400 Bad Reqeust** response is returned, the string is not in "uuid" format!

(Don't mind the ugly error response, we will handle it later)

We need a valid uuid format. Take this value `757cc226-a204-46c7-858a-86c8aa32c18b` and paste it in the "id" text-box and execute the request again.

Now we get **404 Not Found**. Yes, this is just a random uuid, no user should have been returned for it.

To get a valid uuid for this request execute the `POST /users` or the `POST /users/verify`, and copy the `id` value from the response and paste it in the "id" text-box.

Execute the request.

The user details should be shown in the response, just like this:

```json
{
  "id": "8a8772be-474d-4533-bc5a-782d7c40bfc5",
  "name": "john.doe"
}
```

Let's move on.

## Validate the target user exists when creating a HIO

We just encountered one benefit the openapi declaration gives us, executing the route right from swagger-ui. Now we will use another out-of-the-box feature of openapi.

### Reference auth client from hios service

Install the auth-client as a dependency of the hios service

```bash
npm install @hio-hio/auth-client --w services/hios
```

### Validate target user exists

Add a new file `authClient.ts` in `/services/hios/src/lib` and copy the following code:

```typescript
import { UsersApi } from "@hio-hio/auth-client";

export const usersApi = new UsersApi();
```

Open `createHio.ts` file located in `/services/hios/src/handlers`.

In the `handler` function we can find all the logic for creating a HIO. We want to add one more validation before creating a HIO.

Use `usersApi.getUser` to check if `dto.targetUserId` exists, otherwise throw `NotFoundError`.

> Notice, `usersApi.getUser` function throws an AxiosError with 404 status code in case the user does not exist. The status code can be retreived from `error.response.status`. We want to throw `NotFoundError` from `@hio-hio/errors` package.

### Run and Test

To test this functionality you can simply run the project, go to [http://localhost:5010/docs](http://localhost:5010/docs) (the swagger-ui for the hio-api gateway) and execute the `POST /hios`.

> Remeber, the route in the gateway is a secure route so you need to send the user's token in the `Authorization` header. See the instructions from the "Send a HIO" [here](./001%20setup.md#setup-authentication)

Or, you can add swagger-ui to the hios service as we added it to the auth service [here](#swagger-ui), and browse [http://localhost:5002/docs](http://localhost:5002/docs). There you will find only one route `POST /hios` which is implemented in the hios service.

### Try it out

First, try the route with the example value inside the `targetUserId` a **404 Not Found** response should return.

> If you are using the route from the gateway a **500 Internal Server Error** will be returned, this is fine as the gateway did not handle the 404 case.

Now try the route with an existing userId you can retreive from the login / signup routes.

A new HIO is created.

YAY!! 🎊

### Optional Assignment

Add another validation, and validate `targetUserId` is not equal to `userId`. Throw a `ForbiddenError` in case they are equal.

Add the `ForbiddenError` in `packages/errors` package and use it in the `handler`

---

Let's move on to the [Second Assignment >>](./004%20second-assignment.md)
