# Last Assignment

Add a declarations (d.ts) file to the errors package

## Background

In the packages folder we have an `errors` package which has all the useful errors for the project. This package is written in javascript. We have been using the errors from there, the secret is the `declarations.d.ts` file which is located in each of the projects dependent upon the `errors` package.

The `declarations.d.ts` only declares a package but does not have declarations to types / methods a package has. So it lets us use a package on "blind" while typescript compiler does not check any of the types used in this package.

But we want all of the benefits typescript gives us, also in a javascript package. This is where the `.d.ts` file comes in help.

## Declare a .d.ts file in errors package

Add a new `index.d.ts` file in the **errors** root folder `/packages/errors` and in there we will declare and export all the clasess that we want to be used by the users of this package: `AlreadyExistError`, `BadRequestError`, `NotFoundError` and `UnauthorizedError`

A declaration looks similar to this:

```typescript
export class ClassName {
  constructor(someParam: string);
  aMethod(someParam: number): void;
}
```

Notice, in a declaration, only the structure of the class / constructor / method is declared with no implementation.

> You can have more information on `.d.ts` files in the documentation [here](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html#types-in-modules).

> For hebrew speekers there is a great article on declaration files [here](https://internet-israel.com/%d7%9e%d7%93%d7%a8%d7%99%d7%9b%d7%99%d7%9d/typescript/%d7%a7%d7%95%d7%91%d7%a5-type-definition-%d7%91%d7%98%d7%99%d7%99%d7%a4%d7%a1%d7%a7%d7%a8%d7%99%d7%a4%d7%98/)

## Reference the .d.ts file in the package.json

Open `package.json` file for erros package.

Add the following line to the file:

```json
"types": "./index.d.ts"
```

This setting tells npm there is a declaration file, and it should be published alongside the javascript files. This will be available for typescript projects to get the types of the package from.

## Remove the declaration from the `declarations.d.ts` file

In order to reference the javascript package from a typescript project a module declaration was needed. Now we should remove it because we already have types declarations for the package.

Go to `declarations.d.ts` file in each of the services / gateway and remove the following line:

```typescript
declare module "@hio-hio/errors";
```

Run `npm install` and now everywhere the errors are used there will be an intellisense :)

---

# Optional Assignment

Add a new `handleErrors` middleware, and add a declaration (.d.ts) file to the middleware package

## Background

It is most likely that the errors returned from the api helped you figure out some problems in the code. But this party is gonna end now... We should avoid sending information with errors in an api response.

This is why we need a new middleware `handleErrors` which will log all the error data, but will send only the error message through the api response.

As the `middleware` package is written in javascript we will discover that there is not enough intellisense for these middlewares, and we will add a `.d.ts` file which describes the middleware functions the package exports.

Let's begin :)

## Add `handleErrors` middleware

### Create the middleware

Add a new file `handleErrors.js` in `/packages/middleware/src` and copy the following content:

```javascript
module.exports = (error, _req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  console.error(error.message || "Request Failed");
  console.error(error);

  res
    .status(error.statusCode || error.status || 500)
    .json({ message: error.message });
};
```

This code is actually the last place where an error is handled in the express app lifecycle, and the middleware sends the response with the error `statusCode` if exists and with `500` if `statusCode` does not exist.

In any case, the error is logged to the console.

### Add the middleware to hio-api gateway

Go to `/src/routes/intex.ts` file in **hio-api** gateway and add `handleErrors` in the import statement of `@hio-hio/middleware` so it looks like this:

```typescript
import { validateApiSpec, handleErrors } from "@hio-hio/middleware";
```

Copy the following statement to be the _last_ statement in the `setupRoutes` function:

```typescript
app.use(handleErrors);
```

Let's try it out.

Browse to [http://localhost:5010/docs](http://localhost:5010/docs), And intentionally try the _"send Hio"_ route with a number inside `targetUserId` instead of a uuid.

A 400 error is received, with a message in the response payload. but no other data is visible in the response pyalod as it was before.

That's great! We are using a javascript package inside a typescript project. But wihtout the typescript benefits. we do not have any intellisense or information about the javascript library. This way we loose the benefits typescript has. We cannot see if the arguments sent to the methods are correct, and there will be no error/warning if something is not right, only at run-time.

This is where typescript declartaions are coming for help.

### Declare .d.ts file for `@hio-hio/middleware`

One option to declare the types the package is exporting is declaring a `.d.ts` file. The other way is converting the package to typescript. Choose whichever you want.

#### Declaring a .d.ts file

Create a new file `index.d.ts` inside the root folder of `middleware` pacakge.

In there, export three methods:

1. `handleErrors`: Receives 4 arguments `error`, `req`, `res` and `next`, their types can be found in the `express` package. And returns `void`

2. `handleRequest`: Receives 3 arguements, and returns a middleware function.

3. `validateApiSpec`: Receives 1 argument, and returns an array of middleware functions

You can declare the middleware function as a type and use it later as a reference

#### Converting the package to typescript

Copy a `tsconfig.json` file from another package to the `middleware` package

Change all the file's extension from `.js` to `.ts`

Now you will get alot of errors telling you that "Parameter 'someParameter' implicitly has an 'any' type". Thats ok, we can silence this error by adding the following configuration in the `tsconfig.json` file of the middleware project:

```
"compilerOptions": {
  ...
  "noImplicitAny": false
}
```

But before we can run the project one more thing should be configured and is the `"prepare"` script, Add the following to the `"scripts"` section in the `package.json` of the middleware package:

```
"scripts" : {
  ...
  "prepare": "tsc --build",
}
```

This tells npm to run the typescript compiler in the npm install process.

And edit the `"main"` setting to `"./dist/index.js"`

We are ready, run `npm install`

### Remove `declarations.d.ts` from **hio-api** gateway

Open `declarations.d.ts` file inside **hio-api** gateway project.

There is only one row in there:

```typescript
declare module "@hio-hio/middleware";
```

This `module` declaration tells typescript to ignore the typings in `@hio-hio/middleware` package and use it as is,wihtout typings.

Now that we are going to declare the package's typgins we do not need this file anymore

---

That's it! you finished all the assignments planned for this workshop. 🎊🎉🎊

If you have strength to one more assignment, we have an optional assignment planned for you. You can check it out [here >>](./006%20optional-assignment.md)
