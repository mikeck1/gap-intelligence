# gap-intelligence

1. Clone the repo


```
git clone https://github.com/mikeck1/gap-intelligence.git
```
2. Start Postgres
```
brew services start postgresql
createdb gap-intelligence
```
3. Set up the back end
```
cd api
bundle install
# rake db:migrate
# rake db:create
bin/rails db:environment:set RAILS_ENV=development
rake db:schema:load

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
Refresh your browser if you don't have articles in the table. News articles will automatically populate while your browser is open.
