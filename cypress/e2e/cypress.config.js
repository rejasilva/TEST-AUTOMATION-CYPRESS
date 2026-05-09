const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 120000,

  e2e: {
    setupNodeEvents(on, config) {

    },
  },
});