#### TODO

- deployed database setup
- Auth0 client credentials backend application and replace api explorer credentials
- sort out auth0 test app and client credentials
  - for testing, use forum test app with client credentials and forum-api audience
  - to test endpoints that require a user, use forum app with implicit flow and forum-api audience


#### ECS
42498b1df431287e140bb30f10fff2ee68586693 - creates ecs service with nginx task
accepts requests at the ENI IP/DNS name

got ECS service+task created with app container but it's existing immediately - trying to set up logs