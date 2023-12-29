import { readFileSync } from "fs";
import sendEmail from "./node-mailer.js";
import { resolve } from "path";
import logger from "../../providers/logger.js";

const mode = "node_mailer";
const templates = {
  email_verify: {
    subject: "Verify Your Soclif.com Account",
    text: readFileSync(resolve("./templates/email_verify.txt"), "utf8"),
    html: readFileSync(resolve("./templates/email_verify.html"), "utf8"),
  },
};

async function triggerEmail(
  to: string,
  template: "email_verify",
  variables: string[][],
) {
  const from = "jakirdeveloper@gmail.com";
  const templateData = templates[template];

  logger.debug(variables.flat());

  variables.forEach(([key, value]) => {
    templateData.subject = templateData.subject.replaceAll(`{{${key}}}`, value);
    templateData.html = templateData.html.replaceAll(`{{${key}}}`, value);
    templateData.text = templateData.text.replaceAll(`{{${key}}}`, value);
  });

  if (mode === "node_mailer") {
    await sendEmail(
      from,
      to,
      templateData.subject,
      templateData.text,
      templateData.html,
    );
  }
}

export default triggerEmail;
