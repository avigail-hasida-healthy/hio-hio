# First Assignment

Validate the target user id exists in the system

## Background

We were able to send a HIO to some user, but the `targetUserId` was not a real user in the system. It was just a random uuid generated on the web...

What we are now going to do is add this validation in the `createHio` handler in the **hios** service

But first a `getUser` functionallity should be exposed in the **auth** service, and just then the validation can be used from the **hios** service.

## Implement a new route
