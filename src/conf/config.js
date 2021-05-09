// Load config
const sysConfig = require("./sys-setting.json");

export const system = sysConfig;


// Export default
export default (function buildConfig() {
    return {
        system: sysConfig,
    };
})();