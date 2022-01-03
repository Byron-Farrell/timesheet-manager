# timesheet-manager

## Setup

### Debian dependencies
- mongodb-org (visit "https://docs.mongodb.com/manual/administration/install-on-linux/" for install instructions)
- nodejs

### Installing latest version of node on ubuntu
```
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install nodejs
```

### .env file configuration
WIP

### Database Setup

Create /data/db file if it does not already exist

Check if folder exists:

```
cd /data/db
```

If the folder does not exists. Then create a new folder:

```
sudo mkdir /data/db
```

run in a new terminal:
```
sudo mongod
```

### Install Javascript libraries

```
cd backend
npm install
```

### Run the application 

```
cd backend
npm run start
```


## Linter

### Run eslint
```
cd backend
npm run lint
```

## Testing

### Run tests

```
cd backend
npm run tests
```
