const { migrateChartVisualization } = require("../scripts/migrateChartVisualization");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const report = await migrateChartVisualization(queryInterface, {
      refreshLegacy: true,
    });
    if (report.failed > 0) {
      process.stderr.write(
        `[visualization migration] ${report.failed} legacy chart specifications could not be refreshed: `
        + `${JSON.stringify(report.failures)}\n`
      );
    }
  },

  async down() {
    // This migration re-derives legacy-owned specs without changing the schema.
  },
};
