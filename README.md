# gap-intelligence

1. Clone the repo


```
git clone https://github.com/olinations/crud-starter-api.git
```
2. Start Postgres
```
brew services start postgresql
createdb crud-starter-api
```
3. Set up the back end
```
cd api
rake db:migrate
rake db:create

psql # confirm it worked
\dt  #should see the table we created
\q
rails server # run the server
```
4. CD into the News Crawler and Install dependencies
```
cd crud-starter-api 
npm install
npm start
cd ..
```

5. Set up the front end

```
cd crud-starter-frontend
npm install
npm start
cd ..
```