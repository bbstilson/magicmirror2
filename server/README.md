## Project Structure

## How to start

### Step 1: Initialize DB

`yarn migrate:dev`

#### Include seed data

_This step is optional, but useful for testing endpoints._

`yarn seed:dev`

#### Rollback

`yarn rollback:dev`

### Step 2: Start Server

`yarn start:dev`


## Accessing DB

```
sqlite3 -header -column db/storage/dev_magicmirror_db.sqlite
```

