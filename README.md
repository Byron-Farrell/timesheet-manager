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
### Database Setup

Create /data/db file if it does not already exist

run in a new terminal:
```
sudo mongod
```

### Backend Code Setup
```
cd backend
npm install
```

### Run backend code linter
```
cd backend
npm run lint
```

### .env file configuration
WIP
