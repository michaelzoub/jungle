//jungleteam1500@gmail.com

import nodemailer from "nodemailer"
const email = process.env.EMAIL_USER;
const pass = process.env.PASS_USER;

const transporter = nodemailer.createTransport({
host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: email,
    pass: pass
  }
});

export async function reviewEmail(to: string, subject: string, text: string, images?: string[]) {
  // Create HTML content with images if provided
  let htmlContent = text.replace(/\n/g, '<br>');
  
  console.log('Number of images:', images?.length);
  console.log('First image preview:', images?.[0]?.substring(0, 50) + '...');
  
  if (images && images.length > 0) {
    htmlContent += '<br><br><h3>Project Images:</h3>';
    images.forEach(image => {
      // Base64 images can be used directly in the src attribute
      htmlContent += `<img src="${image}" style="max-width: 300px; margin: 10px;" alt="Project Image" />`;
    });
  }

  const attachments = images?.map((image, index) => {
    // Extract the base64 data without the data URL prefix
    const base64Data = image.split(',')[1];
    console.log(`Processing attachment ${index + 1}, data length:`, base64Data?.length);
    return {
      filename: `project_image_${index + 1}.jpg`,
      content: base64Data,
      encoding: 'base64',
      contentType: 'image/jpeg'
    };
  });

  console.log('Number of attachments:', attachments?.length);

  // send mail with defined transport object
try {
  console.log("recipient: ", to);
  const info = await transporter.sendMail({
    from: "jungleteam1500@gmail.com", 
    to: to, 
    subject: subject,
    text: text,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg,rgb(132, 243, 84) 0%,rgb(133, 233, 90) 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">
            🌿 Hello from the Jungle team!
          </h1>
          <p style="color: #f0f8e8; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
            Bringing your garden to life
          </p>
        </div>
        
        <!-- Main Content -->
        <div style="background: white; padding: 40px 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <div style="background: #f8fdf8; border-left: 4px solid #6b8e23; padding: 20px; margin-bottom: 20px; border-radius: 4px;">
            <p style="color: #2c3e50; font-size: 16px; line-height: 1.6; margin: 0;">
              ${text}
            </p>
          </div>
          
          <!-- Footer -->
          <div style="text-align: center; padding-top: 30px; border-top: 1px solid #e8f5e8; margin-top: 30px;">
            <p style="color: #6b8e23; font-size: 14px; margin: 0;">
              🌱 Bringing your garden to life
            </p>
            <p style="color: #888; font-size: 12px; margin: 10px 0 0 0;">
              This is a secure email from Jungle Landscaping
            </p>
          </div>
        </div>
      </div>
    `,
    //attachments
  });

  console.log("Message sent: %s", info.messageId);
} catch (error) {
  console.error("❌ Email sending failed:", error);
}

}