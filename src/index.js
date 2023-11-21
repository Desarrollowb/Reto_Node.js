import app from './app.js'
import { sequelize } from './database/database.js'

//import './models/Product.js'
//import './models/clothes.js'

async function main() {
    try {
        await sequelize.sync({force: false});
        console.log('Connection has been established successfully.');

        app.listen(3000)
        console.log('Server is listening on port', 3000)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
}
}

main()

