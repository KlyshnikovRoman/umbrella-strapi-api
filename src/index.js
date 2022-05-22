'use strict'

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.plugin('graphql').service('extension')

    const extension = ({ strapi }) => {
      return {
        typeDefs: `
          type Query {
            isUsernameAvailable(username: String!): Boolean!
            isEmailAvailable(email: String!): Boolean!
          }
        `,
        resolvers: {
          Query: {
            isUsernameAvailable: {
              async resolve(_, args) {
                const user = await strapi.db.query('plugin::users-permissions.user').findOne({
                  select: ['id'],
                  where: { username: { $eq: args.username } },
                })

                return !user
              },
            },
            isEmailAvailable: {
              async resolve(_, args) {
                const user = await strapi.db.query('plugin::users-permissions.user').findOne({
                  select: ['id'],
                  where: { email: { $eq: args.email } },
                })

                console.log(user)

                return !user
              },
            },
          },
        },
        resolversConfig: {
          'Query.isUsernameAvailable': {
            auth: false,
          },
          'Query.isEmailAvailable': {
            auth: false,
          },
        },
      }
    }

    extensionService.use(extension)
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {
  },
}
