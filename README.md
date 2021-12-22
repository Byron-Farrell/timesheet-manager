# timesheet-manager

## Setup

### Debian dependencies
- mongodb-org (visit "https://docs.mongodb.com/manual/administration/install-on-linux/" for install instructions)
- nodejs (inscructions below)


### Installing latest version of node on ubuntu
```
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install nodejs
```
### Database Setup

Create /data/db file if it does not already exist

run:
```
mongod
```

### Backend Code Setup
```
cd backend
npm install
```
