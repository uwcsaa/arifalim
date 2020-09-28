# README

## Development

1. Install docker engine https://docs.docker.com/engine/install/
2. Install docker-compose https://docs.docker.com/compose/install/
3. Setup .env file `cp example.env .env`
4. Run `docker-compose run web bash` inside app folder
5. Inside container run the following commands:

```
bundle
yarn
be rails db:create && be rails db:migrate
```

To run application: `docker-compose up`

To access console enter container `docker-compose run web bash` and run `rc`

To edit credentials, run in container:

`credit`

or `EDITOR=nano bundle exec rails credentials:edit`

See all available aliases in Dockerfile

## Testing

1. Run `docker-compose run web bash`
2. Inside container run `rtest` to run all tests

## Debugging

1. Place `binding.pry` or any other debugger in a place you need
2. Run `docker attach arifalim_web_1` to access console (Note that there might be some issues, see https://github.com/docker/compose/issues/423#issuecomment-141995398)

## Deploying

1. Setup RAILS_MASTER_KEY env on heroku (if needed)
2. Run `git push heroku master` 
