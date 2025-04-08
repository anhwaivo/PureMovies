import logoURL from "../assets/images/logo.png";

import { config } from "../misc/state";
import { addStyle } from ".";

export async function replaceLogo() {
    addStyle(`
        .mr-3.flex-none.overflow-hidden.w-auto > span > a > img {
            content: url('${logoURL}') / "${config.name}";
        }
    `);
}
