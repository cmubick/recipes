# Developing
### Install deps
```
> yarn
```
### How to run app in dev mode
```
> docker-compose up -d
> yarn start:dev
```

### How to run app in debug mode
```
> docker-compose up -d
> yarn start:debug
```

### How to generate migrations
#### (Note: migrations are set to autorun on startup)
```
> yarn typeorm migration:generate -n <SOME_NAME>
```

# Running playground
Navigate to [http://localhost:3000/graphql](http://localhost:3000/graphql)

Make sure to login and add the token retyurned to the following **HTTP HEADERS**
```
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3YTU5MzZiNy1mOTE3LTQ3NGMtOTAwOS04MjdiNmYzMzc2MTEiLCJlbWFpbCI6ImR1c3RpbkBleGFtcGxlLmNvbSIsInJvbGVzIjpbXSwiaWF0IjoxNjI4ODMyODg1fQ.zAsC0mCcx_XdernHRtc_FmX8vvY72ZAqFYdCFTvSRto"
}
```
