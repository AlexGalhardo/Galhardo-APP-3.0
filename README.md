<div align="center">
<h1 align="center">💵 Galhardo Ecommerce 3.0 💵</h1>
</div>

## Preview Subscription
https://user-images.githubusercontent.com/19540357/211013260-a0b37963-03c6-4bba-a5cf-2e282b180590.mp4

## Preview Shop Checkout
https://user-images.githubusercontent.com/19540357/212559673-ec93690e-edb8-441f-ae3c-8356d9d89aba.mp4


## Setup
- Clone Repository
```
git clone https://github.com/AlexGalhardo/Galhardo-Ecommerce-3.0
```
- Enter Folder
```
cd Galhardo-APP-3.0
```
- Install dependencies
```
npm install
```
- Create .env file
```
cp .env-example .env
```
- Up docker-compose
```
sudo docker-compose up -d
```
- You can see your docker postgres server ip address using the command: `docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' galhardoapp_pg`
- Run PrismaORM migrations
```
npx prisma migrate dev
```
- Run PrismaORM seeds
```
npx prisma db seed
```
- Up local server
```
npm run dev
```
- Go to: http://localhost:3000

## Services used
- Telegram API Key: https://api.telegram.org/
- Mailtrap.io: https://mailtrap.io/
- Stripe: http://dashboard.stripe.com/
- Recaptcha: https://www.google.com/recaptcha/admin/

## LICENSE

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2021-present, Alex Galhardo
