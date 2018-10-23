## NodeJS Test Phones API

### Requirements
* NodeJS 8.11+
* MongoDB

### Config
1. Create config 
    ```bash
    cp src/config/constants.json.sample src/config/constants.json
    ```
2. Fill it with correct values

### Testing with Postman
[Postman collection](https://www.getpostman.com/collections/62ace60261f009dc09aa)

### Start application
```docker-compose up```

### Run tests
```yarn test```

### Linter
```yarn lint```


### ES6 Syntax application
Same application, using ES6 syntax and `.mjs` files format. Can be run natively with `node --experimental-modules app.mjs`

[GitHub](https://github.com/ZhuChara2004/node-phones-api)
