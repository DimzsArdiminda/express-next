untuk install backend
1. npm init -y => install package json
2. npm i express mysql2 sequelize cors => depedensi yang di perlukan
3. npx create-next-app@latest => install next js
4. npm install bcrypt => add bycropt
5. npm install axios => install requrement
6. nodemon index => run server backend
7. npm install --save jwt-decode => jwt decode



> database.js => koneksi
> userController.js => controller 
> UserModel.js => membuat Tabel
> UserRoute.js => menyimpan Route
> index.js => server

Fitur
1. login (done)
2. logout (done)
3. middlware (done)
4. show data (done)
5. edit data  (done)
6. delete data  (done)
7. greetings dashboard (done)
8. show data by email (done)
9. Register

> Arsitektur code 
1. frontend/app/protected/route.js => pengecekan link menggunakan token atau tidak
2. frontend/app/lib/auth.js => middlware