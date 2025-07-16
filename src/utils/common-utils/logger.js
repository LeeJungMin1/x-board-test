import winston from "winston";
import { NODE_ENV } from "../../config/config.js";

const isProduction = NODE_ENV === "production";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
      const metaString =
        !isProduction && Object.keys(meta).length > 0
          ? `\n${JSON.stringify(meta, null, 2)}`
          : "";

      const output = isProduction
        ? `[${timestamp}] ${level.toUpperCase()}: ${message}${metaString}`
        : `[${timestamp}] ${level.toUpperCase()}: ${
            stack || message
          }${metaString}`;

      return output;
    })
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
