# crud-nodejs-prisma

## Dependencies

```bash
sh init.sh
npm install express prisma @prisma/client
npm install --save-dev typescript ts-node-dev @types/express
npx prisma init --datasource-provider postgresql --output ../generated/prisma

npx prisma migrate dev --name init
npx prisma generate

```
