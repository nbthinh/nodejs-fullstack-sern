# npm install

- `npm install body-parser@1.19.0 dotenv@8.2.0 ejs@3.1.5 express@4.17.1`

- `npm install --save-dev @babel/core@7.12.10 @babel/preset-env@7.12.10 @babel/node@7.12.10 nodemon@2.0.7`

- `npm install --save-dev sequelize-cli@6.2.0`
- `npx sequelize-cli init` (`npm install --save sequelize`)
- `node_modules/.bin/sequelize init --force`
- Dùng npx hay node_modules đều đc
- `https://sequelize.org/docs/v6/other-topics/migrations/`
- `npm install --save mysql2@2.2.5`
- `npx sequelize-cli seed:generate --name demo-user`
- `npx sequelize-cli db:seed:all`
- https://sequelize.org/docs/v6/getting-started/
- https://stackoverflow.com/questions/57522774/sequelizeconnectionrefusederror-connect-econnrefused-127-0-0-13306
- `npx sequelize-cli db:migrate`
- `npx sequelize-cli db:seed:all`
- Sequelize seeder.
- Một số lưu ý:
    - model, chứa các object để ta tương tác với database, ta sẽ truy xuất database thông qua các class được định nghĩa trong model.
    - migrations: chứa các ánh xạ đến database, khi thao tác với database sẽ thông qua migration để cập nhật dữ liệu lên database.