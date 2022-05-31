'use strict'
const axios = require('axios')

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
          type RecaptchaEntityResponse {
            success: Boolean!
            score: Float!
            errorCodes: [String!]
          }

          type Query {
            isUsernameAvailable(username: String!): Boolean!
            isEmailAvailable(email: String!): Boolean!
            recaptcha(token: String!): RecaptchaEntityResponse!
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

                return !user
              },
            },
            recaptcha: {
              async resolve(_, args) {
                const { data: { success, score, errorCodes } } = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_KEY}&response=${args.token}`)

                return { success, score, errorCodes }
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
          'Query.recaptcha': {
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
