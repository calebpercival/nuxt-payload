import sgMail from "@sendgrid/mail";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiKey = config.sendgridApiKey;
  const fromEmail = config.sendgridFrom;
  let toEmail = config.sendgridTo;

  if (!apiKey || !fromEmail) {
    throw new Error("Sendgrid configuration is missing.");
  }

  sgMail.setApiKey(apiKey);

  const body = await readBody(event);

  let emailText = "Email from website contact form\n\n";

  emailText += `From:  ${body.name} `;
  emailText += `\nmessage: ${body}`;

  let subjectText = `Website form submission`;

  const msg = {
    to: toEmail,
    from: fromEmail,
    reply_to: body.email,
    subject: subjectText,
    text: emailText,
  };

  try {
    const sendResponse = await sgMail.send(msg);
    console.log(sendResponse);
    return sendResponse[0];
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
    };
  }
});
