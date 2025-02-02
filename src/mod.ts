import { DependencyContainer } from "tsyringe";

import { IPostSptLoadMod } from "@spt/models/external/IPostSptLoadMod";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { IPmcChatResponse } from "@spt/models/spt/config/IPmChatResponse";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { LogBackgroundColor } from "@spt/models/spt/logging/LogBackgroundColor";

class Mod implements IPostSptLoadMod
{
    private modConfig = require("../config/config.json")

    public postSptLoad(container: DependencyContainer): void
    {
        // get logger
        const logger = container.resolve<ILogger>("WinstonLogger");

        // get the config server so we can get a config with it
        const configServer = container.resolve<ConfigServer>("ConfigServer");

        // Request pmc bot response config
        const responseConfig: IPmcChatResponse = configServer.getConfig<IPmcChatResponse>(ConfigTypes.PMC_CHAT_RESPONSE);

        // change to response chance to config values
        responseConfig.killer.responseChancePercent = this.modConfig.killedABotResponseChancePercent;
        responseConfig.victim.responseChancePercent = this.modConfig.diedToABotResponseChancePercent;

        // if debug, log values
        if (this.modConfig.debug)
        {
            console.log("[DEBUG] [SCHKRM] PMC Bot Response Chance - Killer set to:",responseConfig.killer.responseChancePercent)
            console.log("[DEBUG] [SCHKRM] PMC Bot Response Chance - Victim set to:",responseConfig.victim.responseChancePercent)
        }

        // announce mod loaded
        logger.logWithColor("[SCHKRM] PMC Bot Response Chance tweaked.", LogTextColor.BLACK, LogBackgroundColor.YELLOW);
    }
}

export const mod = new Mod();
