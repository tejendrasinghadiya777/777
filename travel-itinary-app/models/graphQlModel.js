const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Activity {
    time: String
    description: String
    location: String
  }

  type Itinerary {
    _id: ID
    userId: String
    title: String
    destination: String
    startDate: String
    endDate: String
    activities: [Activity]
    description: String
    location: String
    sharableToken: String
  }

  type Query {
    itinerary(id: ID!): Itinerary
    itineraries: [Itinerary]
  }

  input ActivityInput {
    time: String
    description: String
    location: String
  }

  type Mutation {
    createItinerary(
      userId: String!,
      title: String!,
      destination: String!,
      startDate: String!,
      endDate: String!,
      activities: [ActivityInput],
      description: String,
      location: String
    ): Itinerary
  }
`);

module.exports = schema;