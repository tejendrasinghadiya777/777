const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConnection');
const schema = require('./models/graphQlModel');
const resolvers = require('./utils/graphQlResolver');
const { graphqlHTTP } = require('express-graphql');
const app = require("./app");
const validTokenHandler = require('./middlewares/validTokenHandler');

const PORT = process.env.PORT || 5000;
connectDB();

app.use('/graphql',validTokenHandler, graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true // Enables GraphiQL UI for testing
}));
app.listen(PORT,()=>{
    console.log("Server is running on port "+PORT);
})