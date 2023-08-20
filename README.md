# 💵 Galhardo Ecommerce 3.0 💵

## Preview Subscription

<https://user-images.githubusercontent.com/19540357/211013260-a0b37963-03c6-4bba-a5cf-2e282b180590.mp4>

## Preview Shop Checkout

<https://user-images.githubusercontent.com/19540357/212559673-ec93690e-edb8-441f-ae3c-8356d9d89aba.mp4>

## Setup

* Clone Repository

<!---->

    git clone https://github.com/AlexGalhardo/Galhardo-Ecommerce-3.0

* Enter Folder

<!---->

    cd Galhardo-APP-3.0

* Install dependencies

<!---->

    npm install

* Create .env file

<!---->

    cp .env-example .env

* Up docker-compose

<!---->

    sudo docker-compose up -d

* You can see your docker postgres server IP Address using the command:

<!---->

    docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' galhardo_ecommerce_postgres

* Run PrismaORM migrations

<!---->

    npx prisma migrate dev

* Open PrismaORM Studio

<!---->

    npx prisma studio

* Up local server

<!---->

    npm run dev

* Go to: <http://localhost:3000>

## RabbitMQ

* <http://localhost:15672/>

## Services used

* Telegram API Key: <https://api.telegram.org/>
* Mailtrap.io: <https://mailtrap.io/>
* Stripe: <http://dashboard.stripe.com/>
* Recaptcha: <https://www.google.com/recaptcha/admin/>

## Name Patterns

| Context | Pattern to be followed |
|-----------------|----------------------|
| folders name           | camelCase    |
| functions names |  camelCase |
| common variables names |  camelCase |
| interface and types names |  PascalCase |
| class names |  PascalCase |
| .controller           | PascalCase    |
| .service           | PascalCase    |
| .repository |  PascalCase |
| .useCase         | PascalCase       |
| .port         | PascalCase       |
| .test        | PascalCase       |
| SQL tables and columns |  snake\_case |
| acronyms (example: CRM )         | UPPERCASE       |
| CONSTANTS names |  UPPER\_CASE separated by \_ |
| names of folders, files, variables, functions etc native to libs and frameworks |  KEEP STANDARD |

## Before submit Commits & PR

* Run command:

<!---->

    npm run format

<!---->

## LICENSE

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2021-present, Alex Galhardo
