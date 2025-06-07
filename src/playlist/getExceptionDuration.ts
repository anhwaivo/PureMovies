import { isHostnameContains } from "../network";

export function getExceptionDuration() {
    if (isHostnameContains("ophim", "opstream")) {
        return 600;
    } else if (isHostnameContains("nguonc", "streamc")) {
        return +Infinity;
    } else {
        return 900;
    }
}
