import * as nodemailer from "nodemailer";
import logger from "../../providers/logger.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "jakirdeveloper@gmail.com",
    pass: "oxvp xkry jvzi uapp",
  },
});

async function sendEmail(
  from: string,
  to: string,
  subject: string,
  text: string,
  html: string,
) {
  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });

  logger.debug("Message sent: %s", info.messageId);
}

export default sendEmail;
