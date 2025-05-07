//jungleteam1500@gmail.com

import nodemailer from "nodemailer"
const email = process.env.EMAIL_USER
const pass = process.env.PASS_USER

const transporter = nodemailer.createTransport({
host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: email,
    pass: pass
  }
});

export async function nodeMailer(from: string, subject: string, text: string, images?: string[]) {
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
  const info = await transporter.sendMail({
    from: from, 
    to: email, 
    subject: subject,
    text: text, // Keep plain text version
    html: htmlContent, // Add HTML version with images
    attachments
  });

  console.log("Message sent: %s", info.messageId);
}
