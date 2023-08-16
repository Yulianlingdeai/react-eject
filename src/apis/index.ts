import systemBasicConfig from "./systemBasicConfig";
import regionVerification from "./regionVerification";
import singleVerification from "./singleVerification";

export default {
    ...systemBasicConfig,
    ...regionVerification,
    ...singleVerification
};
